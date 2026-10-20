// Gerado por scripts/build_dados.py. Não edite à mão: edite conteudo/publicado/.
window.AW_DADOS = window.AW_DADOS || {};
window.AW_DADOS.assinatura = "Apurado e escrito por agentes AgenticWay · editor responsável: Domiciano Rossi";
window.AW_DADOS.ferramentas = [
 {
  "id": "copilot-studio-ou-gemini-enterprise-plataformas-agentes",
  "publicado_em": "2026-10-20T08:00:00-03:00",
  "consultadoEm": "out/2026",
  "tipo": "COMPARATIVO",
  "categoria": "PLATAFORMAS DE AGENTES",
  "titulo": "Copilot Studio ou Gemini Enterprise: o que cada plataforma documenta para pôr agentes na operação",
  "linhaFina": "As duas grandes suítes de produtividade vendem plataformas para montar agentes. Lemos documentação, preços e termos de dados de cada uma, critério por critério.",
  "linha": "Copilot Studio tem preço público por crédito, mas processa nos EUA dados de ambientes no Brasil; no Gemini Enterprise não achamos preço.",
  "leitura": 6,
  "abertura": "Para a empresa média que já vive no Microsoft 365 ou no Google Workspace, a pergunta sobre agentes costuma começar pela suíte que ela já paga: Copilot Studio, da Microsoft, ou Gemini Enterprise, do Google. As duas prometem agentes que respeitam as permissões de cada usuário e se ligam aos sistemas da empresa. A escolha raramente se resolve na demonstração; depende de quatro respostas de operação: com qual login o agente entra, o que fica registrado, onde os dados são processados e quanto custa quando o volume cresce.",
  "metodo": "Lemos, em outubro de 2026, a documentação oficial de cada fornecedor sobre autenticação, auditoria, conectores, aprovação humana, residência de dados e cobrança, além das páginas de preços e das páginas de produto. Escolhemos as duas porque são as plataformas de agentes ligadas às suítes de escritório mais comuns em empresas médias e porque ambas documentam agentes sobre os aplicativos que a empresa já usa. Outras plataformas, como a Agentforce, da Salesforce, ficaram de fora desta rodada porque não deu tempo de ler sua documentação com o mesmo cuidado nesta rodada. Nenhuma ferramenta foi instalada ou usada; cada marca reflete o que a página citada descreve, não comportamento observado. Ausência de documentação não significa ausência do recurso.",
  "ferramentas": [
   {
    "nome": "Microsoft Copilot Studio",
    "fornecedor": "Microsoft",
    "tipo": "SaaS (nuvem do fornecedor)",
    "preco": "Pacote de 25.000 Copilot Credits por US$ 200/mês, no nível do tenant; também há cobrança por uso (pay-as-you-go) e plano pré-pago com desconto de até 20%. Preço de página dos EUA",
    "resumo": "Preço público por crédito; Entra ID; dados de ambientes no Brasil vão para os EUA",
    "texto": "O Copilot Studio é cobrado por Copilot Credits, e a capacidade é compartilhada por todo o tenant. A tabela de cobrança dá 1 crédito por resposta clássica, 2 por resposta generativa e 5 por ação do agente. Os agentes autenticam usuários com Microsoft Entra ID ou outro provedor OAuth2, e as atividades de criação e de uso vão para o registro de auditoria do Microsoft Purview. A documentação diz que, quando o ambiente está no Brasil, o serviço de IA generativa fica nos Estados Unidos, e que os dados podem sair da região se o administrador permitir."
   },
   {
    "nome": "Gemini Enterprise",
    "fornecedor": "Google Cloud",
    "tipo": "SaaS (nuvem do fornecedor)",
    "preco": "Não encontrado em página oficial; contratação por vendas do Google Cloud, com assinatura e cobrança de excedente por uso",
    "resumo": "Permissões do usuário e login por SAML ou OIDC; sem preço público nas páginas lidas",
    "texto": "O Gemini Enterprise é vendido em edições (Business, Standard, Plus, Pay-as-you-go e Frontline), e o ecossistema completo de conectores não vem em todas. A documentação diz que o acesso segue as permissões existentes de cada usuário e aceita login por Google Identity ou, para fontes de terceiros, por provedores OIDC ou SAML 2.0, como Microsoft Entra ID e Okta, via Workforce Identity Federation. O Workflow Builder inclui passos de aprovação humana. A página de produto afirma que dados, prompts e saídas não treinam modelos do Google nem de outros clientes."
   }
  ],
  "criterios": [
   {
    "criterio": "Autenticação",
    "pergunta": "Usa o usuário e a permissão do sistema da empresa (SSO, perfis)?",
    "celulas": [
     {
      "marca": "documentado",
      "nota": "Login com Entra ID ou qualquer provedor OAuth2; agentes clássicos nascem sem exigir login",
      "fonte": 1
     },
     {
      "marca": "documentado",
      "nota": "Google Identity ou provedor OIDC/SAML 2.0 (Entra ID, Okta) via Workforce Identity Federation",
      "fonte": 9
     }
    ]
   },
   {
    "criterio": "Log por ação",
    "pergunta": "Registra o que o agente consultou e o que fez, e por quanto tempo?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "Purview registra interações e mudanças no agente; alguns canais ficam fora; retenção definida pela empresa",
      "fonte": 2
     },
     {
      "marca": "ressalva",
      "nota": "Cloud Audit Logs registra chamadas de API, como StreamAssist; página não descreve registro de cada passo do agente",
      "fonte": 10
     }
    ]
   },
   {
    "criterio": "Conector",
    "pergunta": "Liga ao ERP, CRM ou WhatsApp sem código, com conector mantido pelo fornecedor?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "Conectores Power Platform padrão e premium (SharePoint, Salesforce); premium só em planos selecionados",
      "fonte": 3
     },
     {
      "marca": "ressalva",
      "nota": "Conectores completos só a partir do Standard; Business tem seleção. Não achamos ERP brasileiro na página",
      "fonte": 11
     }
    ]
   },
   {
    "criterio": "Humano no fluxo",
    "pergunta": "Escala exceção para uma pessoa, com motivo, antes de agir?",
    "celulas": [
     {
      "marca": "documentado",
      "nota": "Fluxo pausa e pede informação ou decisão a revisores; pedidos saem só por Outlook",
      "fonte": 4
     },
     {
      "marca": "documentado",
      "nota": "Workflow Builder tem passos de revisão, aprovação e pedido de informação a uma pessoa",
      "fonte": 12
     }
    ]
   },
   {
    "criterio": "Dados",
    "pergunta": "Onde ficam, o que vai para o modelo, se é usado para treino, há DPA ou cláusula LGPD?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "Ambiente no Brasil usa Azure OpenAI nos EUA; Microsoft diz não treinar modelos com os dados. DPA não lido",
      "fonte": 5
     },
     {
      "marca": "ressalva",
      "nota": "Não treina modelos com os dados. Residência em repouso: multi-regiões us/eu e cinco países; Brasil fora",
      "fonte": 14
     }
    ]
   },
   {
    "criterio": "Custo por tarefa",
    "pergunta": "Preço público e previsível com o volume?",
    "celulas": [
     {
      "marca": "documentado",
      "nota": "US$ 200/mês por 25.000 créditos; tabela: 1 crédito resposta clássica, 5 por ação do agente",
      "fonte": 6
     },
     {
      "marca": "ressalva",
      "nota": "Cobrança tem assinatura e excedente por uso, em SKUs; valores não aparecem nas páginas lidas",
      "fonte": 15
     }
    ]
   }
  ],
  "conclusao1": "Para quem precisa projetar o custo antes de contratar, o Copilot Studio é a única das duas com tabela pública: dá para multiplicar ações por créditos e chegar a uma estimativa, lembrando que o preço lido é o da página dos EUA e que o custo real depende de como o agente é desenhado. No Gemini Enterprise, o orçamento passa por uma conversa com vendas, e a documentação confirma que há cobrança de excedente além da assinatura.",
  "conclusao2": "Para quem tem dados sujeitos à LGPD, a pergunta de residência pesa nas duas. A Microsoft documenta que ambientes no Brasil processam IA generativa nos Estados Unidos; o Google lista residência em repouso para multi-regiões dos EUA e da Europa e para cinco países, sem o Brasil. Em ambos os casos vale pedir o contrato de tratamento de dados e a resposta por escrito antes de ligar o agente a dados de clientes. A escolha tende a seguir a suíte de login e documentos que a empresa já usa.",
  "ficha": [
   {
    "rotulo": "Ferramentas",
    "valor": "Microsoft Copilot Studio e Gemini Enterprise"
   },
   {
    "rotulo": "Categoria",
    "valor": "Plataformas de agentes"
   },
   {
    "rotulo": "Documentação consultada",
    "valor": "Microsoft Learn, página de preços do Copilot Studio, documentação e páginas de produto do Google Cloud"
   },
   {
    "rotulo": "Fontes",
    "valor": "15 páginas oficiais, lidas em out/2026"
   },
   {
    "rotulo": "Método",
    "valor": "Leitura de documentação; nenhuma ferramenta foi instalada ou usada"
   }
  ],
  "fontes": [
   {
    "titulo": "Configure user authentication in Copilot Studio",
    "origem": "Microsoft Learn",
    "url": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication"
   },
   {
    "titulo": "Audit Copilot Studio activities in Microsoft Purview",
    "origem": "Microsoft Learn",
    "url": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-logging-copilot-studio"
   },
   {
    "titulo": "Use Power Platform connectors as tools in Copilot Studio agents",
    "origem": "Microsoft Learn",
    "url": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors"
   },
   {
    "titulo": "Request information from human review in agent flows",
    "origem": "Microsoft Learn",
    "url": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-request-for-information"
   },
   {
    "titulo": "Move data across regions for Copilots, AI agents, and generative AI features",
    "origem": "Microsoft Learn",
    "url": "https://learn.microsoft.com/en-us/power-platform/admin/geographical-availability-copilot"
   },
   {
    "titulo": "Billing rates and management - Microsoft Copilot Studio",
    "origem": "Microsoft Learn",
    "url": "https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management"
   },
   {
    "titulo": "Microsoft Copilot Studio Plans and Pricing",
    "origem": "Microsoft",
    "url": "https://www.microsoft.com/en-us/copilot/pricing/copilot-studio"
   },
   {
    "titulo": "Compare editions of Gemini Enterprise",
    "origem": "Google Cloud",
    "url": "https://docs.cloud.google.com/gemini/enterprise/docs/editions"
   },
   {
    "titulo": "Configure an identity provider for Gemini Enterprise",
    "origem": "Google Cloud",
    "url": "https://docs.cloud.google.com/gemini/enterprise/docs/configure-identity-provider"
   },
   {
    "titulo": "Access Gemini Enterprise Cloud Audit Logs",
    "origem": "Google Cloud",
    "url": "https://docs.cloud.google.com/gemini/enterprise/docs/audit-logging"
   },
   {
    "titulo": "Gemini Enterprise connectors",
    "origem": "Google Cloud",
    "url": "https://cloud.google.com/gemini-enterprise/connectors"
   },
   {
    "titulo": "Workflows in Gemini Enterprise Workflow Builder",
    "origem": "Google Cloud",
    "url": "https://docs.cloud.google.com/gemini/enterprise/docs/workflow-builder/workflows"
   },
   {
    "titulo": "Gemini for Business: The Universal Work Agent (perguntas frequentes)",
    "origem": "Google Cloud",
    "url": "https://cloud.google.com/gemini-enterprise"
   },
   {
    "titulo": "Data residency for Gemini Enterprise Standard and Plus Editions",
    "origem": "Google Cloud",
    "url": "https://docs.cloud.google.com/gemini/enterprise/docs/locations"
   },
   {
    "titulo": "Gemini Enterprise costs in Cloud Billing reports",
    "origem": "Google Cloud",
    "url": "https://docs.cloud.google.com/billing/docs/how-to/reports/gemini-enterprise-costs"
   }
  ]
 },
 {
  "id": "zapier-ou-n8n-agentes-integracao",
  "publicado_em": "2026-10-06T08:00:00-03:00",
  "consultadoEm": "out/2026",
  "tipo": "COMPARATIVO",
  "categoria": "AUTOMAÇÃO",
  "titulo": "Zapier ou n8n para pôr agentes nos processos: o que cada um documenta sobre integração",
  "linhaFina": "Os dois prometem ligar agentes de IA aos sistemas da empresa. Lemos preços, documentação e termos de dados de cada um, critério por critério.",
  "linha": "Zapier cobra por tarefa e hospeda nos EUA; n8n cobra por execução e pode rodar no servidor da empresa.",
  "leitura": 6,
  "abertura": "Quem quer pôr um agente de IA para mexer em CRM, planilha ou e-mail costuma chegar a duas plataformas de automação: Zapier e n8n. As duas já têm agentes, aprovação humana e milhares de integrações. A escolha raramente se decide pelo que o agente faz na demonstração, e sim por quatro perguntas de operação: quem entra com qual login, o que fica registrado, onde ficam os dados e quanto custa quando o volume cresce.",
  "metodo": "Lemos as páginas de preços, a central de ajuda e a documentação oficial de cada fornecedor, além das páginas de privacidade e de processamento de dados, em outubro de 2026. Escolhemos Zapier e n8n porque têm preço público, aceitam contratação direta do Brasil e as duas documentam agentes de IA ligados a aplicativos que a empresa já usa. Nenhuma ferramenta foi instalada ou usada; cada marca reflete o que a página citada descreve, não comportamento observado. Ausência de documentação não significa ausência do recurso.",
  "ferramentas": [
   {
    "nome": "Zapier",
    "fornecedor": "Zapier Inc.",
    "tipo": "SaaS (nuvem do fornecedor)",
    "preco": "Free US$ 0/mês (100 tarefas); Professional a partir de US$ 19,99/mês e Team a partir de US$ 69/mês, ambos com cobrança anual (mensal custa mais); Enterprise sob consulta",
    "resumo": "Catálogo amplo e aprovação humana nos planos pagos; dados só nos EUA",
    "texto": "O Zapier cobra por tarefa, e a página de preços diz que passos de IA, código e SDK seguem o mesmo modelo por tarefa. O catálogo passa de 9.000 aplicativos. A aprovação humana é um passo próprio (Human in the Loop), disponível a partir do plano Professional. SSO SAML aparece a partir do plano Team. Os dados ficam em servidores da AWS nos Estados Unidos, e o fornecedor diz não oferecer hospedagem só na União Europeia."
   },
   {
    "nome": "n8n",
    "fornecedor": "n8n GmbH",
    "tipo": "SaaS ou instalado no servidor da empresa",
    "preco": "Starter 20/mês (2,5 mil execuções); Pro 50/mês (10 mil); Business 667/mês (40 mil, só self-hosted), todos com cobrança anual, em dólar ou euro conforme a região; Enterprise sob consulta",
    "resumo": "Cobra por execução e roda no servidor da empresa; governança só nos planos altos",
    "texto": "O n8n cobra por execução completa de fluxo, independentemente do número de passos, e todos os planos incluem usuários e integrações ilimitados. Pode rodar na nuvem do fornecedor ou no servidor da empresa. A aprovação humana antes de o agente usar uma ferramenta está documentada, com canais como Slack, Teams, e-mail e WhatsApp. SSO, SAML e LDAP começam no plano Business, e o envio de logs para sistemas externos só no Enterprise."
   }
  ],
  "criterios": [
   {
    "criterio": "Autenticação",
    "pergunta": "Usa o usuário e a permissão do sistema da empresa (SSO, perfis)?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "SAML SSO só a partir do plano Team (US$ 69/mês na cobrança anual)",
      "fonte": 1
     },
     {
      "marca": "ressalva",
      "nota": "SSO, SAML e LDAP só a partir do Business (667/mês, só self-hosted); Pro tem papéis de administrador",
      "fonte": 4
     }
    ]
   },
   {
    "criterio": "Log por ação",
    "pergunta": "Registra o que o agente consultou e o que fez, e por quanto tempo?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "Histórico de execuções guardado de 29 a 69 dias; Company e Enterprise podem fixar de 7 a 30 dias",
      "fonte": 3
     },
     {
      "marca": "ressalva",
      "nota": "Envio de eventos de fluxo e de cada nó a ferramenta externa de log só no plano Enterprise",
      "fonte": 6
     }
    ]
   },
   {
    "criterio": "Conector",
    "pergunta": "Liga ao ERP, CRM ou WhatsApp sem código, com conector mantido pelo fornecedor?",
    "celulas": [
     {
      "marca": "documentado",
      "nota": "Mais de 9.000 apps no catálogo; apps premium ilimitados a partir do Professional",
      "fonte": 1
     },
     {
      "marca": "ressalva",
      "nota": "Catálogo lista 2.285 integrações, parte feita por parceiros; não achamos conector de ERP brasileiro",
      "fonte": 7
     }
    ]
   },
   {
    "criterio": "Humano no fluxo",
    "pergunta": "Escala exceção para uma pessoa, com motivo, antes de agir?",
    "celulas": [
     {
      "marca": "documentado",
      "nota": "Request Approval pausa o fluxo com mensagem; revisor aprova, recusa ou edita, com prazo. Planos pagos",
      "fonte": 2
     },
     {
      "marca": "documentado",
      "nota": "Aprovação humana antes de o agente usar a ferramenta escolhida, via Slack, Teams, e-mail ou WhatsApp",
      "fonte": 5
     }
    ]
   },
   {
    "criterio": "Dados",
    "pergunta": "Onde ficam, o que vai para o modelo, se é usado para treino, há DPA ou cláusula LGPD?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "DPA padrão com SCCs; dados na AWS nos EUA, sem opção de região; treino de modelo não tratado ali",
      "fonte": 3
     },
     {
      "marca": "ressalva",
      "nota": "DPA com SCCs no Cloud; self-hosted fica com a empresa. Dados do assistente não treinam modelo",
      "fonte": 8
     }
    ]
   },
   {
    "criterio": "Custo por tarefa",
    "pergunta": "Preço público e previsível com o volume?",
    "celulas": [
     {
      "marca": "ressalva",
      "nota": "Preço por faixa de tarefas; passos de IA e código também consomem tarefas, com taxas em tabela à parte",
      "fonte": 1
     },
     {
      "marca": "documentado",
      "nota": "Cobra por execução completa, não por passo: 20/mês por 2,5 mil execuções no Starter, cobrança anual",
      "fonte": 4
     }
    ]
   }
  ],
  "conclusao1": "Para a empresa que não tem ninguém para manter servidor e quer o agente ligado a muitos aplicativos de prateleira, o Zapier documenta o caminho mais curto, com aprovação humana já no primeiro plano pago. A entrada é barata, mas a conta acompanha o número de tarefas, e passos de IA também entram nela; vale simular o volume real antes de assinar. Os dados ficam nos Estados Unidos, o que precisa passar pelo jurídico.",
  "conclusao2": "Para a empresa que precisa manter os dados no próprio ambiente ou prevê fluxos com muitos passos, o n8n documenta cobrança por execução e instalação no servidor da empresa. O preço de entrada é parecido, mas SSO e envio de logs só chegam nos planos Business e Enterprise; quem precisa de login corporativo e trilha de auditoria deve orçar a partir daí, não do Starter.",
  "ficha": [
   {
    "rotulo": "Ferramentas",
    "valor": "Zapier, n8n"
   },
   {
    "rotulo": "Categoria",
    "valor": "Automação"
   },
   {
    "rotulo": "Documentação consultada",
    "valor": "Páginas de preços, central de ajuda, documentação oficial, páginas de privacidade"
   },
   {
    "rotulo": "Fontes",
    "valor": "8 páginas oficiais dos fornecedores"
   },
   {
    "rotulo": "Método",
    "valor": "Relato documentado. Nenhuma ferramenta foi instalada ou usada."
   }
  ],
  "fontes": [
   {
    "titulo": "Pricing",
    "origem": "Zapier",
    "url": "https://zapier.com/pricing"
   },
   {
    "titulo": "Request approval to keep your workflow running with Human in the Loop",
    "origem": "Zapier Help Center",
    "url": "https://help.zapier.com/hc/en-us/articles/38731463206029-Request-approval-to-keep-your-workflow-running-with-Human-in-the-Loop"
   },
   {
    "titulo": "Data Privacy Overview",
    "origem": "Zapier",
    "url": "https://zapier.com/legal/data-privacy"
   },
   {
    "titulo": "Plans and Pricing",
    "origem": "n8n",
    "url": "https://n8n.io/pricing/"
   },
   {
    "titulo": "Human-in-the-loop for tools",
    "origem": "n8n Docs",
    "url": "https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/"
   },
   {
    "titulo": "Stream logs to external systems",
    "origem": "n8n Docs",
    "url": "https://docs.n8n.io/log-streaming/"
   },
   {
    "titulo": "Integrations",
    "origem": "n8n",
    "url": "https://n8n.io/integrations/"
   },
   {
    "titulo": "Privacy",
    "origem": "n8n Docs",
    "url": "https://docs.n8n.io/privacy-security/privacy/"
   }
  ]
 }
];
