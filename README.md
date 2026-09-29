# Central do Fluxo

Página única e estática que centraliza a **operação da Mentoria Fluxo**: como funciona por dentro
e o acesso rápido a tudo que a operação precisa. É igual para todo mundo (navegadores, chefes e
diretoria) e responde sozinha, em segundos, o que é cada coisa, para que serve, como funciona,
quem cuida e onde olhar quando dá problema.

Site: https://plataforma-central-naves.vercel.app

## Abas

| Aba | Rota | O que tem |
| --- | --- | --- |
| Visão geral | `#/` | Busca em tudo, números, acesso rápido, jornada do mentorado e rotinas do time |
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
| `app.js` | Roteador por `#/rota`, busca, filtros, cards e painéis |
| `style.css` | Estilos (CSS puro) |
| `dados/projetos.js` | Projetos do time (`PROJETOS`, `CATEGORIAS`, `TIPOS`, `CONTEXTOS`) |
| `dados/agentes.js` | Agentes de IA (`AGENTES`) |
| `dados/links.js` | Links importantes (`LINKS`, `GRUPOS_LINKS`) |
| `dados/entregas.js` | Entregas (`ENTREGAS`, `TIPOS_ENTREGA`) |
| `dados/operacao.js` | Jornada do mentorado, rotinas do time e acesso rápido (`JORNADA`, `ROTINAS`, `ACESSO_RAPIDO`) |
| `DECISOES.md` | Decisões tomadas e a fonte no Slack de cada informação |
| `LINKS-PENDENTES.md` | O que falta preencher e o que já foi buscado |
| `prompts/central-do-fluxo-ideacao.md` | Prompt para pensar a próxima versão da central com o Claude |

Sem build, sem dependências, sem backend, sem login. Deploy é servir a raiz na Vercel.
**Os arquivos em `dados/` são a única fonte de verdade.** Nunca coloque senha, código de acesso ou
credencial neles: isso fica no 1Password.

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
- `id` é usado em `ACESSO_RAPIDO` (`dados/operacao.js`) para aparecer na visão geral.
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

### Visão geral (`dados/operacao.js`)

- `JORNADA`: etapas do mentorado (`etapa`, `titulo`, `texto`).
- `ROTINAS`: rotinas do time (`quando`, `titulo`, `texto`).
- `ACESSO_RAPIDO`: lista de `id` de links que aparecem em "Acesso rápido".

## Busca e filtros

- Na visão geral, a busca procura em tudo (agentes, projetos, links, entregas e rotinas) e agrupa
  os resultados; clicar num resultado abre o painel do item.
- Em cada aba, a busca procura em todos os textos do item (inclusive o detalhe), sem diferenciar
  acento nem maiúscula. Chips filtram; dentro do grupo vale "ou", entre grupos e com a busca "e".
- O estado fica na URL (`#/projetos?q=...&tipo=...`), então dá para mandar um link já filtrado.
  Links antigos no formato `?q=` são redirecionados para `#/projetos`.
- Atalho: `/` foca a busca da aba.

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
