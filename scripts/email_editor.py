#!/usr/bin/env python3
"""Manda um e-mail interno SÓ para o editor, pelo Buttondown. Nenhum assinante recebe.

    python scripts/email_editor.py "Assunto" corpo.html
    python scripts/email_editor.py "Assunto" --texto "Uma mensagem curta."

Como funciona: cria um rascunho, usa o "send-draft" do Buttondown para os endereços do editor
e apaga o rascunho em seguida. O rascunho nunca é publicado. O Buttondown só entrega a cópia a
assinantes confirmados, por isso os endereços do editor precisam estar inscritos na newsletter.
O e-mail chega com "[PREVIEW]" antes do assunto e com a moldura da newsletter.

O assunto precisa começar com um dos prefixos em INTERNOS: é assim que a rotina da newsletter
(rascunho.py) sabe que este rascunho não é uma edição.

Lê BUTTONDOWN_API_KEY do ambiente ou de ~/api_keys.env. Destinatários: variável NEWSLETTER_COPIA
ou o padrão abaixo.
"""
import html
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

API = "https://api.buttondown.com/v1/emails"
COPIA_PADRAO = "domiciano@agenticway.com.br,domiciano.rossi@gmail.com"
INTERNOS = ("Pautas para aprovar", "Aviso da redação")

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def chave():
    k = os.environ.get("BUTTONDOWN_API_KEY")
    arq = Path.home() / "api_keys.env"
    if not k and arq.exists():
        for linha in arq.read_text(encoding="utf-8").splitlines():
            if linha.startswith("BUTTONDOWN_API_KEY="):
                k = linha.split("=", 1)[1].strip().strip('"')
    if not k:
        sys.exit("ERRO: BUTTONDOWN_API_KEY não encontrada (ambiente ou ~/api_keys.env)")
    return k


def pede(metodo, endereco, k, corpo=None):
    req = urllib.request.Request(endereco, method=metodo,
                                 data=json.dumps(corpo).encode() if corpo is not None else None,
                                 headers={"Authorization": f"Token {k}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read() or b"{}")


def envia(assunto, corpo_html, espera=25):
    """Envia e devolve a lista de destinatários. Levanta SystemExit com a causa se falhar."""
    if not assunto.startswith(INTERNOS):
        sys.exit(f"ERRO: o assunto precisa começar com um destes: {INTERNOS}")
    k = chave()
    # sobras de execuções anteriores que falharam antes de apagar
    d = pede("GET", API, k)
    for x in d.get("results", []):
        if x.get("status") == "draft" and str(x.get("subject", "")).startswith(INTERNOS):
            pede("DELETE", f"{API}/{x['id']}", k)
    para = [a.strip() for a in os.environ.get("NEWSLETTER_COPIA", COPIA_PADRAO).split(",") if a.strip()]
    corpo = "<!-- buttondown-editor-mode: plaintext -->\n\n" + corpo_html
    r = pede("POST", API, k, {"subject": assunto, "body": corpo, "status": "draft"})
    try:
        pede("POST", f"{API}/{r['id']}/send-draft", k, {"recipients": para})
    except urllib.error.HTTPError as ex:
        pede("DELETE", f"{API}/{r['id']}", k)
        sys.exit(f"ERRO: o Buttondown recusou o envio (HTTP {ex.code}: {ex.read()[:200]!r})")
    time.sleep(espera)  # dá tempo de o Buttondown despachar antes de o rascunho sumir
    pede("DELETE", f"{API}/{r['id']}", k)
    return para


def main():
    if len(sys.argv) < 3:
        sys.exit('uso: email_editor.py "Assunto" corpo.html | --texto "mensagem"')
    assunto = sys.argv[1]
    if sys.argv[2] == "--texto":
        corpo = "".join(f'<p style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#1A2733">{html.escape(p)}</p>'
                        for p in " ".join(sys.argv[3:]).split("\\n") if p.strip())
    else:
        corpo = Path(sys.argv[2]).read_text(encoding="utf-8")
    para = envia(assunto, corpo)
    print(f"e-mail interno enviado para: {', '.join(para)} · assunto: {assunto}")


if __name__ == "__main__":
    main()
