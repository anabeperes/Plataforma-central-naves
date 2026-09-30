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
      atencao: 'Faz feedback de página na conversa individual (em grupo com sócio ainda não). Desde 22/09/2026 o feedback gerado pode ser editado antes de enviar e a versão editada fica salva (usada na geração de contexto). Sugestões em aberto no #fluxo-ia: ícone e filtro de plano atrasado, inadimplente e renovação, aba de renovação, mensagens rápidas próprias, notas e perfil em grupos com sócio, ditado por voz, exportar conversa. Desde 21/09/2026 o modo automático (sugestão de hora em hora) está desligado: só gera quando você pede. A camada fixa proíbe travessão, promessa de resultado e "cara de IA" (emoji de IA, "não é X, é Y", "boa pergunta"); a ficha de tom ajusta o tom, nunca as regras. Sem ficha de tom de voz a sugestão sai ruim.',
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
      atencao: 'Gerar não salva: se sair da tela sem clicar em Salvar, o texto se perde e o analisador não recebe nada. Desde 22/09/2026 existe uma caixa de seleção para incluir as conversas vinculadas ao mentorado (grupos e sócios); quando só o sócio conversa com você, vincule pela entrada do mentorado principal. Com o grupo incluído, confira o que é realmente do mentorado (sócio e familiares também falam no grupo).',
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
      oQueFazerSeQuebrar: '1. Mac com erro "Access Denied" ao baixar o Apple Silicon: usar o link direto do instalador arm64 (arquivos.vtsd.com.br/flx-criativo/FluxoCriativo-1.0.2-arm64.dmg; o tutorial Mac resolve no minuto 12:40) e clicar em "Colar mesmo assim"; instalar o Node (minuto 16 do tutorial). 2. Reinstalação que não abre: pedir ao mentorado para abrir o Terminal, colar "brew install git" e responder y. 3. Pasta fluxo-criativo sem skills ou comandos: numa conversa com a pasta selecionada, pedir para instalar o repositório github.com/ReadyToGo-Education/fluxo_criativo na pasta. 4. Persistindo, encaminhar para a call de Claude com o Gabriel José (quintas) ou postar no #fluxo-ia. As skills /ht-* (trilha High Ticket) ainda serão colocadas no Severino.'
    }
  },
  {
    nome: 'Estúdio Criativo',
    descricao: 'Área dentro do Fluxer para o mentorado criar anúncios estáticos com IA, com o Agente Severino e importação de dados do Fluxer.',
    onde: 'Fluxer',
    paraQuem: ['mentorados', 'navegadores'],
    status: 'no ar',
    url: 'https://flx.vendatodosantodia.com.br/guia-do-estudio.html',
    responsavel: 'Nono (no-code)',
    autores: ['Nono'],
    data: '2026-09',
    links: [{ rotulo: 'Feedback da aula (Tally)', url: 'https://tally.so/r/0QWjEZ' }],
    detalhe: {
      oQueFaz: 'Cria artes de anúncio sem designer, em vários formatos, a partir dos dados do projeto do mentorado no Fluxer. Está numa turma fechada de teste: teste com o time em 11/08/2026, depois 23 mentorados e, em 24/08, turma de até 100 (lista na mensagem da Ellen em #fluxo-infos-navegadores). Em 29/09/2026 a Ellen disse que não será liberado a todos os mentorados por enquanto (no dia da liberação o Fluxer caiu). Aula ao vivo do Nono em 01/09 (vtsd.com.br/estudio_criativo), gravada; gravação liberada para quem responder o feedback. Recurso "Camadas PRO" (editar título e texto sem gerar de novo) liberado em 19/08.',
      comoUsar: 'Dentro do Fluxer, área Estúdio Criativo. O que se compartilha com o mentorado é o guia em flx.vendatodosantodia.com.br/guia-do-estudio.html (a comunicação coloca o link do guia de propósito, para ele ler antes de usar). O manual completo (ferramentas, nós, Agente Severino, importação de dados e regras de uso) em flx.vendatodosantodia.com.br/manual-estudio.html é de uso interno do time. Liberar acesso para um mentorado da turma: falar direto com o Nono. Navegadores devem assistir à aula para responder as dúvidas dos mentorados.',
      ondeFica: 'Fluxer.',
      atencao: 'Não é para todos os mentorados ainda: só a turma de teste. Regras de uso estão no manual interno. Feedbacks na conversa do anúncio em #fluxo-infos-navegadores (11/08/2026).',
      ondeVerSeEstaFuncionando: 'Área abrindo no Fluxer e gerando artes para a turma de teste.'
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
      atencao: 'Em dezembro/2026 todos os GPTs dos produtos vão parar de funcionar pela nova regra do GPT (Ellen, 29/09/2026). Proposta em avaliação: produto "Agentes Fluxo" (ou "Levantamento de Caixa") na Hotmart, acessado pelo Academy, com os agentes subidos do zero a partir dos prompts das skills novas (não migrar); a migração precisa ser feita pela Hotmart com antecedência e a aula de uso dos agentes do VTSD precisa ser regravada (Lívia). Decisão fica para o próximo sprint. Desde 20/08/2026 a OpenAI não permite criar nem duplicar GPTs personalizados em contas pessoais, só em workspace Business/Enterprise. Mentorado que quer vender agente de IA ou automatizar (Ellen, 03/09/2026): indicar o Agente de IA da Hotmart (produto no Hotmart Club; desde 21/08 gera imagens, arquivos PDF, DOCX, XLSX, PPTX e TXT, executa código e faz busca na web, que vem desligada por padrão); para uso interno ou compartilhamento, Gems do Gemini. Não existe aula atualizada sobre criar agentes (no radar, sem data) nem aula de automação genérica: caminhos n8n (Automações Inteligentes), GitHub Actions e rotinas do Claude Code (Formação Claude). Não vendemos agentes GPT diretamente (política da OpenAI): só como bônus.',
      ondeVerSeEstaFuncionando: 'Links dos agentes abrindo no ChatGPT.'
    },
    links: [{ rotulo: 'Agentes de IA da Hotmart (ajuda)', url: 'https://help.hotmart.com/pt-br/article/39865088542349' }]
  },
  {
    nome: 'Agentes do quiz (refeitos pela Ellen)',
    descricao: 'Três agentes para a estratégia de quiz: gerador de perguntas, checkpoint do quiz e gerador de página final, que substituem os agentes do Gabriel Muniz.',
    onde: 'Agente externo (conta da Ellen)',
    paraQuem: ['mentorados', 'navegadores'],
    status: 'no ar',
    url: '',
    responsavel: 'Ellen Cecilia',
    autores: ['Ellen Cecilia'],
    data: '2026-09',
    detalhe: {
      oQueFaz: 'Os agentes de quiz do Gabriel Muniz caíram em 24/08/2026 (ele cancelou a conta). A Ellen refez os três: gerador de perguntas do quiz, checkpoint do quiz e gerador de página final.',
      comoUsar: 'Os navegadores indicam esses agentes aos mentorados no lugar dos antigos. O acesso e a senha estão na thread de 04/09/2026 em #fluxo-time-rtg (Ester); não ficam na central.',
      ondeFica: 'Links e acesso na thread de 04/09/2026 em #fluxo-time-rtg.',
      atencao: 'No diagnóstico o padrão continua sendo página de vendas; o quiz entra como teste depois, com a página já rodando.',
      ondeVerSeEstaFuncionando: 'Agentes respondendo com o acesso da thread. Problema: avisar a Ellen ou a Ester.'
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
