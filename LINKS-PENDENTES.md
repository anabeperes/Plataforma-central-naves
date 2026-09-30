# Links e campos pendentes

O que ainda falta para a Ana completar em `projetos.js`, com os termos já buscados no Slack
(canais públicos, privados, DMs e DMs em grupo) para não repetir.

## Itens sem link (`url: ''`)

### Mecanismo único do Fluxo (resolvido em 29/09/2026)
- A Ana passou o link: mecanismo-fluxo.vercel.app. Card preenchido com descrição e detalhe.
- Ainda sem `autores` (a página não assina; assumido Ellen como responsável).

### Extensão de respostas rápidas (FLP) (resolvido em 29/09/2026)
- Zip e guia em PDF agora ficam hospedados na própria Central, em `arquivos/`:
  `arquivos/extensao-respostas-rapidas.zip` e `arquivos/guia-extensao-respostas-rapidas-flp.pdf`.
  O card usa o campo `guia` (botão "Guia de instalação (PDF)").
- Origem dos arquivos: zip da pasta "Extensão suporte zoom" no Drive da Ana; PDF postado em
  #fluxo-infos-navegadores (23/09/2026). Opcionalmente `git` se a Ana subir o código.

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
| Documentação da ficha de qualificação | Drive do projeto (ligado) | repositório existe (Douglas foi convidado em 09/09/2026), link não apareceu |
| Automação de exclusão de grupos | não achado | ligado |
| Automação de links das análises | não achado | ligado |

Buscado: "PRD" (com link, desde 01/2026) e "github.com" (desde 01/2026).

## Para confirmar com a Ellen (interpretações minhas, ver DECISOES.md)

- ~~"Platão 24h" = Plantão do Fluxo 24h~~ Confirmado pela Ana em 29/09/2026.
- ~~"Calculadora de black do Vilas Boas" = playbook-black-friday.vercel.app?~~ Não é. A Ana pediu
  para tirar a calculadora do material (card removido em 29/09/2026). O playbook continua na aba
  Links e na entrega do Retiro da Black, porque é outra coisa.
- ~~"Página com todos os resultados do fluxo" = prints-fluxo.vercel.app~~ Confirmado pela Ana em 29/09/2026.
- "Links das páginas de materiais de todos os eventos" = quadro do Monday, ou a Ellen quer uma
  página própria listando os links?

---

# Pendências da Central do Fluxo (v3)

## Agentes de IA (`dados/agentes.js`)
- ~~**Plano de ação inteligente**~~ Resolvido em 29/09/2026: o nome está certo; ele gera o plano
  de ação a partir da transcrição da análise do mapa mental (Ana).
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
