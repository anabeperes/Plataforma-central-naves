# Decisões da Central de Projetos v2

Registro do que foi decidido sem consulta durante a evolução da central (branch `central-v2`),
e de onde veio cada link ou explicação encontrada no Slack, para a Ana conferir.

## Estrutura e código

1. **Três arquivos em vez de um.** `index.html` (marcação + JS), `projetos.js` (dados) e
   `style.css`. Mantém o projeto estático e sem build; separar os dados facilita o time editar
   sem mexer no código.
2. **Card como link real sem HTML inválido.** O pedido era manter o card como `<a>` e ainda ter
   botões dentro dele. HTML não permite elementos interativos dentro de `<a>`, então o `<a>`
   (título + descrição) cobre o card inteiro por um `::after` posicionado, e os controles
   secundários ficam acima com `z-index`. Resultado: clicar em qualquer área "vazia" do card,
   título ou descrição abre o link principal em nova aba; botão direito oferece "copiar link";
   os botões secundários não disparam o principal. Testado no Chromium.
3. **Filtros: "ou" dentro do grupo, "e" entre grupos e com a busca.** Chips com `aria-pressed`.
4. **Estado na URL** (`?q=&tipo=&contexto=&categoria=`), para compartilhar buscas filtradas.
5. **Painel "Como funciona" é um `<dialog>` nativo**: Esc, clique fora e botão X fecham;
   o foco volta ao botão que abriu. Passos que começam com "1. " são quebrados em linhas.
6. **Campo `data` vazio** é aceito e simplesmente não aparece no card (usado no item sem fonte).
7. **`git` igual a `url`** não gera botão "Ver no Git" (caso da automação de exclusão de grupos,
   cujo link principal é o próprio repositório).
8. **Removido "Agendamentos de calls"**, conforme pedido. Confirmação extra: o Gabriel José
   avisou em #nocode-comunicados-fluxer (18/09/2026) que o MVP foi desativado e as calls
   coletivas passaram a ser cadastradas dentro do Fluxer.
9. **Renomeado "Biblioteca do Academy" para "Transcrição de todos os produtos"**, conforme pedido.
10. **Autores** vieram de quem anunciou ou assumiu o projeto no Slack. Quando o time inteiro é o
    responsável, usei o nome do time (ex.: "Time de Eventos e Entregáveis").
11. **Link principal das automações**: para a automação de links usei o canal do Slack onde os
    relatórios chegam (é o que a operação abre no dia a dia) e o repositório em `git`. Para a de
    exclusão de grupos não achei canal próprio de relatório de remoção, então o principal é o
    repositório.

## Interpretações de itens da lista da Ellen

12. **"Platão 24h" foi interpretado como "Plantão do Fluxo 24h"** (severino-chat.vercel.app).
    A Fernanda apresentou o chatbot em #fluxo-time-rtg (02/06/2026) exatamente como
    "Plantão Fluxo 24 horas"; nenhuma busca por "platão"/"platao" encontrou outra coisa.
    Confirmado pela Ana em 29/09/2026.
13. **"Calculadora de black que o Vilas Boas fez"** foi interpretada como o playbook
    `playbook-black-friday.vercel.app`: a Fernanda o compartilhou como "playbook do Gabriel
    Vilas Boas" (#fluxo-evento-e-entregáveis, 27/08/2026) e descreveu que "faz toda a parte de
    planejamento de datas" (#fluxo-time-rtg, 14/09/2026). Não há outro link de calculadora dele.
    Existe também `playbook-black-friday-mid-ticket.vercel.app`, mas é da aula do Felipe Matheus
    (10/09), não do Vilas Boas. **Estava errado**: em 29/09/2026 a Ana disse que a calculadora
    não é o playbook e pediu para tirá-la do material. O card foi removido; o playbook segue
    listado como playbook.
14. **"Página com todos os resultados do fluxo"** = página de prints/depoimentos
    `prints-fluxo.vercel.app` (Ellen, #fluxo-infos-navegadores, 21/09/2026). Também há o
    `resultado.vtsd.com.br` ("Cases Venda Todo Santo Dia"), mas é do VTSD, não do Fluxo.
    Confirmado pela Ana em 29/09/2026.
15. **"Links das páginas de materiais de todos os eventos"** = quadro "Central de Links da
    Mentoria" no Monday (Natasha, #fluxo-time-rtg, 01/06/2026: "Todos os materiais dos eventos
    você encontra no Monday > Materiais Eventos"). Não é vercel/lovable/drive, mas é o único
    lugar que centraliza todos. O padrão das páginas (eventos.vtsd.com.br/evento/<nome>, editor
    rtg.vtsd.com.br, arquivos em download.vtsd.com.br/admin) veio da Ellen (DM em grupo,
    18/09/2026) e está no detalhe, **sem** as credenciais que ela mandou.
16. **"Skills avulsas feitas pelo time"**: não existe uma lista nem uma página. Criei o card
    "Skills do time" com status "em construção", listando na descrição as skills que apareceram
    no Slack (ver LINKS-PENDENTES).
17. **"Instaladores do Severino"**: o link principal é a página de tutorial
    `iaseverino.lovable.app/tutorial` (Ana, DM com Pedro Veloso, 30/07/2026); os instaladores e
    vídeos estão no detalhe (Gabriel José, #fluxo-ia, 27/08 e 03/09/2026).
18. **"Documentação do NavMaster" e "Documentação dos projetos de IA dentro do Fluxer"**: as
    documentações não existem ainda (a própria Ellen sugeriu "pedir pro próprio José mandar",
    DM em grupo, 22/09/2026). Criei os cards com status "em construção" e preenchi o `detalhe`
    com o que o Slack já explica sobre o funcionamento, para o time ter algo hoje.
19. **Documentação da ficha de qualificação**: o link principal é a própria ficha; o "PRD" aponta
    para a pasta do Drive que a Ana descreveu como "drive com os detalhes completos do projeto"
    (DM com Raphael Archangelum, 01/06/2026).
20. **Automação de links das análises "roda no computador de uma das chefes"**: o Slack mostra
    que ela roda no GitHub Actions (alertas do bot dizem "Novo run do Actions"; o prompt da Ana
    de 16/09/2026 fala em "cron do Actions"), no repositório da Fernanda. Escrevi assim, com a
    observação de que código e credenciais ficam com a Fernanda.

## Fontes de cada link e explicação (Slack)

| Item | Fonte |
| --- | --- |
| Página de resultados do Fluxo | Ellen Cecilia, #fluxo-infos-navegadores, 21/09/2026 ("Prints do Fluxo \| Página de depoimentos"); Ellen, DM em grupo Ana/Fer/Ellen, 24/09/2026 (Fer sobe categorias na página) |
| Transcrição de todos os produtos | Ellen Cecilia, #fluxo-infos-navegadores 18/09/2026 e #rtg-recados-gerais 24/09/2026 (funcionamento, rotina semanal, regra de acesso) |
| Central de depoimentos | Emanuelle Lima, #rtg-recados-gerais 25/05/2026 (origem e autores) e #fluxo-infos-navegadores 27/08/2026 (perfis, integração com Fluxer) e 21/09/2026 (coleta automática com relacionamento) |
| Links das páginas de materiais dos eventos | Natasha, #fluxo-time-rtg, 01/06/2026 (Monday); Ellen, DM em grupo, 18/09/2026 (como as páginas são criadas) |
| Página de respostas rápidas (FLP) | Ellen Cecilia, #fluxo-ia 21/09/2026 e #fluxo-infos-navegadores 22/09/2026 (como usar, colar no formato do Zoom) |
| Extensão de respostas rápidas (FLP) | Ellen, #fluxo-infos-navegadores 22/09/2026 (autoria Manu + Ana); AnaBe, #fluxo-infos-navegadores 22/09 (guia PDF) e DM com Ellen 22/09/2026 (passos de instalação); AnaBe, DM com Manu 22/09/2026 (erro do manifest.json) |
| Acervo do Fluxo | AnaBe, #fluxo-time-rtg 27/08/2026 (autoras) e 03/09/2026 (anúncio, robô, botão de erro); AnaBe, DM com Felipe Faé 03/09/2026 (script Node no GitHub Actions, cron semanal); fila em /fila (DM com Ellen 02/09/2026) |
| Página com todos os agentes GPT | Sabrina Oliveira, #fluxo-evento-e-entregáveis, 08/07/2025. Observação: em 20/08/2026 a Ellen avisou que a OpenAI parou de permitir GPTs personalizados em contas pessoais; vale conferir se a página ainda está atual |
| Fluxer Lab | AnaBe, #fluxo-time-rtg 14/09/2026 (link e tutorial); Ellen, #fluxo-infos-navegadores 23/04/2026 (Hub e auditor de tráfego); Fernanda, #fluxo-ia 11/08/2026 (Lab como lugar de MVPs); Fernanda, #fluxo-evento-e-entregáveis 22/06/2026 (aulas do Fluxo Criativo) |
| Plantão do Fluxo 24h | Fernanda, #fluxo-time-rtg 02/06/2026 (apresentação); #fluxo-evento-e-entregáveis 03/06/2026 (FAQ primeiro, depois base de conhecimento); #ana-fe-ellen 23/05, 26/05 e 29/05/2026 (repositório, migração Lovable para Vercel, painel de aprovação); #fluxo-time-rtg 09/06/2026 (skill entregue pelo plantão) |
| Calculadora de lançamento pago | Ellen Cecilia, #fluxo-ia, 15/09/2026 (link) e respostas de AnaBe e Felipe Faé no mesmo tópico (conferência dos cálculos, ressalvas) |
| Calculadora de Black (Vilas Boas) | Fernanda, #fluxo-evento-e-entregáveis 27/08/2026 e #fluxo-time-rtg 14/09/2026 |
| Instaladores do Severino | Gabriel José, #fluxo-ia 27/08/2026 (links úteis e tutoriais) e 03/09/2026 (dmg arm64, Node); Ester, #fluxo-evento-e-entregáveis 24/08/2026 (pasta de tutorial); Gabriel José, #fluxo-ia 23/09/2026 (repositório fluxo_criativo); Ellen, #fluxo-evento-e-entregáveis 12/08 e 24/08/2026 (página de releases no Fluxer) |
| Automação de links das análises | Canal #fluxo-links-analises (relatórios do bot, lidos em 28/09/2026); Fernanda, #fluxo-infos-navegadores 26/05/2026 (fase de testes, canal de relatório); Fernanda, #ana-fe-ellen 27/05/2026 (repositório); AnaBe, DM em grupo Ana/Fer/Ellen 16/09/2026 (funcionamento: navegador em vez de API, bloqueios da StreamYard, mudanças de ritmo, cron do Actions); AnaBe, #fluxo-infos-navegadores 16/09/2026 (o que o navegador faz quando falha) |
| Automação de exclusão de grupos | Fernanda, #fluxo-infos-navegadores 26/06/2026 (remoção: terça e sexta, motivos, o que fazer); Fernanda, #aprovação-grupos-abertos 02/07/2026 (aprovação automática, critérios, sócios); Fernanda, #fluxo-evento-e-entregáveis 09/09/2026 (WhatsApp exclusivo, risco de banimento); bot em #aprovação-grupos-abertos (relatórios e alertas com log do GitHub Actions, repositório remover-acesso-mentorado); Fernanda, #ana-fe-ellen 27/08/2026 (régua de 20 dias é do Fluxer) |
| Documentação da ficha de qualificação | AnaBe, DM com João Pedro Gandara 25/05/2026 e com Raphael Archangelum 01/06/2026 (funcionamento e Drive); DM com Douglas Matos 09/09/2026 (acesso ao repositório) |
| Documentação do NavMaster | Ellen, #fluxo-ia 14/08/2026 (ciclos de hora em hora); Gabriel José, #fluxo-ia 21/09/2026 (modo automático desligado, botão Gerar sugestão); Ellen, #fluxo-infos-navegadores 12/08 e 15/09/2026 (WhatsApp no Fluxer, tom de voz, revisão obrigatória); Fernanda, #fluxo-ia 11/08/2026 (MVP fora e integração pelo no-code com Vitor); AnaBe, #ana-fe-ellen 19/05/2026 (repositório Projeto-Nave-Master com n8n) |
| Documentação dos projetos de IA dentro do Fluxer | Ellen, DM em grupo 22/09/2026 (pedido); Ellen, #fluxo-infos-navegadores 11/08/2026 (Estúdio Criativo); Gabriel José, #nocode-comunicados-fluxer 18/09/2026 (calls coletivas no Fluxer) |

## Projetos encontrados no Slack que não entraram (para a Ana decidir)

- **Plataforma de gestão de eventos** (AnaBe, #fluxo-evento-e-entregáveis, 25/09/2026): primeira
  versão em teste no Retiro Levantamento de Caixa; link individual prometido depois do login.
- **Passo a passo de eventos / trilha interativa** (github.com/anabeperes/Passo-a-passo-eventos-,
  deploy no Netlify, PRD nas DMs Ana/Ellen de 30/05/2026).
- **Exemplos que inspiram** (repositório github.com/fbrier-commits/exemplos-que-inspiram, Fernanda,
  29/05/2026) e playlists de depoimentos no YouTube (Fernanda, 21/09/2026).
- **Estúdio Criativo** dentro do Fluxer (Nono, agosto/2026) e **Severino** em si
  (iaseverino.lovable.app): hoje só aparecem citados nos detalhes.
- **Automação de comunicação no WhatsApp** (Fernanda, 09/09/2026): ainda em teste.
- **Versão anterior das mensagens rápidas** (respostas-rapidas-ana-be-s-projects.vercel.app, Ana,
  01/06/2026): substituída pela página da Ellen; não criei card.

---

# Central do Fluxo (v3): de central de projetos a central da operação

Pedido da Ana em 29/09/2026: a plataforma vira uma **Central do Fluxo** com visual parecido com a
Central de Gestão de Eventos (central-do-retiro.vercel.app) e abas de operação, agentes de IA,
projetos, links importantes e entregas.

## Estrutura

21. **Cinco abas com roteador por hash** (`#/`, `#/agentes`, `#/projetos`, `#/links`, `#/entregas`),
    sem build e sem backend. Um `app.js` monta as telas a partir de `dados/*.js`. Os links antigos
    (`?q=...`) continuam funcionando: são redirecionados para `#/projetos`.
22. **Visual copiado da Central de Gestão de Eventos** (repositório `retirolevantamentodecaixa`,
    `app/globals.css` e `components/layout/nav.tsx`): paleta (#f6f6f6, #ffffff, #e7e7e7, #171717,
    #bef47b, #4d7c0f), fonte Manrope (Google Fonts), raio 12px, menu lateral fixo de 256px no
    desktop e barra inferior de 5 itens no celular, marca quadrada verde-limão com o X. Não copiei
    login, autosave nem histórico: a central continua estática.
23. **`projetos.js` foi movido para `dados/projetos.js`** e ganhou companhia: `agentes.js`,
    `links.js`, `entregas.js`, `operacao.js`. Uma coleção por arquivo para o time editar sem medo.
24. **Aba Agentes de IA**: um card por agente com filtros "para quem" e "onde". O painel "Como usar"
    tem cinco blocos (o que faz, como usar, onde fica, atenção, onde ver se está funcionando).
    Entraram: NavMaster, gerador de contexto de pré-análise, plano de ação inteligente, Plantão do
    Fluxo 24h, Severino, Estúdio Criativo, agentes GPT, IAF, skill de diagnóstico comercial e skills
    do time. O NavMaster e a ficha de tom de voz foram tratados como um agente só.
25. **Aba Links importantes** em cinco grupos (recorrentes, eventos, integração e treinamento, canais
    do Slack, ferramentas), com botão de copiar e abrir, como na tela Links da Central de Gestão de
    Eventos. Nenhuma senha ou código de acesso do Slack entrou; as mensagens que os traziam foram
    usadas só para o link.
26. **Aba Entregas**: a `descricao` de cada entrega é o texto do "Resumo do Pitch Fluxo" com as
    explicações curtas que a própria Ana escreveu para a Ellen em 18/09/2026, na mesma ordem
    (individuais, coletivas, extras, bônus). O bloco "Como entregamos" é o lado de dentro, montado
    a partir dos combinados no Slack. Adicionei entregas que existem na operação mas não estão no
    pitch: live semanal com o Leandro, Mandala 360, calls coletivas, Analisador Day, Ladeira Day e
    hotseat, Retiro Levantamento de Caixa, cadeira de sócio e as ferramentas de IA.
27. **Visão geral**: busca em tudo (agrupa resultados por coleção e abre o painel do item), quatro
    números que levam às abas, acesso rápido (12 links marcados em `ACESSO_RAPIDO`), jornada do
    mentorado em cinco etapas e dez rotinas do time. Jornada e rotinas foram escritas só com o que
    está documentado no Slack; onde não havia fonte, não inventei etapa.
28. **Botão copiar** usa a API de clipboard com fallback e mostra um aviso "Link copiado".

## Fontes das novas abas (Slack)

| Conteúdo | Fonte |
| --- | --- |
| NavMaster: ciclos, modo manual, tom de voz, regras anti "cara de IA", uso das sugestões | Ellen, #fluxo-ia 14/08, 25/08 e 18/09/2026; Gabriel José, #fluxo-ia 21/09/2026 e 31/08/2026 (ficha de tom de voz) |
| Gerador de contexto de pré-análise | Gabriel José, #fluxo-ia 31/08/2026 (crédito ao Felipe Faé) |
| Plano de ação inteligente e liberação direta do plano | Ellen, #fluxo-infos-navegadores e #fluxo-diagnósticos 09/09/2026 |
| Estúdio Criativo e manual | Ellen, #fluxo-infos-navegadores 11/08 e 01/09/2026 |
| Severino: skills faltantes, instaladores, releases | Aline Carvalho e Ellen, #fluxo-ia 13/08/2026; Gabriel José 27/08 e 03/09/2026; Ellen, #fluxo-evento-e-entregáveis 12/08 e 24/08/2026 |
| Agentes GPT e mudança da OpenAI | Sabrina, #fluxo-evento-e-entregáveis 08/07/2025; Ellen, #fluxo-infos-navegadores 13/10/2025, 20/08/2026 e 09/09/2026 |
| IAF | Ellen, DM 18/09/2026 (pitch); Fernanda, #fluxo-evento-e-entregáveis 27/04/2026; Natasha 21/07/2026 |
| Entregáveis do pitch e explicações | Ellen, #evento-flp 22/08/2026 e DM com Ana 18/09/2026; AnaBe, DM com Ellen 18/09/2026 (textos) |
| Vitalício condicional dos cursos | Fernanda, #fluxo-time-rtg 23/09/2026; Ellen, #fluxo-infos-navegadores 23/09/2026 |
| Mandala 360 (funcionamento, público, feedback, proposta de 2 salas) | AnaBe, #fluxo-infos-navegadores 16/09/2026 e #fluxo-evento-e-entregáveis 21/09 e 25/09/2026 |
| Live semanal, zoom semanal da Black, retrôs de entregas | AnaBe, #fluxo-evento-e-entregáveis 21/09 e 25/09/2026 |
| Zooms diários e escala | Ester e Natasha, #fluxo-infos-navegadores 03/06 e 09/07/2026 |
| Calls coletivas no Fluxer | Fernanda, #fluxo-evento-e-entregáveis 18/09/2026; Gabriel José, #nocode-comunicados-fluxer 18/09/2026 |
| Analisador Day | Ester 24/08/2026; AnaBe 21/09 e 25/09/2026 (#fluxo-infos-navegadores e #fluxo-evento-e-entregáveis) |
| Ladeira Day e hotseat | Clara Coppola, #fluxo-evento-e-entregáveis 23/09/2026; Ester 10/09/2026 |
| Integração: acesso completo só depois da reunião | Tassia, #fluxo-comercial-duvidas 30/05/2026; links de integração 23/03 e 12/06/2026 |
| Lázaro (reunião semanal) e higiene do Fluxo | Fernanda, #fluxo-infos-navegadores 25/08 e 08/09/2026; #ana-fe-ellen 23/07 e 31/08/2026 |
| Fechamento das análises (competência 26 a 25) | Ellen, #fluxo-diagnósticos 28/09/2026 |
| Zooms e entregáveis dos analisadores (dia 09) | Fernanda, #fluxo-evento-e-entregáveis 10/07/2026 |
| Backup do Zoom | Ellen, #fluxo-evento-e-entregáveis 21/09/2026 |
| Checklist de comunicação de evento e canal certo por tipo de mensagem | AnaBe, DM própria 22/09/2026 (ajustes do dia 1 do FLP) |
| Regra dos links de Zoom pelo Terminus; tutoriais Terminus, Active e Tally | Fernanda, DM em grupo 15/09/2026 |
| Links curtos (zoom-semanal, live-semanal-leandro, mandala360, feedback, analisador-day-online, estudio_criativo, zoom-duvidas) | #fluxo-infos-navegadores, agosto e setembro/2026 (AnaBe, Ester, Natasha, Ellen) |
| Central de Gestão de Eventos | AnaBe, #fluxo-evento-e-entregáveis 25/09 e 28/09/2026 |
| Canais do Slack e finalidade | IDs pela busca de canais; finalidade a partir do uso e do alinhamento da Ellen (DM própria da Ana, 22/09/2026) |


---

# Aba Perguntar (assistente com IA)

Pedido da Ana em 29/09/2026: um chat onde qualquer pessoa (a Clara em especial) pergunta qualquer
coisa da operação e recebe a resposta, inclusive links.

29. **Função na Vercel, não chave no navegador.** A chave da API não pode ficar no HTML, então
    o chat passou a ter uma função (`api/chat.js`). A página continua estática; a função só
    existe para a aba Perguntar. Precisa da variável `ANTHROPIC_API_KEY` na Vercel.
30. **A base do assistente é o próprio `dados/*.js`.** Nada é duplicado: `api/_base.js` lê os
    mesmos arquivos da página e vira texto. Corrigiu um link na central, o assistente já sabe.
    Foi criado `dados/conhecimento.js` só para o que não cabe nas outras coleções: perguntas
    frequentes, combinados e regras que vivem no Slack.
31. **Modelo `claude-opus-5-5`, esforço médio, resposta em streaming.** Sem pensamento
    prolongado visível; o custo por pergunta é dominado pela base (cerca de 21 mil tokens),
    que fica cacheada pela API por alguns minutos, então perguntas seguidas custam pouco.
    Fallback do servidor ligado (`fallbacks: 'default'`): se o modelo recusar por política,
    a API refaz num modelo de reserva; se a conta não aceitar esse beta, a função repete sem ele.
32. **O assistente não inventa.** As instruções mandam responder só com a base, dizer
    "não encontrei isso na central" e apontar quem sabe. Perguntas de número (comparecimento,
    faturamento, NPS) recebem "onde o dado vive e quem tem", não estimativas.
33. **Página sem login continua sem login.** Como qualquer pessoa com a URL poderia gastar a
    chave, a função aceita só chamadas da própria página, limita 20 perguntas por minuto por
    IP e tem um código opcional (`CHAT_CODIGO`) que a página pede uma vez. Recomendo ligar
    o código antes de mandar a URL para fora do time.
34. **Conversa fica no navegador.** Nada é gravado no servidor; sessionStorage some ao fechar
    a aba. Sem histórico para a liderança ler, de propósito: é uma ferramenta de consulta.
35. **Barra inferior do celular passou de 5 para 6 itens.** Perguntar entrou em segundo lugar
    no menu, logo depois da visão geral, porque é o caminho mais curto para quem chega com
    uma dúvida.
36. **Botão "Perguntar ao assistente" ao lado da busca da visão geral.** Leva o texto digitado
    junto (`#/perguntar?q=...`) e já dispara a pergunta.
37. **Base de conhecimento do assistente veio de uma varredura do Slack (29/09/2026).** Todas as
    mensagens da Clara sobre o Fluxo desde 01/01/2025 foram lidas (cerca de 1.115) e viraram
    114 itens em `LEVANTAMENTO-CLARA.md`. Dali saíram 33 perguntas e respostas em
    `dados/conhecimento.js`, cada uma com fonte (canal e data) e quem sabe mais. Regras
    seguidas: nada inventado; IDs de produto, CNPJ, dados bancários e e-mails de mentorados
    ficaram de fora; números antigos (ex.: conversão do perpétuo de 2025) estão marcados como
    "confirmar antes de usar".
38. **As sugestões da tela vazia do chat são perguntas da Clara.** Assim quem abre a aba vê o
    tipo de pergunta que o assistente sabe responder.
39. **Assistente trocado do Claude para o Gemini (29/09/2026), a pedido da Ana.** Motivo: a chave
    do Gemini no AI Studio é gratuita, sem cartão, e a do Claude exige crédito pré-pago. Mudou só
    `api/chat.js` e a dependência (`@google/genai` no lugar de `@anthropic-ai/sdk`); a base,
    as instruções, a tela e o formato do streaming continuam iguais. Modelo escolhido em
    tempo de execução: a função lista os modelos que a chave enxerga e prefere o Flash de versão
    mais alta, sem variantes lite/preview/imagem (o nome `gemini-2.5-flash`, usado na primeira
    tentativa, já não existia em 29/09/2026). `CHAT_MODELO` força um modelo fixo. Sem cache explícito: o prefixo
    (instruções + base) vai sempre idêntico e a API reaproveita sozinha. Temperatura 0,2 para a
    resposta ficar presa à base. Limite do plano gratuito vira a mensagem "Limite do plano
    gratuito atingido" na tela, sem quebrar a página.

---

# Revisão de 30/09/2026 (documento "Central do Fluxo: o que foi aplicado e o que eu mudaria")

Aplicado o que a revisão de 29/09/2026 pediu, com dois ajustes definidos pela Ana:

1. **O assistente ficou no Início, em destaque**, logo abaixo da busca geral (a revisão o colocava
   como apoio no fim da tela). Motivo: o chat é um dos maiores valores da central para pesquisar a
   operação. Depois dele vêm os mais usados, as três portas e os últimos acessos.
2. **Classificações mantidas exatamente como estavam** (categorias de projetos, grupos de links,
   tipos de entrega, "para quem" e "onde" dos agentes). A revisão sugeria trocar as categorias por
   "momento de uso", dividir Recorrentes e transformar grupos em abas; em vez disso, cada seção
   virou colapsável: nasce fechada com título e contagem e abre ao clicar. Pelo mesmo motivo os
   filtros continuam atrás do botão "Filtros", não à vista.

O resto seguiu a revisão:

- Card de projeto com tag colorida do tipo, contextos, descrição de uma linha (as longas foram
  para `detalhe.oQueFaz`), "por autores · data" e botões que dizem o que fazem ("Abrir",
  "Como funciona", "Guia", "PRD", "Git"). Ordem padrão dentro da seção: mais recentes primeiro,
  com seletor "A a Z"; em construção e sem link vão para o fim da seção, com a frase do que falta.
- Agentes viraram o tipo `agente` na seção "Agentes de IA" da aba Projetos e agentes. Menu com 4
  itens: Início, Projetos e agentes, Links, Entregas. Rotas antigas redirecionam.
- Duplicados resolvidos, um lugar por item: Plantão do Fluxo 24h, Skills do time e a ficha de
  qualificação ficaram como projeto (cards de agente removidos); Agentes GPT, Severino e NavMaster
  ficaram como agente (cards de projeto "Página com todos os agentes GPT", "Instaladores do Severino"
  e "Documentação do NavMaster" removidos, com o conteúdo fundido no agente). Saíram de Links:
  Página de resultados, Central de depoimentos, Acervo, Transcrição, Fluxer Lab, Plantão, Agentes
  GPT, Manual do Estúdio Criativo, os dois links do Severino (foram para o agente) e o link desta
  própria página. A entrega "Fluxer Lab, Severino e Estúdio Criativo" ficou, porque é o item do
  pitch, não o projeto.
- Links viraram cards dentro de cada grupo, com a observação como etiqueta em destaque e "Copiar"
  como botão principal.
- Textos técnicos trocados: rodapé do menu ("Faltou algum projeto ou link? Avise a AnaBe no
  Slack"), rodapé do assistente ("O assistente só conhece o que está cadastrado aqui...") e o rodapé
  de Links. Nenhum `[preencher]` aparece mais na tela (viraram frases para humanos, listadas em
   LINKS-PENDENTES.md).
- Mecanismo único: `autores` preenchido com Ellen Cecilia (responsável pela página; a confirmar).
- Calculadora de Black (Vilas Boas): a Ana confirmou que é a calculadora dada no Zoom tira-dúvidas,
  não o playbook. Card criado em Calculadoras com `status: 'link pendente'`; o link não apareceu no
  Slack.
- Busca geral no Início procura também nas perguntas frequentes de `conhecimento.js`, com
  "Ver resposta".

---

# Bot no Slack (30/09/2026)

Pedido da Ellen: o mesmo chat da central dentro do Slack, sem mexer na página, começando fechado
(Ellen, Ana e Fernanda). Decisões:

1. **Cérebro compartilhado.** O código do Gemini saiu de `api/chat.js` e foi para `api/_cerebro.js`;
   `chat.js` e `slack.js` só chamam `responder()`. Mesma base, mesma instrução, mesmo modelo.
2. **Lista de acesso em variável de ambiente** (`SLACK_USUARIOS`), não no código: liberar alguém não
   exige commit, só redeploy. Quem está fora não recebe nem aviso, como a Ellen pediu.
3. **Resposta em duas etapas.** O Slack exige confirmação em 3 segundos e o Gemini demora mais; a
   função confirma na hora e termina o trabalho com `waitUntil` (`@vercel/functions`, única
   dependência nova). Reenvios do Slack são ignorados pelo cabeçalho `x-slack-retry-num`.
4. **Contexto vem do próprio Slack.** Em vez de guardar conversa em servidor, o bot lê as últimas
   mensagens da DM (ou da thread, num canal) na hora de responder. Nada é armazenado.
5. **Escopos mínimos** no manifesto: ler DMs e menções, escrever mensagem, reagir com 👀 e ler a
   thread num canal. Sem acesso a mensagens de canais que não mencionem o bot.
6. **Rotas internas viram links do site** na resposta (`#/links` vira link para a central), e o
   markdown do assistente é convertido para o mrkdwn do Slack.
