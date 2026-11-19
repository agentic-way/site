# Decisões da AgenticWay

Registro das decisões tomadas e do porquê, para valer em situações semelhantes no futuro. Atualizado em 02/out/2026. Quando uma decisão mudar, edite a linha e registre a data; não apague o motivo antigo sem substituir por outro.

## 1. Proposta editorial

- **O site é feito por agentes, e diz isso.** Todo conteúdo gerado leva a assinatura "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi". Domiciano aprova cada publicação no merge do pull request. *Por quê:* transparência é o ativo da marca; esconder que é IA seria a mentira que o site critica.
- **Nunca fingir o que um agente não faz.** Nada de "visitamos", "entrevistamos", "testamos", "a pedido de leitores", "revisado por advogado", "segundo especialistas" sem nome. O validador barra parte disso (ex.: `comoApuramos` com "visitamos"). *Por quê:* a primeira versão das páginas prometia visita, entrevista e teste; um agente não faz nenhum dos três.
- **Fato tem fonte aberta e lida; opinião e orientação são editoriais e podem ser.** Número igual à fonte, sem arredondar nem calcular o que a fonte não afirmou (ex.: 51,7% resolvidos não vira "48,3% não resolvidos").
- **Atribuir o que é de alguém.** Número só do fornecedor sai no título e na ficha como do fornecedor ("não confirmada pelo cliente"). Quem publica pesquisa e vende a solução tem isso dito no texto.
- **Acusação contra empresa ou pessoa identificada** só com fonte oficial ou dois veículos independentes; na dúvida, fica para o editor decidir no PR.
- **Fala de executivo em evento não é caso; reportagem que só repete o comunicado não é segunda fonte independente.**
- **Conteúdo de demonstração no ar leva faixa "CONTEÚDO DE DEMONSTRAÇÃO"** até a editoria ter conteúdo real; a faixa sai quando entra o primeiro item real. *Por quê:* exemplos inventados tinham aparência de notícia real.
- **Ferramentas é relato documentado** (documentação oficial e relatos de usuários), nunca "testamos" sem teste real. "Não documentado" não quer dizer que a ferramenta não faz, e a página diz isso. Preço com período de cobrança e moeda como a fonte mostra; sem superlativo sem fonte (03/out/2026).

## 2. Editorias e rotinas

| Editoria | Formato | Rotina (São Paulo) | Skill |
|---|---|---|---|
| Radar | até 5 notas curtas por rodada, Brasil primeiro, mundo se mudar algo para empresa média brasileira | todo dia 7h (`0 10 * * *` UTC) | `/radar` |
| Na Operação | 1 caso por semana, empresa nomeada, fontes públicas, imagem do Gemini | segunda 8h (`0 11 * * 1`) | `/na-operacao` |
| Guia | guia novo a cada 2 semanas + revisão semanal com versão e histórico | quarta 8h (`0 11 * * 3`); `situacao.py` decide o modo | `/guia` |
| Análise | 1 opinião por semana, tese a partir do que saiu na semana | quinta 8h (`0 11 * * 4`; era 17h até 17/nov/2026), publica na sexta 7h | `/analise` |
| Ferramentas | 1 comparativo ou avaliação a cada 2 semanas, seis critérios fixos, marcas documentado / com ressalva / não documentado, cada uma com fonte; nunca teste próprio | terça 8h (`0 11 * * 2`); `situacao.py` decide se é semana | `/ferramentas` |
| Newsletter | resumo da semana (3–5 fatos do Radar, 1 caso, 1 opinião, até 4 "também no site"); só o que já foi publicado, números conferidos contra o item; rascunho no Buttondown, o editor envia | sexta 7h (`0 10 * * 5`) e segunda passada às 13h (`0 16 * * 5`) | `/newsletter` |
| Pautas para aprovar | e-mail só para o editor: cada PR aberto conferido nas fontes, com resumo, pontos de atenção, prévia e link para aprovar; sem PR, sem e-mail | todo dia 7h40 e 9h40 (`40 10,12 * * *`; era só 9h30 até 19/nov/2026) | `/pautas` |

- **Toda rotina abre PR; nunca faz merge nem push no `main`.** O merge é a aprovação do editor.
- **Rodada sem material bom não abre PR** ("rodada sem notas", "semana sem caso"…). Melhor nenhum do que fraco.
- **Toda skill nova é testada com uma rodada real por um agente separado** (que só conhece a skill), parando no commit; os pontos que ele achar ambíguos viram ajuste da skill antes da rotina.
- Rotinas na conta Max do aplicativo (domiciano.rossi@gmail.com), ambiente de nuvem **"Radar AgenticWay"** (rede liberada para abrir as fontes; variáveis `FIRECRAWL_API_KEY` e `GEMINI_API_KEY`). O ambiente "Default" fica restrito.
- **Ao criar rotina pela API, remover os conectores que o servidor anexa sozinho** (Gmail, Drive, Calendar etc.). Rotina que lê a web não deve ter acesso a e-mail e arquivos.
- Modelo das rotinas: Sonnet 5.5.

- **Newsletter no Buttondown (conta agenticway, entrada pelo Google).** A rotina só cria rascunho; a chave da API tem Emails = leitura e escrita e **Sending desligado**, então nada sai sem o clique do editor. O formulário "Assinar" usa o endereço público de inscrição (com confirmação por e-mail) e nunca leva chave ao site.  (03/out/2026)
- **Chaves nunca em print.** Em 03/out/2026 duas chaves vazaram em prints e foram trocadas.

- **A AgenticWay não vende nada hoje (20/out/2026).** O editor ainda não se sente pronto para oferecer serviço. Saíram do site o "Diagnóstico de Oportunidades com IA", o bloco de serviço das análises e da newsletter e as frases "vendemos integração". "Para empresas" virou página "em breve" com contato. *Por quê:* o site dizia vender algo que não existe; a mesma regra de "nunca fingir" vale para a marca. Quando houver serviço, ele será declarado na Sobre, em Para empresas e em todo texto sobre um cliente.
- **A biografia do editor vem do perfil dele** (`~/workspace/perfil/USER.md`), aprovada por ele; nada de carreira inventada. (20/out/2026)

- **Newsletter, modelo B (23/out/2026):** toda sexta a rotina cria o rascunho e manda uma cópia de revisão só para o editor (domiciano@agenticway.com.br e domiciano.rossi@gmail.com); ele publica no Buttondown. Rascunho de semana anterior não publicado é apagado em vez de travar a edição nova. Para a cópia funcionar, o editor liberou **Sending** na chave da rotina (o Buttondown exige isso até para o "Send draft"). *Consequência:* a chave poderia publicar para todos; a garantia agora é de regra, não técnica: o script só chama `send-draft`, a rotina proíbe publicar e não lê a web. Se isso mudar, rever. *Descoberto no teste:* a cópia só é entregue a assinantes confirmados, por isso os dois e-mails do editor estão inscritos na newsletter. *Alternativa registrada:* um serviço de e-mail que só fala com o dono da conta (ex.: Resend), se quisermos a garantia técnica de volta.

- **Pesquisa com Exa e Firecrawl juntos (23/out/2026).** No teste com o mesmo objetivo e a mesma janela da rotina de Na Operação de 19/out, o Exa achou 5 candidatos com empresa nomeada e número (BV, Riachuelo, BB, São Salvador Alimentos, Sicoob) em 3 buscas; o Firecrawl tinha achado 2 em 6, entre posts de rede social e opinião. O Exa entra para **achar** (Na Operação, Análise e Guia começam por ele; no Radar é busca extra); o Firecrawl continua para **ler**, porque os trechos do Exa vêm cortados. Chave `EXA_API_KEY` no ambiente da nuvem.

- **Processo de sexta, revisto em 17/nov/2026.** Três mudanças, depois que em 13/nov a análise foi aprovada às 16h e a newsletter das 7h saiu sem ela: (1) a Análise roda quinta às 8h, e o editor tem o dia para aprovar; (2) a rotina **Pautas** confere todo dia os PRs abertos e manda o e-mail "Pautas para aprovar" às 9h30, para o editor não precisar perguntar; (3) a newsletter avisa quando sai sem a análise e tem uma segunda passada às 13h que refaz o rascunho se algo foi aprovado depois (`rascunho.py --situacao` e `--substituir`).
- **E-mails internos saem pelo Buttondown** (`scripts/email_editor.py`): rascunho, `send-draft` só para os endereços do editor, rascunho apagado. Chegam com "[PREVIEW]" no assunto. *Por quê:* não exige conta nova; a alternativa registrada continua sendo um serviço que só escreve para o dono.
- **Aprovar continua sendo o merge.** O e-mail leva ao PR no GitHub. Aprovar respondendo ao e-mail exigiria dar a uma rotina acesso à caixa de entrada do editor, o que foi evitado de propósito.
- **Claude só faz merge quando o editor pede com todas as letras** ("pode fazer o merge"); o sistema de permissões bloqueia o contrário.

- **Pautas em duas rodadas, 7h40 e 9h40 (19/nov/2026).** O editor recebe a notificação do PR e aprova logo; em 18/nov o guia novo entrou no ar antes de ele ver a conferência, que pedia correção (virou a v1.1 no dia seguinte). A primeira rodada pega o Radar das 7h; a segunda, as rotinas das 8h. PR conferido no mesmo dia não se repete no segundo e-mail.

## 3. Arquitetura do site

- Conteúdo como dados: `conteudo/publicado/<editoria>/<id>.json` → `python scripts/build_dados.py` (valida e gera `site/dados/<editoria>.js`) → páginas leem os dados. Publicar nunca é editar HTML.
- **Os dados gerados (`site/dados/*.js`) não vão nos PRs; o Vercel gera na publicação** (`site/vercel.json`). *Por quê:* cada PR trazia sua versão do arquivo da editoria inteira, e dois PRs abertos ao mesmo tempo sempre conflitavam, mesmo aprovando do mais antigo para o mais novo. (20/out/2026)
- **Todo PR de rotina traz o link da prévia de cada item.** *Por quê:* no GitHub o editor só via o JSON e só conseguia ler a matéria depois de publicada. (20/out/2026)
- Uma página por editoria mostra qualquer item via `?id=`. Endereço antigo que já circulou vira redirecionamento (ex.: a análise da conta do agente).
- Vercel publica o `main` com Root Directory = `site`. Arquivos internos (`CLAUDE.md`, `conteudo/`, `marca/`) não são servidos.
- Branch por mudança, PR, merge pelo editor. Commit com `Co-Authored-By`.

## 4. Padrões de página e design

- Imagens: ver `conteudo/padroes/imagens.md` (capa tipográfica na Home e listagens; Gemini só em Na Operação, cena genérica, legenda 8px; nunca foto de terceiros).
- **Grades de cards não usam o fundo do contêiner para desenhar linhas**: cada card tem o próprio contorno (classe `aw-grade`), sem moldura externa, para não sobrar quadro vazio quando a última linha não fecha.
- **Listas que crescem com o tempo (como o Guia) usam um item por linha**, não grade de cards: funciona igual com 1 ou 30 itens.
- **Filtros só aparecem com mais de uma opção; blocos "Outros…" só aparecem se houver itens.** Contadores com singular e plural ("1 guia").
- Rótulos de assunto/tema no topo de um item são links para a listagem filtrada (`?assunto=`).
- Tom e marca: ver `CLAUDE.md` (DNA v2, cores, tipografia, um coral por tela).

## 5. Como trabalhar com o editor

- Quando o editor disser que algo está diferente "lá fora", pedir print com a barra de endereço antes de corrigir; conferir a mesma página e a mesma largura de tela. *Por quê:* em 02/out uma correção virou vai e vem porque cada lado olhava uma página diferente.
- Conferir no ar depois de cada merge e verificar fatos novos contra as fontes antes de recomendar o merge.
- Chaves e senhas nunca no chat; o editor cadastra (Firecrawl, Gemini, variáveis de ambiente).
