# Central do Fluxo

Página única e estática que centraliza a **operação da Mentoria Fluxo**: como funciona por dentro
e o acesso rápido a tudo que a operação precisa. É igual para todo mundo (navegadores, chefes e
diretoria) e responde sozinha, em segundos, o que é cada coisa, para que serve, como funciona,
quem cuida e onde olhar quando dá problema.

Site: https://plataforma-central-naves.vercel.app

## Abas

| Aba | Rota | O que tem |
| --- | --- | --- |
| Visão geral | `#/` | Pergunte ao assistente: chat com IA que responde qualquer pergunta sobre a operação usando os dados da central, inclusive links |
| Últimos acessos | `#/recentes` | O que a pessoa abriu por último (links, agentes, projetos e entregas), salvo só no navegador dela |
| Agentes de IA | `#/agentes` | Cada agente: o que faz, para quem, onde fica, como usar, atenção |
| Projetos | `#/projetos` | Tudo que o time construiu, por categoria, com "Como funciona" nas automações |
| Links importantes | `#/links` | Recorrentes, eventos, integração e treinamento, canais do Slack, ferramentas |
| Entregas | `#/entregas` | O que o mentorado recebe (texto do pitch) e como o time entrega por dentro |

O visual segue a Central de Gestão de Eventos (central-do-retiro.vercel.app): menu lateral no
desktop, barra inferior no celular, fonte Manrope, cartões brancos e verde-limão nos destaques.

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `index.html` | Casca: menu lateral, barra do celular, painel de detalhe |
| `app.js` | Roteador por `#/rota`, busca, filtros, cards, painéis e registro dos últimos acessos |
| `style.css` | Estilos (CSS puro) |
| `dados/projetos.js` | Projetos do time (`PROJETOS`, `CATEGORIAS`, `TIPOS`, `CONTEXTOS`) |
| `dados/agentes.js` | Agentes de IA (`AGENTES`) |
| `dados/links.js` | Links importantes (`LINKS`, `GRUPOS_LINKS`) |
| `dados/entregas.js` | Entregas (`ENTREGAS`, `TIPOS_ENTREGA`) |
| `dados/operacao.js` | Jornada do mentorado, rotinas do time e acesso rápido (`JORNADA`, `ROTINAS`, `ACESSO_RAPIDO`) |
| `dados/conhecimento.js` | Perguntas frequentes e combinados que só o assistente usa (`CONHECIMENTO`, `SUGESTOES_CHAT`) |
| `api/chat.js` | Função da Vercel que recebe a pergunta e responde com o Gemini (streaming) |
| `api/_base.js` | Transforma `dados/*.js` no texto que o assistente lê (base de conhecimento) |
| `LEVANTAMENTO-CLARA.md` | O que a diretoria pergunta sobre o Fluxo e o que falta reunir |
| `DECISOES.md` | Decisões tomadas e a fonte no Slack de cada informação |
| `LINKS-PENDENTES.md` | O que falta preencher e o que já foi buscado |
| `prompts/central-do-fluxo-ideacao.md` | Prompt para pensar a próxima versão da central com o Claude |

A página continua estática e sem login. A única parte com servidor é o assistente da Visão geral: uma
função em `api/chat.js` que a Vercel roda sob demanda. Deploy é servir a raiz na Vercel; ela
instala `@google/genai` sozinha a partir do `package.json`.
**Os arquivos em `dados/` são a única fonte de verdade.** Nunca coloque senha, código de acesso ou
credencial neles: isso fica no 1Password.

## Visão geral (assistente)

A Visão geral é só o chat. Links antigos para `#/perguntar` (inclusive `#/perguntar?q=...`)
caem nela e continuam funcionando.

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
(cerca de 26 mil tokens), então o limite de tokens por minuto também conta.

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
  git: '',                   // link do repositório (mostra "Ver no Git")
  status: 'no ar',           // no ar | em construção | link pendente
  detalhe: {                 // obrigatório para automação e documentação; opcional para o resto
    oQueFaz: '', comoFunciona: '', ondeRoda: '', responsavel: '',
    ondeVerSeEstaFuncionando: '', oQueFazerSeQuebrar: ''
  }
}
```

- A ordem das seções é a ordem de `CATEGORIAS`; dentro da seção, a ordem do array.
- Sem link ainda: `url: ''` e `status: 'link pendente'`. O card fica tracejado com "link em breve".
- Campo desconhecido: escreva `[preencher]` e anote em `LINKS-PENDENTES.md`.
- O card inteiro é um link real para a URL principal; "Baixar PRD", "Ver no Git" e "Como funciona"
  ficam acima e não disparam o link. Se `git` for igual a `url`, "Ver no Git" não aparece.

### Agentes de IA (`dados/agentes.js`)

```js
{
  nome: '', descricao: '',
  onde: 'Fluxer',                 // texto livre curto: vira filtro "Onde"
  paraQuem: ['navegadores'],      // navegadores | analisadores | mentorados | comercial (vira filtro)
  status: 'no ar',                // no ar | em construção
  url: '',                        // botão "Abrir" (opcional)
  responsavel: '', autores: [], data: 'AAAA-MM',
  detalhe: { oQueFaz: '', comoUsar: '', ondeFica: '', atencao: '', ondeVerSeEstaFuncionando: '' }
}
```

### Links importantes (`dados/links.js`)

```js
{ id: 'unico', grupo: 'Recorrentes', nome: '', url: 'https://...', descricao: '', obs: '' }
```

- `grupo` precisa estar em `GRUPOS_LINKS` (define a ordem dos blocos).
- Cada linha tem "copiar" e "abrir em nova aba". Sem `url`, mostra "link em breve".

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
- `ACESSO_RAPIDO`: lista de `id` de links mais usados.

## Últimos acessos

A aba `#/recentes` lista, do mais recente para o mais antigo, o que a pessoa abriu na central:
links externos (em qualquer aba, inclusive nas respostas do assistente e no "copiar"), e os painéis
de agentes, projetos e entregas. Cada item aparece uma vez só (volta para o topo ao ser aberto de
novo) e a lista guarda os 30 últimos. Fica no `localStorage` do navegador
(`central-fluxo-recentes`): cada pessoa vê só o dela e não vai para servidor nenhum. O botão
"Limpar histórico" apaga tudo.

## Busca e filtros

- Em cada aba, a busca procura em todos os textos do item (inclusive o detalhe), sem diferenciar
  acento nem maiúscula. Chips filtram; dentro do grupo vale "ou", entre grupos e com a busca "e".
- O estado fica na URL (`#/projetos?q=...&tipo=...`), então dá para mandar um link já filtrado.
  Links antigos no formato `?q=` são redirecionados para `#/projetos`.
- Atalho: `/` foca a busca da aba (na Visão geral, a caixa do assistente).

## Painel de detalhe

"Como funciona" (projetos), "Como usar" (agentes) e "Como entregamos" (entregas) abrem um `<dialog>`
com um bloco por pergunta, que fecha com Esc, com o X ou clicando fora e devolve o foco ao botão.
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
