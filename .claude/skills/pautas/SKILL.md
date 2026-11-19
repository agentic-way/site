---
name: pautas
description: Confere os pull requests abertos pelas rotinas da AgenticWay (Radar, Na Operação, Guia, Análise, Ferramentas) contra as fontes e manda ao editor o e-mail "Pautas para aprovar", com resumo, o que foi conferido, pontos de atenção, link da prévia e link para aprovar. Nunca faz merge. Use quando a rotina diária de pautas disparar, ou quando pedirem "o que tem para aprovar", "confere os PRs abertos", "manda o e-mail de pautas".
---

# Pautas para aprovar

O editor aprova cada publicação fazendo o merge do pull request. Ele não lê JSON no GitHub e não quer ficar perguntando o que há para aprovar. Esta skill faz a segunda leitura de cada pauta, como um revisor que não escreveu o texto, e leva o resultado até a caixa de entrada dele.

**Você confere e avisa. Quem aprova é o editor.** Nunca faça merge, nunca feche PR, nunca altere o conteúdo de um PR. Se achar erro, diga qual é e onde; a correção é combinada com o editor.

## Passo 1 — O que está aberto

Liste os pull requests abertos do repositório `agentic-way/site` (ferramenta de GitHub da sessão, ou `gh pr list --state open`). Interessam os que vieram das rotinas: branches `radar/`, `na-operacao/`, `guia/`, `analise/`, `ferramentas/`. Outros PRs abertos entram no e-mail como editoria `OUTRO`, com um resumo do que mudam e sem conferência de fontes.

**Sem PR aberto, não há e-mail.** Responda "sem pautas abertas" e encerre.

**A rotina roda duas vezes por dia** (7h40, depois do Radar, e 9h40, depois das rotinas das 8h), porque o editor costuma aprovar logo que vê a notificação do PR. Para não mandar o mesmo e-mail duas vezes:
- PR que já tem um comentário `Conferência da pauta` **de hoje** não entra de novo no e-mail.
- Se todos os PRs abertos já foram conferidos hoje, não há e-mail: responda "nada novo desde a última rodada".
- PR com conferência de **dia anterior** e ainda aberto entra como lembrete, com `desde`.

## Passo 2 — Conferir cada pauta

Para cada PR:

1. **Já foi conferido?** Veja os comentários do PR. Se houver um comentário que comece com `Conferência da pauta` e o PR não recebeu commit depois dele: se o comentário é de hoje, pule o PR (já foi no e-mail da primeira rodada); se é de dia anterior, não confira de novo, reaproveite o que está no comentário e preencha `desde` com "aguardando desde DD/MM". Se o PR recebeu commit depois do comentário, confira de novo.
2. Leia o JSON que o PR acrescenta ou altera (em `conteudo/publicado/<editoria>/`) e a descrição do PR, inclusive os pontos que o agente autor deixou para o editor.
3. **Abra as fontes** listadas em `fontes` com `firecrawl scrape` (um por vez; sem Firecrawl, WebFetch). Confira contra a página: todo número, nome próprio, data e atribuição ("segundo a empresa", "diz o fornecedor"). Priorize o título, a linha fina e os números de destaque. Se uma fonte não abrir (bloqueio, paywall), diga isso em `duvidas`: não escreva que conferiu o que não leu.
4. Procure o que o agente autor pode ter deixado passar: número arredondado ou calculado, data trocada, frase que afirma como fato o que a fonte só atribui, promessa que um agente não cumpre ("testamos", "visitamos").
5. Decida a recomendação:
   - `aprovar`: o que conferiu bate com as fontes.
   - `corrigir`: há um erro pontual e claro (diga exatamente o que trocar).
   - `segurar`: fonte que não sustenta o texto, acusação sem base, ou caso fraco demais.
6. Comente no PR, começando por `Conferência da pauta (DD/MM)`, com o que conferiu, as dúvidas e a recomendação. É o registro que evita conferir duas vezes.

**Prévias:** use os links de prévia que estão na descrição do PR. Se não houver, monte: `https://site-git-<branch com / trocado por ->-agentic-way1.vercel.app/AgenticWay%20<Página>%20Artigo.dc.html?id=<id>` (páginas: `Radar`, `Na%20Operacao`, `Analise`, `Guia`, `Ferramentas`).

**Prazo:** se o PR é da Análise e ainda não é sexta depois das 7h, preencha `prazo` com "Aprove até sexta, 7h, para entrar na newsletter." Na sexta entre 7h e 13h: "Aprove até 13h para entrar na newsletter de hoje."

## Passo 3 — Escrever e enviar

Grave `pautas.json` na raiz do repositório (com a ferramenta de escrita de arquivos, não com heredoc; o arquivo não é commitado):

```json
{
  "data": "18/11/2026",
  "aviso": "opcional: uma frase para o topo do e-mail",
  "itens": [
    {
      "pr": 92,
      "editoria": "RADAR",
      "titulo": "2 notas: <título da primeira> e <título da segunda>",
      "resumo": "O que a pauta diz, em até 500 caracteres, em linguagem simples.",
      "conferido": ["Nota X: 54% e 1.030 respondentes conferem com o comunicado da empresa.", "Nota Y: data e nome do produto conferem."],
      "duvidas": ["Nota Y: o número é só do fornecedor; o título atribui."],
      "recomendacao": "aprovar",
      "previas": ["https://site-git-radar-2026-11-18-0712-agentic-way1.vercel.app/AgenticWay%20Radar%20Artigo.dc.html?id=..."],
      "prazo": "opcional",
      "desde": "opcional: aguardando desde 17/11"
    }
  ]
}
```

- `editoria`: RADAR, NA OPERAÇÃO, ANÁLISE, GUIA, FERRAMENTAS ou OUTRO.
- `recomendacao`: `aprovar`, `corrigir` ou `segurar`.
- Escreva para quem não é técnico: frases curtas, sem jargão, sem nome de arquivo. O editor lê no celular.
- Ordene: primeiro o que tem prazo, depois o que pode ser aprovado, por último o que é para segurar.

Envie:

```bash
python .claude/skills/pautas/scripts/enviar.py pautas.json --previa   # confere o formato, sem rede
python .claude/skills/pautas/scripts/enviar.py pautas.json            # envia só para o editor
```

O envio usa `scripts/email_editor.py` (Buttondown, só para os endereços do editor). Se falhar, relate o erro; não tente outro caminho de envio.

## Resposta final

Quantas pautas, a recomendação de cada uma em uma linha, e a confirmação de que o e-mail foi enviado (ou o motivo de não ter sido).
