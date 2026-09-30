/* Visão geral da operação do Fluxo: a jornada do mentorado, as rotinas do
   time e os acessos rápidos. Fonte: regras e combinados no Slack. */

const JORNADA = [
  { etapa: 'Entrada', titulo: 'Matrícula e integração', texto: 'Mentorado compra, entra no Fluxer e agenda a reunião de integração (sem horário fixo: o Robson publica a agenda com dia e hora no #fluxo-comercial-duvidas e o link fica no Fluxer; quem não consegue horário recebe um alternativo do Robson). Só depois dela tem acesso completo: sistema, links, aulas e contato com o navegador, e o GIO avisa o navegador. Entra nos grupos do WhatsApp pelo robô de aprovação; sócio é aprovado pelo navegador depois de cadastrado no Fluxer (perfil > sócios).' },
  { etapa: 'Início', titulo: 'Ajuste de velas e diagnóstico', texto: 'Plano inicial (ajuste de velas) com tarefas e prazos, em duas versões: Newbie (26 tarefas) e Soft+ (22 tarefas, com o Check-in pré-análise respondido no próprio Fluxer), e a reunião de diagnóstico com o analisador: o raio-x do negócio que orienta o ciclo.' },
  { etapa: 'Ciclo', titulo: '4 análises e 4 planos de ação', texto: 'A cada análise, o analisador monta e libera o próximo plano direto para o mentorado. O navegador prepara a observação (gerador de contexto), garante o link da transmissão 24h antes e acompanha a execução no WhatsApp.' },
  { etapa: 'Sempre', titulo: 'Acompanhamento e coletivas', texto: 'Atendimento diário do navegador com o NavMaster (resposta personalizada, nunca só o link da aula; áudio de até 1 minuto quando fizer sentido), zoom semanal com moderador, live com o Leandro, calls coletivas às quintas (tráfego, copy, Claude e produto), retiros, eventos online e o Fluxo Festival. Fora do horário, o Plantão do Fluxo 24h.' },
  { etapa: 'Fim do ciclo', titulo: 'Renovação', texto: 'Expectativa do próximo ciclo registrada no Fluxer, oferta de renovação, contrato pelo Monday e acompanhamento das ações no Lázaro semanal. Inativo no Fluxer sai dos grupos automaticamente.' }
];

const ROTINAS = [
  { quando: 'Diário', titulo: 'Atendimento das caixas', texto: 'Seg a sex, 9h às 12h e 13h às 18h. SLA do WhatsApp acompanhado pela liderança; NavMaster só com tom de voz cadastrado.' },
  { quando: 'Diário', titulo: 'Links das análises', texto: 'Conferir o relatório em #fluxo-links-analises e criar na mão o que falhou. Links e materiais no Fluxer 24h antes (antes do evento, em caso de evento).' },
  { quando: 'Terça e sexta', titulo: 'Remoção de inativos', texto: 'Robô remove dos grupos e priva análises de quem está inativo (régua: mais de 20 dias de atraso). Reclamação: conferir status e motivo no Fluxer; inadimplência vai para a Lya no #fluxo-duvidas-financeiro; cancelamento e congelamento vão para o relacionamento (Robson).' },
  { quando: 'Semanal', titulo: 'Lázaro', texto: 'Reunião da liderança com os navegadores sobre renovação e carteira; resumo publicado em #fluxo-infos-navegadores. Antes dele, deixar as ações do Fluxer em dia (resultado marcado, expectativa preenchida).' },
  { quando: 'Semanal', titulo: 'Zoom semanal e live com o Leandro', texto: 'Link do Terminus (com etiqueta, ex.: "zoom-duvida"), agenda da mentoria, do Fluxer e do Google dos mentorados (com horário, não "dia todo"), e-mail, comunicação aos naves com copy pronta. Todo Zoom tem um moderador desde 10/09/2026: inicia, aceita as pessoas, grava, gerencia a fila, marca o tempo e envia o feedback no chat depois de cada atendimento; no Meet, o moderador precisa de e-mail vtsd. Quando o Leandro fala, só permissão de compartilhar tela, sem co-host. Depois: feedback pelo Tally e gravação para o pós-venda.' },
  { quando: 'Semanal', titulo: 'Calls coletivas (quintas)', texto: 'Quatro calls no mesmo horário: tráfego, copy, Claude/Severino (Gabriel José) e Concepção de Produto (Léo e Darah alternando desde outubro, limite de 5). A Ester (ou AnaBe) cria a call em Fluxer > Especialistas > Calls coletivas; o navegador inscreve os mentorados com o problema registrado (para a call de Claude, até o fim do dia anterior). Inscrições fecham 20 horas antes. Na quarta a Ester confere se a call do Léo tem inscritos; sem ninguém, tira da agenda dele. Em semanas de pico as calls são suspensas.' },
  { quando: 'Mensal', titulo: 'Fechamento das análises', texto: 'Competência de 26 a 25. Só entra análise concluída até o dia 25; não há ajuste depois do fechamento (Lya).' },
  { quando: 'Mensal', titulo: 'Zooms e entregáveis dos analisadores', texto: 'Todo dia 09, o time envia no Slack os zooms e entregáveis dos analisadores do dia 10 ao 09 e lança no Fluxer.' },
  { quando: 'Quase diário', titulo: 'Backup e limpeza do Zoom', texto: 'Divisão da Ellen (21/09/2026): time Fluxo baixa todas as integrações, treinamentos e aulas sem necessidade de edição; time de Produtos e Pós-venda baixa eventos de pico e lançamentos (com Marketing), reuniões do MasterFluxo, Zooms com o Ladeira e VTSD, aulas ao vivo dos produtos e aulas ou eventos do Fluxo sinalizados para edição; time Comercial baixa os treinamentos e reuniões do próprio time. Baixar todos os arquivos da gravação, gravação sempre na nuvem; depois de baixar, excluir do Zoom e da lixeira. A Ana faz a limpeza periódica das contas 1 a 6 e sobe no YouTube do Fluxo o que faltava.' },
  { quando: 'Por evento', titulo: 'Checklist de comunicação e escala', texto: 'Antes: anúncio, reforço, escala por turno, materiais de apoio e pré-requisitos enviados 2 dias antes (com vídeo ou material). No dia: escala por sala, link dos materiais, alinhamentos. Escala dos navs num pico (modelo do FLP, 09/2026): dois turnos fixos (manhã e tarde) nos três dias, cada um pausa o WhatsApp só no seu turno; alinhamento 8h30, testes das salas 9h, transmissão 10h; função é tirar dúvidas no chat do Zoom, reportar intercorrências e testar skills e a página de respostas rápidas antes; depoimentos do chat são coletados pela Central de Depoimentos. Planilha "Pico Pago 2026 - Escala Navegadores". Canal certo: navs-info para consultar depois, time-rtg para o dia a dia, evento-flp para escala e alinhamentos.' }
];

// Os 6 "mais usados pelo time" da tela inicial. Cada item aponta para um link
// (`link`, pelo id em links.js), um projeto ou um agente (`projeto`/`agente`, pelo nome).
// `rotulo` é o nome curto mostrado no botão (opcional).
const MAIS_USADOS = [
  { link: 'fluxer', rotulo: 'Fluxer' },
  { link: 'zoom-semanal', rotulo: 'Zoom semanal' },
  { projeto: 'Página de resultados do Fluxo', rotulo: 'Página de resultados' },
  { projeto: 'Página de respostas rápidas (FLP)', rotulo: 'Respostas rápidas FLP' },
  { projeto: 'Transcrição de todos os produtos', rotulo: 'Transcrição dos produtos' },
  { link: 'materiais-flp', rotulo: 'Materiais do FLP' }
];
