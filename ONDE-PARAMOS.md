# Onde paramos (30/09/2026)

Registro do estado da Central do Fluxo para retomar de onde parou. Tudo abaixo está no ar em
plataforma-central-naves.vercel.app e no bot Fellen do Slack.

## O que está pronto

- **Revisão da Ellen de 29/09 aplicada** (PR #3): Início com busca geral e assistente em destaque,
  aba única Projetos e agentes, cards com tag, autor, data, PRD e Git, seções colapsáveis em todas
  as abas (classificações mantidas), Links só com o que não é projeto, textos técnicos removidos.
- **Bot do Slack "Fellen"** (PR #4): mesmo cérebro da página (`api/_cerebro.js`), mesmos
  `dados/*.js`. Responde na DM e em menção. Acesso: AnaBe, Ellen Cecilia e Fernanda Lizzardo
  (`SLACK_USUARIOS` na Vercel). App criado no api.slack.com com o manifesto do repositório.
- **PPT da integração** (PR #5) em Links e nas perguntas frequentes.
- **Leva 1 do Slack** (PR #6): 110 combinados de 15 canais (01/08 a 30/09) na base, 19 correções
  do que estava errado. Base de 34 para 128 perguntas.

## Pendências que dependem de material (pedido feito à Ellen em 30/09)

1. Link da Calculadora de Black do Vilas Boas (card em Calculadoras, sem link).
2. PRD e Git da Página de respostas rápidas (FLP).
3. Arquivos das Skills do time (card em construção).
4. Documentação do NavMaster e dos projetos de IA no Fluxer (Gabriel José).
5. Links das páginas de materiais de cada evento.
6. Confirmar autor do Mecanismo único (assumido Ellen) e escopo da IAF.

## Decisões da Ana ainda abertas

- Link parcelado de renovação: Lyandra (07/08) ou Ester com a Érica (setembro)? A base mostra as
  duas versões com "a confirmar com a Fernanda".
- Telefone novo do financeiro: entra como link de WhatsApp ou fica fora (hoje fica fora)?
- Base cresceu para cerca de 60 mil tokens por pergunta: se o Gemini gratuito começar a barrar
  ("Limite do plano gratuito atingido"), ativar o faturamento da chave no AI Studio.
- As 21 perguntas que ficaram sem resposta no Slack estão em LINKS-PENDENTES.md.

## Próximos passos combinados

- Rotina de alimentação: repetir a leitura dos canais #fluxo* de tempos em tempos, gerar a lista
  de sugestões, a Ana aprova, entra na base (mesmo processo da leva 1).
- Liberar o Fellen para mais gente quando estiver redondo: acrescentar IDs em `SLACK_USUARIOS`
  na Vercel e fazer redeploy.

## Como retomar

- Dados: `dados/*.js` (única fonte). Regras de cada arquivo no README.
- Testes locais: `npm run testar-base`, `npm run testar-slack`, `python3 -m http.server 8765`.
- Fluxo de publicação: branch, PR para `claude/pronto-para-entrega-eu136t` (branch padrão), merge;
  a Vercel publica sozinha.
- Histórico de decisões: DECISOES.md. Pendências: LINKS-PENDENTES.md.
