# O "A" com a barra de chamada

Ideia do Domiciano (13/nov/2026): a perna esquerda do "A" de Agentic vira a barra "/" usada para chamar uma skill.
A barra fica solta do resto da letra, é mais fina e passa um pouco acima e abaixo das outras letras, como a "/" do teclado.

## Em uso
- **C · barra em azul-marinho** (`a-barra-c-marinho.svg`). No site desde 13/nov/2026.

## Guardadas para o futuro (aprovadas, não usadas)
- **D · barra em azul claro** `#4A8FC7` (`a-barra-d-azul-claro.svg`).
- **E · barra em coral** `#E8785A` (`a-barra-e-coral.svg`). Atenção: com ela a marca passa a ter dois pontos de coral (a barra e o "Way").

## Medidas (iguais nas três)
- Barra com 65% da espessura da letra, 0,06 em de folga até o resto do A, 0,07 em passando acima e abaixo.
- O resto da palavra continua em Montserrat 600: "gentic" em azul-marinho e "Way" em coral.
- No site, o A é um SVG embutido que usa a cor e o tamanho do texto (`fill="currentColor"`, altura 0,84 em).
- As variações A e B (barra com 50%), descartadas, e as três acima estão lado a lado em `marca/pranchas/AgenticWay Logo Barra.html`.

## Arquivos do logo completo (símbolo + escrita, opção C)
- `logo-horizontal.png` (924×230, fundo transparente): cabeçalho, assinatura de e-mail, newsletter.
- `logo-empilhado.png` (706×438, fundo transparente): perfil de rede social, capa.
- `logo-horizontal-fundo-escuro.png`: para fundo azul-marinho.
- `logo.html`: a fonte dos três. Para gerar de novo, sirva a raiz do repositório (`python -m http.server 8766`) e tire a foto com o Chrome:
  `chrome --headless=new --default-background-color=00000000 --window-size=924,230 --screenshot=logo-horizontal.png "http://localhost:8766/marca/logo-barra/logo.html?f=h"` (use `?f=v` com 706,438 e `?f=h&escuro=1`).
- Cópia usada pela newsletter: `site/img/logo-agenticway.png`.

Os arquivos antigos em `marca/` (`Logo.png`, `Favicon.png` e outros) são as imagens originais geradas no início do projeto e ficam como histórico. O ícone (`Favicon.png`) é só o símbolo, sem a escrita, então não muda.
