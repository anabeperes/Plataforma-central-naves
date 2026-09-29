/* Visão geral da operação do Fluxo: a jornada do mentorado, as rotinas do
   time e os acessos rápidos. Fonte: regras e combinados no Slack. */

const JORNADA = [
  { etapa: 'Entrada', titulo: 'Matrícula e integração', texto: 'Mentorado compra, entra no Fluxer e agenda a reunião de integração. Só depois dela tem acesso completo: sistema, links, aulas e contato com o navegador. Entra nos grupos do WhatsApp pelo robô de aprovação.' },
  { etapa: 'Início', titulo: 'Ajuste de velas e diagnóstico', texto: 'Plano inicial (ajuste de velas) com tarefas e prazos, e a reunião de diagnóstico com o analisador: o raio-x do negócio que orienta o ciclo.' },
  { etapa: 'Ciclo', titulo: '4 análises e 4 planos de ação', texto: 'A cada análise, o analisador monta e libera o próximo plano direto para o mentorado. O navegador prepara a observação (gerador de contexto), garante o link da transmissão 24h antes e acompanha a execução no WhatsApp.' },
  { etapa: 'Sempre', titulo: 'Acompanhamento e coletivas', texto: 'Atendimento diário do navegador com o NavMaster, zoom semanal, live com o Leandro, calls coletivas, retiros, eventos online e o Fluxo Festival. Fora do horário, o Plantão do Fluxo 24h.' },
  { etapa: 'Fim do ciclo', titulo: 'Renovação', texto: 'Expectativa do próximo ciclo registrada no Fluxer, oferta de renovação, contrato pelo Monday e acompanhamento das ações no Lázaro semanal. Inativo no Fluxer sai dos grupos automaticamente.' }
];

const ROTINAS = [
  { quando: 'Diário', titulo: 'Atendimento das caixas', texto: 'Seg a sex, 9h às 12h e 13h às 18h. SLA do WhatsApp acompanhado pela liderança; NavMaster só com tom de voz cadastrado.' },
  { quando: 'Diário', titulo: 'Links das análises', texto: 'Conferir o relatório em #fluxo-links-analises e criar na mão o que falhou. Links e materiais no Fluxer 24h antes (antes do evento, em caso de evento).' },
  { quando: 'Terça e sexta', titulo: 'Remoção de inativos', texto: 'Robô remove dos grupos e priva análises de quem está inativo. Reclamação: conferir status e motivo no Fluxer; inadimplência vai para a Lya.' },
  { quando: 'Semanal', titulo: 'Lázaro', texto: 'Reunião da liderança com os navegadores sobre renovação e carteira; resumo publicado em #fluxo-infos-navegadores. Antes dele, deixar as ações do Fluxer em dia (resultado marcado, expectativa preenchida).' },
  { quando: 'Semanal', titulo: 'Zoom semanal e live com o Leandro', texto: 'Link do Terminus, agenda da mentoria e do Fluxer, e-mail, comunicação aos naves com copy pronta. Depois: feedback pelo Tally e gravação para o pós-venda.' },
  { quando: 'Semanal', titulo: 'Calls coletivas (quintas)', texto: 'Eventos e Entregáveis cadastra a call no Fluxer; navegador vincula os mentorados.' },
  { quando: 'Mensal', titulo: 'Fechamento das análises', texto: 'Competência de 26 a 25. Só entra análise concluída até o dia 25; não há ajuste depois do fechamento (Lya).' },
  { quando: 'Mensal', titulo: 'Zooms e entregáveis dos analisadores', texto: 'Todo dia 09, o time envia no Slack os zooms e entregáveis dos analisadores do dia 10 ao 09 e lança no Fluxer.' },
  { quando: 'Quase diário', titulo: 'Backup e limpeza do Zoom', texto: 'Time do Fluxo baixa integrações, treinamentos e aulas sem edição; gravação sempre na nuvem; depois de baixar, excluir do Zoom e da lixeira.' },
  { quando: 'Por evento', titulo: 'Checklist de comunicação', texto: 'Antes: anúncio, reforço, escala por turno, materiais de apoio. No dia: escala por sala, link dos materiais, alinhamentos. Canal certo: navs-info para consultar depois, time-rtg para o dia a dia, evento-flp para escala e alinhamentos.' }
];

// IDs de LINKS que aparecem como acesso rápido na visão geral.
const ACESSO_RAPIDO = ['fluxer', 'zoom-semanal', 'live-semanal', 'feedback', 'monday-links', 'sl-navs-info', 'sl-links', 'central-eventos', 'prints', 'transcricoes', 'plantao', 'acervo'];
