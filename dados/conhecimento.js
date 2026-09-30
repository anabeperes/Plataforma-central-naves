/* Perguntas frequentes e combinados da operação, para o assistente (aba Perguntar).
   Cada item: pergunta (do jeito que alguém pergunta), resposta (o combinado, com nome e data),
   tema, quem (quem sabe mais), fonte (onde foi dito no Slack) e links.
   Entra no system prompt do assistente (api/_base.js). Nunca coloque senha, código de acesso,
   CNPJ, ID de produto, telefone ou e-mail de mentorado aqui.
   Origem inicial: varredura das perguntas da Clara no Slack (29/09/2026), ver LEVANTAMENTO-CLARA.md.
   Leva 1 do Slack (30/09/2026): 15 canais lidos de 01/08 a 30/09/2026, ver DECISOES.md. */

const SUGESTOES_CHAT = [
  'Quando é o Ladeira Day dos 10 primeiros do FLP?',
  'Qual é a oferta do Fluxo nos zooms do VTSD?',
  'Mentorados têm acesso de graça ao SPP ou ao FLP?',
  'Quem tem direito a sócio e como cadastra no Fluxer?',
  'Para onde vai o pedido de cancelamento?',
  'Quem cuida de links de pagamento e importação na Hotmart?'
];

const CONHECIMENTO = [
  /* ---------- entregas e bônus dos picos ---------- */
  {
    pergunta: 'Qual é a diferença entre Ladeira Day e Analisador Day?',
    resposta: 'Desde 30/01/2026 a entrega aos 10 primeiros de cada pico passou a se chamar Analisador Day: um dia de análise com os analisadores (Leo e Rafael ou Felipe), não mais com o Leandro. A Clara reforçou: "não temos mais Ladeira Day, e sim Analisador Day". Exceção: em 23/09/2026 o Leandro prometeu um Ladeira Day para os 10 primeiros do pico FLP de setembro/2026, e em 30/09/2026 confirmou três Ladeira Days (16/11, 18/11 e 08/12/2026).',
    tema: 'Entregas dos picos',
    quem: 'Ester (organização), Fernanda e Ellen',
    fonte: '#fluxo-time-rtg 30/01/2026; #fluxo-evento-e-entregáveis 23/09/2026 e 30/09/2026'
  },
  {
    pergunta: 'Quando são os Ladeira Days, o hotseat do SPP e o jantar com o Leandro no fim de 2026?',
    resposta: 'Em 30/09/2026 a Fernanda registrou que o Leandro confirmou os Ladeira Days em 16/11, 18/11 e 08/12/2026 (quem registrou a agenda do Leandro foi a Fernanda). O Ladeira Day de 23/11 foi excluído da agenda dele em 28/09, assim como o hotseat que estava em 16/11, que o time vai tentar trocar para 30/11. O jantar com os ganhadores do Desafio Express de 14 dias depende de confirmação do Leandro; a Fernanda colocou provisoriamente em 16/12 (12/11 tem o Plat 10+). A Ester sugeriu marcar Ladeira Day em segunda, quarta ou sexta, para ter mais gente na empresa. Ainda há 2 Ladeira Days e 2 hotseats online (SPP com IA de julho e de agosto) a entregar.',
    tema: 'Entregas dos picos',
    quem: 'Fernanda Lizzardo (agenda do Leandro), Ester Barbosa (confirmações e grupo do WhatsApp)',
    fonte: '#fluxo-evento-e-entregáveis, 10/09/2026 (Ester), 28/09/2026 e 30/09/2026 (Fernanda)'
  },
  {
    pergunta: 'O hotseat dos 10 primeiros do SPP com IA já tem data?',
    resposta: 'Ainda não. O hotseat que estava em 16/11/2026 foi excluído da agenda do Leandro em 28/09/2026; o time vai tentar trocar para 30/11/2026. Ainda há 2 hotseats online a entregar (SPP com IA de julho e de agosto). Enquanto não há data, avaliar o contexto de cada mentorado antes de avisar os ganhadores, para não gerar expectativa.',
    tema: 'Entregas dos picos',
    quem: 'Fernanda Lizzardo (agenda do Leandro), Ester Barbosa',
    fonte: '#fluxo-evento-e-entregáveis, 28/09/2026 (Fernanda); #fluxo-infos-navegadores 10/09/2026 (Ester)'
  },
  {
    pergunta: 'Qual foi o critério dos 10 primeiros do SPP com IA de agosto e como comunicar?',
    resposta: 'O horário considerado é o do primeiro pagamento (sinal) no dia do evento, no momento do pitch; a diferença entre o 1º e o 10º foi de menos de 12 segundos. Não compartilhar dados internos (horários dos outros) com o mentorado. Os ganhadores podem ser comunicados, mas como o hotseat com o Ladeira ainda não tem data, avaliar o contexto de cada mentorado antes de avisar. A lista dos 10 está na mensagem da Ester de 10/09/2026 em #fluxo-infos-navegadores (não fica na central).',
    tema: 'Entregas dos picos',
    quem: 'Ester Barbosa',
    fonte: '#fluxo-infos-navegadores, 10/09/2026 (Ester, thread com Aline Carvalho em 28/09); #fluxo-time-rtg 10/09/2026'
  },
  {
    pergunta: 'Como organizar a entrega dos 10 primeiros de um pico?',
    resposta: 'Passos que a Clara definiu: 1. O comercial (João Pedro) fecha a lista dos 10 primeiros com status de pagamento. 2. Entrar em contato com eles. 3. Criar o grupo do WhatsApp (Ester). 4. Pedir para todos entrarem. 5. Enviar a primeira mensagem avisando o dia. 6. Subir as pessoas no Active com a tag [FLX] [10 primeiros] [nome do pico]. 7. Colocar a data na agenda do Leandro ou dos analisadores. Se for presencial, organizar passagem e hospedagem.',
    tema: 'Entregas dos picos',
    quem: 'João Pedro Gandara (lista), Ester (grupo e agenda); Active com o relacionamento (Robson Rodrigues; a Tassia está em licença-maternidade)',
    fonte: '#fluxo-comercial-duvidas 11/09/2025, 05/11/2025 e 29/09/2026'
  },
  {
    pergunta: 'O Analisador Day online é no Zoom ou no Meet?',
    resposta: 'Pelo Meet, porque são poucas pessoas (decisão da Clara em 03/09/2026). A transmissão do Analisador Day de 22/09/2026 foi feita pela conta 6 do Zoom, não pela conta RTG1. Página do evento: vtsd.com.br/analisador-day-online.',
    tema: 'Entregas dos picos',
    quem: 'Ester, Leo e Felipe (analisadores)',
    fonte: '#rtg-zoom 03/09/2026; #fluxo-evento-e-entregáveis 21/09/2026',
    links: ['https://vtsd.com.br/analisador-day-online']
  },
  {
    pergunta: 'Qual é o padrão para enviar o contexto dos mentorados aos analisadores (Analisador Day)?',
    resposta: 'Depois de o Léo reclamar na véspera do Analisador Day de 22/09/2026 que não sabia da quantidade de mentorados (o material tinha sido enviado em 09/09 sem alteração), a Ana propôs um modelo padrão: nome do evento e data; origem do bônus (ex.: renovados no Fluxo Festival); quantidade de mentorados; link do controle de grupo com o contexto dos mentorados. Quem tinha direito ao Analisador Day online de 22/09: todos que renovaram no FF2025 (31 ativos de 39 contratos). Estruturar como o presencial, só que online. A data foi trocada de 10/09 para 22/09 por causa do Hotmart Fire. A planilha de controle de grupo está nas mensagens de 18/08 e 22/09 em #fluxo-evento-e-entregáveis (tem dados de mentorados, não fica na central).',
    tema: 'Entregas dos picos',
    quem: 'AnaBe, Fernanda Lizzardo',
    fonte: '#fluxo-evento-e-entregáveis, 18 a 21/08/2026 (Fernanda, Natasha), 22/09/2026 (AnaBe)'
  },
  {
    pergunta: 'Os bônus da Black (encontro dos 50 primeiros, Portfel) são com quem?',
    resposta: 'Com o Grupo Primo. A RTG não tem acesso a esses bônus: o mentorado precisa entrar em contato com o Grupo Primo. Não existe encontro dos 10 primeiros da Black em Brasília; o encontro é para os 50 primeiros e a data depende do Grupo Primo.',
    tema: 'Entregas dos picos',
    quem: 'Clara',
    fonte: '#fluxo-time-rtg 07/01/2026 e 03/08/2026'
  },
  {
    pergunta: 'O que são os bônus dos planos de ação 1, 2 e 4 e como liberar?',
    resposta: 'Bônus dos planos 1 e 2: call com especialista (copy ou tráfego; quem escolhe é o navegador), roda 1x por semana, sem regra de validade escrita; só vale se o plano foi entregue no prazo e sem tarefa dispensada. Bônus do plano 4: acesso às palestras da Mentoria Fluxo que eram exclusivas de Pro+Master (não é o conteúdo do Master Fluxo, que é só de membros do Master). Liberação: registrar no quadro de bônus do Monday; quem muda o status é a Ester; a liberação é feita pela página de mentorados do Fluxer, acrescentando a turma "FLX Premiação" (Érica, 15/09/2026), não por atribuição de módulo bônus no Academy; na ausência da Ester, Érica ou Lívia. Também existe o bônus Mandala 360 (lista da Ester).',
    tema: 'Entregas dos picos',
    quem: 'Fernanda Lizzardo, Ester Barbosa, Érica, Lívia Vieira',
    fonte: '#fluxo-time-rtg, 03/08/2026 (Darah, Ester, Ruam), 12/08/2026 (Felipe Pacheco, Fernanda) e 15/09/2026 (Dian, Lívia); #fluxo-evento-e-entregáveis 14 e 15/09/2026 (Tassia, Érica)'
  },
  {
    pergunta: 'Time do mentorado (gestor de tráfego, etc.) pode entrar nos entregáveis?',
    resposta: 'Não. Só o mentorado padrão e o sócio têm acesso a entregável. Se alguém do time de um mentorado for identificado no Zoom, pode derrubar (sprint de 29/09/2026). No Analisador Day online, sócios podem participar "por ser online" (Fernanda, 20/08/2026). Em andamento: ex-mentorados entraram no Zoom com o Leandro pelo mesmo link; a senha no Zoom vai ser testada e, se o risco de mentorado ficar de fora for grande, o link passa a ser trocado no Terminus. A Ana vai conversar com o José sobre validar o e-mail do Fluxer antes de a pessoa chegar ao Zoom.',
    tema: 'Entregas dos picos',
    quem: 'Fernanda Lizzardo, Ellen Cecilia, AnaBe',
    fonte: '#fluxo-evento-e-entregáveis, 20/08/2026 e 29/09/2026 (Fernanda)'
  },

  /* ---------- acesso a eventos, produtos e gravações ---------- */
  {
    pergunta: 'Mentorados do Fluxo têm acesso de graça aos picos (SPP, FLP, imersões)?',
    resposta: 'Ao vivo, não: Clara e Ellen decidiram não liberar a participação, porque os picos são conteúdo básico que os mentorados já deveriam estar implementando na mentoria (mesma lógica dos retiros), e o FLP de setembro/2026 é feito com o Érico, o que tornaria inviável abrir para toda a mentoria. Gravações e materiais, sim: em 29/09/2026 a Clara autorizou compartilhar a gravação e os materiais do FLP com os mentorados (a gravação que vai para o Academy é liberada para todos; a Lívia organiza no Academy no padrão de solicitação de edição e a Ester acompanha). A gravação do SPP com IA de agosto já foi liberada no Fluxer em 11/09/2026. As gravações das aulas do Retiro da Black também serão liberadas; a Fernanda pediu para avisar os navs (18/09). Exceção registrada: alunos do VTSD vitalício participaram do SPP com IA de agosto/2026 de graça.',
    tema: 'Acessos',
    quem: 'Clara Coppola, Fernanda Lizzardo, Lívia Vieira, Ester Barbosa',
    fonte: '#fluxo-time-rtg 01/09/2025, 23/02/2026, 17/08/2026, 19/08/2026, 11/09/2026 e 29/09/2026 (Clara); #fluxo-evento-e-entregáveis 18/09/2026 e 29/09/2026 (Fernanda)'
  },
  {
    pergunta: 'Quando a gravação do SPP fica disponível e por quanto tempo?',
    resposta: 'O time tem até 7 dias para subir a gravação na área de membros, e ela fica disponível por 15 dias, porque o SPP não está dentro do Fluxer. Depois que a pessoa entra na mentoria, tem muito mais conteúdo.',
    tema: 'Acessos',
    quem: 'Clara, Tamiris (área de membros)',
    fonte: '#fluxo-comercial-duvidas, 21/03/2026'
  },
  {
    pergunta: 'Quando sai a gravação da imersão FLP para quem comprou e os materiais continuam disponíveis?',
    resposta: 'A gravação da Imersão Fórmula de Lançamento Pago fica disponível em até 7 dias úteis após o fim do evento. Os materiais estão inclusos na compra da gravação e continuam disponíveis; enquanto a gravação não sai, seguem acessíveis pela página do evento.',
    tema: 'Acessos',
    quem: 'Lívia Vieira',
    fonte: '#fluxo-comercial-duvidas, 29/09/2026 (Lívia Vieira)',
    links: ['https://eventos.vtsd.com.br/evento/formula-de-lancamento-pago/']
  },
  {
    pergunta: 'Quem tem acesso à Formação Claude (curso de Claude Code)?',
    resposta: 'É a formação que o Vitor entrega ao vivo para os mentorados do Fluxo. As aulas também são subidas para esses alunos. Quem comprou o downsell recebe a gravação. Quem tem a Black vitalícia tem acesso à gravação.',
    tema: 'Acessos',
    quem: 'Clara, Vitor',
    fonte: '#fluxo-time-rtg 03/06/2026; #evento-flp 04/07/2026'
  },
  {
    pergunta: 'Dá para liberar a gravação de um produto ao vivo (ex.: Meu Produto Pronto) para um mentorado?',
    resposta: 'Não. A liberação seria para a turma inteira, não dá para liberar só para uma pessoa, e o produto não existe para compra. Fernanda reforçou o risco de plágio: produto só ao vivo. A gravação separada de uma imersão também não é vendida.',
    tema: 'Acessos',
    quem: 'Clara e Fernanda',
    fonte: '#fluxo-time-rtg 20/04/2026 e 24/08/2026'
  },
  {
    pergunta: 'O cupom do Manychat tem validade?',
    resposta: 'Sim: 3 meses depois do dia da ativação. Se o cupom não funciona, pedir o e-mail do mentorado e um print de onde dá erro, com o caminho.',
    tema: 'Acessos',
    quem: 'Érica',
    fonte: '#fluxo-time-rtg 27/11/2025, 26/03/2026 e 23/04/2026'
  },
  {
    pergunta: 'Qual é o horário da reunião de integração dos novos mentorados?',
    resposta: 'Não é mais fixo às 15h. O Robson publica a agenda com dia e hora no #fluxo-comercial-duvidas, e o link fica no Fluxer. Exemplo de 24/08/2026: 25/08 15h, 27/08 15h30, 31/08 15h, 02/09 11h, 04/09 15h. Agenda de 29/09/2026: 29/09 (ter) 9h, 30/09 (qua) 10h, 02/10 (sex) 10h, 05/10 (seg) 10h, 07/10 (qua) 16h, 09/10 (sex) 10h. Mentorado que não consegue nenhum horário (ou grupo de sócios que precisa entrar junto): mandar os dados no canal e o Robson marca um horário alternativo. A integração de 28/09 teve 40 mentorados na sala. Só depois da integração o mentorado tem acesso completo.',
    tema: 'Acessos',
    quem: 'Robson Rodrigues',
    fonte: '#fluxo-comercial-duvidas, 24/08/2026 e 29/09/2026 (Robson Rodrigues); 15/09/2026 (Mateus Brandão, Tassia)'
  },
  {
    pergunta: 'O mentorado fechou e não recebeu o token do Fluxer. O que fazer?',
    resposta: 'Acionar o Rodolfo ou o Vitão (no-code). Em 30/05/2026, 12 pessoas ficaram sem token e o Rodolfo ajustou no mesmo dia; os tokens pendentes foram enviados pela Ellen. O ideal, segundo a Clara, é mandar direto o link do token.',
    tema: 'Acessos',
    quem: 'Rodolfo e Vitão (Fluxer), Ellen',
    fonte: '#fluxo-comercial-duvidas, 30/05/2026'
  },
  {
    pergunta: 'Qual conta do Zoom o Fluxo usa e quem configura?',
    resposta: 'Nos picos, o Fluxo usa a conta 6 (salas 1 a 4 do SPP e conta 5 para formação, definido em 26/06/2026). A conta 01 é reservada pela Clara para eventos com o Leandro. Configuração de salas e links: Érica e Taynáh (a Natasha foi desligada em 14/09/2026); links de teste não devem pedir registro. Quem monitora os zooms do Fluxo é o time do Fluxo, não o suporte.',
    tema: 'Acessos',
    quem: 'Érica, Taynáh',
    fonte: '#rtg-zoom 15/07/2025, 26/06/2026 e 18/08/2026; #fluxo-infos-navegadores 17/07/2025 e 14/09/2026'
  },
  {
    pergunta: 'Onde está o PPT (apresentação) da reunião de integração?',
    resposta: 'Fica no Canva, no link abaixo. É a apresentação usada na reunião de integração dos mentorados novos; serve para apresentar ou para consultar o que é dito na integração. O arquivo é editável, então não altere sem combinar com a Ellen. A newsletter saiu do slide de integração (pedido da Ellen, 09/2026).',
    tema: 'Acessos',
    quem: 'Ellen e Robson (integração)',
    fonte: 'Enviado pela Ana em 30/09/2026; #fluxo-evento-e-entregáveis 29/09/2026',
    links: ['https://www.canva.com/design/DAHWOjnohqw/JiKGpncaF-XLgyKC6tiw0w/edit']
  },
  {
    pergunta: 'Materiais do Academy não baixam (erro). Por quê?',
    resposta: 'O Xano, onde os materiais eram hospedados, não existe mais; alguns materiais dão erro ao baixar. O time de produtos está atualizando. Caminho indicado: Monday > Central de Links da Mentoria > Materiais Eventos.',
    tema: 'Acessos',
    quem: 'Ester Barbosa',
    fonte: '#fluxo-infos-navegadores, 27/08/2026 (Ester)',
    links: ['https://venda-todo-santo-dia.monday.com/boards/2061768785']
  },
  {
    pergunta: 'Mentorado que encerrou o ciclo pede acesso ao Fluxer para pegar um material. Pode reativar?',
    resposta: 'Regra: não reativa. A Érica pode buscar o material específico (gravação da última análise, último plano de ação) para o navegador repassar. Exceção pontual aprovada pela Fernanda em 22/09/2026: liberar por 48 horas, deixando claro que é exceção e que o acesso será bloqueado de novo.',
    tema: 'Acessos',
    quem: 'Érica, Fernanda Lizzardo',
    fonte: '#fluxo-duvidas-financeiro, 21 e 22/09/2026 (AnaBe, Érica, Fernanda)'
  },

  /* ---------- atendimento e regras dos navegadores ---------- */
  {
    pergunta: 'Posso responder a dúvida do mentorado só com o link da aula?',
    resposta: 'Não. Desde 21/09/2026 não é permitido responder dúvida com link de aula. A resposta vai no WhatsApp, personalizada para o negócio do mentorado (de preferência a estratégia macro em áudio); a aula ou o tutorial entram só como complemento, depois da resposta, e só quando fizerem sentido. Motivo: quem pergunta já travou e muitas vezes já viu a aula; link direto fere o "atendimento educativo (nada é óbvio)" e a personalização.',
    tema: 'Atendimento',
    quem: 'Ellen Cecilia',
    fonte: '#fluxo-infos-navegadores, 21/09/2026 (Ellen); Sprint Navs 28/09/2026 (Fernanda)'
  },
  {
    pergunta: 'Devo mandar áudio e gravação de tela para o mentorado?',
    resposta: 'Sim, desde 28/09/2026, a pedido do Leandro: mais áudios e gravação de tela para dúvida técnica, para um atendimento mais próximo e humanizado. Regras: áudio de até 1 minuto, sem sequência de vários áudios; se o mentorado não gosta de áudio, seguir no texto. O NavMaster continua como base: em vez de copiar a sugestão, o navegador lê e grava o áudio com as próprias palavras. Antes o áudio era evitado por causa das substituições de carteira; com o WhatsApp dentro do Fluxer isso deixou de ser problema.',
    tema: 'Atendimento',
    quem: 'Ellen Cecilia',
    fonte: '#fluxo-infos-navegadores, 28/09/2026 (Ellen); Sprint Navs 28/09/2026 (Fernanda)'
  },
  {
    pergunta: 'O que tem que estar registrado nas notas internas do plano e nas notas do navegador?',
    resposta: 'Dois registros obrigatórios desde 17/08/2026: 1. Todo plano de ação atrasado precisa do motivo do atraso nas notas internas do plano, plano por plano (100% dos atrasados), registrado na hora em que falar com o mentorado (cobrança, dispensa de tarefa, combinado de prazo, atualização de contexto). 2. Notas do navegador em toda análise, mesmo sem dado novo, e obrigatoriamente qualquer feedback de copy já enviado ao mentorado. Evolução: 25/08, 444 atrasados e 347 sem nota; 02/09, 223 sem nota (de 449); 28/09, 192 sem nota (de 428), com plano atrasado em 33,5% (meta de 35% batida). Quem quiser a lista nominal da carteira pede à Ellen no canal individual.',
    tema: 'Atendimento',
    quem: 'Ellen Cecilia',
    fonte: '#fluxo-infos-navegadores 17/08, 25/08 e 02/09/2026 (Ellen); Sprint Navs 27/08 e 28/09/2026 (Fernanda)'
  },
  {
    pergunta: 'O que fazer antes de sair de férias, folga ou suspensão programada?',
    resposta: 'Revisar as promessas feitas aos mentorados (principalmente feedbacks) e entregar o que ficou combinado antes da ausência. O relacionamento segura o WhatsApp durante ausências, mas entra sem saber as datas combinadas e demora mais por não ter o contexto.',
    tema: 'Atendimento',
    quem: 'Ellen Cecilia',
    fonte: '#fluxo-infos-navegadores, 08/09/2026 (Ellen)'
  },
  {
    pergunta: 'Quem faz o feedback de copy dos mentorados?',
    resposta: 'O navegador de cada mentorado, inclusive os pedidos que já estavam no quadro do Monday. O quadro de feedbacks do Monday foi arquivado em 14/09/2026 (o "Monday de feedbacks" da Natasha já estava off desde as férias dela, 20/08). Ferramentas de apoio: transcrições das análises, Severino para revisar a copy dentro da metodologia e Claude. Todo feedback enviado precisa ficar nas notas do navegador.',
    tema: 'Atendimento',
    quem: 'Ellen Cecilia',
    fonte: '#fluxo-infos-navegadores, 14/09/2026 (Ellen); #fluxo-time-rtg 20/08/2026 (Natasha)'
  },
  {
    pergunta: 'Posso indicar um prestador de serviço (ou um mentorado) para outro mentorado?',
    resposta: 'Não, nem entre mentorados. Indicação de prestação de serviço não pode partir do time (vira argumento de "contratei quem vocês indicaram" se der errado). Orientar o mentorado a buscar no Fluxer Hub (Fluxer Lab) e nos grupos. Facilitação aceita no Lázaro de 08/09/2026: "conectar mentorado com mentorado" via post no canal dos navegadores para quem procura coprodutor (caso feito pelo Robson), sem indicação direta do navegador.',
    tema: 'Atendimento',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-time-rtg, 17/08/2026 (Fernanda); #fluxo-infos-navegadores 08/09/2026 (Lázaro)'
  },
  {
    pergunta: 'Mentorado sumido não responde o navegador. O que faço e o que o relacionamento tenta?',
    resposta: 'Postar no #fluxo-duvidas-relacionamento com nome, e-mail e dias de atraso do plano; o relacionamento (Robson) faz o contato e informa quem respondeu. Mensagem que não entrega (um tique só): tentar Instagram/direct e, por e-mail, usar o usuário do time Fluxo no Octa. O relacionamento não passa por cima desse processo. Mentorado que não quer o navegador atual: o relacionamento assume o contato de escuta.',
    tema: 'Atendimento',
    quem: 'Robson Rodrigues, Annie Empke',
    fonte: '#fluxo-duvidas-relacionamento, 28/08/2026 (Fernanda, Robson), 04 a 08/09/2026 (Aline Carvalho, Jéssica), 25/09/2026 (Robson); #pos-venda-fluxo-duvidas 04/09/2026 (Annie)'
  },
  {
    pergunta: 'Qual é o "jeito de servir ao mentorado" e o NavMaster pode mandar sem revisar?',
    resposta: 'O NavMaster não está no ponto de enviar resposta sem revisão; a responsabilidade pelo atendimento e por avaliar cada mensagem é do navegador. Os cinco pontos do jeito de servir: personalização do atendimento; linguagem de amizade; comunicação cordial e proativa; atendimento educativo (nada é óbvio); valorização da história e do sonho do mentorado. Feedbacks para o Gabriel José (no-code) seguem calibrando a ferramenta.',
    tema: 'Atendimento',
    quem: 'Ellen Cecilia, Gabriel José',
    fonte: '#fluxo-infos-navegadores, 15/09/2026 (Ellen)'
  },
  {
    pergunta: 'Mentorado pediu uma call com o navegador. Pode?',
    resposta: 'Essa entrega não estava no planejamento. Narrativa definida pela Ellen em 10/08/2026: tratar como a "call com especialista", ou seja, o mentorado precisa entregar o plano de ação completo (sem dispensa de entregáveis) dentro do prazo para solicitar. Para calls pontuais que o navegador decide fazer, continua a narrativa de exceção validada com a liderança (a pergunta do Felipe Faé sobre isso ficou sem resposta).',
    tema: 'Atendimento',
    quem: 'Ellen Cecilia',
    fonte: '#fluxo-time-rtg, 10/08/2026 (Felipe Faé, Ellen)'
  },
  {
    pergunta: 'Mentorado reclama de inconsistência entre análises ou quer analisador fixo. O que fazer?',
    resposta: 'Pode deixar ele escolher o próximo analisador (definição do Sprint Navs de 27/08/2026). Em 29/09/2026 a Fernanda reforçou: não prometer analisador fixo; dá para tentar atender o pedido, sem garantia.',
    tema: 'Atendimento',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores, 27/08/2026 (Sprint, Fernanda) e 29/09/2026 (Lázaro, Fernanda)'
  },
  {
    pergunta: 'Como funciona a blacklist do WhatsApp no Fluxer?',
    resposta: 'A blacklist é só para grupo de analisador e grupos da mentoria em geral; o grupo oficial do mentorado nunca entra nela. Qualquer inclusão passa por aprovação da Fernanda e da Ellen. Sugestão em aberto (02/09/2026, Darah): mensagens da blacklist aparecerem por padrão na caixa de entrada, para não perder aviso dos grupos dos analisadores.',
    tema: 'Atendimento',
    quem: 'Fernanda Lizzardo, Ellen Cecilia',
    fonte: '#fluxo-infos-navegadores, 27/08/2026 (Sprint, Fernanda); #fluxo-ia 02/09/2026 (Darah)'
  },
  {
    pergunta: 'Como vincular o mentorado quando só o sócio conversa comigo?',
    resposta: 'Vincula pela entrada do mentorado principal (definição do Sprint de 27/08/2026). No gerador de contexto de pré-análise, desde 22/09/2026 existe uma caixa de seleção para incluir as conversas vinculadas ao mentorado (grupos e sócios).',
    tema: 'Atendimento',
    quem: 'Fernanda Lizzardo, Gabriel José',
    fonte: '#fluxo-infos-navegadores 27/08/2026 (Sprint); #fluxo-ia 22/09/2026 (Dian, Gabriel José)'
  },
  {
    pergunta: 'Contato não aparece no meu WhatsApp do Fluxer. Como faço?',
    resposta: 'Se a conversa aparece no Fluxer, vá à direita da conversa em "vincular mentorado" e o contato fica salvo. Para o WhatsApp Web, cadastrar em contacts.google.com e esperar a sincronização com o aparelho da caixa (algumas horas). Não aparece se a conta Google não estiver vinculada ao número ou se o aparelho estiver desligado ou sem bateria (nesse caso, alguém do presencial liga o celular).',
    tema: 'Atendimento',
    quem: 'Dian Cristiano; time do presencial (AnaBe, Ester, Manu, Ellen) para os celulares',
    fonte: '#fluxo-time-rtg, 09/09/2026 e 30/09/2026 (Dian)'
  },
  {
    pergunta: 'O mentorado vê o "tick azul" quando abro a conversa no Fluxer?',
    resposta: 'Sim, de propósito (senão o celular da caixa enchia de "não lida"). Mas a configuração do WhatsApp do número da caixa prevalece: se a confirmação de leitura estiver desligada no aparelho, o tick azul não vai. Em grupo a confirmação vai sempre (o WhatsApp não deixa desligar). O Gabriel ofereceu criar uma opção por caixa no Fluxer, se fizer sentido; sem decisão.',
    tema: 'Atendimento',
    quem: 'Gabriel José',
    fonte: '#fluxo-ia, 02/09/2026 (Darah, Gabriel José)'
  },
  {
    pergunta: 'O GIO avisa quando um mentorado novo entra na minha carteira?',
    resposta: 'Sim, mas só depois que o mentorado passa pela integração. Mentorado que ainda não fez integração não gera aviso.',
    tema: 'Atendimento',
    quem: 'Ruam Cristian, Fernanda Lizzardo',
    fonte: '#fluxo-time-rtg, 28/09/2026 (Amanda, Ruam)'
  },
  {
    pergunta: 'Mentorado sem plano de Ajuste de Velas depois da integração ou sem vínculo de turma no Academy. Para quem mando?',
    resposta: 'Sem plano de Ajuste de Velas: para a Fernanda e a Ellen (no grupo individual do navegador com a liderança), que vinculam o plano; informar a data da integração. Sem vínculo de turma no Academy: o relacionamento (hoje Robson; antes Jéssica) vincula a turma; depois pedir ao mentorado para atualizar a página.',
    tema: 'Atendimento',
    quem: 'Fernanda Lizzardo, Ellen Cecilia, Robson Rodrigues',
    fonte: '#fluxo-time-rtg, 10/09/2026 (Felipe Pacheco, Jéssica); #fluxo-duvidas-relacionamento, 10/08/2026 (Dian, Jéssica)'
  },

  /* ---------- análises e planos de ação ---------- */
  {
    pergunta: 'Qual é a regra de cancelamento, remarcação e falta em análise?',
    resposta: 'Em vigor desde 28/09/2026, implementada no Fluxer (reunião com o Ramires em 30/09 às 14h30). Cota: cada assinatura dá 5 análises; ao renovar a contagem zera (ver em Ciclo e acesso). Regra das 24h pelo horário marcado: 24h ou mais é cancelamento com antecedência; menos de 24h é em cima da hora. Mentorado cancela com antecedência: ninguém perde. Em cima da hora: mentorado perde 1 vaga da cota e o analisador recebe 50% da tarifa vigente, pago no período da data original. Analisador pode cancelar sem multa, mentorado não perde vaga, navegador é avisado e precisa justificar. Navegador ou gestão escolhe no plano um dos 4 caminhos: A ninguém perde; B compensação (% ao analisador e 1 vaga a menos); C remarcar com o mesmo analisador em até 14 dias da data original (se não remarcar, vira compensação); D caso especial (erro de link, sistema, exceção da gestão). No-show: analisador registra a falta e o navegador ou a liderança decide (remarcar, encerrar com compensação, trocar analisador ou caso especial); faltas pendentes aparecem no dashboard de líder e diretoria. Trocar de analisador ou remarcar depois de 14 dias não é remarcação limpa. Ao mentorado não se fala de dinheiro nem de cota; comunicação firme, positiva, nada agressiva.',
    tema: 'Análises',
    quem: 'Clara Coppola, Ellen Cecilia, Ramires (no-code)',
    fonte: '#fluxo-infos-navegadores, 28/09/2026 (Ellen, repassando mensagem da Clara no canal dos analisadores); Sprint Navs 28/09/2026 (Fernanda)'
  },
  {
    pergunta: 'Em quanto tempo o plano tem que ser liberado depois da análise?',
    resposta: 'Análise concluída é plano de ação liberado em no máximo 24h depois da análise. Análise concluída depois do fechamento do período (competência 26 a 25) não entra depois, cai no mês seguinte.',
    tema: 'Análises',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores, 28/09/2026 (Sprint Navs, Fernanda)'
  },
  {
    pergunta: 'O Ajuste de Velas é igual para todo mundo e o documento pré-análise ainda é Google Doc?',
    resposta: 'Não. Duas versões, pelo nível de entrada: Newbie (ainda não vendeu) recebe 26 tarefas; do Soft para cima (Soft, Hard, Pro, Pro Mais, Master) recebe 22 tarefas, direto para a preparação do diagnóstico. Prazo médio de 30 dias nas duas. Em comum: boas-vindas, 2 aulas novas de plataforma ("Conhecendo o Fluxer", da Manu, e "Como usar o Fluxer Academy", da Ana, desde 26/08/2026), aulas 1 a 14 do Filosofia Ladeira, Dicionário do Digital, pesquisa de mercado e quiz final de 9 perguntas que só passa com 100%. Só o Newbie tem: concepção de produto, página de low ticket, primeiros anúncios e conta de anúncios no Facebook. Desde 08/09/2026, na trilha Soft+, o antigo Documento pré-análise (copiar Google Doc e colar link) foi substituído pelo "Check-in pré-análise": quiz de coleta com 17 perguntas respondido na própria tarefa do Fluxer; o analisador vê as respostas na tarefa sem abrir Drive. Vale para planos novos; planos já criados mantêm o fluxo antigo. A aula "Conhecendo o Fluxer" fica embutida na tarefa; se o vídeo não abre, é o player do Academy bloqueado por adblock ou extensão (janela anônima, desativar adblock para flx.vendatodosantodia.com.br, limpar cache ou outro navegador).',
    tema: 'Análises',
    quem: 'Ellen Cecilia, Rodolfo (no-code)',
    fonte: '#fluxo-infos-navegadores, 26/08/2026 (Ellen); #fluxo-time-rtg 02/09/2026 (Robson, Ellen); #nocode-comunicados-fluxer 08/09/2026 (Rodolfo)'
  },
  {
    pergunta: 'Quanto tempo dura uma análise e o que os mentorados mais elogiam e reclamam?',
    resposta: 'Análise dos diagnósticos de 2026 (Ellen, 11/08): 85% das notas acima de 8, média 9,48. O tempo da análise é 1h20 (como está no pitch e na integração) e o máximo é 2h; o que passar disso é overdelivery e deve ficar claro para o mentorado. Elogios: sair com caminho claro, analisador que estudou o projeto antes, construção conjunta, praticidade, acolhimento com iniciantes. Queixas: material enviado não lido a fundo antes da reunião, plano genérico (ex.: só low ticket para quem já tem 3 produtos), iniciante perdido no volume de informação. Feedbacks do Plano de Ação Inteligente ficam centralizados no grupo de WhatsApp "Plano de Ação Inteligente" (convite na mensagem da Ellen de 09/09 em #fluxo-diagnósticos; não fica na central).',
    tema: 'Análises',
    quem: 'Ellen Cecilia',
    fonte: '#fluxo-diagnósticos, 11/08/2026 e 09/09/2026 (Ellen)'
  },
  {
    pergunta: 'O que é o bloco "Observação do Analisador" no Fluxer e quando preencher?',
    resposta: 'Desde 13/08/2026 o bloco aparece em dois momentos: antes de montar o plano de ação e ao clicar em "Concluir análise e repassar novo plano de ação"; é o mesmo bloco (o que for preenchido na primeira tela vai para a segunda). As observações são sobre a análise recém-feita (o plano anterior): produto, expectativas, perfil do mentorado e pontos de atenção para o próximo analisador. Preencher sempre ao finalizar a análise.',
    tema: 'Análises',
    quem: 'AnaBe, Ramires (Fluxer)',
    fonte: '#fluxo-diagnósticos, 13/08/2026 (AnaBe)'
  },
  {
    pergunta: 'Quais analisadores fazem só diagnóstico e o Leo voltou a analisar?',
    resposta: 'Sergio e Michelle fazem apenas diagnóstico; liberar a agenda deles só para diagnóstico (Michelle ainda não tinha aberto agenda em 02/09/2026). Robson Rodrigues é navalisador desde 25/08/2026 e abriu agenda para diagnósticos em 31/08. O Leo voltou: desde 15/09/2026 a agenda dele está aberta de novo para análises (a empresa entendeu que ele faz mais sentido na estratégia direta dos mentorados); a gestão do time de analisadores passou para a Clara.',
    tema: 'Análises',
    quem: 'Fernanda Lizzardo, Ellen Cecilia, Clara Coppola',
    fonte: '#fluxo-infos-navegadores 02/09 e 15/09/2026 (Fernanda, Ellen); #fluxo-time-rtg 25/08/2026 (Fernanda)'
  },
  {
    pergunta: 'No diagnóstico, o padrão é página de vendas ou quiz?',
    resposta: 'Página de vendas. O quiz fica só como teste depois, com a página já rodando; o analisador pode recomendar quiz se entender que faz mais sentido. A aula de quiz do Ajuste de Velas (etapa de concepção de produto) gera confusão nos novatos e a Ellen decidiu trocar pela live de página de vendas de low ticket do Leandro (17/09/2026).',
    tema: 'Análises',
    quem: 'Fernanda Lizzardo, Ellen Cecilia',
    fonte: '#fluxo-time-rtg, 14/09/2026 (Amanda, Fernanda) e 17/09/2026 (Amanda, Ellen)'
  },
  {
    pergunta: 'Como orientar concepção de produto (resumo do role play de 09/09)?',
    resposta: 'Resumo do Felipe Faé do role play com os analisadores (09/09/2026, gravação no Formação Navs): quem escolhe o caminho é o navalisador; olhar sempre o momento atual do mentorado; se o objetivo é faturamento, pedir expectativa, calcular a realidade e desenhar plano de médio prazo. LT é sempre específico, para quem precisa aprender marketing ou fazer caixa rápido, ou qualificar lista para o HT; MT para mercado maduro e produto que resolve vários problemas; HT para quem tem experiência e autoridade. Quem não é especialista: produto de curadoria ou coprodução. Produto fraco: pesquisar (Hotmart, Google) e se autorrefutar antes de descartar; quem discorda recebe prós e contras e o melhor PA possível para testar. O que vende é oferta, página e promessa; o produto dá longevidade e só se avalia depois de testado. Reforçar CEE ("pressa para implementar e paciência para colher") com quem chega com dinheiro contado.',
    tema: 'Análises',
    quem: 'Felipe Faé Schwade, Léo (call de produto)',
    fonte: '#fluxo-time-rtg, 09/09/2026 (Felipe Faé); #fluxo-infos-navegadores 10/09/2026 (treinamento disponível)'
  },
  {
    pergunta: 'Os vídeos das análises de um mentorado sumiram. O que fazer?',
    resposta: 'Em cancelamento ou inativação as análises são colocadas como privadas no YouTube. Se o mentorado está ativo, entrar no canal do Fluxo, pesquisar o nome em "meus vídeos" e mudar para "não listado". Vídeo removido por violação dos termos do YouTube: dá para contestar (até 72h); no caso de 10/08/2026 a análise foi barrada mesmo (mostrou dash de tráfego e campanhas). Baixar da StreamYard logo após a análise serve de backup enquanto a gravação existe lá.',
    tema: 'Análises',
    quem: 'Felipe Faé, AnaBe; para contestação, quem cuida do canal do YouTube (era a Natasha; hoje ver com a Ester, Ellen ou Fernanda)',
    fonte: '#fluxo-time-rtg, 24/08/2026 (Amanda, Felipe Faé, Aline Henriques, AnaBe) e 10/08/2026 (Aline Henriques, Natasha)'
  },
  {
    pergunta: 'Mentorado vendeu fora de plataforma (pix). Como anexar o faturamento?',
    resposta: 'Com a nota fiscal emitida.',
    tema: 'Análises',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-time-rtg, 18/08/2026 (AnaBe, Fernanda)'
  },

  /* ---------- renovação ---------- */
  {
    pergunta: 'Como explicar o parcelamento da renovação e pedir um link personalizado?',
    resposta: 'Não falar "menos parcelas é desconto" nem "mais parcelas tem juros". O link da Hotmart debita a entrada combinada e o resto em parcelas sem juros. O cupom de entrada é detalhe interno, não precisa explicar ao mentorado. Objeção "falta de caixa": conversa de como paga (parcelado) e Puro Lucro rápido para levantar caixa, não conversa de desconto. Link personalizado: a condição negociada precisa ser aprovada pela Fernanda. Quem gera o link tem dois registros no Slack: em 07/08/2026 (#fluxo-time-rtg, Ester) os links parcelados passaram a ser pedidos à Lyandra (antes era a Ester), com e-mail do mentorado, número de parcelas, sinais ativos para abater e valor final; de 17 a 29/09/2026 (#fluxo-duvidas-financeiro) o combinado é postar no canal o modelo da Ester "[Link personalizado] E-mail: / Sinal: / Oferta: / Valor final:" (com datas e valores de cada parcela) e a Érica gera o link. A confirmar com a Fernanda qual vale hoje. Valores e textos de oferta de renovação são com a Ester; se ela estiver off, com a Fernanda.',
    tema: 'Renovação',
    quem: 'Fernanda Lizzardo, Ester Barbosa, Érica, Lyandra de Alencar',
    fonte: '#fluxo-infos-navegadores 08/09 e 29/09/2026 (Lázaro, Fernanda); #fluxo-time-rtg 07/08/2026 (Ester); #fluxo-duvidas-financeiro 19/08, 03/09 e 17 a 29/09/2026 (Fernanda, Érica, Ester)'
  },
  {
    pergunta: 'Como registrar no Fluxer quem já topou renovar e só espera o dia de pagar?',
    resposta: 'Conjunto criado em 25/08/2026: Objetivo "Fechamento"; Ação "Aguardar pagamento" (confirmar o dia, manter contato ativo e garantir que o pagamento caia na data); Objeção "Data de Pagamento" (só para quem já disse sim ao valor). Se ele ainda trava no valor ou no caixa, a objeção é "Falta de Dinheiro". Quem tem data acordada escreve a data prevista na observação; sem isso a previsão de renovação sai errada.',
    tema: 'Renovação',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores, 25/08/2026 (Fernanda) e 08/09/2026 (Lázaro)'
  },
  {
    pergunta: 'Mentorado renovou mas o status no Fluxer não mudou, ou pagou com outro e-mail. O que fazer?',
    resposta: 'O status "Renovou" é automático com o pagamento na Hotmart; a Lya não mexe nisso. Antes de reportar, conferir se o pagamento foi feito com o mesmo e-mail da Hotmart. E-mail diferente, ou mesmo e-mail sem status de renovado: avisar a Fernanda no Slack com o e-mail do pagamento; ela encaminha ao Ramires e a correção é manual (só o no-code altera o e-mail de compra; pedir logo, senão o acesso fica bloqueando de novo). Se o pagamento não aparece na Hotmart, pedir o comprovante. O nome o próprio mentorado altera no Fluxer no passo a passo inicial. Inativação indevida (acesso removido sem motivo, duplicidade ou reembolso): juntar print e comprovante e mandar para a Fernanda encaminhar ao Ramires. Quem renovou em 05/2026 só renova de novo em 05/2027: se aparecer no ciclo atual, remover da renovação. Pagamento à vista do ciclo anterior conta 12 meses da data do pagamento, mas congelamento empurra a data de renovação. Débitos de renegociação antiga (2023) não são cobrados de quem reingressou em 2024 sem impedimentos.',
    tema: 'Renovação',
    quem: 'Fernanda Lizzardo, Ramires (no-code), Ester Barbosa, Lyandra de Alencar, Érica',
    fonte: '#fluxo-infos-navegadores, 25/08 e 08/09/2026 (Lázaro, Fernanda); #fluxo-duvidas-financeiro 04/08, 05/08, 14/08, 28/08 e 01/09/2026 (Lyandra, Ester, Érica); #fluxo-comercial-duvidas 10/08/2026 (Jéssica)'
  },
  {
    pergunta: 'Quais são os números e prazos da renovação atual?',
    resposta: 'Ciclo ff-ago26: 70 mentorados, meta de 43%, negociações abertas desde 06/08, corte em 15/09 e prazo final em 30/09/2026 (retrato de 25/08: 7 renovados, 57 em negociação, 6 não renovados). Ciclo fon-nov26: maior renovação da história do Fluxo (cerca de 360 mentorados), prazo 15/10/2026; em 29/09 estava em 20%, com cerca de 27 em negociação. Destaques de 29/09: Joás 45,8% (11 renovações), Amanda 45,5%, Samuel 43,2%, AnaBe 42,9%. Ação para todos até a semana de 05/10: mandar mensagem a todos os mentorados em renovação do fon-nov26 perguntando o que esperam do próximo ciclo e registrar no Fluxer ação, resposta, temperatura e foco.',
    tema: 'Renovação',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-time-rtg 25/08/2026 (Fernanda); #fluxo-infos-navegadores 08/09 e 29/09/2026 (Lázaro, Fernanda)'
  },
  {
    pergunta: 'O que está funcionando na renovação (boas práticas do Lázaro)?',
    resposta: 'Análise como última tentativa com mentorado antigo ou resistente; retrospectiva de entregas (mandar o histórico do que ele já fez) antes da conversa; contato frequente sem sumir entre calls; não parar no primeiro não ("o que eu posso fazer pra você ficar?"); transformar o acompanhamento em reunião de renovação; personalizar a entrega (cronograma de análises perto dos picos de venda, análise mão na massa para quem executa pouco); oferecer análise de continuidade com avanço de nível para quem tem resultado; usar o Retiro da Black e a análise de Black como argumento. O relacionamento assume os não renovados e os sem resposta (Jéssica começou em 08/09/2026; se reverter fica com a comissão). Quinta-feira é o dia de contato ativo (01/10 foi contato ativo com todos, principalmente sumidos).',
    tema: 'Renovação',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores, 25/08, 08/09 e 29/09/2026 (resumos do Lázaro, Fernanda); Sprint 28/09/2026'
  },
  {
    pergunta: 'Mentorado quer mudar a data de vencimento da parcela ou pagar mais 1 ano antes do fim do ciclo. Como fica?',
    resposta: 'Troca de data de parcela é feita direto na Hotmart pelo mentorado; a Lya tem o passo a passo (nos comentários da thread de 01/09/2026 em #fluxo-duvidas-financeiro). Para renovação, quem quer vencimento no dia 25 simplesmente passa o cartão no dia 25. Pagar mais 1 ano antes de terminar o ciclo atual não faz sentido agora (Érica): ele quita o restante do ciclo e adquire o próximo ano no evento de renovação de novembro; quitar as parcelas restantes não dá direito a mais um ano.',
    tema: 'Renovação',
    quem: 'Lyandra de Alencar, Fernanda Lizzardo, Érica',
    fonte: '#fluxo-duvidas-financeiro, 01/09/2026 (Lyandra), 15/09/2026 (Érica) e 17/09/2026 (Fernanda)'
  },

  /* ---------- comercial e resultados ---------- */
  {
    pergunta: 'Qual é a oferta do Fluxo nos zooms do VTSD com pitch?',
    resposta: 'Desde 22/07/2026: R$ 25 mil à vista ou R$ 30 mil em 12x (a apresentação de 35/40 mil não converte em sinal). O QR code no pitch é o sinal de R$ 1 mil; não se manda link de sinal no chat. Cada zoom registra na planilha o pitch usado.',
    tema: 'Comercial',
    quem: 'João Pedro Gandara, Fernanda, Clara',
    fonte: '#rtg-zoom, 08/07/2026 e 22/07/2026'
  },
  {
    pergunta: 'Quem atualiza a planilha do zoom e o que ela precisa ter?',
    resposta: 'O João Pedro Gandara. A Clara pediu que as duas últimas colunas (sinais e fechamentos) estejam sempre atualizadas e que conste o pitch usado. Participantes e pico vêm da Raissa ou do Gabriel Araujo; sinais têm prazo de 24h após o zoom. A Clara cobra depois de cada zoom ("como foi a aula de ontem?", "já colocamos os sinais?").',
    tema: 'Comercial',
    quem: 'João Pedro Gandara',
    fonte: '#rtg-zoom 04/02/2026, 12/02/2026, 26/02/2026, 23/07/2026'
  },
  {
    pergunta: 'Qual foi a meta do último pico do Fluxo e qual é o próximo?',
    resposta: 'SPP com IA (21 e 22/08/2026): meta de aproximadamente 200 novos mentorados; a captação ficou em cerca de 56% da meta. Segundo a Clara em 17/08/2026, foi provavelmente o penúltimo pico do ano, com o próximo previsto só para dezembro. O FLP (imersão 22 a 24/09/2026) ficou "quase batendo a meta de sinais (120)". O número exato de cada pico fica com o João Pedro e no report da Clara.',
    tema: 'Comercial',
    quem: 'Clara, João Pedro Gandara',
    fonte: '#rtg-recados-gerais 30/07/2026 e 17/08/2026; #fluxo-comercial-duvidas 04/07/2026'
  },
  {
    pergunta: 'Qual é a conversão do perpétuo do Fluxo?',
    resposta: 'Referência passada pela Clara em 01/07/2025: 1,3% de compra e 8,1% de página para checkout. Número antigo; confirmar com a Clara ou o comercial antes de usar.',
    tema: 'Comercial',
    quem: 'Clara',
    fonte: '#fluxo-time-rtg, 01/07/2025'
  },
  {
    pergunta: 'Ex-mentorado quer voltar para o Fluxo (ou pagou sinal e sumiu). O que checar antes de vender?',
    resposta: 'Processo definido em setembro/2026: antes de atender, pedir à Lyandra ou à Érica para checar pendências financeiras e histórico. Com parcela em aberto de assinatura anterior, a pessoa precisa regularizar com o financeiro antes de reingressar (aí pode entrar na oferta vigente). Se o histórico for de ouvidoria, reembolso e detração, não se vende de novo: decisão alinhada com a Clara em 08/09/2026. Sem pendência (ex.: pagou à vista em 2024 ou cancelou com parcelas quitadas), pode reingressar normalmente na oferta vigente. Quem atende o lead que volta é o closer "da vez", distribuído pelo João Pedro. Casos anteriores eram exceção caso a caso da Clara (lead que pagou sinal no REV e sumiu meses, 26/08/2025; ex-mentorado à vista em 2x liberado para o Festival, 17/07/2026). Pagamentos antecipados (paga e só começa meses depois) geram problema operacional e a Clara pediu para o comercial evitar.',
    tema: 'Comercial',
    quem: 'Lyandra de Alencar, Érica, João Pedro Gandara',
    fonte: '#fluxo-comercial-duvidas, 31/08 a 08/09/2026 (Mateus Brandão, Lyandra, Érica, Jéssica), 08/09/2026 (Manu, Raphael), 25/09/2026 (Renata, Érica); casos antigos em 25/08/2025, 26/08/2025, 15 e 17/07/2026'
  },
  {
    pergunta: 'Navegador recebeu um lead (indicação de mentorado, sócio, ex-mentorado de renovação). Para quem passa?',
    resposta: 'Mandar o contato no #fluxo-comercial-duvidas marcando o João Pedro Gandara: ele distribui para o time comercial ("temos uma escalinha"). Lead indicado por mentorado é tratado como qualificado e não passa pelos SDRs. Mentorado de renovação que perdeu o ciclo e quer voltar também vai para o comercial fechar na oferta vigente (Fernanda). O comercial acompanha as conversas no CRM.',
    tema: 'Comercial',
    quem: 'João Pedro Gandara, Fernanda Lizzardo',
    fonte: '#fluxo-comercial-duvidas, 11/08/2026 (Dian), 24/08/2026 (Fernanda, João Pedro), 15/09/2026 (Felipe Faé, João Pedro), 25/09/2026 (Robson, João Pedro)',
    links: ['https://crm.readytogo.com.br/atendimento']
  },
  {
    pergunta: 'Como funciona a Estratégia PIF (programa de indicação do Fluxo)?',
    resposta: 'Definições da Ellen (08/09/2026): o comercial passa a pedir 3 indicações qualificadas na call de vendas, sem desconto em troca. Quem indica ganha 1 mês a mais de Fluxo quando o indicado fecha e, no sexto mês do indicado, R$ 1 mil de desconto na renovação (via cupom). O indicado ganha R$ 5 mil de desconto na primeira parcela via cupom, sempre em relação à oferta do perpétuo, explícito nas páginas. Abatimento de parcela na Hotmart foi descartado; premiação sai via cupom e extensão de prazo no Fluxer (categoria "premiação do PIF", pedida ao Ramires). Gatilhos de pedido de indicação: call de vendas e pós-diagnóstico (nota acima de 8 e solicitação de mudança de nível), com mensagem por e-mail e WhatsApp. O comercial só recebe o indicado que preencher a página ou acionar o botão de contato, caindo na pipe do perpétuo com etapa separada. Duas páginas novas (indicador e indicado), seção de indicação dentro do Fluxer e termos de uso na página. Érica integra as páginas com o Active e o CRM. Prazo das peças: 10/09. Hospedagem definitiva ainda em discussão (o projeto não pôde ser transferido para a conta do Fluxo; a Ester ficou de recriar).',
    tema: 'Comercial',
    quem: 'Ellen Cecilia, Ester Barbosa (páginas e copys), Érica (integração)',
    fonte: '#fluxo-evento-e-entregáveis, 08/09/2026 (Ellen) e thread até 10/09/2026',
    links: ['https://www.mindmeister.com/app/map/3794991859?t=dxDzyjG2Lr', 'https://pif-fluxo.vercel.app/indicador.html', 'https://pif-fluxo.vercel.app/indicado.html']
  },
  {
    pergunta: 'Quais cases de sucesso usar por nicho (comunicação, oratória, nutrição) e onde buscar?',
    resposta: 'Comunicação e oratória (Ellen, 24/08/2026): Mauro Fantini (oratória, mais de R$ 1 milhão); Lu Vianello (projeto Seja Ouvido, mais de R$ 10 mil); Daniele Rafael (comunicação e relacionamentos, mais de R$ 10 mil); Nolah Lima (Instituto CNV Brasil, mais de R$ 2 milhões). O Samer é do Master, não do Fluxo. Nutrição (09/09/2026): Anna Emília (mentorada do Robson, de 8k para 35k/mês, palestrou no Festival) e Michelle Jota. Os perfis de Instagram de cada case estão nas mensagens da Ellen (24/08) e da Natasha e do Dian (09/09) em #fluxo-comercial-duvidas. Fontes gerais: resultado.vtsd.com.br (Cases VTSD), prints-fluxo.vercel.app, depoimentos-five.vercel.app e exemplos-que-inspiram.vercel.app (palestras do Festival). Limitação: a Central de depoimentos mostra só nome e faturamento, sem @ nem produto; melhoria anotada pela Fernanda em 10/08.',
    tema: 'Comercial',
    quem: 'Ellen Cecilia, Fernanda Lizzardo',
    fonte: '#fluxo-comercial-duvidas, 04 a 10/08/2026 (Renata, Fernanda), 24/08/2026 (Ellen), 09/09/2026 (Natasha, Dian), 25/09/2026 (Lucas Toledo)',
    links: ['https://resultado.vtsd.com.br/', 'https://exemplos-que-inspiram.vercel.app/', 'https://prints-fluxo.vercel.app', 'https://depoimentos-five.vercel.app/']
  },
  {
    pergunta: 'Lead diz que não recebeu o link de uma aula do pico. Dá para liberar só aquela aula?',
    resposta: 'Não. Não se libera uma aula avulsa. Os links saem por SMS, ligação, e-mail e Telegram, e o link é o mesmo para todas as aulas. Antes de escalar, pedir o e-mail da lead e conferir os envios (a Clara confere se recebeu os e-mails).',
    tema: 'Comercial',
    quem: 'Clara Coppola',
    fonte: '#fluxo-comercial-duvidas, 25/09/2026 (Clara Coppola)'
  },
  {
    pergunta: 'Como confirmar se um número de WhatsApp "do comercial" é nosso mesmo e onde está o treinamento comercial da AnaBe?',
    resposta: 'Existe um catálogo público de números oficiais do comercial em vendatodosantodia.com.br/comercial; se o número está lá, é nosso. Treinamento comercial da AnaBe: PDF fixado no #fluxo-comercial-duvidas em 17/08/2026, com como identificar o gargalo do lead na call (com e sem produto) e quais entregas da mentoria quebram as objeções mais comuns (não querer aparecer, execução de tráfego e copy, querer resultado rápido).',
    tema: 'Comercial',
    quem: 'AnaBe, João Pedro Gandara',
    fonte: '#fluxo-comercial-duvidas, 17/08/2026 e 29/09/2026 (AnaBe)',
    links: ['https://vendatodosantodia.com.br/comercial/']
  },

  /* ---------- sócios ---------- */
  {
    pergunta: 'Quem tem direito a sócio e como funciona o cadastro no Fluxer (gratuito x pagante)?',
    resposta: 'Compradores de ofertas de Pico e Renovação ("Direito a sócio") têm 1 sócio gratuito; a partir do segundo, só com pagamento de oferta de sócio aprovado no sistema. Compradores do perpétuo só cadastram sócio mediante pagamento; perpétuo que já fez uma renovação (à vista ou primeira parcela paga) passa a ter direito; sinal pago em evento de renovação não dá direito. Outros casos: o relacionamento cadastra depois de verificar com o comercial. Cadastro (desde 16/09/2026): o titular cadastra em Fluxer > perfil > sócios; sócio gratuito quando ainda há crédito na oferta; sócio pagante quando não há crédito, e aí o titular confirma o e-mail e o código Hotmart da compra da oferta de sócio e preenche os dados. O formulário pede tipo de documento (CPF, RG ou passaporte) e número; documento é obrigatório só em cadastros novos e para gerar contrato. O sócio não tem acesso ao Fluxer: o cadastro é para controle e contrato. Na gestão, quem cadastra sócio e gera, atualiza ou libera contrato: admin, líder navegador, líder analisador, diretoria e operacional com permissão. Após o fechamento, o navegador precisa saber se há sócio pagante, para cobrar o titular de cadastrar e gerar o contrato. Exclusão de sócio dos grupos: o mentorado padrão exclui o sócio no Fluxer e o navegador remove do grupo.',
    tema: 'Sócios',
    quem: 'Ellen Cecilia, Fernanda Lizzardo, Ramires (no-code)',
    fonte: '#fluxo-infos-navegadores 27/08 e 14/09/2026 (Fernanda, Ellen); #fluxo-time-rtg 13/08 e 28/08/2026; #nocode-comunicados-fluxer 16/09/2026 (Ramires)'
  },
  {
    pergunta: 'Como funciona o contrato do sócio (ZapSign) e o mentorado pode editar ou excluir um sócio?',
    resposta: 'Só sócio pagante gera contrato. No cadastro, o sistema gera o contrato na ZapSign na hora e envia o e-mail de assinatura ao sócio; dois signatários: o sócio (pelo e-mail) e a empresa (assinatura automática via API). Enquanto o contrato estiver pendente, o titular fica bloqueado no Fluxer até a assinatura (ou liberação pela gestão). Se a geração falhar, o sócio é cadastrado mesmo assim e o titular vê aviso pedindo para comunicar o navegador; a gestão gera ou reprocessa o contrato no Fluxer. Editar ou excluir: sócio gratuito, pode; sócio pago ainda sem contrato, pode; sócio pago com contrato na ZapSign, não (só a gestão); sócio criado manualmente pela gestão, não (só a gestão). Contrato de sócios como etapa obrigatória de login está em teste com o pico atual, conduzido pela Érica com o no-code.',
    tema: 'Sócios',
    quem: 'Ramires, Érica',
    fonte: '#nocode-comunicados-fluxer, 16/09/2026 (Ramires); #fluxo-infos-navegadores 14/09/2026 (Ellen)'
  },
  {
    pergunta: 'Mentorado pode ter uma terceira cadeira de sócio ou diz que "prometeram dois sócios"?',
    resposta: 'Pode, pagando. A cadeira inclusa é uma; sócios adicionais são vendidos pelo comercial. Quando o mentorado alega que "quem vendeu prometeu dois sócios", o João Pedro confere a gravação da call de fechamento antes de responder (num caso de 11/08/2026 a conversa era sobre acesso do time aos infoprodutos VTSD, Light Copy e S10x, não sobre segunda cadeira). Regra: dúvida de sócio vai primeiro ao #fluxo-comercial-duvidas; só depois da confirmação o navegador cadastra.',
    tema: 'Sócios',
    quem: 'João Pedro Gandara, Joás, Watson Orleans',
    fonte: '#fluxo-comercial-duvidas, 10/08/2026 (Watson, Joás, João Pedro) e 11/08/2026 (Felipe Pacheco, João Pedro); #fluxo-duvidas-financeiro 11/08/2026 (Jéssica Pacheco)'
  },

  /* ---------- financeiro, contratos e contas ---------- */
  {
    pergunta: 'O Fluxo tem duas contas? Qual usar para contrato e pagamento?',
    resposta: 'Sim, desde 27/05/2026. Novas aquisições (Pico e Perpétuo) vão para a conta nova, da empresa RTG, com contrato nesse CNPJ e pagamento pela conta nova da Hotmart. Membros antigos em renegociação continuam na empresa em que emitiram o contrato (Ready To Go). O Club é em outra conta da Hotmart. Os IDs de produto e os dados da empresa estão na mensagem fixada da Clara; não ficam na central.',
    tema: 'Financeiro e contratos',
    quem: 'Clara (regra), Érica (Hotmart), Taynáh (contratos)',
    fonte: '#fluxo-infos-navegadores 27/05/2026 e 01/06/2026; #fluxo-comercial-duvidas 30/05/2026'
  },
  {
    pergunta: 'Pode ajustar o contrato do Fluxo a pedido de um mentorado?',
    resposta: 'Não. O contrato foi feito por uma equipe de advogados e ajustes abrem brechas (Clara, 12/09/2025). Desde 03/07/2026 existe um contrato novo, mais estruturado, aplicado ao Pico, com versões para Perpétuo e Sócio. Contrato emitido na moeda errada (caso em euro) é cancelado e reemitido pela Taynáh.',
    tema: 'Financeiro e contratos',
    quem: 'Clara, Taynáh',
    fonte: '#fluxo-comercial-duvidas 09/09/2025 e 12/09/2025; #fluxo-infos-navegadores 03/07/2026'
  },
  {
    pergunta: 'Dá para trocar o titular do contrato?',
    resposta: 'Pico: não, o contrato é enviado por automação com os dados do Fluxer (vindos da Hotmart); a Érica confirmou que não é possível alterar (caso de 03/09/2026) e repassou ao comercial. Perpétuo: conferir na Docsales se ainda não foi enviado e solicitar alteração ao time comercial.',
    tema: 'Financeiro e contratos',
    quem: 'Érica',
    fonte: '#fluxo-time-rtg, 03/09/2026 (AnaBe, Érica)'
  },
  {
    pergunta: 'Para onde vai o pedido de cancelamento ou reembolso e como conferir se foi registrado?',
    resposta: 'Todo cancelamento vai direto para o relacionamento (Robson), inclusive dentro da garantia de 7 dias; não vai mais para o financeiro nem passa pela Clara e pela Érica como antes. Quem já parcelou em 12x não pode ser reparcelado: nesse caso o cancelamento também vai ao relacionamento. O pedido é formalizado no número do relacionamento, que envia o formulário de cancelamento; sem formulário respondido não há cancelamento registrado. Orientar o mentorado a não pedir reembolso direto na Hotmart: cancelamento feito pelo próprio mentorado na Hotmart aparece como reembolsado ou cancelado e a Lya inativa no Fluxer. Mentorado que aparece na carteira já com status cancelado (pediu reembolso na Hotmart): não dar boas-vindas, confirmar com o relacionamento. Contrato que "expirou" no e-mail: o comercial localiza e reenvia. Pedido de cancelamento ou reembolso que chega ao relacionamento geral também pode entrar no #pos-venda-fluxo-duvidas; a Fernanda assume.',
    tema: 'Financeiro e contratos',
    quem: 'Fernanda Lizzardo, Robson Rodrigues, Lyandra de Alencar',
    fonte: '#fluxo-infos-navegadores, 28/09/2026 (Sprint Navs, Fernanda); #fluxo-duvidas-financeiro 08/09, 11/09, 22/09 e 25/09/2026 (Robson); #fluxo-duvidas-relacionamento 12/08 a 11/09/2026 (Jéssica), 24/08/2026; #pos-venda-fluxo-duvidas 18/09/2026 (Annie, Fernanda)'
  },
  {
    pergunta: 'Mentorado inadimplente quer pagar a parcela e voltar. Qual é o processo?',
    resposta: 'Pedir no #fluxo-duvidas-financeiro marcando a Lya (ou Érica): elas reenviam a transação (cartão) ou mandam link ou Pix. Se o cartão já excedeu as tentativas de cobrança, a Lya pede reprocessamento à Hotmart, que leva até 24h. Depois do pagamento o Fluxer demora pelo menos 30 minutos para atualizar; a Lya pode ativar manual. Mentorado "em dia" mas inativo: costuma ser falha de sincronização Hotmart/Fluxer, a Lya reativa; se inativar de novo, ela checa com o Ramires. Parcela paga que volta para "contato pendente" é bug reportado ao Ramires; não usar "postergada" para contornar (Fernanda, 27/08/2026). A régua automática inativa com mais de 20 dias de atraso e o robô remove do grupo.',
    tema: 'Financeiro e contratos',
    quem: 'Lyandra de Alencar, Érica, Fernanda Lizzardo, Ramires',
    fonte: '#fluxo-duvidas-financeiro, 10/08, 12/08, 27/08, 08/09 e 21 a 25/09/2026 (Lyandra, Érica, Fernanda)'
  },
  {
    pergunta: 'Quais motivos permitem congelamento e por quanto tempo?',
    resposta: 'Congelamento só para: óbito de familiares, doença do mentorado ou de familiares próximos, e divórcio (Ellen, 14/09/2026). Prazo máximo: 6 meses (Jéssica, 25/08); divórcio: 3 meses (Robson, 28/09); casos de saúde aprovados em 3 meses (Érica, 17/09). Problema financeiro, computador quebrado, mudança de cidade ou custos não dão congelamento: ser transparente e buscar solução com os entregáveis; o Robson tenta reverter o cancelamento. Congelamento pode ser estendido excepcionalmente (caso de falecimento após UTI, aprovado pela Jéssica). Nascimento de filho não é congelamento: é licença-maternidade ou paternidade de 3 meses, registrada direto no Fluxer pelo relacionamento sem aprovação da Lya. Quem aprova: relacionamento (Robson; antes Jéssica) ou Érica; pedidos sem contexto de saúde recebem pergunta de volta (detalhes e se há tratamento).',
    tema: 'Financeiro e contratos',
    quem: 'Ellen Cecilia, Robson Rodrigues, Érica, Jéssica Pacheco',
    fonte: '#fluxo-duvidas-relacionamento 11/08, 25/08, 03/09, 14/09, 25/09 e 28/09/2026 (Jéssica, Ellen, Robson); #fluxo-duvidas-financeiro 20/08, 11/09 e 17/09/2026 (Jéssica, Érica)'
  },
  {
    pergunta: 'Como funciona o termo de congelamento e onde vejo as datas no Fluxer?',
    resposta: 'Fluxo: o navegador libera o formulário de congelamento no Fluxer, o mentorado preenche, o relacionamento aprova e avisa a Lya, que envia o termo pelo DocSales, por e-mail (pedir para olhar o spam). As parcelas só são pausadas depois da assinatura; até assinar, o mentorado fica ativo e o plano continua contando atraso. Pode assinar pelo Gov.br. Se não recebeu, a Lya manda o PDF no Slack e o navegador encaminha pelo WhatsApp. Pedido feito no fim de semana é processado até o fim do dia útil seguinte. Congelado aparece como "Inativo-congelado". Datas: no Fluxer, aba Geral (início, previsão de término, motivo e justificativa; só para quem já congelou) e aba Ciclo e Acesso (data de início, prevista e encerramento efetivo, útil quando o mentorado volta em data diferente). Quem chama o mentorado na volta é a Lya; para descongelar, a Lya reativa (às vezes o mentorado precisa aceitar a solicitação da Hotmart); o descongelamento não é feito pelo time de navegação. Formulário bugando no Fluxer: mandar print para a Lya.',
    tema: 'Financeiro e contratos',
    quem: 'Lyandra de Alencar, Robson Rodrigues, Emanuelle Lima (Manu)',
    fonte: '#fluxo-duvidas-financeiro, 03/08, 04/08, 14/08, 18/08, 25/08, 09/09, 11/09, 24/09 e 25/09/2026 (Lyandra); #fluxo-duvidas-relacionamento 11/08/2026 (Jéssica); #fluxo-infos-navegadores 11/08/2026 (Manu)'
  },
  {
    pergunta: 'Qual é o contato do financeiro (Lya)?',
    resposta: 'Responsável: Lya (Lyandra de Alencar), no #fluxo-duvidas-financeiro. O telefone do financeiro mudou em junho/2026; o número antigo não vale mais. O número novo, em formato de link wa.me para o mentorado, está nas mensagens da AnaBe (13/08/2026, #fluxo-time-rtg) e da Lyandra (13/08 e 31/08/2026, #fluxo-duvidas-financeiro). Telefone não fica na central: pegar na mensagem ou com a Lya e a AnaBe.',
    tema: 'Financeiro e contratos',
    quem: 'Lyandra de Alencar, AnaBe',
    fonte: '#fluxo-time-rtg 13/08/2026 (AnaBe); #fluxo-duvidas-financeiro 13/08 e 31/08/2026 (Lyandra)'
  },
  {
    pergunta: 'Mentorado cancelou mas diz que continua sendo cobrado. O que é?',
    resposta: 'Quase sempre é a assinatura recorrente do VTSD, não a mentoria. Conferir com a Lya; se o mentorado só quer a mentoria, a Érica cancela a assinatura VTSD e reclama a transação pela Hotmart (não orientar o mentorado a pedir reembolso sozinho na Hotmart).',
    tema: 'Financeiro e contratos',
    quem: 'Lyandra de Alencar, Érica',
    fonte: '#fluxo-comercial-duvidas, 24/08/2026 (Renata, Lyandra); #fluxo-duvidas-financeiro, 17/08/2026 (Dian, Érica) e 30/09/2026 (Dian)'
  },
  {
    pergunta: 'Quem cria links de pagamento e faz importação de mentorados nos cursos?',
    resposta: 'A Érica. Ela cria os links de pagamento (e mantém o banco com esses dados), importa mentorados nos cursos da Hotmart (ex.: Mergulhando na IA e Arsenal Criativo em 10/06/2026) e gera os links personalizados de renovação aprovados pela Fernanda. Acesso e suporte do Arsenal Viral e Criativo são com a Ester (12/08/2026); na ausência dela, Érica ou Lívia.',
    tema: 'Financeiro e contratos',
    quem: 'Érica; Arsenal com a Ester',
    fonte: '#fluxo-infos-navegadores 14/04/2025, 10/06/2026 e 12/08/2026; #fluxo-time-rtg 20/06/2026; #fluxo-duvidas-financeiro 17 a 29/09/2026'
  },
  {
    pergunta: 'A nota fiscal do mentorado veio errada ou não foi emitida. Com quem ver?',
    resposta: 'Com a Luna ou a Lyandra (contabilidade). O mentorado recebe duas notas: uma de serviço e uma de produto. CPF inválido bloqueia a emissão, e a Hotmart não valida o CPF antes da compra; a Érica propôs uma automação para isso.',
    tema: 'Financeiro e contratos',
    quem: 'Luna e Lyandra, Érica',
    fonte: '#fluxo-comercial-duvidas 05/06/2026 e 10/06/2026'
  },
  {
    pergunta: 'Onde está a planilha de orçamento e gastos de cada evento do Fluxo?',
    resposta: 'A Fernanda mantém uma planilha por evento no Google Sheets, no padrão que a Clara definiu, com uma aba por edição. Budget de referência do Fluxo Online 2026: R$ 25 mil. A Clara pede o link a cada fechamento de semestre; o link fixo ainda não está na central: pedir à Fernanda.',
    tema: 'Financeiro e contratos',
    quem: 'Fernanda',
    fonte: '#evento-fluxo-online 05/06/2025, 21/07/2025, 17/10/2025 e 10/03/2026'
  },

  /* ---------- números e comparecimento ---------- */
  {
    pergunta: 'Onde estão os números de confirmação e comparecimento dos eventos?',
    resposta: 'As confirmações do Fluxer (confirmados, recusaram, talvez, sem resposta) são levantadas pela Ellen e pela Ester por navegador. Nas salas do Zoom, a contagem exata por sala é feita pelos navegadores durante o evento (a Clara usa para calcular o % de comparecimento). Referências: Festival 2025, 860 ativos e 407 confirmados; Festival 2026, 553 confirmados; SPP com IA, 1.232 pessoas ao vivo (46%).',
    tema: 'Números',
    quem: 'Ellen e Ester (Fluxer), navegadores (salas), Camila (leads e salas nos picos)',
    fonte: '#fluxo-infos-navegadores 21/07/2025, 23/06/2026 e 22/09/2026; #evento-flp 02/07/2026'
  },
  {
    pergunta: 'Qual é o NPS do Fluxo, a nota da navegação e o ranking do mês?',
    resposta: 'O NPS geral não fica registrado no Slack: a Fernanda e a Ellen passam para a Clara em reunião. As notas mensais dos navegadores são publicadas pela Ellen em #fluxo-infos-navegadores. Julho/2026: top avaliações Felipe Faé (9,68), Ruam (9,65), Aline Henriques (9,50); planos em dia Felipe Faé 14,8%, Robson 15,9%, Ruam 16,5%. Agosto/2026: média geral 9,3 (acima da meta); pódio avaliações Manu, Alessandra, Darah; planos em dia Felipe Pacheco 19,4%, Alessandra 24,3%, Amanda 28,4%; Ana Peres com mais avaliações (33, média 9,55). Setembro/2026 fechando em 9,2 e plano atrasado em 33,5% (meta 35%). Pendente: nova frequência do pedido de avaliação da navegação (o Leandro queria a cada 10 dias; Ellen e Fer buscam meio-termo).',
    tema: 'Números',
    quem: 'Ellen Cecilia, Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores 03/11/2025, 29/01/2026, 14/08, 01/09 e 28/09/2026 (Ellen, Fernanda)'
  },

  /* ---------- eventos e datas ---------- */
  {
    pergunta: 'Quais são as datas dos próximos eventos e picos do Fluxo (agenda de outubro a dezembro de 2026)?',
    resposta: 'Registradas até 30/09/2026: 30/09 mudança de nível no Fluxer e reunião da regra de cancelamento de análise (14h30); 01/10 contato ativo com todos; 02/10 Sprint Navs; 05/10 Sprint Fluxer e IA com o Ramires; 07/10 às 14h debriefing do Fluxo Festival com os navs (no lugar do treinamento; era 01/10, depois 08/10, que bate com o retiro); 08 e 09/10 Retiro Levantamento de Caixa; 15/10 início do Desafio da Mandala (até 15/11) e prazo da renovação fon-nov26; 16/10 aula da Ângela (tráfego, estrutura e otimização de campanhas, do Retiro Ultra Black Friday); zooms semanais da Black até outubro; 16/11, 18/11 e 08/12 Ladeira Days; 26 a 28/11 Fluxo Online Copia e Cola; hotseat do SPP a tentar em 30/11; jantar do Desafio Express provisoriamente em 16/12; próximo pico previsto para dezembro/2026. Já realizados em 2026: Fluxo Online (maio), Master Fluxo (16 e 17/07), Fluxo Festival (agosto), SPP com IA (21 e 22/08), Retiro da Black (28/08), imersão FLP (22 a 24/09). Datas novas saem nos comunicados da Clara em #rtg-recados-gerais e no time de eventos.',
    tema: 'Eventos',
    quem: 'Fernanda Lizzardo, Ellen Cecilia, Ester Barbosa; Clara (comunicados)',
    fonte: '#fluxo-infos-navegadores, 28/09/2026 (Sprint Navs, Fernanda); #fluxo-evento-e-entregáveis, 28/09/2026 (Fernanda e Ester), 29/09/2026 e 30/09/2026 (Fernanda); #rtg-recados-gerais 30/07/2026 e 17/08/2026'
  },
  {
    pergunta: 'Quando é o Fluxo Online Copia e Cola e qual é o formato?',
    resposta: '26, 27 e 28 de novembro de 2026 (quinta, sexta e sábado). Dois dias para todos os mentorados e um dia (sábado) para Pro e Master, "como todo ano". Já trocada na agenda de eventos da empresa; deve ser trocada nas outras agendas e no Fluxer. Antes disso a data era 18 e 19/11 (sprint de 31/08). A palestra de traqueamento pelo Claude da Luciana entra no lugar da palestra da Dani. O formulário de interesse em palestrar para os mentorados (montagem do cronograma) está como próximo passo da Ester (29/09).',
    tema: 'Eventos',
    quem: 'Fernanda Lizzardo, Ester Barbosa',
    fonte: '#fluxo-evento-e-entregáveis, 31/08/2026, 03/09/2026 e 29/09/2026 (Fernanda)',
    links: ['https://venda-todo-santo-dia.monday.com/boards/18426402448']
  },
  {
    pergunta: 'O que ficou definido sobre o Retiro Levantamento de Caixa (08 e 09/10)?',
    resposta: 'Definições do sprint de 29/09/2026: o nome é Retiro Levantamento de Caixa (não "Ajuste de Velas ao vivo"); é o Ajuste de Velas ao vivo dos newbies deste pico, mesma estratégia do caixa rápido, e a gravação vira a aula dos próximos picos; navegadores podem ser convidados a dar aula e podem recusar. A comunicação vai para todos os mentorados nos grupos tradicionais e participa quem quiser; a copy precisa deixar claro que é um retiro da estratégia de low ticket; não vai ter grupo do evento; os pré-requisitos (conta na Hotmart, ChatGPT, Google e o que as palestras pedirem) ficam numa página com passo a passo, links e vídeos tutoriais, não numa pasta do Drive (mentorado não entra no Drive); Felipe Faé é o nome para a palestra de criação de e-book no lugar do Dudu, se aceitar; todo palestrante recebe termo de imagem, inclusive navegadores. Para o Exemplo que Inspira a Ana sugeriu uma mentorada do nicho de eventos (case de low ticket; e-mail na mensagem da AnaBe de 29/09). A operação é 100% na plataforma de eventos (teste); a execução é da Ester, a Ana recebe feedbacks da plataforma e reporta o andamento no canal. Copys para mentorados, naves (antes, véspera, dia e pós) e palestrantes já estão na plataforma e precisam de revisão antes de programar. Horário: 9h30 às 17h50, links do Zoom dos dois dias na conta 2. Mentorado sem integração não participa ao vivo (assiste à gravação; "só vai se perder").',
    tema: 'Eventos',
    quem: 'Ester Barbosa (execução), AnaBe (plataforma), Fernanda e Ellen',
    fonte: '#fluxo-evento-e-entregáveis, 10/09/2026 (Ester), 23/09/2026 (AnaBe), 29/09/2026 (Fernanda, AnaBe); #fluxo-infos-navegadores 28/09/2026 (Sprint); #fluxo-comercial-duvidas 28/08/2026 (Felipe Faé)',
    links: ['https://central-do-retiro.vercel.app/', 'https://vtsd.com.br/retiro-levantamento-de-caixa']
  },
  {
    pergunta: 'Quais calls coletivas existem às quintas e o que o mentorado precisa ter no Fluxo antes?',
    resposta: 'Quatro calls às quintas, no mesmo horário: tráfego, copy, Claude/Severino (com o Gabriel José, desde 27/08/2026, para dúvidas técnicas do Severino e do Claude) e Concepção de Produto (com o Léo, desde 27/08, limite de 5 mentorados por vez; entra quem já passou pelo diagnóstico e mesmo assim não consegue avançar o produto, ou quem se beneficiaria de uma análise). A partir de outubro a call de produto alterna Léo e Darah, uma semana cada. Desde a semana de 31/08 os detalhes do mentorado precisam estar registrados no Fluxo antes de toda call (o navegador prepara o doc como faz em copy e tráfego); para a call de Claude, incluir até o fim do dia anterior o nome do mentorado e as dúvidas com o Severino. Desde a semana de 21/09 as calls são criadas pela Ester no Fluxer (aba "Calls coletivas") e o navegador vincula os mentorados; as inscrições fecham 20h antes. Em semanas de pico as calls são suspensas e os mentorados remanejados (ex.: 22 a 24/09); a call de produto de 18/09 foi excepcionalmente na sexta às 15h. O Léo não cria link do StreamYard (recebe pronto); sem mentorado agendado, tirar a call da agenda dele e avisá-lo (a Ester confere na quarta). A Aline Carvalho acompanha as calls de copy desde 19/08 para entrar na escala.',
    tema: 'Eventos',
    quem: 'Ester Barbosa, Gabriel José, Léo, Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores 26/08, 27/08, 09/09 e 14/09/2026 (Ester, Fernanda); #fluxo-time-rtg 29/09/2026 (Ester); #fluxo-evento-e-entregáveis 18/08, 19/08 e 10/09/2026 (Fernanda, Natasha, Ester); #nocode-comunicados-fluxer 18/09/2026'
  },
  {
    pergunta: 'Como é a escala dos navegadores num pico?',
    resposta: 'Mudou entre os dois últimos picos. SPP com IA (21 e 22/08/2026, 10h às 18h): WhatsApp off na sexta, escala dividida (quem trabalha sábado não trabalha sexta), testes às 9h. FLP (22 a 24/09/2026): o WhatsApp não fica off; dois turnos fixos (manhã e tarde) nos três dias, cada um pausa o WhatsApp só no seu turno; reunião de alinhamento 8h30, testes das salas às 9h, transmissão 10h; no dia 3 entrada às 8h por causa do Q&A do Érico às 9h. Durante o FLP não teve analisador em tira-dúvidas: os navs cobriram o evento sem deixar o WhatsApp off. Função nos picos: tirar dúvidas no chat do Zoom, reportar intercorrências, testar skills e página de respostas rápidas antes. Depoimentos do chat não precisam ser printados: a coleta é automática pela Central de Depoimentos. Planilha de escala: "Pico Pago 2026 - Escala Navegadores".',
    tema: 'Eventos',
    quem: 'AnaBe, Ellen Cecilia',
    fonte: '#fluxo-infos-navegadores, 17/08, 20/08, 18/09, 21/09 e 22/09/2026 (Ellen, AnaBe); #fluxo-time-rtg 23/09/2026; #fluxo-evento-e-entregáveis 10/09/2026',
    links: ['https://docs.google.com/spreadsheets/d/1SF1ArWx3Q-vh5XMgiF72-MJ9foZCdfGwGcxRXXRPmZY/edit']
  },
  {
    pergunta: 'Quem modera os Zooms de tira-dúvidas e de sábado e o que o moderador faz?',
    resposta: 'Desde 10/09/2026 as aulas coletivas e os Zooms passam a ter sempre um moderador. No Zoom tira-dúvidas e no Zoom de sábado o moderador: inicia a reunião, aceita as pessoas na sala, grava, gerencia a fila de atendimento, marca o tempo de atendimento e envia o formulário de feedback no chat do Zoom depois de cada atendimento. O time vai testar não enviar mais o formulário de feedback do tira-dúvidas nos grupos, só pelo Zoom. Vale também quando o especialista é navegador. No Meet, o moderador precisa ter e-mail vtsd. Quando o time de eventos e entregáveis estiver off, a rotina de feedback passa para o navegador responsável.',
    tema: 'Eventos',
    quem: 'Ester Barbosa',
    fonte: '#fluxo-evento-e-entregáveis, 10/09/2026 (Ester, Natasha)'
  },
  {
    pergunta: 'Como o time se organiza numa transmissão de entregável no Zoom?',
    resposta: 'Combinados da Ellen (02/09/2026): 1. Alinhamento do palestrante e testes na véspera: ele precisa saber se pode iniciar sozinho, quem do time entra, quem modera e como fica o microfone dos participantes; acessos de host e gestão de participantes testados no dia anterior. 2. Admissão em tempo real: conforme identificar, já admite; ninguém fica esperando na sala de espera. 3. Host e coanfitriões do time definidos e liberados antes de começar, inclusive como plano B de conexão. 4. No ao vivo, foco na solução, os porquês ficam para depois. 5. Suporte ativo ao palestrante e ao chat: abrir microfone, ajustar permissão, ler perguntas, respostas prontas para as dúvidas de sempre (gravação, materiais, links, passo a passo) e tela de "voltamos em instantes" com playlist. Dica da Ester (01/09): admitir participantes devagar, esperando o Zoom carregar; clicar rápido pode liberar o microfone de alguns. Regra da Fernanda (02/09): quando o Leandro fala num Zoom, liberar só a permissão de compartilhamento de tela, sem co-host. Abertura e encerramento: 15 minutos quando não é o Leandro; 30 minutos quando é (Fernanda, 11/08).',
    tema: 'Eventos',
    quem: 'Ellen Cecilia, Fernanda Lizzardo, Ester Barbosa',
    fonte: '#fluxo-evento-e-entregáveis, 11/08/2026 (Fernanda), 01/09/2026 (Ester), 02/09/2026 (Ellen, Fernanda)'
  },
  {
    pergunta: 'Quando usar o Meet em vez do Zoom e que cuidados tomar?',
    resposta: 'Regra da Fernanda (18/08/2026): quando um evento ocupa todas as contas do Zoom (caso do SPP), os zooms de tira-dúvidas são feitos pelo Meet; se sobrar conta do Zoom, pode ser pelo Zoom. O Meet da empresa é pago (sem limite de 40 min), mas não grava. Criar o link com o e-mail vtsd na agenda (o do Léo não é vtsd), para que o criador consiga aceitar todos. Contas de Zoom ou Meet sem e-mail vtsd.com.br não conseguem liberar a entrada de mentorado sozinhas: para tira-dúvidas, usar sempre conta com vtsd.com.br ou ter moderador (sprint 24/08). No fim do Meet é preciso remover um por um; não é como o Zoom em que o host encerra para todos (22/08).',
    tema: 'Eventos',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-evento-e-entregáveis, 18/08/2026, 22/08/2026 (Fernanda), 25/08/2026 (sprint), 10/09/2026 (Fernanda, Ellen)'
  },
  {
    pergunta: 'Qual é o padrão de palestra e de PPT nos eventos e retiros?',
    resposta: 'Regra da Fernanda (19/08/2026): em todos os eventos e retiros usar sempre a divisão de palestra padrão dos eventos (a do mapa mental do briefing de evento), validada com o Leandro; "isso não pode mudar". O modelo de PPT novo (Canva, feito pela Manu) é enviado ao palestrante, que preenche com o conteúdo dele. Alinhamento de palestrante deve ir além de validar slides: olhar público e o que queremos que ele fale (03/09). Palestrantes recebem termo de imagem; os alinhamentos são feitos por StreamYard. Jornada do palestrante registrada pela Ester (30/09): confirmado ou recusado; termo de imagem (a fazer, enviado, assinado) e data; briefing geral; envio do vídeo da palestra; alinhamento 1 e 2; envio do material.',
    tema: 'Eventos',
    quem: 'Fernanda Lizzardo, Ester Barbosa, Manu (design)',
    fonte: '#fluxo-evento-e-entregáveis, 19/08/2026 (Fernanda, Natasha), 03/09/2026 (Fernanda), 30/09/2026 (Ester)',
    links: ['https://www.canva.com/design/DAHSpveQq74/8ENISykZA1Crj638OU9QaQ/edit', 'https://mm.tt/map/4047088019?t=vUF5mQ5qdf', 'https://mm.tt/map/4047088869?t=2YmzyUqaOQ']
  },
  {
    pergunta: 'Como preparar uma aula técnica (pré-requisitos, checkpoints)?',
    resposta: 'Sugestões da Ana após a aula de API oficial do Retiro da Black (18/09/2026, NPS 79, abaixo da média por falta de pré-requisitos e perfil menos técnico): sempre que houver pré-requisitos, enviá-los 2 dias antes junto com as comunicações da aula, com vídeo ou material de apoio; checkpoints na prática (o analisador só avança quando a maioria confirma as tarefas indispensáveis); aulas técnicas ocupam o dia inteiro com implementação e dúvidas. Já aplicado: material com passo a passo do disparador enviado com a gravação. Regra anterior da Fernanda (26/08): toda comunicação de aula semanal do retiro explica o que será a aula e o que a pessoa deve ter em mãos. Em 29/09 ficou definido que os pré-requisitos do Retiro Levantamento de Caixa ficam numa página com passo a passo.',
    tema: 'Eventos',
    quem: 'AnaBe, Fernanda Lizzardo',
    fonte: '#fluxo-evento-e-entregáveis, 26/08/2026 (Fernanda), 25/09/2026 (AnaBe), 29/09/2026 (Fernanda)',
    links: ['https://drive.google.com/file/d/1IZroozJv0AuZojXJfISejEwuL5rZhG5D/view', 'https://drive.google.com/file/d/17RG1lvopVr9-wwZbZjd_KshRbptPnbQc/view']
  },
  {
    pergunta: 'Quem faz o backup de quais gravações do Zoom?',
    resposta: 'Divisão registrada pela Ellen (21/09/2026). Time de Produtos e Pós-venda baixa: eventos de pico e lançamentos (dividindo com Marketing), reuniões do MasterFluxo que serão postadas, Zooms com o Ladeira e VTSD, aulas ao vivo dos produtos e aulas ou eventos pontuais do Fluxo sinalizados para edição e postagem. Time Fluxo baixa: todas as reuniões de integração, treinamentos e aulas sem necessidade de edição e postagem. Time Comercial baixa: todos os treinamentos e reuniões do time. Baixar todos os arquivos da gravação (conferir quando há mais de um), nunca trocar a gravação para o computador (sempre nuvem) e, depois do backup, excluir do local original e da lixeira do Zoom. A Ana faz a limpeza periódica das contas 1 a 6 e sobe no YouTube do Fluxo o que faltava (28/09: contas limpas).',
    tema: 'Eventos',
    quem: 'Ellen Cecilia, AnaBe (limpeza), Lívia Vieira (pós-venda)',
    fonte: '#fluxo-evento-e-entregáveis, 21/09/2026 (Ellen), 22 e 28/09/2026 (AnaBe)'
  },
  {
    pergunta: 'Como funciona a mudança de nível mensal e a placa?',
    resposta: 'Aprovação e post de mudança de nível são mensais; o mentorado solicita a mudança no Fluxer com comprovante até o prazo avisado (em agosto: quarta 19/08 às 12h; em setembro a publicação foi 30/09). O navegador lembra os mentorados. Placa de mudança de nível não é enviada pelo correio: só é entregue presencialmente, no evento. A mandala física pode ser enviada pela Ester. Se alguém prometeu placa ao mentorado, avisar a Ester para alinhar.',
    tema: 'Eventos',
    quem: 'Ellen Cecilia, Fernanda Lizzardo, Ester Barbosa',
    fonte: '#fluxo-time-rtg, 18/08/2026 (Natasha); Sprint 28/09/2026; #fluxo-duvidas-relacionamento, 29/09/2026 (Ester)'
  },
  {
    pergunta: 'Ainda cadastramos os eventos na agenda do Google dos mentorados?',
    resposta: 'Sim. Enquanto não sai o app do Fluxer, os eventos e os offs continuam sendo cadastrados também na agenda do Google dos mentorados, com horário (não "dia todo"), porque muitos ainda se localizam por lá (Ellen, 04/09/2026). Resposta padrão para mentorado que quer sair da agenda: ele adicionou voluntariamente a agenda do Fluxo e só ele consegue excluir (Google Agenda > Configurações > nome da agenda > Remover agenda > Excluir).',
    tema: 'Eventos',
    quem: 'Ellen Cecilia, Ester Barbosa',
    fonte: '#fluxo-evento-e-entregáveis, 04/09/2026 (Ellen, Ester)'
  },
  {
    pergunta: 'Como funcionou o Desafio Puro Lucro?',
    resposta: 'Desafio só para mentorados em período de renovação (jul, ago e set), apresentado no aulão do Puro Lucro de 12/08/2026 (aula publicada na página do desafio, não no Academy). Duração 16 a 31/08; inscrição até 15/08 pela página; comprovação pelo formulário de resultados até 14/09 às 10h. Premiação: 1º análise de debriefing e tráfego com o Ruy; 2º análise personalizada do funil com a Fernanda; 3º participação ao vivo no debriefing do lançamento pago do VTSD. Fases: fase 0 expectativa (18/08 liga tráfego de relacionamento, 1 reels por dia, 1 live), fase 1 abre o grupo para dúvidas, pico 30/08 (carrinho 8h às 20h, link só no grupo VIP), 31/08 downsell e debriefing. Navegador registra no Fluxer a ação "desafio puro lucro" na renovação. Exceção aprovada: quem abriu carrinho depois pode entregar depois, sem concorrer à premiação. Só 2 mentorados preencheram a comprovação até 14/09.',
    tema: 'Eventos',
    quem: 'Ester Barbosa, Fernanda Lizzardo (a Natasha conduzia)',
    fonte: '#fluxo-infos-navegadores, 11/08 a 16/09/2026 (Natasha, Ester, Fernanda); #fluxo-time-rtg 10/09/2026',
    links: ['https://vtsd.com.br/desafio-puro-lucro', 'https://fluxo-desafio-puro-lucro.vercel.app/', 'https://vtsd.com.br/resultados-puro-lucro', 'https://drive.google.com/drive/folders/1Fh5cncRse9C7QR2buvPm2z48Anjm-Jn1']
  },
  {
    pergunta: 'Quais são as regras, a premiação e o status do Desafio do Fluxo Festival 2026?',
    resposta: 'Regras: mostrar prints das vendas com lucro; contar quais resultados teve e o que mudou na vida; publicar vídeo no Instagram em collab com o Leandro até 14/08/2026; preencher o formulário. Premiação: 1º lugar 1 ano de Fluxo grátis (mais vendas comprovadas e lucro); 2º lugar Ladeira Day com passagem e hospedagem em Brasília (vídeo mais criativo); todo mundo que cumprir as regras ganha uma palestra exclusiva do Master Fluxo. Ninguém enviou o lucro em si (mandaram faturamento, líquido, ganho); a Natasha propôs considerar esses dados. Definido em 29/09: o 2º lugar entra no Ladeira Day com menos gente e o 3º prêmio é liberado pela turma de bônus. Próximos passos da Ester: marcar a Fer na mensagem dos finalistas, ver passagem e hospedagem do 2º, confirmar a palestra do 3º e alinhar com a Lívia a subida no Academy. Em 09/09 ainda não havia resultado divulgado. A planilha de finalistas está na mensagem de 11/09 em #fluxo-evento-e-entregáveis (dados de mentorados, não fica na central).',
    tema: 'Eventos',
    quem: 'Ester Barbosa, Fernanda Lizzardo',
    fonte: '#fluxo-time-rtg, 14/08/2026 (AnaBe, Natasha), thread até 09/09; #fluxo-evento-e-entregáveis, 11/09/2026 (Natasha), 29/09/2026 (Fernanda)',
    links: ['https://tally.so/r/EkG6jX']
  },
  {
    pergunta: 'Quem ganhou o Desafio Express de 14 dias e onde estão as listas dos desafios (garantia condicional)?',
    resposta: 'Desafio Express (jun/26): quatro ganhadores (mais seguidores, mais conteúdos, mais views, vídeo mais visto), aprovados pela Ellen em 10/08/2026; prêmio: jantar com o Leandro, data e local a definir (o time entra em contato com os ganhadores; o navegador não precisa avisar). Os nomes estão em #fluxo-evento-e-entregáveis 10/08 e #fluxo-time-rtg 10/09. Todos os desafios estão num quadro do Monday, com planilhas por desafio: Express (inscrição e final); Desafio Skill de Tráfego (jul/26): não teve formulário, os vídeos foram para o WhatsApp e o número não foi recuperado; Desafio Fluxo Festival (ago/26): inscrição; Desafio Puro Lucro (ago/26): inscrição e final. Casos de garantia condicional: o relacionamento pede a lista de participantes e a Ellen pede a exportação completa do formulário diário do Tally (quem enviou e data de cada envio). As planilhas de inscrição e final estão nas mensagens de 09/09 e 11/09 em #fluxo-evento-e-entregáveis (dados de mentorados, não ficam na central).',
    tema: 'Eventos',
    quem: 'Ester Barbosa, Ellen Cecilia',
    fonte: '#fluxo-infos-navegadores, 12/08/2026 (Natasha); #fluxo-time-rtg 10/09/2026; #fluxo-evento-e-entregáveis, 10/08/2026 (Natasha), 09/09/2026 (Natasha), 11/09/2026 (Ellen)',
    links: ['https://desafio-express-do-fluxo.vercel.app/', 'https://venda-todo-santo-dia.monday.com/boards/18394558591']
  },
  {
    pergunta: 'Quem entra no Fluxo Festival, dá para transferir o ingresso e onde estão os materiais de 2026?',
    resposta: 'Mentorado que entrou até 30/06 vai para o Festival de agosto/2026; quem entrou a partir de 01/07 só tem direito ao Festival 2027. Festival é só para mentorados ativos (inadimplente em negociação: confirmar com a Lya). Transferência: o mentorado cadastra um substituto no Fluxer (Eventos > Fluxo Festival > Cadastrar substituto) e deixa de poder comparecer. Notebook: pode levar, mas o kit tem moleskine e há mesas. Materiais do Festival 2026: pastas Dia 1 e Dia 2 no Drive (PPT do Ruy entrou depois); gravações da cabine de anúncios por dia, período e mentorado no Drive (o navegador manda a pasta do seu mentorado; o mentorado também recebe o link bruto por e-mail). Fotos por reconhecimento facial em photofinder.vtsd.com.br (site do Pires; copy é código, não se altera); em 20/08 ainda não deviam ser compartilhadas com mentorados. Fotógrafo ou site pago é decidido por evento; no Festival 2026 não foi contratado. Fotos dos palestrantes são separadas e enviadas em links individuais no privado.',
    tema: 'Eventos',
    quem: 'Ester Barbosa',
    fonte: '#fluxo-time-rtg, 03/08 e 04/08/2026 (Alessandra, Ester, Fernanda); #fluxo-infos-navegadores 10/08 e 11/08/2026 (Natasha, Ester); #fluxo-evento-e-entregáveis 10 a 13/08/2026 (Fernanda, Ester)',
    links: ['https://drive.google.com/drive/folders/1PCiJvljTnmPmWAHLcRhERPg6yQYXd-gL', 'https://drive.google.com/drive/folders/1uyiEJblSdFGKyee1Vp6cj0SeCbbcnjp8', 'https://drive.google.com/drive/folders/18h-GxRm2ep8qHzdzGNFRq6qoPXbe3pxF', 'https://photofinder.vtsd.com.br/album/fluxo-festival-2026']
  },
  {
    pergunta: 'Onde estão o Retiro da Black, os zooms semanais e os formulários de feedback?',
    resposta: 'O Retiro Black Friday 2026 (28/08) está no Academy desde 03/09/2026 (a página do retiro também aponta para lá); a página antiga do retiro está desatualizada e não deve ser compartilhada. Todos os zooms semanais da Black serão disponibilizados: "Criando seu produto Mid Ticket para Black Friday" (Igor Braga, 04/09) entrou no Fluxer em 22/09 e "Divulgação de produto Mid para Black Friday" (Felipe Matheus, 10/09) em 23/09; Rafa 18/09 (API oficial, oferta e mote); Ângela 16/10 (campanhas). Formulários de feedback por tema no Tally: Concepção de produto (GxO57z), Divulgação de produto (xX8vok), Oferta e mote (b51vG7), Página de captura e obrigado (PdZkyx), Campanhas (vG8K14); feedback do retiro: MeZy9E. Cronograma e materiais na pasta compartilhada da RTG em Eventos > Retiro Black; referências de Black anteriores (Figma BF24 e BF25 e anúncios) na thread do sprint de 24/08. Não foram liberadas skills específicas de Black no Severino (04/09).',
    tema: 'Eventos',
    quem: 'Ester Barbosa, Lívia Vieira, Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores 27/08 e 03/09/2026 (Fernanda, Ester); #fluxo-time-rtg 02/09, 04/09, 18/09, 22/09 e 23/09/2026; #fluxo-evento-e-entregáveis 14/08, 18/08 e 25/08/2026 (Natasha, Ester)',
    links: ['https://drive.google.com/drive/folders/1G_95UepCWy_-VqzroYSeXW9e0KeW6-5l', 'https://docs.google.com/document/d/1N4AAzgd9apg8UKnSmgr2FHPgXHAqnsp06TVszLNH4Yo/edit', 'https://tally.so/r/GxO57z', 'https://tally.so/r/xX8vok', 'https://tally.so/r/b51vG7', 'https://tally.so/r/PdZkyx', 'https://tally.so/r/vG8K14']
  },
  {
    pergunta: 'Todo evento do Fluxo tem transmissão ao vivo e cenário?',
    resposta: 'Cenário, sim: "todo evento do Fluxo tem um cenário montado" (Clara, 27/04/2026), com a Tamiris. Transmissão ao vivo do Festival: sempre houve em todas as edições (Ellen), mas a Clara pediu que isso seja alinhado com o time de eventos a cada edição, porque muda a equipe técnica e o custo. Testes de zoom e estúdio acontecem na semana anterior ao evento.',
    tema: 'Eventos',
    quem: 'Time de Eventos e Entregáveis, Tamiris (cenário), Thiago Leal (estúdio)',
    fonte: '#fluxo-time-rtg 30/06/2025; #evento-fluxo-online 28/07/2025 e 27/04/2026'
  },
  {
    pergunta: 'O que precisa estar pronto antes de um evento do Fluxo com renovação?',
    resposta: 'Checklist da Clara (04/05/2026): pitch, sinal da renovação, ofertas da renovação, peças do zoom e salas do zoom. Regras usadas no Fluxo Online 2026: mesmos QR codes com UTM nova; cupom não funciona em assinatura mensal; R$ 1 mil de desconto para quem renova no evento e preço normal depois.',
    tema: 'Eventos',
    quem: 'Érica (ofertas e QR), Fernanda (regras de renovação)',
    fonte: '#evento-fluxo-online, 04/05/2026'
  },
  {
    pergunta: 'O que é a Fritada Master Fluxo?',
    resposta: 'Entregável exclusivo dos mentorados do Master Fluxo, dado como bônus no Fluxo Evento 02/2025 e no Retiro Ano Novo jan/2026: análise ao vivo de página de vendas de alguém do Master, com os premiados assistindo. Edição de 2026: marcada para 26/08 às 14h e remarcada para 31/08 às 10h; participação mediante formulário Tally, que também entrega o link; a data pode mudar sem aviso porque depende da agenda do Leandro. A lista de premiados por navegador está nas mensagens da Ester de 24/08 e 26/08 em #fluxo-infos-navegadores.',
    tema: 'Eventos',
    quem: 'Ester Barbosa',
    fonte: '#fluxo-infos-navegadores, 24/08 e 26/08/2026 (Ester)',
    links: ['https://tally.so/r/7R9DP2']
  },
  {
    pergunta: 'O Confessionário ainda roda e como fica o brinde de faturamento da Black?',
    resposta: 'Confessionário (formulário no Lovable da conta Ferramentas) tem data automática e filtro por período. Regra da Fernanda (12/08/2026): depois de cada evento, rodar o Confessionário de novo, mantendo o histórico por data. Em 27/08: 44 confissões nos últimos 30 dias (286 no total); estratégia aprovada: liberar o material do primeiro Zoom semanal da Black só para quem responder. Em 10/09: nenhuma comunicação sobre o Confessionário por enquanto. Brinde da Black (em estudo desde 25/08, definição de 29/09): chaveiro para quem faturar acima de um valor (50 mil como referência), plaquinha menor para maior conversão e maior faturamento, carta em caixinha no estilo da Hotmart como opção, tudo dependendo de custo; a Ester vê fornecedor e preço com o Fabão; objetivo é puxar depoimento da Black.',
    tema: 'Eventos',
    quem: 'Ester Barbosa, Fernanda Lizzardo, Ellen Cecilia',
    fonte: '#fluxo-evento-e-entregáveis, 12/08, 25/08, 27/08, 31/08, 10/09 e 29/09/2026 (Fernanda, Ester)',
    links: ['https://lovable.dev/projects/29651d86-0914-4f8f-881a-c5411cacb8cb', 'https://claude.ai/code/artifact/32c4b996-9b6b-47de-b61c-cf39f89e3385']
  },
  {
    pergunta: 'Onde estão as playlists de depoimentos e quem sobe os vídeos?',
    resposta: 'Duas playlists no YouTube: "Exemplos que Inspiram" e "Concurso de Resultado" (todos os vídeos do Fluxo, exceto os que o mentorado removeu ou deixou privado). Desde 21/09/2026 o time de Eventos e Entregáveis sobe os vídeos de depoimentos nas playlists: sempre que surgir vídeo novo de Concurso de Resultado (Express, Jump Cat ou outro), subir na playlist correspondente; os de Exemplos que Inspiram já estavam na atualização periódica. Palestras do Fluxo Festival: avisar a Fernanda quando editadas e publicadas e selecionar as estratégicas para o YouTube com CTA do Fluxo (pedido do Leandro, 11/08). Nova apresentação de Boas-vindas (Manu, 24/09) no Canva.',
    tema: 'Eventos',
    quem: 'Fernanda Lizzardo, Ester Barbosa, Emanuelle Lima (Manu)',
    fonte: '#fluxo-infos-navegadores, 21/09/2026 (Fernanda); #fluxo-time-rtg 24/09/2026 (Ellen); #fluxo-evento-e-entregáveis, 11/08/2026 e 21/09/2026 (Fernanda)',
    links: ['https://www.youtube.com/playlist?list=PLveVb6p7gA6XmY2j0jtrBsbEg1wxbC7TQ', 'https://www.youtube.com/playlist?list=PLPJdn1HJZ2nc', 'https://canva.link/ua6jlgcgtn7c7rj']
  },
  {
    pergunta: 'Onde pedir criativos, os melhores anúncios de captação, o planejamento da Black e gravações antigas?',
    resposta: 'Anúncios de captação ("nossos melhores ads"): 5 pastas do Drive passadas pela Clara em 24/08/2026 (links abaixo); remarketing de quem comprou lote e live da Black 2024 no YouTube também saem com a Clara. Antes de pedir, dizer a fase e o objetivo (captação, remarketing ou ao vivo), porque ela devolve a pergunta quando é aberta demais. Planejamento da Black: playbook do Vilas Boas (datas) e planilha do Samuca (investimento em tráfego), entregues no retiro; o mentorado pode compartilhar o playbook com especialista de fora da mentoria. Materiais de eventos ficam no Monday, quadro Central de Links da Mentoria.',
    tema: 'Links',
    quem: 'Clara Coppola, Fernanda Lizzardo, Ester Barbosa, time de tráfego',
    fonte: '#fluxo-time-rtg 16/06/2025, 14/08/2026, 24/08/2026 (Amanda, Clara), 31/08/2026 (Felipe Pacheco, Ester) e 14/09/2026 (Amanda, Fernanda)',
    links: ['https://drive.google.com/drive/u/0/folders/1EFpx0v2VRLNVkxvMY1ope7zyGlxDq3M1', 'https://drive.google.com/drive/u/0/folders/1VYcDMtzxb3HElF2vSlvKqKEIJNVeZN7A', 'https://drive.google.com/drive/u/0/folders/1eAsQ63fGpAc9C8LX6qalQoRAhXgqgZfG', 'https://drive.google.com/drive/u/0/folders/1dGa_Kmf-u3PSRGaPlnjqZURO8c1X76Hf', 'https://drive.google.com/drive/u/0/folders/14nZu4vr9dc941K1P7Nd_hTUJoe1YZwLZ', 'https://playbook-black-friday.vercel.app/']
  },
  {
    pergunta: 'Onde acho aula de pico pago, webinar gravado e a planilha de patrimônio?',
    resposta: 'Pico pago: o Caixa 10x é 100% sobre isso; recomendação dos analisadores é produto de R$ 1 mil ou mais, abaixo disso melhor pico gratuito; mapa mental do Retiro Caixa 10x no MindMeister. Webinar gravado: palestra do Alysson Costa (Fluxo CrIAtivo 2025, dia 1: Webinarjam, Everwebinar, Buideral) e aulas do Renan Bello (Retiro UpSell), nos links do Academy abaixo. Planilha de patrimônio (Filosofia Ladeira): link do Robson. Mapa mental dos processos da navegação (Jéssica, 04/08/2026).',
    tema: 'Links',
    quem: 'Felipe Faé, Ester Barbosa, Robson Rodrigues',
    fonte: '#fluxo-time-rtg, 10/08, 11/08, 28/08 e 09/09/2026; #fluxo-infos-navegadores 04/08/2026 (Jéssica)',
    links: ['https://www.mindmeister.com/app/map/3739866736?t=MWdPDeu7mH', 'https://www.mindmeister.com/app/map/4060385316?t=qWJqTKoK5d', 'https://docs.google.com/spreadsheets/d/18AVsFejCWVs8C-vKisLkU0qmIuodML0p/edit', 'https://flx.vendatodosantodia.com.br/academy?course=5&lesson=763&module=159', 'https://flx.vendatodosantodia.com.br/academy?course=5&lesson=1218&module=163']
  },

  /* ---------- Fluxer e ferramentas ---------- */
  {
    pergunta: 'Como cadastrar uma call coletiva no Fluxer e quem tem acesso?',
    resposta: 'Fica em Fluxer > menu Especialistas > aba "Calls coletivas". Acesso: admin, líder navegador, navegador, volante e especialista (especialista só vê as próprias calls); operacional precisa da permissão "Gerir bate-papo coletivo". Para cadastrar: "Nova call" > escolher especialista e tipo (Tráfego, Copy, Claude ou Produto) > data, hora de início e término (mesmo dia) > colar link do Zoom e do YouTube > "Criar call". O título sai automático ("Call Coletiva - Tráfego"). Desde a semana de 21/09/2026 toda call coletiva é criada e preenchida por lá (a call de produtos de 18/09 ainda foi no MVP, que foi desativado). Quem cria é a Ester ou a AnaBe; os navegadores vinculam os mentorados. Ainda é preciso enviar o link ao navegador porque a tela dos mentorados não foi implementada. Depois da call, quem criou clica em "Marcar como realizada" (vai liberar a avaliação dos inscritos quando existir a tela dos mentorados); cancelar a call só quem criou consegue.',
    tema: 'Fluxer',
    quem: 'Gabriel José, Felipe Faé, Fernanda Lizzardo',
    fonte: '#nocode-comunicados-fluxer, 18/09/2026 (Gabriel José; thread com Fernanda e Felipe Faé)'
  },
  {
    pergunta: 'Como inscrever um mentorado numa call coletiva e qual é o prazo?',
    resposta: 'Na lista de calls, clicar em "Abrir" > "Inscrever mentorado" > buscar por nome ou e-mail > escrever o que ele leva para a call, ou usar "Identificar problema com IA" (a IA lê a conversa do WhatsApp do mentorado, sugere o problema e aponta os arquivos que valem anexar; revisar antes e tirar o que não cabe) > "Inscrever na call". Limite padrão de 5 pessoas por call (coluna "Inscritos"). As inscrições fecham 20 horas antes do início (ex.: call quinta 9h fecha quarta 13h); o painel mostra a hora exata em "Inscrições até". O prazo existe para o especialista preparar os casos. Remover alguém que entrou errado continua liberado até a hora da call.',
    tema: 'Fluxer',
    quem: 'Gabriel José',
    fonte: '#nocode-comunicados-fluxer, 18/09/2026 (Gabriel José)'
  },
  {
    pergunta: 'Por que a mensagem repetiu várias vezes no grupo Mentoria Fluxo Geral e o que muda?',
    resposta: 'Em 28/09/2026 o Fluxer enviou uma vez; quem repetiu foi a Evolution (sistema que conecta o WhatsApp às caixas), falha conhecida em grupos grandes. Correções (valem quando aprovadas, o Gabriel avisa): grupos com 30 pessoas ou mais não aceitam envio pelo Fluxer (aviso "Trava de segurança"; usar o WhatsApp do celular); se o WhatsApp demorar, o Fluxer avisa que a mensagem pode ter saído (conferir antes de reenviar); a mesma mensagem não sai duas vezes seguidas; botão Enviar da sugestão trava enquanto envia; grupo aparece com nome e número de pessoas. O time estuda sair da Evolution.',
    tema: 'Fluxer',
    quem: 'Gabriel José',
    fonte: '#fluxo-ia, 28/09/2026 (Gabriel José)'
  },
  {
    pergunta: 'O que é o entregável tipo Quiz no Fluxer e como usar?',
    resposta: 'Desde 08/09/2026 existe o tipo de entregável "Quiz" no Gerenciador: questionário dentro do plano de ação que o mentorado responde no próprio Fluxer. Dois modos: Formulário (sem nota, só coleta) e Prova (com nota; define respostas corretas nas objetivas e o mentorado recebe a quantidade de acertos). Formatos de pergunta: múltipla escolha, texto livre, escala, número e valor em R$. Botão "Prévia" para testar antes de disponibilizar. O mentorado responde uma pergunta por vez e finaliza em "Entregar quiz"; depois pode consultar as respostas. Regras: envio único (não refaz nem reenvia); no modo Prova só perguntas objetivas com gabarito pontuam. O quiz de nivelamento do Ajuste de Velas não muda.',
    tema: 'Fluxer',
    quem: 'Rodolfo (no-code), Ellen Cecilia',
    fonte: '#nocode-comunicados-fluxer, 08/09/2026 (Rodolfo)'
  },
  {
    pergunta: 'O que a plataforma de eventos (Central de Gestão de Eventos) vai ganhar e quem faz o quê nela?',
    resposta: 'Sprint de 29/09/2026: a plataforma de eventos da Ana passa a ser usada no dia a dia, começando pelo Retiro Levantamento de Caixa; se der certo, vai para dentro do Fluxer (como o NavMaster). As copies de e-mail entram na plataforma junto das de WhatsApp; o botão de gerar mensagem a partir de objetivo e CTA fica para uma segunda fase. Próximos passos da Ana: botão de cadastrar novo evento ou entregável na tela inicial, alinhamentos numa lista única de palestrantes (sem divisão dia 1 e dia 2) e cópias de e-mail com base nos e-mails anteriores do Active. A Fer fala com o Ramires (05/10) sobre cadastro de time no Fluxer para o evento online e sobre levar a plataforma para o Fluxer (com o Douglas). Transmissão dos eventos dentro do Fluxer: não descartada, fica para depois. Login de todos do canal criado pela Ana (28/09); a senha foi enviada no privado e não fica na central.',
    tema: 'Fluxer',
    quem: 'AnaBe, Fernanda Lizzardo',
    fonte: '#fluxo-evento-e-entregáveis, 25, 28 e 29/09/2026 (AnaBe, Fernanda)',
    links: ['https://central-do-retiro.vercel.app/']
  },
  {
    pergunta: 'Onde mandar dúvida de IA e onde ver erros do Fluxer?',
    resposta: 'Mensagens sobre IA e agentes não vão em #nocode-comunicados-fluxer (canal só de comunicados do no-code); mandar em #fluxo-ia (orientação da Darah, 31/08/2026). Erros do Fluxer são comunicados em #nocode-comunicados-fluxer: em 25/09/2026 houve erro na liberação de agenda para mentorados e no agendamento direto de análise, corrigido no mesmo dia (15h43).',
    tema: 'Fluxer',
    quem: 'Darah Fontana, Ramires',
    fonte: '#nocode-comunicados-fluxer, 31/08/2026 (Darah) e 25/09/2026 (Ramires)'
  },
  {
    pergunta: 'Como padronizar os links na Terminus (etiquetas)?',
    resposta: 'A Ester criou na Terminus a etiqueta "zoom-duvida" para os links de Zoom de sábado; a ideia é clonar esse link e trocar o destino quando necessário. Regra: sempre usar etiquetas na Terminus para identificar o objetivo e o destino de cada link (28/09/2026). Exemplo: no Analisador Day de 22/09 a Ana trocou a URL de destino no Terminus e o link dos mentorados continuou o mesmo.',
    tema: 'Fluxer',
    quem: 'Ester Barbosa, AnaBe',
    fonte: '#fluxo-evento-e-entregáveis, 21/09/2026 (AnaBe), 28/09/2026 (Ester)'
  },
  {
    pergunta: 'O que é o projeto "Cestas do Fluxer" e onde estão os materiais?',
    resposta: 'Projeto para montar "cestas" de tarefas e entregáveis no Fluxer a partir de transcrições de palestras. A Lívia deixou (03/08/2026, antes de sair da Navegação) a skill "criar-entregavel-fluxer-1.0.skill", que monta a cesta inteira com base na transcrição de uma palestra, e liberou para o time ajustar o prompt (arquivo anexado no canal #projeto-cestas-do-fluxer). Em 20/08 a Manu reuniu no canal as transcrições do D48 (julho e setembro), do retiro-quiz e o PDF FluxoD48h_26, e a Natasha compartilhou um doc de exemplo de cesta.',
    tema: 'Fluxer',
    quem: 'Emanuelle Lima (Manu), Ester Barbosa',
    fonte: '#projeto-cestas-do-fluxer, 03/08/2026 (Lívia Vieira) e 20/08/2026 (Manu, Natasha)',
    links: ['https://docs.google.com/document/d/1QMrQpk8mQBsNUiZcozed9OTwZaARHWivq9b7HSs_sBc/edit?usp=sharing', 'https://docs.google.com/document/d/1Ln2OAsvhasXkwAlQOs-Ie7kfr1axu0AXRpguzW09UqE/edit?tab=t.0']
  },

  /* ---------- IA e agentes ---------- */
  {
    pergunta: 'Os agentes do quiz do Gabriel Muniz pararam. O que indicar?',
    resposta: 'O Gabriel Muniz cancelou a conta e os agentes caíram (24/08/2026). A Ellen refez os três (gerador de perguntas do quiz, checkpoint do quiz e gerador de página final); os navegadores indicam esses aos mentorados no lugar do antigo. A senha dos agentes está na thread de 04/09 em #fluxo-time-rtg (Ester); não fica na central.',
    tema: 'IA e agentes',
    quem: 'Ellen Cecilia, Ester Barbosa',
    fonte: '#fluxo-time-rtg 24/08/2026 (Robson) e 04/09/2026 (Jéssica, Ester); #fluxo-infos-navegadores 27/08/2026 (Sprint)'
  },
  {
    pergunta: 'O que acontece com os agentes GPT do Fluxo em dezembro e qual é a alternativa?',
    resposta: 'Segundo a Ellen (29/09/2026), em dezembro todos os GPTs dos produtos vão parar de funcionar pela nova regra do GPT. Ela testou os agentes da Hotmart (entregam imagem, HTML, planilha, PDF, ppt e texto) e replicou o resultado das skills; proposta: criar um produto "Agentes Fluxo" (ou só "Levantamento de Caixa") na Hotmart, acessado pelo Academy, subindo os agentes do zero com prompts das skills novas (não migrar). Pontos da Lívia: migração de produtos em formato de agente precisa ser feita pela Hotmart com antecedência; aula de uso dos agentes do VTSD precisa ser regravada; sugestão de Zoom do VTSD sobre isso em novembro. Decisão fica para o próximo sprint.',
    tema: 'IA e agentes',
    quem: 'Ellen Cecilia, Lívia Vieira, Ester Barbosa',
    fonte: '#fluxo-evento-e-entregáveis, 29 e 30/09/2026 (Ellen, Lívia)'
  },
  {
    pergunta: 'Quais skills foram usadas no FLP e onde estão?',
    resposta: 'Ordem das skills do evento (arrastar para o Claude chat e dizer "vamos rodar essa skill"): Criação de Evento (definicao-evento-pago.zip), Criação da página (copy-pagina.zip), Anúncios (3 arquivos .md: objetos estranhos, promessa simples, surreal) e Tráfego (27-Trafego.zip, esse precisa abrir e conferir as pastas). Página extra para definição do produto: criadordeoferta.lovable.app. Skills de evento não se instalam, rodam no chat (as de SPP também). Arquivos anexados na mensagem da Ellen de 18/09/2026 em #fluxo-ia.',
    tema: 'IA e agentes',
    quem: 'Ellen Cecilia',
    fonte: '#fluxo-ia, 18/09/2026 (Ellen)',
    links: ['https://criadordeoferta.lovable.app/']
  },
  {
    pergunta: 'Tráfego com IA (Ruy), Tráfego com IA Pro e as skills de tráfego do Severino são a mesma coisa?',
    resposta: 'Não. Tráfego com IA está num módulo do VTSD; Tráfego com IA Pro está num módulo do Super Ads (produto vendido em vendatodosantodia.com.br/trafego-ia-pro). O Severino tem 6 skills de tráfego (criar campanha, otimizar, escalar, analisar, métricas); o Pro tem 14: as 6 reescritas mais 8 novas (pixel e API de conversões, públicos, testes A/B, automações no Meta, análise de criativo por etapa, diagnóstico de página e oferta, detector de falso vencedor, conexão da conta Meta ao Claude).',
    tema: 'IA e agentes',
    quem: 'Érica, Aline Carvalho',
    fonte: '#fluxo-time-rtg, 13/08/2026 (Darah, Érica, Aline Carvalho) e 16/09/2026 (Samuel)'
  },
  {
    pergunta: 'Como funciona o MVP fora do Fluxer antes da integração?',
    resposta: 'Caminho oficial (Fernanda, 11/08/2026): MVP fora do Fluxer primeiro (o Fluxer Lab existe para isso), depois integração pelo time de no-code (Gabriel José e Vitor), como foi com o NavMaster, o gerador de contexto (skill do Felipe Faé internalizada) e o agendamento de calls coletivas (MVP do Felipe substituído pela função no Fluxer em 29/09). Ideia em ideação: processo de contato ativo com IA (acompanhamento, plano a vencer, plano vencido, eventos), Felipe Faé com execução do Gabriel José; a Alessandra montou um painel só leitura no Claude com esse fim.',
    tema: 'IA e agentes',
    quem: 'Fernanda Lizzardo, Gabriel José, Felipe Faé',
    fonte: '#fluxo-ia, 11/08, 24/08, 31/08, 02/09 e 08/09/2026'
  },

  /* ---------- pessoas e responsáveis ---------- */
  {
    pergunta: 'Quem cuida de quê na operação do Fluxo e quem está em cada função depois das mudanças de setembro?',
    resposta: 'Fernanda e Ellen: liderança do Fluxo, agenda de análises, regras de renovação e NPS. Clara: decide exceções, contrato, contas, comunicados e, desde 15/09/2026, a gestão do time de analisadores. Ester: grupos de WhatsApp dos ganhadores, confirmações, agenda das entregas dos picos, calls coletivas no Fluxer, bônus e acesso ao Arsenal Viral e Criativo. Robson Rodrigues: à frente do relacionamento (canal e WhatsApp) e, desde 29/09/2026, único contato para dúvidas de relacionamento (integração, congelamentos, sumidos, cancelamentos); também é navalisador (diagnósticos) desde 25/08. Tassia em licença-maternidade e Jéssica afastada sem data de volta. Natasha foi desligada em 14/09/2026 (mudança estratégica); o que estava com ela (liberação de PA, treinamentos, comunicações e desafios) passou para Ester, Ellen e Fernanda. Lívia saiu da Navegação em 04/08 (segue na empresa, no Academy e produtos). João Pedro Gandara: sinais, fechamentos, lista dos 10 primeiros, planilha do zoom e distribuição de leads. Érica: Hotmart, links de pagamento, importação em cursos, ofertas e QR codes. Lyandra (Lya): financeiro, inadimplência, termos de congelamento e notas fiscais (com a Luna); links parcelados de renovação (registro de 07/08; ver a pergunta sobre link personalizado). Taynáh: contratos e comunicados de zoom. Rodolfo, Vitão, Ramires, Gabriel José e Nono: Fluxer e no-code. Tamiris: aulas na área de membros e cenário. Fábio: pagamentos a fornecedores. Clara off de 02 a 09/10/2026; Ester voltou de suspensão programada em 28/09. Problema de mentorado sem dono claro: mandar no canal do Fluxo.',
    tema: 'Pessoas',
    quem: 'Ellen Cecilia, Fernanda Lizzardo, Clara Coppola',
    fonte: 'Varredura das threads da Clara no Slack, 2025 e 2026 (ver LEVANTAMENTO-CLARA.md); #fluxo-infos-navegadores 14/09 e 28/09/2026; #fluxo-time-rtg 04/08, 07/08 e 25/08/2026; #fluxo-comercial-duvidas 29/09/2026 (Ester)'
  },
  {
    pergunta: 'A Clara faz call com mentorado?',
    resposta: 'Só se for no máximo uma por semana, por causa dos eventos e da Black (03/10/2025). A Fernanda sugeriu deixar as calls com especialista para os analisadores e só acionar a Clara se a demanda aumentar.',
    tema: 'Pessoas',
    quem: 'Fernanda',
    fonte: '#fluxo-time-rtg, 03/10/2025'
  },
  {
    pergunta: 'Como funciona a regra de horas excedentes de evento e o ponto para CLT?',
    resposta: 'Horas excedentes de evento (Sesame): contam deslocamento efetivo (voo, ônibus, estrada) e tempo de trabalho no destino; não contam trajeto casa-aeroporto, espera de embarque e tempo livre. Ponto no Sesame: entrada e saída todo dia, sem deixar para a semana seguinte; toda sexta cada um confere se a semana está completa e sem horas negativas.',
    tema: 'Pessoas',
    quem: 'Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores, 12/08/2026 (Fernanda) e Sprint 28/09/2026'
  },
  {
    pergunta: 'Quais treinamentos estão no Formação Navs e quando é o Sprint Navs?',
    resposta: 'Publicados no Formação Navs: "Zoom semanal com o Leandro" (18/08/2026) e "Role play de concepção de produto" (09/09/2026). Reuniões internas recentes: "Revisão do fluxo de entrada dos mentorados pré-pico" (17/08), "WhatsApp Fluxer e NavMaster" (13/08). Sprint Navs às sextas 15h (28/09 excepcionalmente segunda 14h30).',
    tema: 'Pessoas',
    quem: 'Ellen Cecilia, Fernanda Lizzardo',
    fonte: '#fluxo-infos-navegadores, 19/08 e 10/09/2026 (Natasha); #fluxo-time-rtg 13/08, 17/08 e 25/09/2026'
  },

  /* ---------- pós-venda e suporte técnico ---------- */
  {
    pergunta: 'Como liberar ou recuperar o acesso ao Arsenal Viral ou Criativo de um mentorado?',
    resposta: 'Acesso e suporte do Arsenal Viral e Criativo são com a Ester, não com o no-code (12/08/2026). Na ausência dela, Érica ou Lívia; também dá para postar o e-mail do mentorado no #fluxo-evento-e-entregáveis para a Ellen enviar (11/09). Orientação ao mentorado (AnaBe, 15/09): 1. Acessar arsenalviral.vendatodosantodia.com.br/login. 2. Usar o mesmo e-mail do Fluxer e clicar em "Redefinir senha". 3. Conferir caixa de entrada, spam, lixeira e promoções procurando "Arsenal Viral" e "Arsenal Criativo" (o e-mail costuma cair no spam). 4. Usar o link assim que chegar, porque expira. Quando o link não chega ou expira, o time cria uma senha e passa ao mentorado no privado.',
    tema: 'Pós-venda e suporte',
    quem: 'Ester Barbosa, Érica, Lívia Vieira, Ellen Cecilia, AnaBe',
    fonte: '#fluxo-infos-navegadores 12/08/2026 (Manu); #fluxo-time-rtg 02/09, 03/09, 17/09 e 23/09/2026 (Ester, Érica, Lívia); #fluxo-evento-e-entregáveis, 11/09/2026 (Natasha, Ellen), 15/09/2026 (Tassia, AnaBe)',
    links: ['https://arsenalviral.vendatodosantodia.com.br/login']
  },
  {
    pergunta: 'Para que serve o canal #pos-venda-fluxo-duvidas?',
    resposta: 'Criado em 24/08/2026 pela Taynáh como #relacionamento-fluxo-duvidas e renomeado em 29/09 para #pos-venda-fluxo-duvidas. Serve para o time de Relacionamento e pós-venda acionar o time do Fluxo em dúvidas técnicas de alunos, sobretudo de quem comprou a gravação do SPP com IA e do Tráfego com IA Pro. Pedidos seguem o mesmo padrão do canal comercial ([TÍTULO], contexto, dados). Pedido de cancelamento ou reembolso de mentorado que chega ao relacionamento geral também pode entrar ali; a Fernanda assume.',
    tema: 'Pós-venda e suporte',
    quem: 'Taynáh Sampaio, Fernanda Lizzardo, Lívia Vieira',
    fonte: '#pos-venda-fluxo-duvidas, 24/08/2026 (Taynáh), 18/09/2026 (Annie, Fernanda), 29/09/2026 (Lívia)',
    links: ['https://readytogohq.slack.com/archives/C0BSA7M3TSN']
  },
  {
    pergunta: 'Aluno do Tráfego com IA Pro diz "habilidade desconhecida" ou não consegue instalar a skill no Claude. O que fazer?',
    resposta: 'Em 90% dos casos a pessoa está na pasta errada (abriu uma pasta dentro da pasta, ou a pasta errada no Windows). Pedir print da pasta aberta no Claude Code e print da pasta no Explorer. O passo certo: baixar o ZIP, extrair, abrir o Claude (Desktop ou Code) na pasta extraída "tráfego-com-ia" e testar com "O que esse projeto faz?". Não é para fazer upload dos arquivos .md na área de habilidades do Claude (erro de "arquivo duplicado").',
    tema: 'Pós-venda e suporte',
    quem: 'Felipe Faé Schwade, Gabriel José',
    fonte: '#pos-venda-fluxo-duvidas, 15/09/2026 (Felipe Faé) e 24/09/2026 (Felipe Faé, Gabriel José)'
  },
  {
    pergunta: 'Aluno perdeu o controle administrativo dos ativos da Meta (terceiro desconhecido como admin). Que caminhos indicar?',
    resposta: '1. Trocar a senha do e-mail vinculado ao Facebook, ativar 2FA e derrubar todas as sessões. 2. Abrir o caso em facebook.com/hacked pelo perfil pessoal. 3. Chat ao vivo do Meta Business Suite a partir de qualquer outra BM com conta de anúncios ativa, citando o ID da BM comprometida. 4. Assinar o Meta Verified for Business (suporte humano prioritário) e cancelar depois. 5. Registrar no consumidor.gov.br contra Facebook Serviços Online do Brasil com prints; a Meta responde em até 10 dias. Se a conta não tinha histórico relevante, às vezes só uma conta nova resolve.',
    tema: 'Pós-venda e suporte',
    quem: 'AnaBe',
    fonte: '#pos-venda-fluxo-duvidas, 03/09/2026 (AnaBe)',
    links: ['https://facebook.com/hacked', 'https://consumidor.gov.br']
  },
  {
    pergunta: 'BM nova restringida pela Meta ou campanhas subidas pelo Claude "não veiculados". Como orientar?',
    resposta: 'BM restringida sem ter anunciado é comum em contas novas: pedir análise enviando foto de documento de papel (CNH); PDF ou CNH digital "dá ruim", só a CNH tem funcionado. Se a análise for negada, ver quais ativos há na BM para conseguir excluí-la; no pior caso, criar uma conta nova no Facebook ou usar a de outra pessoa. Campanhas "não veiculados": clicar nos ícones vermelhos de erro no Gerenciador para ver a descrição específica e pedir ao Claude para corrigir cada um; o erro é de configuração da campanha, não de ter subido pelo Claude (a Meta permite essa conexão).',
    tema: 'Pós-venda e suporte',
    quem: 'Felipe Faé Schwade, Gabriel Araujo, Gabriel José',
    fonte: '#pos-venda-fluxo-duvidas, 01/09/2026 (Felipe Faé) e 17/09/2026 (Gabriel Araujo, Gabriel José)'
  }
];
