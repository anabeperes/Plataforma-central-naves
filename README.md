# Central do Fluxo

Página única e estática que centraliza a **operação da Mentoria Fluxo**: como funciona por dentro
e o acesso rápido a tudo que a operação precisa. É igual para todo mundo (navegadores, chefes e
diretoria) e responde sozinha, em segundos, o que é cada coisa, para que serve, como funciona,
quem cuida e onde olhar quando dá problema.

Site: https://plataforma-central-naves.vercel.app

## Abas

| Aba | Rota | O que tem |
| --- | --- | --- |
| Início | `#/` | Busca geral (projetos, agentes, links, entregas e perguntas frequentes), o assistente com IA, os 6 links mais usados, as três portas com contagem e os últimos acessos da pessoa |
| Projetos e agentes | `#/projetos` | Tudo que o time construiu, por categoria (a primeira é "Agentes de IA"), com "Como funciona" / "Como usar", autor, data, PRD e Git no card |
| Links | `#/links` | Só o que não é projeto: recorrentes, eventos, integração e treinamento, canais do Slack, ferramentas |
| Entregas | `#/entregas` | O que o mentorado recebe (texto do pitch) e como o time entrega por dentro |

Rotas antigas continuam funcionando: `#/perguntar` e `#/recentes` caem no Início; `#/agentes` abre
Projetos e agentes já filtrado na seção "Agentes de IA".

Em toda aba com classificação (categorias de projetos, grupos de links, tipos de entrega), cada seção
nasce fechada mostrando título e contagem e abre ao clicar. Com busca ou filtro ativo, as seções com
resultado abrem sozinhas. O que a pessoa abriu fica lembrado na aba do navegador.

O visual segue a Central de Gestão de Eventos (central-do-retiro.vercel.app): menu lateral no
desktop, barra inferior no celular, fonte Manrope, cartões brancos e verde-limão nos destaques.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `index.html` | Casca: menu lateral, barra do celular, painel de detalhe |
| `app.js` | Roteador por `#/rota`, busca, filtros, cards, painéis e registro dos últimos acessos |
| `style.css` | Estilos (CSS puro) |
| `dados/projetos.js` | Projetos do time (`PROJETOS`, `CATEGORIAS`, `TIPOS`, `CONTEXTOS`) |
| `dados/agentes.js` | Agentes de IA (`AGENTES`); aparecem na seção "Agentes de IA" de Projetos e agentes |
| `dados/links.js` | Links importantes (`LINKS`, `GRUPOS_LINKS`) |
| `dados/entregas.js` | Entregas (`ENTREGAS`, `TIPOS_ENTREGA`) |
| `dados/operacao.js` | Jornada do mentorado, rotinas do time e os mais usados do Início (`JORNADA`, `ROTINAS`, `MAIS_USADOS`) |
| `dados/conhecimento.js` | Perguntas frequentes e combinados que só o assistente usa (`CONHECIMENTO`, `SUGESTOES_CHAT`) |
| `api/chat.js` | Função da Vercel que recebe a pergunta da página e responde em streaming |
| `api/slack.js` | Função da Vercel que recebe as mensagens do Slack e responde na DM ou na thread |
| `api/_cerebro.js` | O cérebro compartilhado: escolhe o modelo do Gemini, manda a base e devolve a resposta |
| `slack-manifest.json` | Manifesto para criar o app do Slack em um clique (escopos, eventos, endereço) |
| `api/_base.js` | Transforma `dados/*.js` no texto que o assistente lê (base de conhecimento) |
| `LEVANTAMENTO-CLARA.md` | O que a diretoria pergunta sobre o Fluxo e o que falta reunir |
| `DECISOES.md` | Decisões tomadas e a fonte no Slack de cada informação |
| `LINKS-PENDENTES.md` | O que falta preencher e o que já foi buscado |
| `prompts/central-do-fluxo-ideacao.md` | Prompt para pensar a próxima versão da central com o Claude |

A página continua estática e sem login. A única parte com servidor é o assistente: a função
`api/chat.js` (página) e a `api/slack.js` (bot do Slack), que a Vercel roda sob demanda e que usam
o mesmo cérebro (`api/_cerebro.js`) e os mesmos dados. Deploy é servir a raiz na Vercel; ela
instala `@google/genai` sozinha a partir do `package.json`.
**Os arquivos em `dados/` são a única fonte de verdade.** Nunca coloque senha, código de acesso ou
credencial neles: isso fica no 1Password.

## Início

O Início tem, nesta ordem: a busca geral, o assistente, os "mais usados pelo time", as três portas
(Projetos e agentes, Links, Entregas, com a contagem) e os últimos acessos da pessoa.

A **busca geral** procura ao mesmo tempo em projetos, agentes, links, entregas e nas perguntas
frequentes de `dados/conhecimento.js`; os resultados aparecem agrupados no lugar dos blocos, com
"Como funciona", copiar e abrir. No fim dos resultados há o botão "Perguntar ao assistente", que manda
o mesmo texto para o chat.

## Assistente

O assistente fica no Início, logo abaixo da busca geral. Links antigos para `#/perguntar`
(inclusive `#/perguntar?q=...`) caem no Início e a pergunta é enviada sozinha.

Como funciona: a pergunta vai para `/api/chat`; a função monta um texto com **tudo** que está em
`dados/*.js` (jornada, rotinas, entregas, agentes, projetos, links e perguntas frequentes), manda
para o Gemini (Google) com instruções de responder só com o que está lá, e devolve a resposta em
streaming. O texto da base vai sempre igual, então a API reaproveita esse prefixo entre perguntas.

Configuração na Vercel (Settings > Environment Variables, para Production e Preview):

| Variável | Obrigatória | Para quê |
| --- | --- | --- |
| `GEMINI_API_KEY` | sim | Chave da API do Gemini. Gratuita: entre em aistudio.google.com com uma conta Google, clique em "Get API key" e crie uma. Sem ela, a aba mostra erro. |
| `CHAT_CODIGO` | não | Um código simples (ex.: `fluxo2026`). Se definido, a página pede uma vez e guarda no navegador. Evita que qualquer pessoa com a URL use o assistente. |
| `CHAT_MODELO` | não | Modelo fixo. Sem ela, a função lista os modelos que a chave enxerga e escolhe sozinha o Flash mais novo (os nomes do Gemini mudam com o tempo). Só defina se quiser forçar um modelo específico. |

Plano gratuito: a chave do AI Studio funciona sem cartão, com limite de pedidos por minuto e por
dia (o Google muda esses limites; hoje ficam na casa de algumas dezenas por minuto e algumas
centenas por dia para o Flash). Se o limite estourar, a aba mostra "Limite do plano gratuito
atingido" e volta a funcionar sozinha no minuto seguinte. Cada pergunta manda a base inteira
(cerca de 60 mil tokens desde a leva 1 do Slack, 30/09/2026), então o limite de tokens por minuto
também conta: no plano gratuito cabem poucas perguntas por minuto somando página e bot do Slack. Se
isso apertar, o caminho é ativar o faturamento da chave no AI Studio (a cobrança por pergunta é de
centavos) ou usar o cache explícito do Gemini para a base.

Regras do assistente (em `api/_base.js`, constante `INSTRUCOES`): responde em português, direto,
só com a base; entrega o link completo quando pedem; quando não sabe, diz "não encontrei isso na
central" e aponta quem sabe; nunca inventa link, número ou processo; não fala de senha.

Para ensinar algo novo ao assistente, edite `dados/conhecimento.js`:

```js
{
  pergunta: 'Como a Clara pergunta, do jeito que ela pergunta',
  resposta: 'A resposta combinada, com nomes e datas',
  tema: 'Contratos',            // agrupa
  quem: 'Fernanda',              // quem sabe mais
  fonte: '#fluxo-time-rtg, 03/07/2026',
  links: ['https://...']
}
```

`SUGESTOES_CHAT` são as perguntas de exemplo que aparecem na tela vazia.

Proteções na função: só aceita chamadas da própria página (mesma origem), limita a 20 perguntas
por minuto por IP, corta mensagens muito longas e envia no máximo as 16 últimas mensagens da
conversa. A conversa fica só no navegador de quem pergunta (sessionStorage) e some ao fechar a aba.

Teste local sem chave: `npm run testar-base` mostra a base montada. Com a chave exportada em
`GEMINI_API_KEY`, use `npx vercel dev` para rodar página e função juntas.

## Bot no Slack

O mesmo assistente dentro do Slack: a pessoa abre a DM do app "Central do Fluxo" e pergunta como
perguntaria a alguém do time; num canal, basta mencionar `@Central do Fluxo`. O bot lê os mesmos
`dados/*.js` e `conhecimento.js` da página, então é uma fonte só: atualizou lá, mudou nos dois.

Como funciona: o Slack manda cada mensagem para `/api/slack`. A função confere a assinatura do
Slack, olha se quem perguntou está na lista de acesso, confirma o recebimento na hora (o Slack exige
resposta em 3 segundos) e continua trabalhando: busca as últimas mensagens da conversa no próprio
Slack (na DM, o histórico; num canal, a thread), manda para o cérebro e publica a resposta. Enquanto
pensa, marca a pergunta com 👀. Quem não está na lista não recebe resposta nenhuma.

### Criar o app (uma vez)

1. Entre em api.slack.com/apps, clique em **Create New App** > **From a manifest**, escolha o
   workspace da RTG e cole o conteúdo de `slack-manifest.json`. Confirme.
2. Em **Basic Information**, copie o **Signing Secret**.
3. Em **Install App**, clique em **Install to Workspace** e copie o **Bot User OAuth Token** (`xoxb-...`).
4. Na Vercel (Settings > Environment Variables, Production e Preview), crie:

| Variável | Para quê |
| --- | --- |
| `SLACK_BOT_TOKEN` | O token `xoxb-...` do passo 3 |
| `SLACK_SIGNING_SECRET` | O Signing Secret do passo 2 |
| `SLACK_USUARIOS` | IDs de quem pode usar, separados por vírgula (ex.: `U012ABC,U034DEF`). Para achar o ID: perfil da pessoa no Slack > três pontos > "Copy member ID". |

5. Faça um redeploy na Vercel (Deployments > três pontos > Redeploy) para as variáveis valerem.
6. De volta ao app, em **Event Subscriptions**, confira se o Request URL
   `https://plataforma-central-naves.vercel.app/api/slack` aparece como **Verified**. Se não, clique
   em Retry (isso só funciona depois do deploy com as variáveis).
7. No Slack, procure o app "Central do Fluxo" na barra lateral (em Apps), abra a DM e pergunte.

Para liberar mais gente: acrescente o ID em `SLACK_USUARIOS` e faça redeploy. Para mudar o que o bot
sabe: edite `dados/*.js`, como sempre.

Teste local sem Slack nem Gemini: `npm run testar-slack` confere assinatura, desafio de
configuração, lista de acesso e conversão de texto.

O bot usa a mesma chave `GEMINI_API_KEY` e o mesmo limite do plano gratuito do chat da página. Ele
não responde a mensagens de outros bots, nem a edições, e ignora os reenvios do Slack.

## Como editar cada aba

### Projetos (`dados/projetos.js`)

```js
{
  nome: 'Nome exibido',
  descricao: 'Uma linha dizendo o que é. Obrigatória.',
  url: 'https://...',        // link principal; '' se ainda não tiver
  tipo: 'página',            // página | lovable | skill | extensão | automação | documentação | calculadora | link
  categoria: 'Ferramentas do dia a dia', // uma das seções em CATEGORIAS
  contexto: ['fluxo'],       // pico | fluxo | perpétuo | evento (pode ter mais de um)
  autores: ['Nome'],
  data: '2026-09',           // AAAA-MM: criação ou última atualização ('' se não souber)
  prd: '',                   // link do PRD (mostra "Baixar PRD")
  guia: '',                  // link de um guia/manual em PDF (mostra "Guia de instalação (PDF)")
  git: '',                   // link do repositório (mostra "Ver no Git")
  status: 'no ar',           // no ar | em construção | link pendente
  falta: '',                 // só para em construção / link pendente: a frase do que falta (aparece no card)
  detalhe: {                 // obrigatório para automação e documentação; opcional para o resto
    oQueFaz: '', comoFunciona: '', ondeRoda: '', responsavel: '',
    ondeVerSeEstaFuncionando: '', oQueFazerSeQuebrar: ''
  }
}
```

- `descricao` é uma linha só (até uns 80 caracteres): ela aparece inteira no card. O texto longo
  vai em `detalhe.oQueFaz`.
- A ordem das seções é a ordem de `CATEGORIAS`. Dentro da seção, o padrão é do mais recente para o
  mais antigo (campo `data`); o seletor "A a Z" muda a ordem. Itens em construção ou sem link vão
  sempre para o fim da seção.
- Sem link ainda: `url: ''`, `status: 'link pendente'` e a frase em `falta`. O card fica tracejado.
- Campo desconhecido: escreva uma frase para humanos ("A confirmar com a Ellen") e anote em
  `LINKS-PENDENTES.md`. Nada de `[preencher]` na tela.
- O card mostra a tag colorida do tipo, os contextos, a descrição, "por autores · data" e botões
  que dizem o que fazem: "Abrir" (ou "Baixar", para extensão), "Como funciona" (abre o painel),
  "Guia", "PRD" e "Git". Se `git` for igual a `url`, "Git" não aparece.
- Um projeto não deve estar também em `agentes.js` nem em `links.js`: cada item mora num lugar só.

### Agentes de IA (`dados/agentes.js`)

Aparecem na aba Projetos e agentes, seção "Agentes de IA" (a categoria existe em `CATEGORIAS`
só para definir a posição da seção), com a tag `agente`.

```js
{
  nome: '', descricao: '',
  onde: 'Fluxer',                 // texto livre curto: vira filtro "Agentes onde"
  paraQuem: ['navegadores'],      // navegadores | analisadores | mentorados | comercial (filtro "Agentes para")
  status: 'no ar',                // no ar | em construção
  url: '',                        // botão "Abrir" (opcional)
  git: '',                        // botão "Git" (opcional)
  links: [{ rotulo: '', url: '' }], // botões extras no painel (opcional)
  responsavel: '', autores: [], data: 'AAAA-MM',
  detalhe: { oQueFaz: '', comoUsar: '', ondeFica: '', atencao: '', ondeVerSeEstaFuncionando: '', oQueFazerSeQuebrar: '' }
}
```

### Links (`dados/links.js`)

```js
{ id: 'unico', grupo: 'Recorrentes', nome: '', url: 'https://...', descricao: '', obs: '' }
```

- `grupo` precisa estar em `GRUPOS_LINKS` (define a ordem das seções colapsáveis).
- Cada link é um card com nome, endereço curto, descrição, a `obs` como etiqueta em destaque e os
  botões "Copiar" (principal) e "Abrir". Sem `url`, mostra "link em breve".
- Só entra aqui o que não é projeto do time. Página, automação, agente ou ferramenta construída pelo
  time vai em `projetos.js` ou `agentes.js`, e a busca geral do Início acha os dois.

### Entregas (`dados/entregas.js`)

```js
{
  nome: '', tipo: 'coletiva',     // individual | coletiva | extra | bônus
  descricao: '',                  // o texto do pitch, como o mentorado ouve
  frequencia: '', responsavel: '',
  operacao: '',                   // como o time entrega por dentro (vira "Como entregamos")
  links: [{ rotulo: '', url: '' }] // o primeiro vira o botão principal; '#/rota' navega dentro da central
}
```

### Operação (`dados/operacao.js`)

Só o assistente usa estes dados (não aparecem mais na tela).

- `JORNADA`: etapas do mentorado (`etapa`, `titulo`, `texto`).
- `ROTINAS`: rotinas do time (`quando`, `titulo`, `texto`).
- `MAIS_USADOS`: os 6 botões de "Mais usados pelo time" do Início. Cada item aponta para um link
  (`{ link: 'id' }`), um projeto (`{ projeto: 'Nome' }`) ou um agente (`{ agente: 'Nome' }`), com
  `rotulo` opcional para o nome curto. Item sem link não aparece.

## Últimos acessos

O bloco "Seus últimos acessos", no fim do Início, lista os 8 últimos itens que a pessoa abriu na
central: links externos (em qualquer aba, inclusive nas respostas do assistente e no "copiar") e os
painéis de agentes, projetos e entregas. Cada item aparece uma vez só (volta para o topo ao ser
aberto de novo) e a lista guarda os 30 últimos. Fica no `localStorage` do navegador
(`central-fluxo-recentes`): cada pessoa vê só o dela e não vai para servidor nenhum. O botão
"Limpar histórico" apaga tudo. O bloco não aparece para quem ainda não abriu nada.

## Busca e filtros

- A busca fica sempre à mostra; os chips ficam atrás do botão "Filtros" (que mostra quantos
  estão ativos e já abre se o link vier filtrado).
- Em cada aba, a busca procura em todos os textos do item (inclusive o detalhe), sem diferenciar
  acento nem maiúscula. Chips filtram; dentro do grupo vale "ou", entre grupos e com a busca "e".
- Em Projetos e agentes os grupos são Seção, Tipo, Contexto, Agentes para e Agentes onde; ao lado
  do botão Filtros fica a ordem (Mais recentes ou A a Z).
- O estado fica na URL (`#/projetos?q=...&tipo=...&ordem=az`), então dá para mandar um link já
  filtrado. Links antigos no formato `?q=` são redirecionados para `#/projetos`.
- As seções colapsáveis guardam o que está aberto em `sessionStorage` (`central-fluxo-secoes`).
- Atalho: `/` foca a busca da aba (no Início, a busca geral).

## Painel de detalhe

Os botões "Como funciona" (projetos), "Como usar" (agentes), "Como entregamos" (entregas) e
"Ver resposta" (perguntas frequentes, na busca geral) abrem um `<dialog>` com tudo: os blocos por
pergunta, quem cuida, autores, data e links extras (PRD, Git, guia). "Abrir" leva ao link sem abrir
o painel. O painel fecha com Esc, com o X ou clicando fora e devolve o foco ao botão.
Textos que começam com "1. " ganham uma linha por passo. Links internos (`#/...`) dentro do painel
fecham o painel e navegam.

## Testar localmente

```sh
python3 -m http.server 8765
# abra http://127.0.0.1:8765/
```

Confira em desktop e em largura de celular (380px): nada pode estourar horizontalmente.

## Atenção

A página não tem login. Quem tiver a URL vê nomes, descrições, autores, links e canais do Slack.
Informação restrita precisa estar protegida no destino, não aqui.
