/* ------------------------------------------------------------------
   ÚNICA FONTE DE VERDADE DA CENTRAL.
   Para adicionar, remover ou editar um projeto, mexa só neste arquivo.
   Os campos estão explicados no README.md.
   ------------------------------------------------------------------ */

// Ordem das seções da página. Um projeto só aparece se a categoria
// dele estiver nesta lista.
const CATEGORIAS = [
  'Resultados e método do Fluxo',
  'Ferramentas do dia a dia',
  'Calculadoras',
  'Skills e instaladores',
  'Automações e documentações'
];

// Contextos aceitos no campo `contexto`.
const CONTEXTOS = ['pico', 'fluxo', 'perpétuo', 'evento'];

// Tipos aceitos no campo `tipo`.
const TIPOS = ['página', 'lovable', 'skill', 'extensão', 'automação', 'documentação', 'calculadora', 'link'];

const PROJETOS = [

  /* ================= Resultados e método do Fluxo ================= */

  {
    nome: 'Página de resultados do Fluxo',
    descricao: 'Prints de resultado e depoimentos da Mentoria Fluxo num lugar só, organizados por categoria, para mandar ao aluno no lugar do PDF.',
    url: 'https://prints-fluxo.vercel.app',
    tipo: 'página',
    categoria: 'Resultados e método do Fluxo',
    contexto: ['fluxo'],
    autores: ['Ellen Cecilia', 'Fernanda Lizzardo'],
    data: '2026-09',
    prd: '',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Reúne todos os prints de resultado e depoimentos que o Leandro tinha e os da Central de depoimentos, separados por estratégia de venda, tipo de resultado, entregável, quem subiu de nível e vídeos. Serve para mandar prova social ao mentorado ou lead sem procurar em PDF.',
      comoFunciona: 'Hoje a página é alimentada manualmente pela Fernanda (categorias como "caixa rápido" são criadas dentro de "entregáveis"). A previsão é conectar com a Central de depoimentos para atualizar sozinha quando entrar depoimento novo.',
      ondeRoda: 'Vercel (prints-fluxo.vercel.app).',
      responsavel: 'Ellen Cecilia e Fernanda Lizzardo.',
      ondeVerSeEstaFuncionando: 'Abra a página e veja se as categorias carregam. Detratores identificados pelo time são removidos a pedido no canal #fluxo-infos-navegadores.',
      oQueFazerSeQuebrar: 'Se a página não abrir, use por enquanto a Central de depoimentos (depoimentos-five.vercel.app) e avise a Ellen no Slack.'
    }
  },

  {
    nome: 'Mecanismo único do Fluxo',
    descricao: 'Página que apresenta o mecanismo único da Mentoria Fluxo. [preencher: confirmar descrição e link]',
    url: '',
    tipo: 'página',
    categoria: 'Resultados e método do Fluxo',
    contexto: ['fluxo'],
    autores: [],
    data: '',
    prd: '',
    git: '',
    status: 'link pendente'
  },

  {
    nome: 'Transcrição de todos os produtos',
    descricao: 'Transcrições de todas as aulas de todos os cursos, com busca no texto inteiro, materiais de apoio e download pronto para jogar numa IA.',
    url: 'https://transcricoes-academy.vercel.app/',
    tipo: 'página',
    categoria: 'Resultados e método do Fluxo',
    contexto: ['fluxo'],
    autores: ['Ellen Cecilia'],
    data: '2026-09',
    prd: '',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Deixa você achar a aula certa mesmo sem lembrar o nome dela: a busca entra na transcrição inteira, no nome do palestrante e nos materiais. Dá para baixar a transcrição de uma aula ou de todas, em vários formatos. Uso interno: só e-mail @vtsd e analisadores criam conta.',
      comoFunciona: 'Toda semana roda uma rotina que sincroniza com o Academy: aula nova entra e aula removida sai sozinha. Primeiro acesso: clique em Criar conta, use seu e-mail (analisador usa o mesmo do Fluxer) e escolha uma senha.',
      ondeRoda: 'Vercel (transcricoes-academy.vercel.app) com rotina semanal de sincronização com o Academy.',
      responsavel: 'Ellen Cecilia.',
      ondeVerSeEstaFuncionando: 'Uma aula publicada no Academy deve aparecer na página até a semana seguinte. Se não apareceu, a rotina não rodou.',
      oQueFazerSeQuebrar: 'Confira se o Academy está no ar e se a aula existe lá. Se sim e ela não entrou na página em uma semana, avise a Ellen no Slack. Nunca compartilhe o link com mentorado ou aluno.'
    }
  },

  {
    nome: 'Central de depoimentos',
    descricao: 'Acervo de depoimentos e provas sociais dos mentorados, integrado ao Fluxer, com perfil individual para cada pessoa do time.',
    url: 'https://depoimentos-five.vercel.app/',
    tipo: 'página',
    categoria: 'Resultados e método do Fluxo',
    contexto: ['fluxo'],
    autores: ['Emanuelle Lima (Manu)', 'Ruam Cristian', 'Felipe Faé Schwade'],
    data: '2026-08',
    prd: '',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Guarda os depoimentos de mentorados de todos os produtos do ecossistema, categorizados, para usar em eventos, materiais e calls de venda. Evoluiu do projeto "Fluxo de Depoimentos em Massa", vencedor da competição interna do time.',
      comoFunciona: 'Cada pessoa entra com seu e-mail e senha. Ao registrar um depoimento, os dados do mentorado (nome, e-mail, nível e nicho) vêm automaticamente do Fluxer. Depoimentos de eventos ficam numa aba própria, a partir do projeto de transcrição e geração de imagem do Gabriel José. A coleta com o time de relacionamento é feita pela própria central, sem o navegador precisar printar chat.',
      ondeRoda: 'Vercel (depoimentos-five.vercel.app), integrada ao Fluxer.',
      responsavel: 'Emanuelle Lima (Manu) e Ruam Cristian.',
      ondeVerSeEstaFuncionando: 'Ao registrar um depoimento, os dados do mentorado devem preencher sozinhos. Se não preencherem, a integração com o Fluxer caiu.',
      oQueFazerSeQuebrar: 'Confira se você fez o primeiro acesso com seu próprio e-mail. Persistindo, chame a Manu ou o Ruam no Slack.'
    }
  },

  {
    nome: 'Links das páginas de materiais dos eventos',
    descricao: 'Quadro "Central de Links da Mentoria" no Monday: em Materiais Eventos, cada evento tem a pasta com a página de materiais.',
    url: 'https://venda-todo-santo-dia.monday.com/boards/2061768785',
    tipo: 'link',
    categoria: 'Resultados e método do Fluxo',
    contexto: ['evento'],
    autores: ['Time de Eventos e Entregáveis'],
    data: '2026-06',
    prd: '',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Centraliza os links das páginas de materiais de todos os eventos (retiros, imersões, SPP, FLP), para o navegador achar rápido o que mandar ao mentorado.',
      comoFunciona: 'Cada evento tem uma página em eventos.vtsd.com.br/evento/<nome-do-evento>, criada e editada em rtg.vtsd.com.br; os arquivos são subidos em download.vtsd.com.br/admin. O quadro do Monday guarda o link de cada página: abra Materiais Eventos, ache o evento e clique na pastinha.',
      ondeRoda: 'Monday (quadro) e site eventos.vtsd.com.br (páginas).',
      responsavel: 'Time de Eventos e Entregáveis.',
      ondeVerSeEstaFuncionando: 'O evento mais recente deve estar no quadro com o link da página funcionando.',
      oQueFazerSeQuebrar: 'Procure o link no canal #fluxo-evento-e-entregáveis (toda página nova é anunciada lá) ou peça ao time de Eventos e Entregáveis.'
    }
  },

  /* ================= Ferramentas do dia a dia ================= */

  {
    nome: 'Página de respostas rápidas (FLP)',
    descricao: 'Respostas prontas para colar no chat do Zoom durante o FLP, separadas por dia e por palestra, com os conceitos que o Leandro usa.',
    url: 'https://respostas-rapidas-flp.vercel.app',
    tipo: 'página',
    categoria: 'Ferramentas do dia a dia',
    contexto: ['pico', 'evento'],
    autores: ['Ellen Cecilia'],
    data: '2026-09',
    prd: '',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Junta o que o Leandro definiu nas reuniões, o que já foi respondido nos últimos picos e o conceito de cada termo, para o navegador responder o chat do Zoom em segundos. É o projeto que mais se repete a cada evento, por isso vale ter PRD e repositório para replicar.',
      comoFunciona: 'Entre no Zoom pelo navegador (pelo aplicativo não dá para copiar). Selecione a mensagem do participante no chat, cole no campo da página e dê enter: ela aceita o texto colado no formato do Zoom (nome, horário e mensagem) e devolve a resposta personalizada para copiar.',
      ondeRoda: 'Vercel (respostas-rapidas-flp.vercel.app).',
      responsavel: 'Ellen Cecilia.',
      ondeVerSeEstaFuncionando: 'Cole uma mensagem de teste e veja se aparece a sugestão de resposta.',
      oQueFazerSeQuebrar: 'Use a versão anterior das mensagens rápidas ou responda com o material da palestra. Avise a Ellen no #fluxo-ia.'
    }
  },

  {
    nome: 'Extensão de respostas rápidas (FLP)',
    descricao: 'Extensão do Chrome que abre a página de respostas rápidas no painel lateral, na mesma tela do chat do Zoom.',
    url: '',
    tipo: 'extensão',
    categoria: 'Ferramentas do dia a dia',
    contexto: ['pico', 'evento'],
    autores: ['AnaBe', 'Emanuelle Lima (Manu)', 'Ellen Cecilia'],
    data: '2026-09',
    prd: '',
    git: '',
    status: 'link pendente',
    detalhe: {
      oQueFaz: 'Coloca a página de respostas rápidas num painel lateral do Chrome, então não precisa trocar nem dividir tela: o chat do Zoom e as respostas ficam lado a lado. Ideia da Manu, executada pela Ana sobre a página da Ellen.',
      comoFunciona: 'A extensão não está na loja do Chrome, a instalação é manual em 3 passos: 1. Baixe e descompacte o zip numa pasta. 2. Abra chrome://extensions, ligue o Modo do desenvolvedor e clique em "Carregar sem compactação", escolhendo a pasta que tem o manifest.json. 3. Fixe o ícone na barra (ícone de quebra-cabeça) e clique nele: o painel abre ao lado e acompanha qualquer aba. Só funciona com o Zoom aberto no Chrome.',
      ondeRoda: 'No Chrome de cada navegador. O zip e o guia em PDF foram enviados no Slack (#fluxo-infos-navegadores, 22 e 23/09/2026).',
      responsavel: 'AnaBe.',
      ondeVerSeEstaFuncionando: 'Clicou no ícone e o painel lateral abriu com a página: está funcionando.',
      oQueFazerSeQuebrar: 'Erro "não achou o manifest.json": o zip não foi extraído de verdade ou tem pasta dentro de pasta. Abra a pasta e confira se os 4 arquivos (manifest.json, background.js, sidepanel.html, icon.png) aparecem soltos; selecione essa pasta. O guia em PDF tem a tabela "Deu problema?" com os casos mais comuns.'
    }
  },

  {
    nome: 'Acervo do Fluxo',
    descricao: 'Banco de referências de páginas de vendas, captura, quizzes, anúncios e outros materiais, organizado por categoria e nicho.',
    url: 'https://acervo-do-fluxo.vercel.app/referencias',
    tipo: 'página',
    categoria: 'Ferramentas do dia a dia',
    contexto: ['fluxo', 'pico', 'perpétuo'],
    autores: ['AnaBe', 'Emanuelle Lima (Manu)'],
    data: '2026-09',
    prd: '',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Guarda as melhores referências criadas dentro da mentoria (mais de 345 materiais no lançamento) para o time achar em menos de um minuto. Cada referência é salva como cópia permanente, com print e data, então continua disponível mesmo se a página original sair do ar.',
      comoFunciona: 'Cadastrar leva 15 segundos: clique em "Nova referência" e preencha link, categoria e nicho. Um robô abre a página, salva a cópia, gera a capa e deixa pesquisável; em pouco tempo ela aparece na aba Referências. Login com o e-mail do vtsd.',
      ondeRoda: 'Vercel (acervo-do-fluxo.vercel.app). O robô é um script que roda por agendamento no GitHub Actions (semanal, com disparo manual).',
      responsavel: 'AnaBe.',
      ondeVerSeEstaFuncionando: 'A fila do robô fica em acervo-do-fluxo.vercel.app/fila: o que você cadastrou deve sair da fila e aparecer em Referências.',
      oQueFazerSeQuebrar: 'Material classificado errado: abra ele e use o botão laranja "Erro de classificação" (o report cai direto para a Ana). Visualização com erro: use "Acessar material original". Fila parada por mais de uma semana: avise a Ana.'
    }
  },

  {
    nome: 'Página com todos os agentes GPT do Fluxo',
    descricao: 'Site que reúne os agentes GPT do Fluxo para o time compartilhar com os mentorados.',
    url: 'https://agentes-fluxo.lovable.app/',
    tipo: 'lovable',
    categoria: 'Ferramentas do dia a dia',
    contexto: ['fluxo'],
    autores: ['Sabrina Oliveira'],
    data: '2025-07',
    prd: '',
    git: '',
    status: 'no ar'
  },

  {
    nome: 'Fluxer Lab',
    descricao: 'Plataforma de ferramentas para o mentorado (Fluxer Hub, auditor de tráfego, Fluxo Criativo) e laboratório onde os MVPs nascem antes de entrar no Fluxer.',
    url: 'https://fluxerlab.com.br/login',
    tipo: 'página',
    categoria: 'Ferramentas do dia a dia',
    contexto: ['fluxo'],
    autores: ['Fernanda Lizzardo'],
    data: '2026-04',
    prd: '',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Dá ao mentorado uma série de utilidades num só login, inclusive conectar experts e coprodutores. Para o time, é o lugar de testar um MVP fora do Fluxer antes da integração pelo time de no-code.',
      comoFunciona: 'O mentorado entra em fluxerlab.com.br/login e segue o tutorial em vídeo (youtube.com/watch?v=EOnuQwUad0g). O time usa um acesso de liderança que mostra os dados de todos os mentorados; o mentorado vê só os dele. Aulas do Fluxo Criativo são publicadas lá pelo módulo "gerenciar aulas".',
      ondeRoda: 'fluxerlab.com.br, plataforma própria com banco de dados.',
      responsavel: 'Fernanda Lizzardo.',
      ondeVerSeEstaFuncionando: 'Login abrindo e módulos carregando. Feedbacks e problemas de login vão no canal #fluxer-lab-e-nave-master.',
      oQueFazerSeQuebrar: 'Erro de login de mentorado novo: confira se ele foi cadastrado e avise a Fernanda no #fluxer-lab-e-nave-master.'
    }
  },

  {
    nome: 'Plantão do Fluxo 24h',
    descricao: 'Chatbot que tira dúvidas do mentorado a qualquer hora com base no FAQ e na base de conhecimento do Fluxo (antigo Severino Chat).',
    url: 'https://severino-chat.vercel.app/',
    tipo: 'página',
    categoria: 'Ferramentas do dia a dia',
    contexto: ['fluxo'],
    autores: ['Fernanda Lizzardo'],
    data: '2026-06',
    prd: '',
    git: 'https://github.com/fbrier-commits/severino-chat',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Responde dúvidas do mentorado fora do horário de atendimento, para ele não depender do navegador na hora. Também entrega skills sob demanda (por exemplo, quem pede feedback de produto recebe a skill para rodar no Claude).',
      comoFunciona: 'Quando o mentorado pergunta, a IA procura primeiro no FAQ cadastrado. Se acha, responde com base nele; se não, usa a base de conhecimento (Severino, padrões do Fluxo). Respostas novas caem num painel de aprovação (severino-chat.vercel.app/admin.html) para alimentar o FAQ. Entrada com código de acesso.',
      ondeRoda: 'Vercel (severino-chat.vercel.app).',
      responsavel: 'Fernanda Lizzardo.',
      ondeVerSeEstaFuncionando: 'Faça uma pergunta de teste e veja se responde. Novas respostas pendentes aparecem no painel de aprovação.',
      oQueFazerSeQuebrar: 'Se não responde, avise a Fernanda. Enquanto isso, o mentorado segue com o navegador no horário de atendimento.'
    }
  },

  /* ================= Calculadoras ================= */

  {
    nome: 'Calculadora de lançamento pago',
    descricao: 'Simula investimento, custos, conversão, CPA, ROAS, exposição de caixa, upsell e lucro de um lançamento pago.',
    url: 'https://flancamentopago.lovable.app',
    tipo: 'calculadora',
    categoria: 'Calculadoras',
    contexto: ['pico'],
    autores: ['Leandro Ladeira'],
    data: '2026-09',
    prd: '',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Deixa o mentorado que vai fazer lançamento pago planejar os números antes de gastar: quanto investir, custo por lead e por venda, retorno e lucro total. O time conferiu a lógica de cálculo (funil, CPA, ROAS, upsell) e bateu.',
      comoFunciona: 'Crie a conta, clique em "Criar minha calculadora", preencha os campos do funil e salve a simulação. Pode ter mais de um lançamento salvo.',
      ondeRoda: 'Lovable (flancamentopago.lovable.app).',
      responsavel: 'Leandro Ladeira; feedbacks do time reunidos pela Ellen no #fluxo-ia.',
      ondeVerSeEstaFuncionando: 'Página abrindo e simulação salvando.',
      oQueFazerSeQuebrar: 'Atenção: "Apagar" não pede confirmação. Se algo quebrar, mande o print para a Ellen no #fluxo-ia.'
    }
  },

  {
    nome: 'Calculadora de Black (Vilas Boas)',
    descricao: 'Playbook do Retiro da Black que faz o planejamento de datas e etapas da Black Friday do mentorado.',
    url: 'https://playbook-black-friday.vercel.app/',
    tipo: 'calculadora',
    categoria: 'Calculadoras',
    contexto: ['pico'],
    autores: ['Gabriel Vilas Boas'],
    data: '2026-08',
    prd: '',
    git: '',
    status: 'no ar'
  },

  /* ================= Skills e instaladores ================= */

  {
    nome: 'Skills do time',
    descricao: 'Skills avulsas criadas pelo time para rodar no Claude: geradora de contexto e relatório de análises, carrossel editorial, análise de produto, ideias de produto e outras.',
    url: '',
    tipo: 'skill',
    categoria: 'Skills e instaladores',
    contexto: ['fluxo'],
    autores: ['Felipe Faé Schwade', 'AnaBe', 'Fernanda Lizzardo'],
    data: '2026-09',
    prd: '',
    git: '',
    status: 'em construção'
  },

  {
    nome: 'Instaladores do Severino',
    descricao: 'Tutorial e instaladores do Severino (Fluxo Criativo) para Windows e Mac, com vídeo passo a passo de cada sistema.',
    url: 'https://iaseverino.lovable.app/tutorial',
    tipo: 'lovable',
    categoria: 'Skills e instaladores',
    contexto: ['fluxo'],
    autores: ['Gabriel José'],
    data: '2026-08',
    prd: '',
    git: 'https://github.com/ReadyToGo-Education/fluxo_criativo',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Ensina o mentorado a instalar o Severino no computador dele. Os tutoriais em vídeo mostram os erros mais comuns de cada sistema e como resolver (no de Mac, o Gabriel zerou a máquina para mostrar todos os erros possíveis).',
      comoFunciona: 'O mentorado abre iaseverino.lovable.app/tutorial (login em iaseverino.lovable.app/auth), baixa o instalador do seu sistema e segue o vídeo: Tutorial Windows e Tutorial Mac estão no Drive (pasta "Tutorial de instalação"). Mac com chip Apple usa o instalador arm64 em arquivos.vtsd.com.br/flx-criativo/FluxoCriativo-1.0.2-arm64.dmg e precisa do Node (nodejs.org).',
      ondeRoda: 'No computador do mentorado. O aplicativo é o Fluxo Criativo, repositório ReadyToGo-Education/fluxo_criativo. Releases e atualizações também ficam na página de releases do Severino dentro do Fluxer.',
      responsavel: 'Gabriel José.',
      ondeVerSeEstaFuncionando: 'Mentorado instalou e abriu o Severino. Dúvidas e bugs vão no #fluxo-ia.',
      oQueFazerSeQuebrar: 'Mac: baixar a versão arm64 e clicar em "Colar mesmo assim"; instalar o Node (minuto 16 do tutorial). Persistindo, encaminhar para a call de Claude com o Gabriel José (quintas) ou postar no #fluxo-ia.'
    }
  },

  /* ================= Automações e documentações ================= */

  {
    nome: 'Automação de links das análises',
    descricao: 'Cria sozinha o link da StreamYard e do YouTube de cada análise agendada no Fluxer e avisa no Slack o que deu certo e o que falhou.',
    url: 'https://readytogohq.slack.com/archives/C0B6CUW2FPB',
    tipo: 'automação',
    categoria: 'Automações e documentações',
    contexto: ['fluxo'],
    autores: ['Fernanda Lizzardo', 'AnaBe'],
    data: '2026-09',
    prd: '',
    git: 'https://github.com/fbrier-commits/streamyard-links-automation',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Toda análise agendada no Fluxer precisa de um link de transmissão. Esse robô cria o link na StreamYard (e o vídeo no YouTube), coloca dentro da análise no Fluxer e manda um relatório no Slack. O navegador passa a conferir em vez de criar link por link; a responsabilidade pelo link continua sendo dele.',
      comoFunciona: '1. Um agendamento no GitHub Actions dispara o robô algumas vezes por dia. 2. Ele lê no Fluxer as análises dos próximos dias que ainda estão sem link. 3. Abre a StreamYard pelo navegador (não usa API) e cria a transmissão de cada análise, com pausa entre uma e outra e no máximo 10 por rodada, para a StreamYard não bloquear. 4. Salva o link da StreamYard e do YouTube na análise, no Fluxer. 5. Publica no canal #fluxo-links-analises um relatório com sucessos, falhas e o que ficou para a próxima rodada.',
      ondeRoda: 'GitHub Actions, no repositório da Fernanda (fbrier-commits/streamyard-links-automation). Código, credenciais e ajustes ficam com a Fernanda; não depende de computador ligado.',
      responsavel: 'Fernanda Lizzardo (código e credenciais). AnaBe acompanha os alertas e avisa o time.',
      ondeVerSeEstaFuncionando: 'Canal #fluxo-links-analises no Slack. Cada rodada posta "StreamYard Links" com sucessos e falhas. Quando a StreamYard bloqueia, posta "Automacao StreamYard parou por rate limit" com a fila pendente; "Fila zerada" significa que tudo foi criado. Se o canal ficou o dia sem relatório, a automação não rodou.',
      oQueFazerSeQuebrar: '1. Veja o último relatório: as análises em FALHA ou pendentes precisam de link manual pelo navegador responsável (criar na StreamYard e colar no Fluxer), começando pelas análises do dia seguinte e fora do horário de atendimento. 2. Bloqueio por rate limit se resolve sozinho na próxima rodada; só avise a Fernanda se passar de um dia sem "Fila zerada". 3. Erro diferente disso: mande o print do alerta para a Fernanda no Slack.'
    }
  },

  {
    nome: 'Automação de exclusão de grupos',
    descricao: 'Remove dos grupos do WhatsApp e priva as análises de quem ficou inativo no Fluxer; o mesmo robô aprova a entrada de mentorados nos grupos.',
    url: 'https://github.com/fbrier-commits/remover-acesso-mentorado',
    tipo: 'automação',
    categoria: 'Automações e documentações',
    contexto: ['fluxo'],
    autores: ['Fernanda Lizzardo'],
    data: '2026-07',
    prd: '',
    git: 'https://github.com/fbrier-commits/remover-acesso-mentorado',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Quando um mentorado fica inativo no Fluxer (inadimplência, congelamento, cancelamento ou não renovação), o robô tira ele dos grupos do WhatsApp da mentoria e deixa os vídeos das análises dele como não listados. O mesmo robô também aprova automaticamente quem pede para entrar nos grupos, se for mentorado ativo e com diagnóstico feito.',
      comoFunciona: '1. A remoção roda toda terça e sexta; a aprovação roda em rodadas ao longo do dia. Tudo pelo GitHub Actions. 2. O robô consulta no Fluxer a lista de mentorados e o status de cada um. 3. Inativos: remove dos grupos usando um WhatsApp exclusivo de automação e priva as análises. 4. Pedidos de entrada: aprova só quem está ativo, é mentorado e já fez diagnóstico; sócios não são aprovados automaticamente, isso continua com o navegador. 5. Publica o resultado no Slack e, quando falha, um alerta com o link do log.',
      ondeRoda: 'GitHub Actions, repositório fbrier-commits/remover-acesso-mentorado, com um número de WhatsApp dedicado só à automação (para reduzir risco de banimento).',
      responsavel: 'Fernanda Lizzardo.',
      ondeVerSeEstaFuncionando: 'Canal #aprovação-grupos-abertos no Slack: relatório "Admissao nos grupos" com aprovados, inativos e não mentorados; alerta "Admissao automatica falhou" traz o link do log no GitHub Actions. O status do mentorado no Fluxer explica por que ele foi removido.',
      oQueFazerSeQuebrar: '1. Mentorado reclamou que saiu do grupo: confira no Fluxer se ele está inativo e o motivo. Inadimplência vai para a Lya (financeiro); assim que regularizar e voltar a ativo, adicione ele de novo nos grupos manualmente. 2. Alerta de falha na admissão: aprove as solicitações pendentes no WhatsApp na mão e confira se o Fluxer está no ar. 3. Falha repetida: avise a Fernanda com o link do log.'
    }
  },

  {
    nome: 'Documentação do projeto da ficha de qualificação',
    descricao: 'Ficha que o SDR preenche na call e skill do Claude que devolve ao closer o diagnóstico pronto do lead.',
    url: 'https://ficha-qualificacao.vercel.app/',
    tipo: 'documentação',
    categoria: 'Automações e documentações',
    contexto: ['fluxo'],
    autores: ['AnaBe'],
    data: '2026-09',
    prd: 'https://drive.google.com/drive/folders/1LDOJM973EPIaWo-TjG_n6HKfomvACj-g',
    git: '',
    status: 'no ar',
    detalhe: {
      oQueFaz: 'Padroniza e acelera o diagnóstico do comercial. O SDR preenche só o que é necessário sobre o lead, copia com um botão e envia ao closer. O closer cola num chat do Claude treinado com a skill do projeto e recebe: o gargalo da operação, o que precisa ser feito, como a Mentoria Fluxo resolve (já com os nomes dos métodos, como mandala de anúncios e página 8D) e a projeção de ganho mensal. Vale para quem tem e para quem não tem produto.',
      comoFunciona: '1. Na call, o SDR abre ficha-qualificacao.vercel.app e preenche os campos (nicho, faturamento, motivação, impeditivo, objetivo). 2. Clica em copiar e manda o texto ao closer. 3. O closer cola no Claude com a skill do projeto (está na pasta do Drive) e usa o briefing na call. Aprovado pela Clara e alinhado com o time de High (Gandara e Raphael).',
      ondeRoda: 'Site na Vercel (ficha) e skill no Claude. Os detalhes completos do projeto ficam na pasta do Drive (botão "Baixar PRD").',
      responsavel: 'AnaBe. Douglas Matos tem acesso ao repositório desde 09/2026.',
      ondeVerSeEstaFuncionando: 'Abra a ficha, preencha um lead de teste e confira se o botão de copiar gera o texto completo.',
      oQueFazerSeQuebrar: 'Site fora do ar: avise a Ana. Skill respondendo errado: revise as instruções com o PRD da pasta do Drive e teste de novo.'
    }
  },

  {
    nome: 'Documentação do NavMaster',
    descricao: 'Assistente dentro do Fluxer que sugere respostas para as conversas de WhatsApp dos navegadores, no tom de voz de cada um.',
    url: '',
    tipo: 'documentação',
    categoria: 'Automações e documentações',
    contexto: ['fluxo'],
    autores: ['Gabriel José', 'AnaBe', 'Fernanda Lizzardo'],
    data: '2026-09',
    prd: '',
    git: 'https://github.com/anabeperes/Projeto-Nave-Master',
    status: 'em construção',
    detalhe: {
      oQueFaz: 'O NavMaster (Nave Master) lê as conversas de WhatsApp dos mentorados dentro do Fluxer e sugere uma resposta para o navegador revisar e enviar. Ele não responde sozinho: a decisão e a revisão de cada mensagem são do navegador.',
      comoFunciona: '1. O WhatsApp de cada navegador fica conectado ao Fluxer. 2. Cada navegador cadastra e calibra o próprio tom de voz no NavMaster (sem isso a sugestão fica ruim). 3. Desde 21/09/2026 o modo automático, que gerava sugestão de hora em hora, está desligado. Na lista de conversas, passe o mouse na linha e clique em "Gerar sugestão" (no celular o botão fica sempre visível); dentro da conversa o botão fica acima do campo de mensagem e vira "Gerar de novo". 4. O navegador revisa, ajusta e envia.',
      ondeRoda: 'Dentro do Fluxer, mantido pelo time de no-code (Gabriel José e Vitor). Nasceu como MVP fora do Fluxer, o Projeto Nave Master (n8n), da Ana e da Fernanda.',
      responsavel: 'Gabriel José.',
      ondeVerSeEstaFuncionando: 'O botão "Gerar sugestão" aparece nas conversas do Fluxer e devolve uma sugestão. Bugs e melhorias são tratados no canal #fluxo-ia.',
      oQueFazerSeQuebrar: '1. Sem sugestão: confira se o tom de voz está cadastrado e gere de novo. 2. Conversa duplicada ou com o nome errado: relate no #fluxo-ia marcando o Gabriel José. 3. Nunca envie uma sugestão sem revisar. A documentação oficial ainda não existe: pedir ao Gabriel José.'
    }
  },

  {
    nome: 'Documentação dos projetos de IA dentro do Fluxer',
    descricao: 'Como funcionam os recursos de IA que o time de no-code colocou dentro do Fluxer: NavMaster, Estúdio Criativo, releases do Severino, calls coletivas.',
    url: '',
    tipo: 'documentação',
    categoria: 'Automações e documentações',
    contexto: ['fluxo'],
    autores: ['Gabriel José'],
    data: '2026-09',
    prd: '',
    git: '',
    status: 'em construção',
    detalhe: {
      oQueFaz: 'Ponto único para o time consultar o funcionamento dos projetos de IA implementados no Fluxer, em vez de perguntar a quem desenvolveu. Hoje se sabe que existem: NavMaster (sugestão de respostas), Estúdio Criativo (criação de anúncios estáticos, do Nono), página de releases do Severino e o cadastro de calls coletivas.',
      comoFunciona: '[preencher] A documentação ainda não foi escrita. A Ellen sugeriu pedir ao próprio Gabriel José.',
      ondeRoda: 'Dentro do Fluxer (time de no-code).',
      responsavel: 'Gabriel José.',
      ondeVerSeEstaFuncionando: '[preencher]',
      oQueFazerSeQuebrar: 'Relatar no canal #fluxo-ia marcando o Gabriel José.'
    }
  }
];
