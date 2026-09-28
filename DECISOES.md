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
    **Confirmar com a Ellen.**
13. **"Calculadora de black que o Vilas Boas fez"** foi interpretada como o playbook
    `playbook-black-friday.vercel.app`: a Fernanda o compartilhou como "playbook do Gabriel
    Vilas Boas" (#fluxo-evento-e-entregáveis, 27/08/2026) e descreveu que "faz toda a parte de
    planejamento de datas" (#fluxo-time-rtg, 14/09/2026). Não há outro link de calculadora dele.
    Existe também `playbook-black-friday-mid-ticket.vercel.app`, mas é da aula do Felipe Matheus
    (10/09), não do Vilas Boas. **Confirmar.**
14. **"Página com todos os resultados do fluxo"** = página de prints/depoimentos
    `prints-fluxo.vercel.app` (Ellen, #fluxo-infos-navegadores, 21/09/2026). Também há o
    `resultado.vtsd.com.br` ("Cases Venda Todo Santo Dia"), mas é do VTSD, não do Fluxo.
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
