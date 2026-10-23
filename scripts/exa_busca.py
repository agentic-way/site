#!/usr/bin/env python3
"""Busca por significado no Exa, para ACHAR fontes. Quem LÊ e confere é o Firecrawl (firecrawl scrape).

    python scripts/exa_busca.py "descrição da página ideal" [--dias 30] [--n 10] [--json saida.json]

- A consulta descreve a página que você quer encontrar, em linguagem natural
  ("notícia sobre empresa brasileira nomeada que colocou agente de IA em produção, com número"),
  não uma lista de palavras-chave.
- --dias limita à data de publicação (padrão: 30).
- Imprime título, data, URL e um trecho de cada resultado. Os trechos vêm cortados:
  nunca cite um número tirado daqui sem abrir a página com o Firecrawl.

Lê EXA_API_KEY do ambiente ou de ~/api_keys.env. Usa só a biblioteca padrão.
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def chave():
    k = os.environ.get("EXA_API_KEY")
    arq = Path.home() / "api_keys.env"
    if not k and arq.exists():
        for linha in arq.read_text(encoding="utf-8").splitlines():
            if linha.startswith("EXA_API_KEY="):
                k = linha.split("=", 1)[1].strip().strip('"')
    if not k:
        sys.exit("EXA_API_KEY não encontrada (ambiente ou ~/api_keys.env). Siga só com o Firecrawl e registre isso.")
    return k


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("consulta")
    ap.add_argument("--dias", type=int, default=30)
    ap.add_argument("--n", type=int, default=10)
    ap.add_argument("--json", dest="saida")
    a = ap.parse_args()
    inicio = (datetime.now(timezone.utc) - timedelta(days=a.dias)).strftime("%Y-%m-%dT00:00:00.000Z")
    corpo = {"query": a.consulta, "numResults": a.n, "type": "auto", "startPublishedDate": inicio,
             "contents": {"highlights": {"numSentences": 3, "highlightsPerUrl": 2}}}
    req = urllib.request.Request("https://api.exa.ai/search", method="POST", data=json.dumps(corpo).encode(),
                                 headers={"x-api-key": chave(), "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            d = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"Exa respondeu HTTP {e.code}: {e.read()[:200]!r}. Siga só com o Firecrawl e registre isso.")
    res = d.get("results", [])
    if a.saida:
        Path(a.saida).write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    for i, x in enumerate(res, 1):
        print(f"{i}. {x.get('title', '').strip()}")
        print(f"   {str(x.get('publishedDate', ''))[:10]} · {x.get('url')}")
        for h in x.get("highlights", [])[:2]:
            print(f"   > {' '.join(h.split())[:300]}")
        print()
    print(f"{len(res)} resultados desde {inicio[:10]}")


if __name__ == "__main__":
    main()
