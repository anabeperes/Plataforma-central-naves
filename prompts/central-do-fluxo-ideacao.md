# Prompt para o Claude Chat: pensar a Central do Fluxo

Cole o texto abaixo no Claude (chat). Se quiser, anexe capturas de tela da versão atual
(plataforma-central-naves.vercel.app) e da Central de Gestão de Eventos (central-do-retiro.vercel.app).

---

Você é um designer de produto e consultor de operações. Vou te apresentar uma plataforma interna e quero que você me ajude a pensar a próxima versão dela, fazendo perguntas antes de propor.

## Contexto

Eu trabalho no time da Mentoria Fluxo, um programa de mentoria para empreendedores digitais com cerca de 15 navegadores (atendimento individual pelo WhatsApp), analisadores (especialistas que fazem as análises), um time de Eventos e Entregáveis, um time de no-code que mantém a plataforma interna (Fluxer) e a liderança (Fernanda e Ellen), além da diretoria (Clara) e do Leandro (fundador).

A operação tem muita coisa espalhada: projetos que o time criou (páginas, automações, skills), agentes de IA (dentro do Fluxer, no Claude, no ChatGPT), dezenas de links recorrentes (Zoom semanal, live com o Leandro, formulários, Monday, canais do Slack), entregas contratuais (diagnóstico, 4 análises, 4 planos de ação, eventos, retiros, bônus) e regras que vivem em mensagens fixadas no Slack. Quando alguém novo entra, ou quando a diretoria pergunta "como funciona a automação X", ninguém consegue explicar na hora.

## O que já existe

Uma página estática, sem login, chamada **Central do Fluxo**, com cinco abas:

1. **Visão geral**: busca em tudo, números, acesso rápido (12 links), jornada do mentorado em 5 etapas (entrada e integração → ajuste de velas e diagnóstico → 4 análises e 4 planos → acompanhamento e coletivas → renovação) e 10 rotinas do time (atendimento das caixas, links das análises, remoção de inativos, Lázaro semanal, zoom semanal e live, calls coletivas, fechamento das análises, entregáveis dos analisadores, backup do Zoom, checklist de comunicação de evento).
2. **Agentes de IA**: 10 agentes com "o que faz, como usar, onde fica, atenção, onde ver se está funcionando" (NavMaster, gerador de contexto de pré-análise, plano de ação inteligente, Plantão do Fluxo 24h, Severino, Estúdio Criativo, agentes GPT, IAF, skill de diagnóstico comercial, skills do time).
3. **Projetos**: 20 projetos em 5 categorias, com tag de tipo, autores, PRD/Git e um painel "Como funciona" para automações e documentações (o que faz, como funciona, onde roda, quem cuida, onde ver se está funcionando, o que fazer se quebrar).
4. **Links importantes**: 63 links em 5 grupos (recorrentes, eventos, integração e treinamento, canais do Slack, ferramentas), com copiar e abrir.
5. **Entregas**: 26 entregas (individuais, coletivas, extras, bônus) com o texto do pitch e um painel "Como entregamos" (frequência, quem cuida, processo).

Tecnicamente é HTML, CSS e JavaScript puros, sem build, com os dados em arquivos JS que o time edita no GitHub. O visual copia a nossa Central de Gestão de Eventos (menu lateral, cartões brancos, verde-limão nos destaques, fonte Manrope).

## O que eu quero da conversa

Quero que essa central deixe **muito claro como a operação do Fluxo funciona** e seja o **acesso rápido e centralizado** a tudo que a operação precisa. Me ajude a pensar:

1. **Públicos e perguntas**: quais são as 5 perguntas que cada público (navegador novo, navegador experiente, analisador, time de eventos, liderança, diretoria) mais faz no dia a dia, e a central responde cada uma em menos de 10 segundos? Onde ela falha?
2. **Arquitetura da informação**: as cinco abas são as certas? Falta uma visão de "processos" (passo a passo de cada rotina), de "pessoas e responsáveis" ou de "calendário"? O que deveria ser fundido ou separado?
3. **Visão geral**: o que a primeira tela precisa mostrar para a diretoria entender a operação em 2 minutos, e o que precisa mostrar para o navegador começar o dia? Dá para ser a mesma tela?
4. **Manutenção**: hoje os dados são arquivos JS editados no GitHub. Como garantir que a central não fique desatualizada em um mês? Que rotina, dono e sinal de "isso venceu" você sugere? Vale ligar com o Slack (as regras nascem lá) ou com o Fluxer?
5. **Fronteiras**: o que NÃO deve entrar na central (para não virar um segundo Fluxer nem um segundo Slack)? Como ela se relaciona com a Central de Gestão de Eventos, com o Fluxer e com o 1Password?
6. **Próximos passos**: proponha 3 versões incrementais (o que entra em cada uma, em ordem de valor), com o que eu consigo fazer em uma tarde com o Claude Code e o que precisa de gente.

Regras da conversa:
- Antes de propor, me faça até 8 perguntas de esclarecimento, uma de cada vez, e espere minhas respostas.
- Depois, proponha em português do Brasil, sem caixa alta, sem jargão de UX e sem emoji.
- Para cada proposta, diga o problema que ela resolve e como eu mediria se funcionou.
- Quando faltar informação, diga "não sei, preciso confirmar com X" em vez de inventar.
- No final, me entregue um resumo de uma página que eu possa mandar para a Fernanda e a Ellen aprovarem.
