# Prompt para o Claude Chat: desenhar a Central do Fluxo

Cole o texto abaixo no Claude (chat). Anexe capturas da versão atual
(plataforma-central-naves.vercel.app) e da Central de Gestão de Eventos (central-do-retiro.vercel.app).

---

Você é um designer de produto sênior, especialista em ferramentas internas de operação. Quero que você desenhe comigo uma plataforma chamada Central do Fluxo. Trabalhe por etapas, me mostrando cada tela em formato de wireframe textual (blocos, hierarquia e conteúdo de cada bloco) antes de avançar para a próxima.

## O que é a plataforma

A Central do Fluxo é o painel interno da operação da Mentoria Fluxo. Ela precisa deixar muito claro como a operação funciona e ser o acesso rápido e centralizado a tudo que a operação precisa. É uma página estática, sem login, igual para todo mundo: navegadores (atendimento individual pelo WhatsApp), analisadores, time de Eventos e Entregáveis, time de no-code, liderança (Fernanda e Ellen) e diretoria (Clara e Leandro).

## Identidade visual (não mudar)

Segue a nossa Central de Gestão de Eventos e o Fluxer: fundo #f6f6f6, cartões brancos com borda #e7e7e7 e raio 12px, texto #171717, texto secundário #6b6b6b, destaque verde-limão #bef47b com texto #14210a, verde-escuro #4d7c0f para rótulos, fonte Manrope, títulos de tela com 26px em negrito. Menu lateral fixo de 256px no desktop e barra inferior com até 5 itens no celular. Sem emoji, sem caixa alta nos títulos, português do Brasil.

## Conteúdo que já existe (inventário)

1. Operação (visão geral): busca em tudo; números (10 agentes, 20 projetos, 63 links, 26 entregas); acesso rápido com 12 links (Fluxer, Zoom semanal, live com o Leandro, formulário de feedback, Monday de links, canais do Slack, Central de Gestão de Eventos, página de resultados, transcrições, Plantão 24h, Acervo); jornada do mentorado em 5 etapas (entrada e integração, ajuste de velas e diagnóstico, 4 análises e 4 planos de ação, acompanhamento e coletivas, renovação); 10 rotinas do time com frequência (atendimento das caixas, links das análises 24h antes, remoção de inativos às terças e sextas, Lázaro semanal, zoom semanal e live, calls coletivas às quintas, fechamento das análises no dia 25, entregáveis dos analisadores no dia 09, backup do Zoom, checklist de comunicação de evento).
2. Agentes de IA: 10 agentes, cada um com o que faz, como usar, onde fica (Fluxer, Claude, ChatGPT, site próprio, computador do mentorado), para quem (navegadores, analisadores, mentorados, comercial), atenção e onde ver se está funcionando. Exemplos: NavMaster (sugestões de resposta no WhatsApp), gerador de contexto de pré-análise, Plantão do Fluxo 24h, Severino, Estúdio Criativo.
3. Projetos: 20 projetos em 5 categorias (resultados e método, ferramentas do dia a dia, calculadoras, skills e instaladores, automações e documentações), com tag de tipo, autores, data, PRD, Git e painel "Como funciona" (o que faz, como funciona, onde roda, quem cuida, onde ver se está funcionando, o que fazer se quebrar). Alguns sem link ainda ("link em breve").
4. Links importantes: 63 links em 5 grupos (recorrentes, eventos, integração e treinamento, canais do Slack, ferramentas), cada um com descrição, observação, botão copiar e abrir.
5. Entregas: 26 entregas em 4 tipos (individuais, coletivas, extras, bônus), com o texto do pitch, frequência, quem cuida e painel "Como entregamos".

## Problemas que eu já enxergo

- A visão geral tem muita coisa e não está claro o que a diretoria olha primeiro e o que o navegador olha primeiro.
- A jornada do mentorado e as rotinas do time são listas de texto; poderiam ser mais visuais (linha do tempo, calendário semanal).
- Não existe uma noção de "quem é responsável por quê" nem de "o que acontece esta semana".
- Não sei se cinco abas é o número certo, nem se os nomes são os melhores.

## O que eu quero que você faça, nesta ordem

Etapa 1. Me faça até 6 perguntas de esclarecimento, uma por vez, sobre público, frequência de uso e o que eu considero sucesso. Espere cada resposta.

Etapa 2. Proponha a arquitetura da informação: quais seções existem, o nome de cada uma (curto, em português, sem caixa alta), a ordem no menu e o que fica dentro de cada uma. Justifique fusões e separações. Diga o que fica fora da central.

Etapa 3. Desenhe a visão geral em wireframe textual: cada bloco com título, o que mostra, de onde vem o dado, o que acontece ao clicar e a prioridade visual (o que é grande, o que é pequeno). Proponha duas alternativas: uma que começa pelo "como funciona a operação" e outra que começa pelo "o que eu preciso agora". Recomende uma.

Etapa 4. Desenhe as outras seções, uma por vez, no mesmo formato. Para cada uma, defina o componente padrão do item (card, linha de tabela ou lista), o que aparece fechado e o que aparece no painel de detalhe, e os filtros.

Etapa 5. Defina o sistema de componentes: card, tag, chip de filtro, botão primário e secundário, painel de detalhe, estado vazio, item pendente, botão copiar. Para cada um, tamanho, cor da paleta acima e quando usar.

Etapa 6. Adapte tudo para celular (380px de largura): o que some, o que vira lista, como fica a navegação.

Etapa 7. Entregue um resumo em uma página, em linguagem simples, que eu possa mandar para a Fernanda e a Ellen aprovarem, com as decisões, o que muda em relação à versão atual e as perguntas em aberto.

Regras: nada de jargão de UX sem explicar, nada de emoji, nada de inventar dado que eu não dei (quando faltar, marque como "a confirmar"). Cada tela em blocos numerados, do topo para baixo, para eu conseguir implementar depois em HTML e CSS puros com o Claude Code.
