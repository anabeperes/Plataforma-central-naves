/* Agentes de IA que o Fluxo tem hoje: o que fazem, onde ficam, para quem
   são e como usar. Fonte: anúncios no Slack (ver DECISOES.md). */

const AGENTES = [
  {
    nome: 'NavMaster (Nave Master)',
    descricao: 'Sugere respostas para as conversas de WhatsApp dos navegadores dentro do Fluxer, no tom de voz de cada um.',
    onde: 'Fluxer',
    paraQuem: ['navegadores'],
    status: 'no ar',
    url: '',
    responsavel: 'Gabriel José (no-code)',
    autores: ['Gabriel José', 'AnaBe', 'Fernanda Lizzardo'],
    data: '2026-09',
    detalhe: {
      oQueFaz: 'Lê a conversa do mentorado e escreve uma sugestão de resposta para o navegador revisar e enviar. Ele não responde sozinho e não substitui a avaliação do navegador em cada mensagem.',
      comoUsar: '1. Conecte seu WhatsApp ao Fluxer (Atendimento). 2. Em Atendimento, menu lateral, item "Tom de voz", revise a ficha gerada a partir das suas mensagens, preencha seus jargões e bordões e clique em Salvar ficha. 3. Na lista de conversas, passe o mouse na linha e clique em "Gerar sugestão" (no celular o botão fica sempre visível); dentro da conversa, o botão fica acima do campo de mensagem e vira "Gerar de novo". 4. Revise, ajuste e envie. Usou, marque como usada; não serviu, descarte e conte no #fluxo-ia o que estava ruim: é esse retorno que calibra a ferramenta.',
      ondeFica: 'Fluxer, área de Atendimento. Nasceu como MVP fora do Fluxer (Projeto Nave Master, n8n, da Ana e da Fernanda) e foi integrado pelo time de no-code.',
      atencao: 'Desde 21/09/2026 o modo automático (sugestão de hora em hora) está desligado: só gera quando você pede. A camada fixa proíbe travessão, promessa de resultado e "cara de IA" (emoji de IA, "não é X, é Y", "boa pergunta"); a ficha de tom ajusta o tom, nunca as regras. Sem ficha de tom de voz a sugestão sai ruim.',
      ondeVerSeEstaFuncionando: 'O botão "Gerar sugestão" devolve uma sugestão nas conversas do Fluxer. Bugs e melhorias: canal #fluxo-ia marcando o Gabriel José.'
    }
  },
  {
    nome: 'Gerador de contexto de pré-análise',
    descricao: 'A IA lê a conversa de WhatsApp do mentorado e escreve o rascunho da observação do navegador que vai para o analisador.',
    onde: 'Fluxer',
    paraQuem: ['navegadores'],
    status: 'no ar',
    url: '',
    responsavel: 'Gabriel José (no-code)',
    autores: ['Felipe Faé Schwade', 'Gabriel José'],
    data: '2026-08',
    detalhe: {
      oQueFaz: 'Monta a observação do navegador para a próxima análise: perfil, status, o que vinha acontecendo, facilidades e dificuldades, orientações passadas e links. É um rascunho para revisar, não um substituto do que você escreve. Nasceu da skill geradora de contexto do Felipe Faé e foi internalizado no Fluxer pelo Gabriel José.',
      comoUsar: '1. Abra o plano de ação do mentorado, Quadro de Análise e Agendamento, aba "Observação do Navegador". 2. Clique em "Gerar contexto" (ao lado de Editar/Adicionar). 3. Escolha período (padrão: desde a última análise), status, perfil e tamanho; se já tiver algo escrito, dá para aproveitar o rascunho ou gerar do zero. 4. O texto cai no campo em modo de edição: revise, complete o que só você sabe e clique em Salvar.',
      ondeFica: 'Fluxer, plano de ação do mentorado, aba Observação do Navegador.',
      atencao: 'Gerar não salva: se sair da tela sem clicar em Salvar, o texto se perde e o analisador não recebe nada. Quando o mentorado tem grupo de acompanhamento, o grupo e a conversa individual entram juntos; confira o que é realmente do mentorado (sócio e familiares também falam no grupo).',
      ondeVerSeEstaFuncionando: 'O botão "Gerar contexto" aparece na aba e devolve texto. Problemas: #fluxo-ia.'
    }
  },
  {
    nome: 'Plano de ação inteligente',
    descricao: 'Apoia o analisador na montagem do próximo plano de ação (entregáveis e prazos), liberado direto para o mentorado.',
    onde: 'Fluxer',
    paraQuem: ['analisadores'],
    status: 'no ar',
    url: '',
    responsavel: 'Ellen Cecilia (regras) e time de no-code (Fluxer)',
    autores: ['Time de no-code'],
    data: '2026-09',
    detalhe: {
      oQueFaz: 'Ajuda o analisador a montar o plano de ação seguinte com mais agilidade. Desde 09/09/2026 o analisador libera o plano direto para o mentorado, sem passar pela revisão do navegador.',
      comoUsar: '1. O analisador monta o próximo plano (entregáveis + prazos). 2. Define a data de entrega do plano. 3. Usa "Concluir análise e liberar plano". 4. O plano fica disponível para o mentorado na hora; o mentorado recebe e-mail e o navegador recebe aviso no Slack.',
      ondeFica: 'Fluxer, análise do mentorado.',
      atencao: 'Todo entregável precisa ter prazo, e a data de entrega do plano não pode ser anterior ao prazo de nenhum entregável. A IA não substitui o olhar do analisador em cada tarefa nem a checagem se o prazo faz sentido para aquele mentorado. [preencher: nome oficial e detalhes técnicos com o Gabriel José]',
      ondeVerSeEstaFuncionando: 'O navegador recebe no Slack o aviso de plano liberado. Dúvidas: #fluxo-diagnósticos.'
    }
  },
  {
    nome: 'Plantão do Fluxo 24h',
    descricao: 'Chatbot que tira dúvidas do mentorado a qualquer hora, primeiro pelo FAQ e depois pela base de conhecimento do Fluxo.',
    onde: 'Site próprio',
    paraQuem: ['mentorados'],
    status: 'no ar',
    url: 'https://severino-chat.vercel.app/',
    responsavel: 'Fernanda Lizzardo',
    autores: ['Fernanda Lizzardo'],
    data: '2026-06',
    detalhe: {
      oQueFaz: 'Responde dúvidas fora do horário de atendimento para o mentorado não depender do navegador na hora. Também entrega skills sob demanda (quem pede feedback de produto recebe a skill para rodar no Claude).',
      comoUsar: 'O mentorado abre severino-chat.vercel.app, entra com o código de acesso e pergunta. Respostas novas caem no painel de aprovação (/admin.html) para alimentar o FAQ.',
      ondeFica: 'Vercel (severino-chat.vercel.app), repositório fbrier-commits/severino-chat.',
      atencao: 'Indicado na integração e na mensagem automática fora do horário. O código de acesso é compartilhado só com mentorados.',
      ondeVerSeEstaFuncionando: 'Faça uma pergunta de teste. Se não responder, avise a Fernanda.'
    }
  },
  {
    nome: 'Severino (Fluxo Criativo)',
    descricao: 'Aplicativo instalado no computador do mentorado com as skills, comandos e agentes do Fluxo para rodar no Claude.',
    onde: 'Computador do mentorado',
    paraQuem: ['mentorados', 'navegadores'],
    status: 'no ar',
    url: 'https://iaseverino.lovable.app/tutorial',
    responsavel: 'Gabriel José',
    autores: ['Gabriel José', 'Ellen Cecilia', 'Vitor'],
    data: '2026-08',
    detalhe: {
      oQueFaz: 'Coloca a inteligência da mentoria no Claude do mentorado: agentes por etapa (estrategista, comercial), skills de produto, copy, tráfego, carrossel e criativo, dashboards de concorrentes, LinkedIn e biblioteca de anúncios. Recebe atualizações frequentes, comunicadas aos mentorados e registradas na página de releases dentro do Fluxer.',
      comoUsar: 'Instalar pelo tutorial (Windows ou Mac) e usar os comandos dentro do Claude. Navegadores também instalam para acompanhar o mentorado. Dúvidas de instalação: tutoriais em vídeo e call de Claude com o Gabriel José.',
      ondeFica: 'Repositório ReadyToGo-Education/fluxo_criativo; instaladores em arquivos.vtsd.com.br/flx-criativo; tutorial em iaseverino.lovable.app.',
      atencao: 'Algumas skills citadas na documentação (trilha High Ticket, /ht-*) ainda não existem no projeto: orientar o mentorado a pedir em linguagem natural pela skill vtsd-completo. Mac com chip Apple precisa do instalador arm64 e do Node.',
      ondeVerSeEstaFuncionando: 'Mentorado instalou e os comandos respondem. Problemas: #fluxo-ia.'
    }
  },
  {
    nome: 'Estúdio Criativo',
    descricao: 'Área dentro do Fluxer para o mentorado criar anúncios estáticos com IA, com o Agente Severino e importação de dados do Fluxer.',
    onde: 'Fluxer',
    paraQuem: ['mentorados', 'navegadores'],
    status: 'no ar',
    url: 'https://flx.vendatodosantodia.com.br/manual-estudio.html',
    responsavel: 'Nono (no-code)',
    autores: ['Nono'],
    data: '2026-08',
    detalhe: {
      oQueFaz: 'Cria artes de anúncio sem designer, em vários formatos, a partir dos dados do projeto do mentorado no Fluxer. Liberado aos mentorados como overdelivery em agosto/2026, com aula ao vivo do Nono em 01/09.',
      comoUsar: 'Dentro do Fluxer, área Estúdio Criativo. O manual (ferramentas, nós, Agente Severino, importação de dados e regras de uso) está em flx.vendatodosantodia.com.br/manual-estudio.html. Navegadores devem assistir à aula para responder as dúvidas dos mentorados.',
      ondeFica: 'Fluxer.',
      atencao: 'Regras de uso estão no manual. Feedbacks na conversa do anúncio em #fluxo-infos-navegadores (11/08/2026).',
      ondeVerSeEstaFuncionando: 'Área abrindo no Fluxer e gerando artes.'
    }
  },
  {
    nome: 'Agentes GPT do Fluxo',
    descricao: 'Coleção de agentes personalizados no ChatGPT (produto, copy, Instagram, retiros) reunidos numa página para compartilhar com mentorados.',
    onde: 'ChatGPT',
    paraQuem: ['mentorados', 'navegadores'],
    status: 'no ar',
    url: 'https://agentes-fluxo.lovable.app/',
    responsavel: 'Sabrina Oliveira (página)',
    autores: ['Sabrina Oliveira', 'Time do Fluxo'],
    data: '2025-07',
    detalhe: {
      oQueFaz: 'Agentes GPT criados pelo time para as etapas do método: gerador de ideias de produto, quadros, furadeiras, decorados, carrosséis, reels, agentes Light Copy, agentes dos retiros (UpSell, Caixa Rápido) e outros.',
      comoUsar: 'Abrir a página e escolher o agente; o mentorado precisa de conta no ChatGPT.',
      ondeFica: 'agentes-fluxo.lovable.app (Lovable) e links diretos em chatgpt.com/g/.',
      atencao: 'Desde 20/08/2026 a OpenAI não permite criar nem duplicar GPTs personalizados em contas pessoais, só em workspace Business/Enterprise; usar continua liberado. Alternativa indicada pela Ellen: Gems do Gemini (09/09/2026). Não vendemos agentes GPT diretamente (política da OpenAI): só como bônus. Conferir se a página está atualizada.',
      ondeVerSeEstaFuncionando: 'Links dos agentes abrindo no ChatGPT.'
    }
  },
  {
    nome: 'IAF (Inteligência Artificial do Fluxo)',
    descricao: 'Nome guarda-chuva, no pitch, das ferramentas e agentes de IA do programa, apresentado aos mentorados pelo Fluxer Lab.',
    onde: 'Fluxer Lab e Fluxer',
    paraQuem: ['mentorados'],
    status: 'no ar',
    url: 'https://fluxerlab.com.br/login',
    responsavel: 'Fernanda Lizzardo',
    autores: ['Fernanda Lizzardo'],
    data: '2026-04',
    detalhe: {
      oQueFaz: 'É como o pitch chama o conjunto de IA do Fluxo: "as ferramentas e agentes de IA do programa com toda a inteligência da mentoria pra aplicar em minutos". Na prática reúne o Fluxer Lab (Hub, auditor de tráfego), o Severino, o Estúdio Criativo e os agentes.',
      comoUsar: 'Quando o mentorado perguntar "o que é a IAF", apontar para o Fluxer Lab e para o Severino, e para as aulas de IA no Academy.',
      ondeFica: 'Fluxer Lab (fluxerlab.com.br) e Fluxer.',
      atencao: '[preencher: confirmar com a Fernanda e a Ellen o escopo oficial do que entra na IAF]',
      ondeVerSeEstaFuncionando: 'Fluxer Lab abrindo.'
    }
  },
  {
    nome: 'Skill de diagnóstico comercial (ficha de qualificação)',
    descricao: 'Skill do Claude que transforma a ficha preenchida pelo SDR no diagnóstico pronto para o closer, com gargalo, solução pelo método e projeção de ganho.',
    onde: 'Claude (skill) e site da ficha',
    paraQuem: ['comercial'],
    status: 'no ar',
    url: 'https://ficha-qualificacao.vercel.app/',
    responsavel: 'AnaBe',
    autores: ['AnaBe'],
    data: '2026-09',
    detalhe: {
      oQueFaz: 'O SDR preenche a ficha e copia; o closer cola no Claude com a skill e recebe gargalo, o que fazer, como o Fluxo resolve (mandala de anúncios, página 8D e outros nomes do método) e projeção de ganho mensal, para quem tem e para quem não tem produto.',
      comoUsar: '1. SDR preenche ficha-qualificacao.vercel.app na call e clica em copiar. 2. Envia ao closer. 3. Closer cola num chat do Claude com a skill (pasta do projeto no Drive) e usa o briefing na call.',
      ondeFica: 'Site na Vercel (repositório anabeperes/ficha-qualificacao) e skill/agente em github.com/anabeperes/Agente-diagnostico-comercial; PRD na pasta do Drive do projeto.',
      atencao: 'Aprovado pela Clara; alinhado com Gandara e Raphael (time de High). Douglas Matos tem acesso ao repositório desde 09/2026.',
      ondeVerSeEstaFuncionando: 'Ficha gerando o texto ao copiar; skill respondendo no Claude.'
    }
  },
  {
    nome: 'Skills do time no Claude',
    descricao: 'Skills avulsas criadas pelo time para uso interno: contexto do mentorado e relatório de análises, carrossel editorial, análise de produto, comunicação.',
    onde: 'Claude (skills)',
    paraQuem: ['navegadores', 'analisadores'],
    status: 'em construção',
    url: '',
    responsavel: 'Cada autor',
    autores: ['Felipe Faé Schwade', 'AnaBe', 'Fernanda Lizzardo'],
    data: '2026-09',
    detalhe: {
      oQueFaz: 'Skills que rodam no Claude de cada pessoa: geradora de contexto do mentorado e relatório HTML das últimas análises (Felipe, comandos /pre-analise-etapa1 e seguintes), carrossel editorial (Ana), /analisar-produto (Fernanda, distribuída pelo Plantão), skill de criação de link da análise (Ana, origem da automação), skills das palestras dos eventos (páginas de materiais).',
      comoUsar: 'Baixar o arquivo da skill, anexar no Claude e pedir para rodar. Cada autor mantém a sua.',
      ondeFica: 'Repositórios e Drives de cada autor. [preencher: centralizar os links; ver LINKS-PENDENTES.md]',
      atencao: 'Algumas exigem modelo específico (ex.: carrossel editorial só no Opus). O Claude da empresa fica sem tokens em alguns períodos do mês.',
      ondeVerSeEstaFuncionando: 'A skill responde no Claude.'
    }
  }
];
