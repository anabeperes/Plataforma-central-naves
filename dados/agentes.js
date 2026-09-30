/* Agentes de IA que o Fluxo tem hoje: o que fazem, onde ficam, para quem
   são e como usar. Aparecem na aba "Projetos e agentes", seção "Agentes de IA".
   Fonte: anúncios no Slack (ver DECISOES.md). Campos opcionais: `git`,
   `links` ([{ rotulo, url }], botões extras no painel) e `detalhe.oQueFazerSeQuebrar`. */

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
    git: 'https://github.com/anabeperes/Projeto-Nave-Master',
    detalhe: {
      oQueFaz: 'Lê a conversa do mentorado e escreve uma sugestão de resposta para o navegador revisar e enviar. Ele não responde sozinho e não substitui a avaliação do navegador em cada mensagem.',
      comoUsar: '1. Conecte seu WhatsApp ao Fluxer (Atendimento). 2. Em Atendimento, menu lateral, item "Tom de voz", revise a ficha gerada a partir das suas mensagens, preencha seus jargões e bordões e clique em Salvar ficha. 3. Na lista de conversas, passe o mouse na linha e clique em "Gerar sugestão" (no celular o botão fica sempre visível); dentro da conversa, o botão fica acima do campo de mensagem e vira "Gerar de novo". 4. Revise, ajuste e envie. Usou, marque como usada; não serviu, descarte e conte no #fluxo-ia o que estava ruim: é esse retorno que calibra a ferramenta.',
      ondeFica: 'Fluxer, área de Atendimento. Nasceu como MVP fora do Fluxer (Projeto Nave Master, n8n, da Ana e da Fernanda) e foi integrado pelo time de no-code.',
      atencao: 'Desde 21/09/2026 o modo automático (sugestão de hora em hora) está desligado: só gera quando você pede. A camada fixa proíbe travessão, promessa de resultado e "cara de IA" (emoji de IA, "não é X, é Y", "boa pergunta"); a ficha de tom ajusta o tom, nunca as regras. Sem ficha de tom de voz a sugestão sai ruim.',
      ondeVerSeEstaFuncionando: 'O botão "Gerar sugestão" devolve uma sugestão nas conversas do Fluxer. Bugs e melhorias: canal #fluxo-ia marcando o Gabriel José.',
      oQueFazerSeQuebrar: '1. Sem sugestão: confira se o tom de voz está cadastrado e gere de novo. 2. Conversa duplicada ou com o nome errado: relate no #fluxo-ia marcando o Gabriel José. 3. Nunca envie uma sugestão sem revisar. A documentação oficial do NavMaster ainda não existe: falta o Gabriel José escrever (o repositório do MVP, Projeto Nave Master, está no botão "Ver no Git").'
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
    descricao: 'Gera o rascunho do próximo plano de ação a partir da transcrição da análise do mapa mental; o analisador revisa e libera direto para o mentorado.',
    onde: 'Fluxer',
    paraQuem: ['analisadores'],
    status: 'no ar',
    url: '',
    responsavel: 'Ellen Cecilia (regras) e time de no-code (Fluxer)',
    autores: ['Time de no-code'],
    data: '2026-09',
    detalhe: {
      oQueFaz: 'Lê a transcrição da análise do mapa mental e gera, a partir dela, o rascunho do plano de ação seguinte (entregáveis e prazos). O analisador revisa, ajusta e libera. Desde 09/09/2026 o plano vai direto para o mentorado, sem passar pela revisão do navegador.',
      comoUsar: '1. Com a análise transcrita, o analisador revisa o plano gerado pela IA (entregáveis + prazos) e ajusta o que precisar. 2. Define a data de entrega do plano. 3. Usa "Concluir análise e liberar plano". 4. O plano fica disponível para o mentorado na hora; o mentorado recebe e-mail e o navegador recebe aviso no Slack.',
      ondeFica: 'Fluxer, análise do mentorado.',
      atencao: 'Todo entregável precisa ter prazo, e a data de entrega do plano não pode ser anterior ao prazo de nenhum entregável. A IA não substitui o olhar do analisador em cada tarefa nem a checagem se o prazo faz sentido para aquele mentorado.',
      ondeVerSeEstaFuncionando: 'O navegador recebe no Slack o aviso de plano liberado. Dúvidas: #fluxo-diagnósticos.'
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
    git: 'https://github.com/ReadyToGo-Education/fluxo_criativo',
    links: [
      { rotulo: 'Tutoriais de instalação (Drive)', url: 'https://drive.google.com/drive/folders/1WX4iNW8c8ZLfJjZ36JKQOZ_hWkqfjnMz' },
      { rotulo: 'Passo a passo para mentorados (doc)', url: 'https://docs.google.com/document/d/1pDMv-7fEphfHA46yp5mCgOyi0iPIYVNkzbUNWdLu7l0/edit?usp=sharing' }
    ],
    detalhe: {
      oQueFaz: 'Coloca a inteligência da mentoria no Claude do mentorado: agentes por etapa (estrategista, comercial), skills de produto, copy, tráfego, carrossel e criativo, dashboards de concorrentes, LinkedIn e biblioteca de anúncios. Recebe atualizações frequentes, comunicadas aos mentorados e registradas na página de releases dentro do Fluxer.',
      comoUsar: '1. O mentorado abre iaseverino.lovable.app/tutorial (login em iaseverino.lovable.app/auth), baixa o instalador do seu sistema e segue o vídeo (Tutorial Windows ou Tutorial Mac, na pasta "Tutorial de instalação" do Drive). 2. Mac com chip Apple usa o instalador arm64 em arquivos.vtsd.com.br/flx-criativo/FluxoCriativo-1.0.2-arm64.dmg e precisa do Node (nodejs.org). 3. Com o Severino instalado, usa os comandos dentro do Claude. Navegadores também instalam para acompanhar o mentorado. O doc da Aline Henriques tem toda a comunicação de uso para enviar aos mentorados.',
      ondeFica: 'No computador do mentorado. Aplicativo Fluxo Criativo, repositório ReadyToGo-Education/fluxo_criativo; instaladores em arquivos.vtsd.com.br/flx-criativo; tutorial em iaseverino.lovable.app. Releases e atualizações também ficam na página de releases do Severino dentro do Fluxer.',
      atencao: 'Algumas skills citadas na documentação (trilha High Ticket, /ht-*) ainda não existem no projeto: orientar o mentorado a pedir em linguagem natural pela skill vtsd-completo. Mac com chip Apple precisa do instalador arm64 e do Node. Os tutoriais em vídeo mostram os erros mais comuns de cada sistema (no de Mac, o Gabriel zerou a máquina para mostrar todos).',
      ondeVerSeEstaFuncionando: 'Mentorado instalou, abriu o Severino e os comandos respondem. Dúvidas e bugs vão no #fluxo-ia.',
      oQueFazerSeQuebrar: 'Mac: baixar a versão arm64 e clicar em "Colar mesmo assim"; instalar o Node (minuto 16 do tutorial). Persistindo, encaminhar para a call de Claude com o Gabriel José (quintas) ou postar no #fluxo-ia.'
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
      atencao: 'O escopo oficial do que entra na IAF ainda está sendo confirmado com a Fernanda e a Ellen.',
      ondeVerSeEstaFuncionando: 'Fluxer Lab abrindo.'
    }
  }
];
