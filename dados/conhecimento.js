/* Perguntas frequentes e combinados da operação, para o assistente (aba Perguntar).
   Cada item: pergunta (do jeito que alguém pergunta), resposta (o combinado, com nome e data),
   tema, quem (quem sabe mais), fonte (onde foi dito no Slack) e links.
   Entra no system prompt do assistente (api/_base.js). Nunca coloque senha, código de acesso,
   CNPJ, ID de produto ou e-mail de mentorado aqui.
   Origem inicial: varredura das perguntas da Clara no Slack (29/09/2026), ver LEVANTAMENTO-CLARA.md. */

const SUGESTOES_CHAT = [
  'Quando é o Ladeira Day dos 10 primeiros do FLP?',
  'Qual é a oferta do Fluxo nos zooms do VTSD?',
  'Mentorados têm acesso de graça ao SPP ou ao FLP?',
  'Quem atualiza a planilha do zoom com os sinais?',
  'Qual é o link do Zoom semanal?',
  'Quem cuida de links de pagamento e importação na Hotmart?'
];

const CONHECIMENTO = [
  /* ---------- entregas e bônus dos picos ---------- */
  {
    pergunta: 'Qual é a diferença entre Ladeira Day e Analisador Day?',
    resposta: 'Desde 30/01/2026 a entrega aos 10 primeiros de cada pico passou a se chamar Analisador Day: um dia de análise com os analisadores (Leo e Rafael ou Felipe), não mais com o Leandro. A Clara reforçou: "não temos mais Ladeira Day, e sim Analisador Day". Exceção: em 23/09/2026 o Leandro prometeu um Ladeira Day para os 10 primeiros do pico FLP de setembro/2026.',
    tema: 'Entregas dos picos',
    quem: 'Ester (organização), Fernanda e Ellen',
    fonte: '#fluxo-time-rtg 30/01/2026; #fluxo-evento-e-entregáveis 23/09/2026'
  },
  {
    pergunta: 'Quando é o Ladeira Day dos 10 primeiros do FLP de setembro/2026?',
    resposta: 'A Clara propôs terça-feira, 08/12/2026, das 10h às 17h, e disse que colocaria na agenda do Leandro. Falta o time confirmar com as pessoas da lista dos 10 primeiros. Até 29/09/2026 ninguém tinha respondido na thread.',
    tema: 'Entregas dos picos',
    quem: 'Clara (agenda do Leandro), Ester (confirmações e grupo do WhatsApp)',
    fonte: '#fluxo-evento-e-entregáveis, 23/09/2026'
  },
  {
    pergunta: 'O hotseat dos 10 primeiros do SPP com IA já tem data?',
    resposta: 'Não tinha até setembro/2026. A Clara pediu em 20/07/2026 para colocar uma data na agenda do Leandro "senão vai cair no esquecimento", presencial, daqui a 4 ou 5 meses, e sugeriu 16/11/2026 (mesma semana do Fluxo Online). A Ester ficou de ver a agenda com a Fernanda e a Ellen (dezembro seria melhor). Confirmar com a Ester.',
    tema: 'Entregas dos picos',
    quem: 'Ester, Fernanda e Ellen',
    fonte: '#fluxo-comercial-duvidas, 20 e 21/07/2026'
  },
  {
    pergunta: 'Como organizar a entrega dos 10 primeiros de um pico?',
    resposta: 'Passos que a Clara definiu: 1. O comercial (João Pedro) fecha a lista dos 10 primeiros com status de pagamento. 2. Entrar em contato com eles. 3. Criar o grupo do WhatsApp (Ester). 4. Pedir para todos entrarem. 5. Enviar a primeira mensagem avisando o dia. 6. Subir as pessoas no Active com a tag [FLX] [10 primeiros] [nome do pico]. 7. Colocar a data na agenda do Leandro ou dos analisadores. Se for presencial, organizar passagem e hospedagem.',
    tema: 'Entregas dos picos',
    quem: 'João Pedro Gandara (lista), Ester (grupo e agenda), Tassia (Active)',
    fonte: '#fluxo-comercial-duvidas 11/09/2025 e 05/11/2025'
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
    pergunta: 'Os bônus da Black (encontro dos 50 primeiros, Portfel) são com quem?',
    resposta: 'Com o Grupo Primo. A RTG não tem acesso a esses bônus: o mentorado precisa entrar em contato com o Grupo Primo. Não existe encontro dos 10 primeiros da Black em Brasília; o encontro é para os 50 primeiros e a data depende do Grupo Primo.',
    tema: 'Entregas dos picos',
    quem: 'Clara',
    fonte: '#fluxo-time-rtg 07/01/2026 e 03/08/2026'
  },

  /* ---------- acesso a eventos, produtos e gravações ---------- */
  {
    pergunta: 'Mentorados do Fluxo têm acesso de graça aos picos (SPP, FLP, imersões)?',
    resposta: 'Não. Clara e Ellen decidiram não liberar: os picos são conteúdo básico que os mentorados já deveriam estar implementando na mentoria, e é a mesma lógica dos retiros. No FLP de setembro/2026 também não, porque o evento é feito com o Érico e abrir para toda a mentoria ficaria inviável. Exceção registrada: alunos do VTSD vitalício participaram do SPP com IA de agosto/2026 de graça.',
    tema: 'Acessos',
    quem: 'Ellen e Clara',
    fonte: '#fluxo-time-rtg 01/09/2025, 23/02/2026, 17/08/2026 e 19/08/2026'
  },
  {
    pergunta: 'Quando a gravação do SPP fica disponível e por quanto tempo?',
    resposta: 'O time tem até 7 dias para subir a gravação na área de membros, e ela fica disponível por 15 dias, porque o SPP não está dentro do Fluxer. Depois que a pessoa entra na mentoria, tem muito mais conteúdo.',
    tema: 'Acessos',
    quem: 'Clara, Tamiris (área de membros)',
    fonte: '#fluxo-comercial-duvidas, 21/03/2026'
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
    resposta: 'Todos os dias às 15h. Quem pagou à vista e não tem horário: perguntar o período e agendar no Fluxer. Só depois da integração o mentorado tem acesso completo.',
    tema: 'Acessos',
    quem: 'Ester, Sabrina',
    fonte: '#fluxo-comercial-duvidas 02/09/2025 e 20/03/2026'
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
    resposta: 'Nos picos, o Fluxo usa a conta 6 (salas 1 a 4 do SPP e conta 5 para formação, definido em 26/06/2026). A conta 01 é reservada pela Clara para eventos com o Leandro. Configuração de salas e links: Érica, Taynáh e Natasha; links de teste não devem pedir registro. Quem monitora os zooms do Fluxo é o time do Fluxo, não o suporte.',
    tema: 'Acessos',
    quem: 'Érica, Taynáh, Natasha',
    fonte: '#rtg-zoom 15/07/2025, 26/06/2026 e 18/08/2026; #fluxo-infos-navegadores 17/07/2025'
  },

  {
    pergunta: 'Onde está o PPT (apresentação) da reunião de integração?',
    resposta: 'Fica no Canva, no link abaixo. É a apresentação usada na reunião de integração dos mentorados novos; serve para apresentar ou para consultar o que é dito na integração. O arquivo é editável, então não altere sem combinar com a Ellen.',
    tema: 'Acessos',
    quem: 'Ellen e Robson (integração)',
    fonte: 'Enviado pela Ana em 30/09/2026',
    links: ['https://www.canva.com/design/DAHWOjnohqw/JiKGpncaF-XLgyKC6tiw0w/edit']
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
    pergunta: 'Mentorado que pagou sinal e sumiu, ou ex-mentorado que quer voltar: pode liberar?',
    resposta: 'Só com exceção aprovada pela Clara, caso a caso. Exemplos: lead que pagou sinal no REV e sumiu meses foi liberado "de forma excepcional" (26/08/2025); ex-mentorado que quis voltar pagando à vista em 2x foi aceito e liberado para o Festival (17/07/2026). Pagamentos antecipados (paga e só começa meses depois) geram problema operacional e a Clara pediu para o comercial evitar.',
    tema: 'Comercial',
    quem: 'Clara (decide), João Pedro Gandara e Cris (comercial)',
    fonte: '#fluxo-comercial-duvidas 25/08/2025, 26/08/2025, 15 e 17/07/2026'
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
    pergunta: 'Mentorado quer reembolso. Como funciona?',
    resposta: 'Orientar o mentorado a não pedir reembolso direto na Hotmart, e sim ao suporte. Exceções (por exemplo, sinal de R$ 1 mil do SPP, cobrança indevida de renovação automática) são decididas pela Clara e executadas pela Érica, que manda o link de acompanhamento.',
    tema: 'Financeiro e contratos',
    quem: 'Clara (decide), Érica (executa)',
    fonte: '#fluxo-time-rtg 16/09/2025; #fluxo-comercial-duvidas 12/12/2025'
  },
  {
    pergunta: 'Quem cria links de pagamento e faz importação de mentorados nos cursos?',
    resposta: 'A Érica. Ela cria os links de pagamento (e mantém o banco com esses dados), importa mentorados nos cursos da Hotmart (ex.: Mergulhando na IA e Arsenal Criativo em 10/06/2026), envia link de redefinição de senha e trata cadastro errado em bônus da Hotmart.',
    tema: 'Financeiro e contratos',
    quem: 'Érica',
    fonte: '#fluxo-infos-navegadores 14/04/2025 e 10/06/2026; #fluxo-time-rtg 20/06/2026'
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
    pergunta: 'Qual é o NPS do Fluxo?',
    resposta: 'O número não fica registrado no Slack. A Fernanda e a Ellen passam o NPS para a Clara em reunião (último registro: aumento comemorado em 29/01/2026). As notas mensais dos navegadores são publicadas pela Ellen em #fluxo-infos-navegadores (meta 8,9 em outubro/2025).',
    tema: 'Números',
    quem: 'Fernanda e Ellen',
    fonte: '#fluxo-infos-navegadores 03/11/2025 e 29/01/2026'
  },

  /* ---------- eventos e datas ---------- */
  {
    pergunta: 'Quais são as datas dos próximos eventos e picos do Fluxo?',
    resposta: 'Registradas até 29/09/2026: Ladeira Day dos 10 primeiros do FLP em 08/12/2026 (a confirmar); próximo pico previsto para dezembro/2026; Fluxo Online na semana de 16/11/2026 (sugestão de hotseat na mesma semana). Já realizados em 2026: Fluxo Online (maio), Master Fluxo (16 e 17/07), Fluxo Festival (agosto), SPP com IA (21 e 22/08), imersão FLP (22 a 24/09). Datas novas saem nos comunicados da Clara em #rtg-recados-gerais e no time de eventos.',
    tema: 'Eventos',
    quem: 'Clara, time de Eventos e Entregáveis',
    fonte: '#rtg-recados-gerais 30/07/2026 e 17/08/2026; #fluxo-evento-e-entregáveis 23/09/2026'
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

  /* ---------- pessoas e responsáveis ---------- */
  {
    pergunta: 'Quem cuida de quê na operação do Fluxo?',
    resposta: 'Fernanda e Ellen: liderança do Fluxo, agenda de análises, regras de renovação e NPS. Ester: grupos de WhatsApp dos ganhadores, confirmações e agenda das entregas dos picos. João Pedro Gandara: sinais, fechamentos, lista dos 10 primeiros e planilha do zoom. Érica: Hotmart, links de pagamento, importação em cursos, ofertas e QR codes. Taynáh: contratos e comunicados de zoom. Natasha e Igor: zooms das imersões e disparos. Rodolfo e Vitão: Fluxer e tokens. Tamiris: aulas na área de membros e cenário. Luna e Lyandra: notas fiscais. Fábio: pagamentos a fornecedores. Clara: decide exceções, contrato, contas e agenda do Leandro. Problema de mentorado sem dono claro: mandar no canal do Fluxo.',
    tema: 'Pessoas',
    quem: 'Fernanda e Ellen',
    fonte: 'Varredura das threads da Clara no Slack, 2025 e 2026 (ver LEVANTAMENTO-CLARA.md)'
  },
  {
    pergunta: 'A Clara faz call com mentorado?',
    resposta: 'Só se for no máximo uma por semana, por causa dos eventos e da Black (03/10/2025). A Fernanda sugeriu deixar as calls com especialista para os analisadores e só acionar a Clara se a demanda aumentar.',
    tema: 'Pessoas',
    quem: 'Fernanda',
    fonte: '#fluxo-time-rtg, 03/10/2025'
  },
  {
    pergunta: 'Onde pedir criativos, anúncios de referência e gravações antigas?',
    resposta: 'A Clara costuma responder com pastas do Drive ("nossos melhores ads", remarketing de quem comprou lote) e links do YouTube (live da Black 2024). Antes de pedir, dizer a fase e o objetivo (captação, remarketing ou ao vivo), porque ela devolve a pergunta quando é aberta demais. Materiais de eventos ficam no Monday, quadro Central de Links da Mentoria.',
    tema: 'Links',
    quem: 'Clara, time de tráfego',
    fonte: '#fluxo-time-rtg 16/06/2025, 14/08/2026 e 24/08/2026'
  }
];
