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
    links: [{ rotulo: 'NavMaster (Projetos e agentes)', url: '#/projetos?q=navmaster' }, { rotulo: 'Plantão do Fluxo', url: 'https://severino-chat.vercel.app/' }]
  },
  {
    nome: 'Ajuste de velas (plano inicial)',
    tipo: 'individual',
    descricao: 'O plano inicial do mentorado. A calibragem de partida: onde o negócio está hoje e o rumo dos primeiros passos (o "acerto de rota" antes de acelerar).',
    frequencia: 'Uma vez, na entrada (prazo médio de 30 dias)',
    responsavel: 'Ellen Cecilia (regras), time de Eventos e Entregáveis (copy e tarefa) e navegador',
    operacao: 'Entra como plano de ação inicial, com prazo, depois da integração. Duas versões pelo nível de entrada (Ellen, 26/08/2026): Newbie (ainda não vendeu) recebe 26 tarefas; do Soft para cima (Soft, Hard, Pro, Pro Mais, Master) recebe 22 tarefas, direto para a preparação do diagnóstico. Em comum: boas-vindas, aulas "Conhecendo o Fluxer" (Manu) e "Como usar o Fluxer Academy" (Ana), aulas 1 a 14 do Filosofia Ladeira, Dicionário do Digital, pesquisa de mercado e quiz final de 9 perguntas (passa só com 100%). Só o Newbie tem concepção de produto, página de low ticket, primeiros anúncios e conta de anúncios. Desde 08/09/2026, na trilha Soft+, o Documento pré-análise (Google Doc) virou o "Check-in pré-análise": quiz de 17 perguntas respondido na própria tarefa do Fluxer; vale para planos novos. Mentorado sem plano de Ajuste de Velas depois da integração: avisar Fernanda e Ellen. O Retiro Levantamento de Caixa (08 e 09/10/2026) é o Ajuste de Velas ao vivo dos newbies deste pico.',
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
    operacao: 'Desde 09/09/2026 o analisador libera o plano direto para o mentorado: monta os entregáveis com prazo, define a data de entrega, usa "Concluir análise e liberar plano". Mentorado recebe e-mail; navegador recebe aviso no Slack. Regras: todo entregável tem prazo e a data do plano não pode ser anterior a nenhum deles; análise concluída é plano liberado em no máximo 24h (Sprint Navs, 28/09/2026). Todo plano atrasado precisa do motivo nas notas internas do plano (Ellen, 17/08/2026). O plano de ação inteligente ajuda, mas não substitui a revisão do analisador.',
    links: []
  },
  {
    nome: 'Análises (4)',
    tipo: 'individual',
    descricao: 'Quatro reuniões com um especialista em marketing digital que mergulha no projeto inteiro e destrincha as estratégias macro passo a passo.',
    frequencia: 'Quatro por ciclo',
    responsavel: 'Analisadores; navegador garante link e observação; Fernanda cuida da automação',
    operacao: 'Agendadas pelo Fluxer. O link da StreamYard e do YouTube é criado pela automação de links das análises (relatório em #fluxo-links-analises); o que falhar o navegador cria na mão. Links e materiais precisam estar no Fluxer 24h antes (antes do evento, em caso de evento). O analisador não tem contato direto com o mentorado. Fechamento financeiro: só entram na competência (26 a 25) as análises concluídas até o dia 25; não há ajuste depois do fechamento. Cota: cada assinatura dá 5 análises e a contagem zera na renovação. Regra de cancelamento (desde 28/09/2026, no Fluxer): 24h ou mais antes é cancelamento com antecedência e ninguém perde; menos de 24h, o mentorado perde 1 vaga e o analisador recebe 50% da tarifa; analisador pode cancelar sem multa (navegador justifica). Navegador ou gestão escolhe no plano um dos 4 caminhos (A ninguém perde, B compensação, C remarcar com o mesmo analisador em até 14 dias, D caso especial); no-show é registrado pelo analisador e decidido pelo navegador ou liderança. Ao mentorado não se fala de dinheiro nem de cota.',
    links: [{ rotulo: 'Como funciona a automação de links', url: '#/projetos?q=links%20das%20an%C3%A1lises' }]
  },

  /* ---------- Coletivas ---------- */
  {
    nome: 'Fluxo Festival',
    tipo: 'coletiva',
    descricao: 'O grande encontro presencial da comunidade, 2 dias. É a chance de fazer networking de verdade e de conhecer o Leandro pessoalmente, com contato direto com ele, além de aprender ao vivo as melhores estratégias do mercado.',
    frequencia: 'Anual (edição de agosto/2026 realizada)',
    responsavel: 'Time de Eventos e Entregáveis',
    operacao: 'Quem entrou até 30/06 vai para o Festival de agosto/2026; quem entrou a partir de 01/07 só tem direito ao Festival 2027; só mentorados ativos. Transferência de ingresso: o mentorado cadastra um substituto no Fluxer (Eventos > Fluxo Festival > Cadastrar substituto). Seleção de mentorados palestrantes ("exemplos que inspiram"), desafio oficial com prêmios (1 ano de Fluxo, Ladeira Day, palestra do Master Fluxo), fotos por reconhecimento facial em photofinder.vtsd.com.br, playlists de depoimentos no YouTube. Materiais de 2026: pastas Dia 1 e Dia 2 e gravações da cabine de anúncios no Drive (o navegador manda a pasta do seu mentorado). Bônus de renovação do Festival: Analisador Day Online.',
    links: [{ rotulo: 'Materiais Dia 1 (Drive)', url: 'https://drive.google.com/drive/folders/1PCiJvljTnmPmWAHLcRhERPg6yQYXd-gL' }, { rotulo: 'Materiais Dia 2 (Drive)', url: 'https://drive.google.com/drive/folders/1uyiEJblSdFGKyee1Vp6cj0SeCbbcnjp8' }, { rotulo: 'Cabine de anúncios (Drive)', url: 'https://drive.google.com/drive/folders/18h-GxRm2ep8qHzdzGNFRq6qoPXbe3pxF' }, { rotulo: 'Fotos (photofinder)', url: 'https://photofinder.vtsd.com.br/album/fluxo-festival-2026' }]
  },
  {
    nome: '2 eventos online',
    tipo: 'coletiva',
    descricao: 'Dois eventos online ao vivo onde entregamos as melhores atualizações do mercado e construímos ferramentas poderosas junto com o mentorado.',
    frequencia: 'Dois por ciclo (ex.: Fluxo CrIAtivo, Fluxo Online). Próximo: Fluxo Online Copia e Cola em 26, 27 e 28/11/2026 (qui, sex e sáb)',
    responsavel: 'Time de Eventos e Entregáveis (Fernanda e Ester); navegadores em escala nas salas',
    operacao: 'Fluxo Online Copia e Cola: dois dias para todos os mentorados e o sábado para Pro e Master; data já trocada na agenda de eventos da empresa, falta trocar nas outras agendas e no Fluxer (era 18 e 19/11). Planejamento no Monday do Fluxo Online e na Central de Gestão de Eventos: cronograma, escala dos naves por sala e turno, alinhamento de palestrantes, pré-requisitos, comunicação, links e pendências. Antes do evento saem: anúncio, reforço, escala por turno e materiais de apoio; no dia: escala por sala, link dos materiais e alinhamentos. Página de materiais em eventos.vtsd.com.br. Feedback pelo Tally.',
    links: [{ rotulo: 'Monday do Fluxo Online', url: 'https://venda-todo-santo-dia.monday.com/boards/18426402448' }, { rotulo: 'Central de Gestão de Eventos', url: 'https://central-do-retiro.vercel.app/' }, { rotulo: 'Links de materiais (Monday)', url: 'https://venda-todo-santo-dia.monday.com/boards/2061768785' }]
  },
  {
    nome: 'Comunidade do Fluxo (WhatsApp)',
    tipo: 'coletiva',
    descricao: 'Comunidade no WhatsApp para troca constante: network, dúvidas e apoio direto com outros mentorados todos os dias.',
    frequencia: 'Contínua',
    responsavel: 'Fernanda Lizzardo (automações); navegadores aprovam sócios; Ester, Ellen e Fernanda na comunicação (a Natasha saiu em 14/09/2026)',
    operacao: 'Grupos por tema (Mentoria Fluxo Geral, Copy, Tráfego, Chat Caixa Rápido, Pro+Master). Entrada aprovada pelo robô (ativo, mentorado, com diagnóstico); sócios são aprovados pelo navegador depois de cadastrados no Fluxer. Inativos são removidos automaticamente às terças e sextas. Reclamação em grupo: print, exclusão da mensagem e registro. Comunicações programadas saem por um WhatsApp exclusivo. Grupos com 30 pessoas ou mais não aceitam envio pelo Fluxer (trava de segurança, 09/2026): usar o WhatsApp do celular. Blacklist só para grupos de analisador e da mentoria, nunca o grupo oficial do mentorado, com aprovação da Fernanda e da Ellen.',
    links: [{ rotulo: 'Como funciona a automação de grupos', url: '#/projetos?q=exclus%C3%A3o%20de%20grupos' }]
  },
  {
    nome: 'Zoom semanal de tira-dúvidas',
    tipo: 'coletiva',
    descricao: 'Toda semana um encontro ao vivo por Zoom para tirar dúvidas: o mentorado não fica travado sem resposta.',
    frequencia: 'Semanal; em períodos de entrada, zooms diários (manhã e tarde) com escala de navegadores',
    responsavel: 'Time de Eventos e Entregáveis (link, escala, moderador, feedback); navegadores como host',
    operacao: 'Link curto fixo (vtsd.com.br/zoom-semanal ou vtsd.com.br/zoom-duvidas) apontando para a conta do Zoom da vez (etiqueta "zoom-duvida" na Terminus). Desde 10/09/2026 todo Zoom tem um moderador: inicia a reunião, aceita as pessoas, grava, gerencia a fila, marca o tempo de atendimento e envia o formulário de feedback no chat depois de cada atendimento (vale também quando o especialista é navegador; no Meet, o moderador precisa de e-mail vtsd). Nos zooms diários, cada navegador fica 1 hora e passa o host ao próximo da escala (Conta 3). Quando o time de Eventos e Entregáveis estiver off, a rotina de feedback passa para o navegador responsável. Gravação na nuvem, backup e limpeza pelo time do Fluxo.',
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
    nome: 'Calls coletivas (tráfego, copy, Claude e produto)',
    tipo: 'coletiva',
    descricao: 'Calls em grupo com especialistas para dúvidas de tráfego, copy, Claude/Severino e concepção de produto, agendadas dentro do Fluxer.',
    frequencia: 'Semanal (quintas, quatro calls no mesmo horário); inscrições fecham 20h antes',
    responsavel: 'Ester (ou AnaBe) cadastra a call no Fluxer; cada navegador vincula seus mentorados. Especialistas: Gabriel José (Claude), Léo e Darah (produto, alternando desde outubro), tráfego e copy',
    operacao: 'Quatro calls às quintas: tráfego, copy, Claude/Severino (Gabriel José, desde 27/08/2026) e Concepção de Produto (Léo, desde 27/08, limite de 5; entra quem já passou pelo diagnóstico e não avança o produto). Desde a semana de 21/09/2026 as calls são criadas no Fluxer, em Especialistas > "Calls coletivas" (o MVP do Felipe Faé foi desativado): "Nova call" > especialista e tipo > data e horário > links do Zoom e do YouTube. O navegador inscreve o mentorado em "Abrir" > "Inscrever mentorado" (pode usar "Identificar problema com IA"); os detalhes do mentorado precisam estar no Fluxer antes da call; para a call de Claude, até o fim do dia anterior. Limite de 5 por call; inscrições fecham 20 horas antes. Depois da call, quem criou marca como realizada. Em semanas de pico as calls são suspensas e os mentorados remanejados. O Léo recebe o link do StreamYard pronto; sem mentorado agendado, tirar a call da agenda dele (a Ester confere na quarta).',
    links: [{ rotulo: 'Fluxer', url: 'https://flx.vendatodosantodia.com.br' }]
  },
  {
    nome: 'Retiro Black Friday',
    tipo: 'coletiva',
    descricao: 'O mentorado aprende com quem faz a melhor Black Friday do mercado há três anos: algumas das maiores Blacks do mercado saíram daqui.',
    frequencia: 'Anual; retiro em 28/08/2026 mais zooms semanais em setembro e outubro',
    responsavel: 'Time de Eventos e Entregáveis (Ana à frente da organização em 2026)',
    operacao: 'O Retiro Black Friday 2026 está no Academy desde 03/09/2026 (a página do retiro aponta para lá; a página antiga do retiro está desatualizada e não deve ser compartilhada). Zooms semanais com analisadores, todos disponibilizados no Fluxer: mid ticket (Igor Braga, 04/09), divulgação de produto mid (Felipe Matheus, 10/09), API oficial, oferta e mote (Rafa, 18/09), campanhas (Ângela, 16/10). Feedback por tema no Tally (concepção GxO57z, divulgação xX8vok, oferta e mote b51vG7, captura PdZkyx, campanhas vG8K14; retiro MeZy9E); materiais liberados só após o feedback; gravações vão ao pós-venda no padrão de solicitação de edição e também serão liberadas aos mentorados. Cronograma e materiais na pasta da RTG em Eventos > Retiro Black. Desafio da Mandala de 15/10 a 15/11.',
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
    frequencia: 'Por pico. Confirmados pelo Leandro em 30/09/2026: Ladeira Days em 16/11, 18/11 e 08/12/2026; hotseat do SPP a tentar em 30/11',
    responsavel: 'Fernanda registra a agenda do Leandro; Ester e Fernanda confirmam participantes',
    operacao: 'Entra na agenda do Leandro; o time confirma um a um com os contemplados. O Ladeira Day de 23/11 e o hotseat de 16/11 foram excluídos da agenda dele em 28/09/2026. Ainda há 2 Ladeira Days e 2 hotseats online (SPP com IA de julho e de agosto) a entregar. O 2º lugar do Desafio do Fluxo Festival entra no Ladeira Day com menos gente. Jantar dos ganhadores do Desafio Express provisoriamente em 16/12. A Ester sugeriu marcar em segunda, quarta ou sexta. Grupos de WhatsApp de edições passadas são excluídos depois.',
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
    operacao: 'Data e formato da próxima edição ainda não foram definidos pelo time de Eventos e Entregáveis.',
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
    operacao: 'Ver a seção Agentes de IA em Projetos e agentes: Fluxer Lab, Severino, Estúdio Criativo, NavMaster e agentes.',
    links: [{ rotulo: 'Agentes de IA', url: '#/projetos?categoria=Agentes+de+IA' }]
  },
  {
    nome: 'Desafio Mandala Mão na Massa',
    tipo: 'extra',
    descricao: 'Desafio prático baseado na Mandala do Fluxo: sair da teoria e rodar de verdade os melhores anúncios com o método.',
    frequencia: 'Edição 2026: 15/10 a 15/11 (mudou por causa das eleições)',
    responsavel: 'Time de Eventos e Entregáveis (Ester); regras com Fernanda e Ellen',
    operacao: 'Critério principal de participação, na comunicação e no formulário de inscrição: ter um produto no ar ("tem produto rodando? pode participar; não tem? não pode"). Separar em 4 ou 5 grupos para ter menos gente por grupo. Tráfego pago vira pontuação extra, não critério de exclusão. Inclui a estratégia de funil de live desenhada com o Gabriel Vilas Boas, dentro do plano da Black (setembro: aulas semanais de concepção de produto; outubro: Desafio da Mandala; novembro: Black dos mentorados). A Ester manda em áudio para a Ana o que centralizar por semana. Outros desafios: Desafio Express de 14 dias (jun/26, 4 ganhadores, jantar com o Leandro), Desafio Skill de Tráfego (jul/26), Desafio do Fluxo Festival (ago/26) e Desafio Puro Lucro (só para quem está em renovação; edição de 16 a 31/08/2026 com aulão em 12/08, comprovação até 14/09 e prêmios de análise com o Ruy, análise de funil com a Fernanda e debriefing do lançamento pago do VTSD). Todos os desafios ficam num quadro do Monday com planilhas de inscrição e final; inscrição e resultado pelo Tally.',
    links: [{ rotulo: 'Monday dos desafios', url: 'https://venda-todo-santo-dia.monday.com/boards/18394558591' }, { rotulo: 'Página do Desafio Puro Lucro', url: 'https://vtsd.com.br/desafio-puro-lucro' }, { rotulo: 'Página do Desafio Express', url: 'https://desafio-express-do-fluxo.vercel.app/' }]
  },
  {
    nome: 'Retiro Levantamento de Caixa',
    tipo: 'extra',
    descricao: 'Retiro online de dois dias com a estratégia de low ticket para levantar caixa: é o Ajuste de Velas ao vivo dos newbies deste pico, aberto a todos os mentorados.',
    frequencia: '08 e 09/10/2026, 9h30 às 17h50 (Zoom dos dois dias na conta 2)',
    responsavel: 'Ester (execução); AnaBe (plataforma de eventos e feedbacks); Ellen e Fernanda (regras)',
    operacao: 'Definições do sprint de 29/09/2026: mesma estratégia do caixa rápido; a gravação vira a aula dos próximos picos; navegadores podem ser convidados a dar aula e podem recusar. Comunicação para todos os mentorados nos grupos tradicionais, participa quem quiser, sem grupo do evento; a copy deixa claro que é um retiro de low ticket. Pré-requisitos (conta na Hotmart, ChatGPT, Google e o que as palestras pedirem) numa página com passo a passo, links e vídeos, não em Drive. Todo palestrante assina termo de imagem; Felipe Faé no lugar do Dudu para a palestra de e-book, se aceitar. Mentorado sem integração assiste à gravação. Primeiro evento 100% na Central de Gestão de Eventos (teste): cronograma, escala, alinhamento, copys (mentorados, naves e palestrantes, já na plataforma e a revisar), links e pendências; a Ana recebe os feedbacks da plataforma e reporta no canal.',
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
    descricao: 'Um sócio gratuito para quem comprou oferta de Pico ou Renovação, participando dos entregáveis junto com o mentorado; no perpétuo e a partir do segundo sócio, só com pagamento.',
    frequencia: 'Contínua',
    responsavel: 'Titular cadastra no Fluxer; navegador confere e aprova nos grupos; comercial vende sócio adicional; gestão (Ramires, Érica) cuida de contrato e casos especiais',
    operacao: 'Compradores de Pico e Renovação ("Direito a sócio") têm 1 sócio gratuito; perpétuo só mediante pagamento, ou depois de uma renovação paga (sinal em evento não conta); segundo sócio sempre pago (oferta de sócio vendida pelo comercial). Desde 16/09/2026 o titular cadastra em Fluxer > perfil > sócios: sócio gratuito se ainda há crédito na oferta; pagante quando não há, confirmando e-mail e código Hotmart da compra. O sócio não tem acesso ao Fluxer: o cadastro serve para controle e contrato. Só sócio pagante gera contrato (ZapSign, na hora; o titular fica bloqueado até a assinatura ou liberação pela gestão). Editar ou excluir: gratuito e pago sem contrato, o titular pode; com contrato ou criado pela gestão, só a gestão. Dúvida sobre direito a sócio vai primeiro ao #fluxo-comercial-duvidas; só depois da confirmação o navegador aprova nos grupos (o robô não aprova sócios). Após o fechamento, o navegador precisa saber se há sócio pagante para cobrar o cadastro e o contrato. Sócio e mentorado não podem usar o mesmo e-mail na matrícula.',
    links: []
  },
  {
    nome: 'Fluxer Lab, Severino e Estúdio Criativo',
    tipo: 'bônus',
    descricao: 'Ferramentas de IA entregues além do pitch: Fluxer Lab (Hub, auditor de tráfego), Severino (Fluxo Criativo no computador) e Estúdio Criativo (anúncios no Fluxer).',
    frequencia: 'Contínua, com atualizações comunicadas aos mentorados',
    responsavel: 'Fernanda Lizzardo, Gabriel José e Nono',
    operacao: 'Comunicações de release saem pelo time de Eventos e Entregáveis; suporte de instalação do Severino com tutoriais e call de Claude.',
    links: [{ rotulo: 'Agentes de IA', url: '#/projetos?categoria=Agentes+de+IA' }]
  }
];
