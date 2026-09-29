# Prompt para o Claude Chat: revisar a Central do Fluxo como está hoje

Cole o texto abaixo no Claude (chat). Anexe capturas de tela das seis abas da versão atual
(plataforma-central-naves-git-central-v2-ana-be-s-projects.vercel.app) e, se quiser, os arquivos
`dados/projetos.js`, `dados/links.js`, `dados/entregas.js` e `dados/agentes.js` do repositório.

---

Você é um consultor de operações e designer de produto. Vou te descrever uma plataforma interna que já existe e quero que você a revise: me diga o que está bem organizado, o que está confuso e, principalmente, que informações faltam para ela cumprir o objetivo. Faça perguntas antes de propor.

## Contexto

Eu trabalho no time da Mentoria Fluxo, um programa de mentoria para empreendedores digitais. O time tem cerca de 15 navegadores (atendimento individual pelo WhatsApp), analisadores (especialistas que fazem as análises), o time de Eventos e Entregáveis, o time de no-code que mantém a plataforma interna (Fluxer), a liderança (Fernanda e Ellen), a diretoria (Clara) e o fundador (Leandro).

O objetivo da plataforma é um só: qualquer pessoa da operação, e a diretoria em especial, consegue responder sozinha, em segundos, "o que é isso, para que serve, como funciona, quem cuida, onde olhar e qual é o link". Hoje essas respostas vivem espalhadas em mensagens fixadas do Slack, no Monday, no Fluxer e na cabeça de duas ou três pessoas.

## Como a plataforma está hoje

Chama-se **Central do Fluxo**. É uma página estática, sem login, igual para todo mundo, com menu lateral no desktop e barra inferior no celular. Tem seis abas:

1. **Visão geral**: busca em tudo, quatro números (agentes, projetos, links, entregas), acesso rápido com 12 links, jornada do mentorado em 5 etapas (entrada e integração, ajuste de velas e diagnóstico, 4 análises e 4 planos de ação, acompanhamento e coletivas, renovação) e 10 rotinas do time com frequência (atendimento das caixas, links das análises 24h antes, remoção de inativos às terças e sextas, Lázaro semanal, zoom semanal e live com o Leandro, calls coletivas, fechamento das análises no dia 25, entregáveis dos analisadores no dia 09, backup do Zoom, checklist de comunicação de evento).
2. **Perguntar**: um chat com IA que responde qualquer pergunta sobre a operação usando só o conteúdo das outras abas, inclusive devolvendo o link certo. Quando não sabe, diz "não encontrei isso na central" e aponta quem sabe. Não vê Slack nem Fluxer em tempo real.
3. **Agentes de IA**: 10 agentes (NavMaster, gerador de contexto de pré-análise, plano de ação inteligente, Plantão do Fluxo 24h, Severino, Estúdio Criativo, agentes GPT, IAF, skill de diagnóstico comercial, skills do time), cada um com "o que faz, como usar, onde fica, atenção, onde ver se está funcionando".
4. **Projetos**: 20 projetos em 5 categorias (resultados e método, ferramentas do dia a dia, calculadoras, skills e instaladores, automações e documentações), com tipo, autores, data, PRD, Git e um painel "Como funciona" (o que faz, como funciona, onde roda, quem cuida, onde ver se está funcionando, o que fazer se quebrar). Cinco estão sem link ou em construção.
5. **Links importantes**: 63 links em 5 grupos (recorrentes, eventos, integração e treinamento, canais do Slack, ferramentas), com copiar e abrir.
6. **Entregas**: 26 entregas em 4 tipos (individuais, coletivas, extras, bônus), com o texto do pitch, frequência, quem cuida e um painel "Como entregamos".

Os dados ficam em arquivos que o time edita no GitHub. Toda informação veio de anúncios no Slack, com a fonte anotada.

## O que eu já sei que falta ou incomoda

Fiz uma varredura de tudo que a diretora (Clara) perguntou sobre o Fluxo no Slack em 20 meses: 114 perguntas, pedidos e cobranças. Ela quase nunca pergunta "como funciona"; ela pergunta quanto, quando, quem fechou e se está na agenda. Os temas, por frequência:

- eventos do Fluxo (logística, transmissão, cenário, acesso de mentorados): 16
- acessos e ferramentas (Fluxer, Hotmart, Zoom, cupons, importação em cursos): 16
- entregas e bônus dos picos (10 primeiros, Ladeira Day, Analisador Day, hotseat): 14, quase sempre "isso já tem data na agenda do Leandro?"
- financeiro, contratos, contas e reembolsos: 12
- resultados comerciais (sinais, fechamentos, "a planilha do zoom está atualizada?"): 10
- números de comparecimento e lotação: 8
- links e materiais, pessoas e responsáveis, NPS e notas de navegação: o resto

O que a central não responde hoje e ela precisa:

- Uma agenda das entregas prometidas (data, formato, lista fechada, grupo criado, na agenda do Leandro ou não). Em 21 casos a resposta não veio ou demorou, e a maioria é isso.
- Calendário dos próximos eventos e picos, e o que acontece esta semana.
- Onde estão os números: planilha do zoom, planilhas de orçamento por evento, confirmações no Fluxer, NPS. A central não guarda o número, mas precisa entregar o link certo e dizer quem tem.
- Quem cuida de quê: uma lista de pessoas por assunto (hoje só existe na cabeça de duas pessoas).
- Regras e combinados que ela mesma anunciou e precisou repetir: qual conta e contrato para cada tipo de mentorado, regra de reembolso, acesso de mentorados a picos, validade de cupom, gravações.
- Alguns projetos sem link e duas documentações que ainda não existem; nenhum projeto com PRD ou repositório preenchido.
- Nenhuma rotina de manutenção: nada avisa quando uma informação venceu.

## O que eu quero de você

1. **Perguntas primeiro.** Me faça até 6 perguntas de esclarecimento, uma por vez, sobre quem usa, com que frequência e o que eu considero sucesso. Espere cada resposta.
2. **Diagnóstico da organização atual.** Para cada aba, diga o que está claro, o que está confuso e o que você mudaria de lugar, fundiria ou separaria. Diga se seis abas é o número certo e se os nomes ajudam.
3. **Informações a acrescentar.** Liste, por aba, os campos e conteúdos que faltam para responder as perguntas da diretoria e dos navegadores. Para cada item diga: para quem serve, onde a informação provavelmente vive hoje (Slack, Monday, Fluxer, Hotmart, planilha), quem deve ser o dono e com que frequência vence.
4. **O que entra e o que fica fora.** A central não pode virar um segundo Fluxer nem um segundo Slack. Diga o que não deve entrar e como ela se relaciona com o Fluxer, o Monday, a Central de Gestão de Eventos e o 1Password.
5. **O assistente.** Como fazer o chat responder melhor: que tipo de conteúdo vale adicionar à base (perguntas frequentes, regras, combinados), como escrever esse conteúdo para a IA não errar, e como saber se ele está respondendo bem.
6. **Manutenção.** Proponha uma rotina simples (dono, dia, sinal de "isso venceu") para a central não ficar velha em um mês.
7. **Plano em três versões.** O que entra em cada uma, em ordem de valor, separando o que eu faço em uma tarde com o Claude Code do que depende de outras pessoas.

Regras: português do Brasil, sem caixa alta, sem emoji, sem jargão de UX sem explicar. Para cada proposta, diga o problema que resolve e como eu meço se funcionou. Quando faltar informação, escreva "a confirmar com X" em vez de inventar. No final, entregue um resumo de uma página que eu possa mandar para a Fernanda e a Ellen aprovarem, com as decisões, o que muda e as perguntas em aberto.
