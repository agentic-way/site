#!/usr/bin/env python3
"""Monta e envia o e-mail "Pautas para aprovar" para o editor.

    python .claude/skills/pautas/scripts/enviar.py pautas.json            # envia
    python .claude/skills/pautas/scripts/enviar.py pautas.json --previa   # só gera pautas-previa.html

O arquivo pautas.json é escrito pela skill (formato em SKILL.md). O envio usa
scripts/email_editor.py: só o editor recebe.
"""
import html
import json
import sys
from datetime import datetime
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(RAIZ / "scripts"))
import email_editor  # noqa: E402

REPO = "https://github.com/agentic-way/site/pull/"
RECOMENDACOES = {"aprovar": ("Pode aprovar", "#1F4E79"),
                 "corrigir": ("Aprovar depois de corrigir", "#B5651D"),
                 "segurar": ("Melhor segurar", "#A33A2A")}
EDITORIAS = ("RADAR", "NA OPERAÇÃO", "ANÁLISE", "GUIA", "FERRAMENTAS", "OUTRO")
NAVY, CINZA, LINHA = "#0F2A44", "#5B6572", "#DDD9D0"
SERIF, SANS, MONO = "Georgia,'Times New Roman',serif", "Arial,Helvetica,sans-serif", "'Courier New',Courier,monospace"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def erro(msg):
    sys.exit(f"ERRO: {msg}")


def e(s):
    return html.escape(str(s), quote=True)


def valida(p):
    itens = p.get("itens")
    if not isinstance(itens, list) or not itens:
        erro("'itens' vazio: sem pauta aberta não há e-mail")
    for i in itens:
        falta = {"pr", "editoria", "titulo", "resumo", "conferido", "duvidas", "recomendacao", "previas"} - set(i)
        if falta:
            erro(f"PR {i.get('pr')}: faltam os campos {sorted(falta)}")
        if not isinstance(i["pr"], int):
            erro("'pr' é o número do pull request")
        if i["editoria"] not in EDITORIAS:
            erro(f"PR {i['pr']}: editoria fora de {EDITORIAS}")
        if i["recomendacao"] not in RECOMENDACOES:
            erro(f"PR {i['pr']}: recomendacao é uma de {sorted(RECOMENDACOES)}")
        if len(i["resumo"]) > 500:
            erro(f"PR {i['pr']}: resumo com mais de 500 caracteres")
        for campo in ("conferido", "duvidas", "previas"):
            if not isinstance(i[campo], list):
                erro(f"PR {i['pr']}: '{campo}' é uma lista (pode ser vazia)")
        if not i["conferido"]:
            erro(f"PR {i['pr']}: 'conferido' vazio. Diga o que foi conferido nas fontes, ou por que não foi possível")
        for u in i["previas"]:
            if not str(u).startswith("https://"):
                erro(f"PR {i['pr']}: prévia sem https: {u}")


def lista(itens, cor="#1A2733"):
    return "".join(f'<p style="margin:0 0 6px;padding-left:14px;text-indent:-14px;color:{cor}">· {e(x)}</p>' for x in itens)


def monta(p):
    n = len(p["itens"])
    partes = [
        f'<div style="max-width:600px;margin:0 auto;font-family:{SERIF};color:#1A2733;font-size:15px;line-height:1.55">',
        f'<p style="margin:0 0 6px;font-family:{MONO};font-size:12px;color:{CINZA}">REDAÇÃO AGENTICWAY · {e(p.get("data", datetime.now().strftime("%d/%m/%Y")))}</p>',
        f'<p style="margin:0 0 18px;font-family:{SANS};font-weight:700;font-size:22px;color:{NAVY}">{n} {"pauta espera" if n == 1 else "pautas esperam"} a sua aprovação</p>',
    ]
    if p.get("aviso"):
        partes.append(f'<p style="margin:0 0 18px;padding:12px 14px;border:1px solid {NAVY};font-family:{SANS};font-size:14px">{e(p["aviso"])}</p>')
    for i in p["itens"]:
        rot, cor = RECOMENDACOES[i["recomendacao"]]
        partes.append(
            f'<p style="margin:26px 0 6px;padding-top:16px;border-top:1px solid {LINHA};font-family:{MONO};font-size:12px;color:{CINZA}">'
            f'{e(i["editoria"])} · PR {i["pr"]}{" · " + e(i["desde"]) if i.get("desde") else ""}</p>')
        partes.append(f'<p style="margin:0 0 8px;font-family:{SANS};font-weight:700;font-size:17px;line-height:1.3;color:{NAVY}">{e(i["titulo"])}</p>')
        partes.append(f'<p style="margin:0 0 12px">{e(i["resumo"])}</p>')
        partes.append(f'<p style="margin:0 0 6px;font-family:{MONO};font-size:11px;color:{CINZA}">CONFERIDO NAS FONTES</p>{lista(i["conferido"])}')
        if i["duvidas"]:
            partes.append(f'<p style="margin:10px 0 6px;font-family:{MONO};font-size:11px;color:{CINZA}">PONTOS DE ATENÇÃO</p>{lista(i["duvidas"])}')
        if i.get("prazo"):
            partes.append(f'<p style="margin:10px 0 0;font-family:{SANS};font-size:14px;font-weight:700;color:{NAVY}">{e(i["prazo"])}</p>')
        partes.append(f'<p style="margin:12px 0 0;font-family:{SANS};font-size:14px"><strong style="color:{cor}">{rot}.</strong></p>')
        links = "".join(f'<a href="{e(u)}" style="color:#1F4E79">Ler a prévia{"" if len(i["previas"]) == 1 else " " + str(k)} →</a> &nbsp; ' for k, u in enumerate(i["previas"], 1))
        partes.append(f'<p style="margin:8px 0 0;font-family:{SANS};font-size:14px">{links}'
                      f'<a href="{REPO}{i["pr"]}" style="color:#1F4E79;font-weight:700">Abrir para aprovar →</a></p>')
    partes.append(
        f'<p style="margin:30px 0 0;padding-top:14px;border-top:1px solid {LINHA};font-family:{MONO};font-size:11px;color:{CINZA};line-height:1.6">'
        'Para aprovar: abra o link da pauta e toque em "Merge pull request". Para corrigir ou recusar, fale com o Claude no chat. '
        'A prévia pede o login do Vercel na primeira vez. Este e-mail é interno e só você recebe.</p></div>')
    return "\n\n".join(partes)


def main():
    if len(sys.argv) < 2:
        erro("uso: enviar.py pautas.json [--previa]")
    arq = Path(sys.argv[1])
    p = json.loads(arq.read_text(encoding="utf-8"))
    valida(p)
    corpo = monta(p)
    previa = arq.with_name("pautas-previa.html")
    previa.write_text(f'<!doctype html><meta charset="utf-8"><body style="background:#F7F5F0;padding:24px">{corpo}</body>', encoding="utf-8")
    print(f"prévia: {previa}")
    if "--previa" in sys.argv:
        return
    n = len(p["itens"])
    assunto = f'Pautas para aprovar: {n} {"pauta" if n == 1 else "pautas"} em {p.get("data", datetime.now().strftime("%d/%m"))}'
    para = email_editor.envia(assunto, corpo)
    print(f"E-MAIL ENVIADO para {', '.join(para)} · {assunto}")


if __name__ == "__main__":
    main()
