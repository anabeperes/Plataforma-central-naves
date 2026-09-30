/* Entregas da Mentoria Fluxo: o que o mentorado recebe e como o time entrega.
   As descrições seguem o "Resumo do Pitch Fluxo" (Ellen, 08/2026) com as
   explicações curtas escritas pela Ana (18/09/2026). O bloco `operacao` é o
   lado de dentro: como o time entrega, com que frequência e quem cuida. */

const TIPOS_ENTREGA = ['individual', 'coletiva', 'extra', 'bônus'];

const ENTREGAS = [
  /* ---------- Individuais ---------- */
  {
    nome: 'Fluxer (plataforma)',
    tipo: 'individual',
    descricao: 'A plataforma do Fluxo: um só lugar, com todo o conteúdo, as trilhas e as ferramentas do programa sempre à mão do mentorado.',
    frequencia: 'Contínua',
    responsavel: 'Time de no-code (Ramires, Gabriel José, Vitor, Nono)',
    operacao: 'É onde tudo acontece: cadastro do mentorado, plano de ação, análises com links, atendimento por WhatsApp, Academy, calls coletivas, Estúdio Criativo e releases do Severino. Atualizações são comunicadas em #nocode-comunicados-fluxer. Mentorado só tem acesso completo depois da reunião de integração.',
    links: [{ rotulo: 'Abrir Fluxer', url: 'https://flx.vendatodosantodia.com.br' }]
  },
  {
    nome: 'Navegador',
    tipo: 'individual',
    descricao: 'Acompanhamento individual de verdade: cada mentorado tem um Navegador que anda com ele no dia a dia, pode mandar mensagem todos os dias, quantas vezes quiser, acompanhando a execução de cada estratégia. Ninguém fica sozinho.',
    frequencia: 'Diária, seg a sex, 9h às 12h e 13h às 18h (horário das caixas)',
    responsavel: 'Navegadores; liderança: Fernanda Lizzardo e Ellen Cecilia',
    operacao: 'Atendimento pelo WhatsApp conectado ao Fluxer, com sugestões do NavMaster para revisar. Fora do horário, mensagem automática indica o Plantão do Fluxo 24h. O navegador cuida das ações da carteira no Fluxer (higiene: marcar resultado das ações, observações, temperatura), do link e da observação de cada análise, das renovações e da aprovação de sócios nos grupos. Contato ativo e renovação são acompanhados no Lázaro semanal.',
    links: [{ rotulo: 'NavMaster (aba Agentes)', url: '#/agentes' }, { rotulo: 'Plantão do Fluxo', url: 'https://severino-chat.vercel.app/' }]
  },
  {
    nome: 'Ajuste de velas (plano inicial)',
    tipo: 'individual',
    descricao: 'O plano inicial do mentorado. A calibragem de partida: onde o negócio está hoje e o rumo dos primeiros passos (o "acerto de rota" antes de acelerar).',
    frequencia: 'Uma vez, na entrada',
    responsavel: 'Time de Eventos e Entregáveis (copy e tarefa) e navegador',
    operacao: 'Entra como tarefa do plano de ação inicial, com prazo, depois da integração. A copy da tarefa é aprovada no #fluxo-evento-e-entregáveis (ex.: nova tarefa de ajuste de velas em 09/2026, ligada ao Retiro Levantamento de Caixa).',
    links: []
  },
  {
    nome: 'Reunião de diagnóstico',
    tipo: 'individual',
    descricao: 'Um raio-x inicial do negócio: situação atual, gargalos e oportunidades, que orienta todo o plano.',
    frequencia: 'Uma por ciclo (1 no pitch)',
    responsavel: 'Analisadores; agenda pelo Fluxer',
    operacao: 'É a primeira análise do mentorado (PA0, "DG"). O mentorado agenda pelo Fluxer; o navegador preenche a observação do navegador (pode usar o gerador de contexto) e confere o link da transmissão 24h antes. Trechos bons de diagnóstico viram prova social (#fluxo-diagnósticos).',
    links: [{ rotulo: 'Fluxer', url: 'https://flx.vendatodosantodia.com.br' }]
  },
  {
    nome: 'Planos de ação (4)',
    tipo: 'individual',
    descricao: 'Quatro planos de ação ao longo da jornada: o passo a passo claro do que executar em cada ciclo, sem achismo.',
    frequencia: 'Um a cada análise',
    responsavel: 'Analisador monta e libera; navegador acompanha a execução',
    operacao: 'Desde 09/09/2026 o analisador libera o plano direto para o mentorado: monta os entregáveis com prazo, define a data de entrega, usa "Concluir análise e liberar plano". Mentorado recebe e-mail; navegador recebe aviso no Slack. Regras: todo entregável tem prazo e a data do plano não pode ser anterior a nenhum deles. O plano de ação inteligente ajuda, mas não substitui a revisão do analisador.',
    links: []
  },
  {
    nome: 'Análises (4)',
    tipo: 'individual',
    descricao: 'Quatro reuniões com um especialista em marketing digital que mergulha no projeto inteiro e destrincha as estratégias macro passo a passo.',
    frequencia: 'Quatro por ciclo',
    responsavel: 'Analisadores; navegador garante link e observação; Fernanda cuida da automação',
    operacao: 'Agendadas pelo Fluxer. O link da StreamYard e do YouTube é criado pela automação de links das análises (relatório em #fluxo-links-analises); o que falhar o navegador cria na mão. Links e materiais precisam estar no Fluxer 24h antes (antes do evento, em caso de evento). O analisador não tem contato direto com o mentorado. Fechamento financeiro: só entram na competência (26 a 25) as análises concluídas até o dia 25; não há ajuste depois do fechamento.',
    links: [{ rotulo: 'Como funciona a automação de links', url: '#/projetos?q=links%20das%20an%C3%A1lises' }]
  },

  /* ---------- Coletivas ---------- */
  {
    nome: 'Fluxo Festival',
    tipo: 'coletiva',
    descricao: 'O grande encontro presencial da comunidade, 2 dias. É a chance de fazer networking de verdade e de conhecer o Leandro pessoalmente, com contato direto com ele, além de aprender ao vivo as melhores estratégias do mercado.',
    frequencia: 'Anual (edição de agosto/2026 realizada)',
    responsavel: 'Time de Eventos e Entregáveis',
    operacao: 'Seleção de mentorados palestrantes ("exemplos que inspiram"), desafio oficial com prêmios (1 ano de Fluxo, Ladeira Day), site de cobertura com fotos, playlists de depoimentos no YouTube. Bônus de renovação do Festival: Analisador Day Online.',
    links: []
  },
  {
    nome: '2 eventos online',
    tipo: 'coletiva',
    descricao: 'Dois eventos online ao vivo onde entregamos as melhores atualizações do mercado e construímos ferramentas poderosas junto com o mentorado.',
    frequencia: 'Dois por ciclo (ex.: Fluxo CrIAtivo, Fluxo Online)',
    responsavel: 'Time de Eventos e Entregáveis; navegadores em escala nas salas',
    operacao: 'Planejamento na Central de Gestão de Eventos: cronograma, escala dos naves por sala e turno, alinhamento de palestrantes, pré-requisitos, comunicação, links e pendências. Antes do evento saem: anúncio, reforço, escala por turno e materiais de apoio; no dia: escala por sala, link dos materiais e alinhamentos. Página de materiais em eventos.vtsd.com.br. Feedback pelo Tally.',
    links: [{ rotulo: 'Central de Gestão de Eventos', url: 'https://central-do-retiro.vercel.app/' }, { rotulo: 'Links de materiais (Monday)', url: 'https://venda-todo-santo-dia.monday.com/boards/2061768785' }]
  },
  {
    nome: 'Comunidade do Fluxo (WhatsApp)',
    tipo: 'coletiva',
    descricao: 'Comunidade no WhatsApp para troca constante: network, dúvidas e apoio direto com outros mentorados todos os dias.',
    frequencia: 'Contínua',
    responsavel: 'Fernanda Lizzardo (automações); navegadores aprovam sócios; Ester e Natasha na comunicação',
    operacao: 'Grupos por tema (Mentoria Fluxo Geral, Copy, Tráfego, Chat Caixa Rápido, Pro+Master). Entrada aprovada pelo robô (ativo, mentorado, com diagnóstico); sócios são aprovados pelo navegador depois de cadastrados no Fluxer. Inativos são removidos automaticamente às terças e sextas. Reclamação em grupo: print, exclusão da mensagem e registro. Comunicações programadas saem por um WhatsApp exclusivo.',
    links: [{ rotulo: 'Como funciona a automação de grupos', url: '#/projetos?q=exclus%C3%A3o%20de%20grupos' }]
  },
  {
    nome: 'Zoom semanal de tira-dúvidas',
    tipo: 'coletiva',
    descricao: 'Toda semana um encontro ao vivo por Zoom para tirar dúvidas: o mentorado não fica travado sem resposta.',
    frequencia: 'Semanal; em períodos de entrada, zooms diários (manhã e tarde) com escala de navegadores',
    responsavel: 'Time de Eventos e Entregáveis (link, escala, feedback); navegadores como host',
    operacao: 'Link curto fixo (vtsd.com.br/zoom-semanal ou vtsd.com.br/zoom-duvidas) apontando para a conta do Zoom da vez. Nos zooms diários, cada navegador fica 1 hora e passa o host ao próximo da escala (Conta 3). Feedback pelo Tally. Gravação na nuvem, backup e limpeza pelo time do Fluxo.',
    links: [{ rotulo: 'Zoom semanal', url: 'https://vtsd.com.br/zoom-semanal' }, { rotulo: 'Zoom tira-dúvidas', url: 'https://vtsd.com.br/zoom-duvidas' }]
  },
  {
    nome: 'Live semanal com o Leandro',
    tipo: 'coletiva',
    descricao: 'Perguntas e respostas ao vivo com o Leandro: a live inteira é para responder o que os mentorados trouxerem.',
    frequencia: 'Semanal (quartas, 14h)',
    responsavel: 'Time de Eventos e Entregáveis',
    operacao: 'Link criado no Terminus, evento na agenda da mentoria e no calendário do Fluxer, e-mail aos mentorados com botão de acesso conferido, comunicação aos naves com copy pronta. Em 16/09/2026: 294 mentorados ao vivo.',
    links: [{ rotulo: 'Link da live', url: 'https://vtsd.com.br/live-semanal-leandro' }]
  },
  {
    nome: 'Mandala 360',
    tipo: 'coletiva',
    descricao: 'Encontro ao vivo em que o time gira a Mandala e, a partir do que cai, monta ideias de anúncio na hora, direcionadas ao produto e ao momento do mentorado.',
    frequencia: 'Por turma do bônus (ex.: 16/09/2026, 10h)',
    responsavel: 'Time de Eventos e Entregáveis; especialistas e navegadores participam',
    operacao: 'Só para mentorados na lista do bônus do plano de ação (enviada pela Ester). Time entra com e-mail corporativo e coloca [FLUXO] antes do nome no Zoom. Roda em sala única, um especialista por vez, cerca de 2h30; proposta em análise: 2 salas simultâneas para reduzir a espera. Feedback: vtsd.com.br/feedback-mandala360 (nota 9,4 em 16/09).',
    links: [{ rotulo: 'Link da Mandala', url: 'https://vtsd.com.br/mandala360' }, { rotulo: 'Feedback', url: 'https://vtsd.com.br/feedback-mandala360' }]
  },
  {
    nome: 'Calls coletivas (tráfego, copy, produto)',
    tipo: 'coletiva',
    descricao: 'Calls em grupo com especialistas para dúvidas de tráfego, copy e produto, agendadas dentro do Fluxer.',
    frequencia: 'Semanal (quintas)',
    responsavel: 'Time de Eventos e Entregáveis cadastra a call; cada navegador vincula seus mentorados',
    operacao: 'Desde 09/2026 as calls coletivas são criadas e preenchidas no Fluxer (o MVP de agendamento do Felipe Faé foi desativado). Primeiro a call é cadastrada, depois cada navegador vincula os mentorados. Em semanas de evento as calls são suspensas.',
    links: [{ rotulo: 'Fluxer', url: 'https://flx.vendatodosantodia.com.br' }]
  },
  {
    nome: 'Retiro Black Friday',
    tipo: 'coletiva',
    descricao: 'O mentorado aprende com quem faz a melhor Black Friday do mercado há três anos: algumas das maiores Blacks do mercado saíram daqui.',
    frequencia: 'Anual; retiro em 28/08/2026 mais zooms semanais em setembro e outubro',
    responsavel: 'Time de Eventos e Entregáveis (Ana à frente da organização em 2026)',
    operacao: 'Página do retiro com cronograma (retiro-ultra-black-friday.vercel.app), aulas semanais com analisadores (API oficial, mid ticket, tráfego), materiais liberados só após o feedback, gravações enviadas ao pós-venda no padrão de solicitação de edição. Desafio da Mandala de 15/10 a 15/11.',
    links: [{ rotulo: 'Página do retiro', url: 'https://retiro-ultra-black-friday.vercel.app/' }, { rotulo: 'Playbook do Vilas Boas', url: 'https://playbook-black-friday.vercel.app/' }]
  },
  {
    nome: 'Analisador Day',
    tipo: 'coletiva',
    descricao: 'Dia inteiro de análise ao vivo com os analisadores, bônus de renovação oferecido no Fluxo Festival.',
    frequencia: 'Por edição (online em 22/09/2026)',
    responsavel: 'Time de Eventos e Entregáveis',
    operacao: 'Mentorados contemplados entram num grupo da entrega; link vtsd.com.br/analisador-day-online; transmissão em conta do Zoom sem conflito com outros eventos; feedback pelo Tally. Em 22/09: 22 de 33 ao vivo, NPS 100.',
    links: [{ rotulo: 'Link do Zoom', url: 'https://vtsd.com.br/analisador-day-online' }]
  },
  {
    nome: 'Ladeira Day e Hotseat com o Leandro',
    tipo: 'coletiva',
    descricao: 'Dia com o Leandro (Ladeira Day) e hotseat ao vivo: bônus para os 10 primeiros compradores de cada pico e para vencedores de desafios.',
    frequencia: 'Por pico (ex.: Ladeira Day do FLP em 08/12/2026)',
    responsavel: 'Clara agenda com o Leandro; Ester e Fernanda confirmam participantes',
    operacao: 'Entra na agenda do Leandro; o time confirma um a um com os contemplados. Grupos de WhatsApp de edições passadas são excluídos depois.',
    links: []
  },

  /* ---------- Extras ---------- */
  {
    nome: 'Retiro high ticket com IA',
    tipo: 'extra',
    descricao: 'Retiro para criar e vender produtos de high ticket usando IA: subir o ticket e faturar mais com a IA trabalhando a favor do mentorado.',
    frequencia: 'Por ciclo',
    responsavel: 'Time de Eventos e Entregáveis',
    operacao: 'Trilha High Ticket no Severino ainda sem as skills /ht-*; orientar pela skill vtsd-completo (módulo C10X).',
    links: []
  },
  {
    nome: 'Retiro do Instagram',
    tipo: 'extra',
    descricao: 'Retiro temático de Instagram para faturar mais no orgânico, sem precisar investir em tráfego: conteúdo, crescimento e vendas.',
    frequencia: 'Por ciclo',
    responsavel: 'Time de Eventos e Entregáveis',
    operacao: '[preencher: data e formato da próxima edição]',
    links: []
  },
  {
    nome: 'Retiro de clonagem do especialista (gravação)',
    tipo: 'extra',
    descricao: 'Conteúdo gravado que ensina a criar "clones" realistas do especialista (imagens e vídeo feitos no computador, sem gravar nada), para produzir e vender mesmo sem aparecer.',
    frequencia: 'Gravado (retiro em 23/07/2026)',
    responsavel: 'Time de Eventos e Entregáveis',
    operacao: 'Gravação e materiais na pasta do Drive do retiro; feedback pelo Tally.',
    links: []
  },
  {
    nome: 'Formação Claude (gravação)',
    tipo: 'extra',
    descricao: 'Formação gravada em Claude e Claude Code: skills, conectores, design e automação das tarefas que tomam tempo do mentorado.',
    frequencia: 'Gravado',
    responsavel: 'Ellen Cecilia, Gabriel José e Vitor',
    operacao: 'As aulas alimentam a trilha do Severino no Academy e a página de releases dentro do Fluxer.',
    links: []
  },
  {
    nome: 'IAF (Inteligência Artificial do Fluxo)',
    tipo: 'extra',
    descricao: 'A IA própria do Fluxo: as ferramentas e agentes de IA do programa com toda a inteligência da mentoria para aplicar em minutos.',
    frequencia: 'Contínua',
    responsavel: 'Fernanda Lizzardo e time de no-code',
    operacao: 'Ver a aba Agentes de IA: Fluxer Lab, Severino, Estúdio Criativo, NavMaster e agentes.',
    links: [{ rotulo: 'Agentes de IA', url: '#/agentes' }]
  },
  {
    nome: 'Desafio Mandala Mão na Massa',
    tipo: 'extra',
    descricao: 'Desafio prático baseado na Mandala do Fluxo: sair da teoria e rodar de verdade os melhores anúncios com o método.',
    frequencia: 'Edição 2026: 15/10 a 15/11',
    responsavel: 'Time de Eventos e Entregáveis',
    operacao: 'Tráfego pago vira pontuação extra, não critério de exclusão. Outros desafios recorrentes: Desafio Express de 14 dias, Desafio Puro Lucro (renovação), Desafio Skill de Tráfego. Inscrição e resultado pelo Tally e planilhas.',
    links: []
  },
  {
    nome: 'Retiro Levantamento de Caixa',
    tipo: 'extra',
    descricao: 'Retiro de dois dias para o mentorado levantar caixa com o método, com tarefa de ajuste de velas ligada ao evento.',
    frequencia: '08 e 09/10/2026, 9h30 às 17h50',
    responsavel: 'AnaBe (organização), Ellen e Fernanda',
    operacao: 'Primeiro evento planejado na Central de Gestão de Eventos: cronograma, escala, alinhamento, comunicação, links e pendências num só lugar.',
    links: [{ rotulo: 'URL do evento', url: 'https://vtsd.com.br/retiro-levantamento-de-caixa' }, { rotulo: 'Central de Gestão de Eventos', url: 'https://central-do-retiro.vercel.app/' }]
  },

  /* ---------- Bônus ---------- */
  {
    nome: 'Cursos bônus (vitalício condicional)',
    tipo: 'bônus',
    descricao: 'VTSD, Light Copy, Stories 10x, Super Ads, Automações Inteligentes, Filosofia Ladeira, Formação Claude e o Fórmula de Lançamento do Érico Rocha, inclusos de graça.',
    frequencia: 'Acesso durante a mentoria; vitalício para quem fechou no lançamento de 09/2026',
    responsavel: 'Financeiro (Lya) e relacionamento; regras: Ellen e Fernanda',
    operacao: 'Vitalício condicionado ao pagamento integral: cancelamento, inadimplência ou estorno (mesmo parcial) fazem perder o acesso. Vale só para o mentorado padrão e para os cursos citados no pitch; aditivo no contrato.',
    links: [{ rotulo: 'Transcrição de todos os produtos', url: 'https://transcricoes-academy.vercel.app/' }]
  },
  {
    nome: 'Cadeira de sócio',
    tipo: 'bônus',
    descricao: 'Um sócio incluso na oferta, com acesso à mentoria junto com o mentorado.',
    frequencia: 'Contínua',
    responsavel: 'Navegador (cadastro e grupos); comercial (matrícula)',
    operacao: 'O mentorado cadastra o sócio no Fluxer; só depois o navegador aprova a entrada dele nos grupos (o robô não aprova sócios). Sócio e mentorado não podem usar o mesmo e-mail na matrícula.',
    links: []
  },
  {
    nome: 'Fluxer Lab, Severino e Estúdio Criativo',
    tipo: 'bônus',
    descricao: 'Ferramentas de IA entregues além do pitch: Fluxer Lab (Hub, auditor de tráfego), Severino (Fluxo Criativo no computador) e Estúdio Criativo (anúncios no Fluxer).',
    frequencia: 'Contínua, com atualizações comunicadas aos mentorados',
    responsavel: 'Fernanda Lizzardo, Gabriel José e Nono',
    operacao: 'Comunicações de release saem pelo time de Eventos e Entregáveis; suporte de instalação do Severino com tutoriais e call de Claude.',
    links: [{ rotulo: 'Agentes de IA', url: '#/agentes' }]
  }
];
