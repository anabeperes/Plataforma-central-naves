# Links e campos pendentes

O que ainda falta para a Ana completar em `projetos.js`, com os termos já buscados no Slack
(canais públicos, privados, DMs e DMs em grupo) para não repetir.

## Itens sem link (`url: ''`)

### Mecanismo único do Fluxo (status: link pendente)
- Falta: `url`, `descricao` confiável, `autores`, `data`.
- Buscado no Slack sem resultado útil: "mecanismo único", "mecanismo unico", "mecanismo" (com
  link, desde 06/2026). Só apareceu a própria lista da Ellen e um PDF de aula do FLP
  ("Mecanismo-Catia-Damasceno-Aperta-e-Solta.pdf"), que não é isso.
- Sugestão: perguntar à Ellen se a página já existe ou se é para criar.

### Extensão de respostas rápidas (FLP) (status: link pendente)
- Falta: `url` público do zip da extensão (hoje está no Drive/Slack) e link do guia em PDF.
  Opcionalmente `git` se a Ana subir o código para um repositório.
- Encontrado: guia `Guia-Extensao-Respostas-Rapidas-FLP.pdf` postado em #fluxo-infos-navegadores
  (23/09/2026, arquivo do Slack, precisa de login); zip `extensao-respostas-rapidas.zip`
  compartilhado via Drive (DM Ana/Manu 22/09/2026), sem o link do Drive na mensagem.
- Buscado: "extensão respostas", "extensao-respostas-rapidas", "extensão" + "respostas".

### Skills do time (status: em construção)
- Falta: um card por skill, com link. Skills que apareceram no Slack:
  - Skill geradora de contexto e relatório das análises (Felipe Faé, #fluxo-time-rtg, 01/07/2026),
    comandos `/pre-analise-etapa1` e seguintes. Sem link de repositório na mensagem.
  - Skill de carrossel editorial e prompt de automação de carrossel (AnaBe, #ana-fe-ellen,
    21/08/2026). Sem link.
  - Skill `/analisar-produto` (feedback de produto) (Fernanda, #fluxo-time-rtg, 09/06/2026).
    Sem link; distribuída pelo Plantão do Fluxo.
  - Skill de criação de link da análise (AnaBe, #ana-fe-ellen, 20/05/2026):
    github.com/anabeperes/Automa-o-links-an-lise (deu origem à automação de links).
  - Skill do diagnóstico da ficha de qualificação (AnaBe): pasta do Drive já ligada ao card da ficha.
  - Skill "Ideias de produto" e skills das palestras do FLP/SPP: ficam nas páginas de materiais dos
    eventos (vtsd.com.br/materiais-spp-ia; eventos.vtsd.com.br/evento/formula-de-lancamento-pago).
  - Repositório do Fluxo Criativo com "todas as skills e comandos" do Gabriel José:
    github.com/ReadyToGo-Education/fluxo_criativo (já ligado ao card do Severino).
- Buscado: "skills" (com link, desde 06/2026), "skill" do Felipe Faé (com link), "skill geradora de
  contexto".

### Documentação do NavMaster (status: em construção)
- Falta: `url` da documentação. Ela ainda não existe; a Ellen sugeriu pedir ao Gabriel José
  (DM em grupo, 22/09/2026). O `detalhe` já está preenchido com o que o Slack explica.
- Buscado: "Documentação do NavMaster", "navmaster", "Nav Master", "Nave Master".

### Documentação dos projetos de IA dentro do Fluxer (status: em construção)
- Falta: `url` e os campos `comoFunciona` e `ondeVerSeEstaFuncionando` (estão como `[preencher]`).
  A documentação não existe; pedir ao Gabriel José.
- Buscado: "projetos de IA", "Documentação" + "Fluxer".

## Campos `[preencher]` em itens com link

- **Mecanismo único do Fluxo**: `descricao` está marcada como `[preencher: confirmar descrição e link]`.
- **Documentação dos projetos de IA dentro do Fluxer**: `detalhe.comoFunciona` e
  `detalhe.ondeVerSeEstaFuncionando`.

## PRD e Git que faltam (botões "Baixar PRD" / "Ver no Git")

A Ellen citou a página de respostas rápidas como o exemplo de projeto que se repete e deveria ter
PRD e Git. Nenhum item abaixo tem esses links no Slack:

| Item | prd | git |
| --- | --- | --- |
| Página de respostas rápidas (FLP) | não achado | não achado (buscado "respostas-rapidas" + github) |
| Extensão de respostas rápidas (FLP) | não achado | não achado |
| Página de resultados do Fluxo | não achado | não achado |
| Transcrição de todos os produtos | não achado | não achado |
| Central de depoimentos | não achado | não achado |
| Acervo do Fluxo | PRD existe (Ana ofereceu no privado ao Felipe Faé, 27/08/2026), sem link | não achado |
| Fluxer Lab | não achado | não achado |
| Calculadora de lançamento pago | não achado | não achado |
| Calculadora de Black (Vilas Boas) | não achado | não achado |
| Documentação da ficha de qualificação | Drive do projeto (ligado) | repositório existe (Douglas foi convidado em 09/09/2026), link não apareceu |
| Automação de exclusão de grupos | não achado | ligado |
| Automação de links das análises | não achado | ligado |

Buscado: "PRD" (com link, desde 01/2026) e "github.com" (desde 01/2026).

## Para confirmar com a Ellen (interpretações minhas, ver DECISOES.md)

- "Platão 24h" = Plantão do Fluxo 24h (severino-chat.vercel.app)?
- "Calculadora de black do Vilas Boas" = playbook-black-friday.vercel.app?
- "Página com todos os resultados do fluxo" = prints-fluxo.vercel.app?
- "Links das páginas de materiais de todos os eventos" = quadro do Monday, ou a Ellen quer uma
  página própria listando os links?

---

# Pendências da Central do Fluxo (v3)

## Agentes de IA (`dados/agentes.js`)
- **Plano de ação inteligente**: confirmar com o Gabriel José o nome oficial e como funciona por
  dentro (campo `atencao` tem `[preencher]`). Fonte usada: só o anúncio da Ellen de 09/09/2026.
- **IAF**: confirmar com a Fernanda e a Ellen o escopo oficial (o que entra e o que não entra).
- **Skills do time**: centralizar os links das skills (`ondeFica` tem `[preencher]`).

## Links importantes (`dados/links.js`)
- **Reunião de integração (Zoom)**: dois links circularam em 2026 (…82597295248 em março e
  …82593341298 em junho). Confirmar qual vale hoje.
- **Terminus**: confirmar a URL de acesso (usei app.terminusapp.com por inferência).
- **Agenda Google da mentoria** e **playlists de depoimentos no YouTube**: não achei link; não entraram.
- **Canal #treinamento-navegação** e **#rtg-zoom**: não achei o ID; não entraram na lista de canais.

## Entregas (`dados/entregas.js`)
- **Retiro do Instagram**: `operacao` está `[preencher]` (sem data ou formato no Slack).
- **Retiro high ticket com IA**: só a observação das skills /ht-*; falta data e formato.
- Confirmar com a Ellen se as entregas fora do pitch (live semanal, Mandala 360, calls coletivas,
  Analisador Day, Ladeira Day, Retiro Levantamento de Caixa, cadeira de sócio) devem mesmo aparecer
  na aba, ou se a aba deve seguir só o pitch.

## Visão geral (`dados/operacao.js`)
- Jornada e rotinas foram escritas só com o que está documentado no Slack. Vale a Ellen e a
  Fernanda revisarem os textos, principalmente "Renovação" e "Lázaro".
