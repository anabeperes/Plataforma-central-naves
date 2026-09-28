# Central de Projetos do Fluxo

Página única e estática que reúne **tudo que o time do Fluxo construiu ou de que participa**:
projetos, páginas, skills, automações, calculadoras e documentações. É um painel igual para
todo mundo (navegadores, chefes e diretoria): cada card responde sozinho o que é, para que
serve e, quando tem automação por trás, como funciona, onde roda, quem cuida e o que fazer se
quebrar.

Site: https://plataforma-central-naves.vercel.app

## Arquivos

| Arquivo        | O que é                                                                |
| -------------- | ---------------------------------------------------------------------- |
| `index.html`   | Marcação da página e o JavaScript de busca, filtros e painel de detalhe |
| `projetos.js`  | **Única fonte de verdade**: a lista de projetos, categorias e tipos     |
| `style.css`    | Estilos (verde-lima sobre fundo claro, cara de plataforma)              |
| `DECISOES.md`  | Decisões tomadas durante a evolução e de onde veio cada link            |
| `LINKS-PENDENTES.md` | O que ainda falta preencher e o que já foi buscado no Slack       |

Sem build, sem dependências, sem backend, sem login. Deploy é servir a raiz na Vercel.

## Como adicionar ou editar um projeto

Edite apenas o array `PROJETOS` em `projetos.js`. Cada item tem este formato:

```js
{
  nome: 'Nome exibido',
  descricao: 'Uma linha dizendo o que é. Obrigatória.',
  url: 'https://...',        // link principal; '' se ainda não tiver
  tipo: 'página',            // página | lovable | skill | extensão | automação | documentação | calculadora | link
  categoria: 'Ferramentas do dia a dia', // uma das seções (ver CATEGORIAS)
  contexto: ['fluxo'],       // pico | fluxo | perpétuo | evento (pode ter mais de um)
  autores: ['Nome'],         // aparecem pequeninhos no card
  data: '2026-09',           // AAAA-MM: mês de criação ou da última atualização
  prd: '',                   // link do PRD, se existir (mostra "Baixar PRD")
  git: '',                   // link do repositório, se existir (mostra "Ver no Git")
  status: 'no ar',           // no ar | em construção | link pendente
  detalhe: {                 // obrigatório para automação e documentação; opcional para o resto
    oQueFaz: '2 ou 3 frases em linguagem simples.',
    comoFunciona: 'Passo a passo curto. Se começar com "1. ", cada passo vira uma linha.',
    ondeRoda: 'Ex.: GitHub Actions, no repositório da Fernanda.',
    responsavel: 'Quem cuida hoje.',
    ondeVerSeEstaFuncionando: 'Ex.: canal #fluxo-links-analises no Slack.',
    oQueFazerSeQuebrar: 'Primeiro passo, sem mandar procurar outra pessoa quando dá pra resolver.'
  }
}
```

Regras práticas:

- **Seções**: a ordem das seções é a ordem do array `CATEGORIAS`. Um projeto só aparece se a
  categoria dele estiver lá. Dentro da seção, a ordem é a ordem do array `PROJETOS`.
- **Sem link ainda?** Deixe `url: ''` e `status: 'link pendente'` (ou `'em construção'`). O card
  aparece tracejado, sem botão "Abrir", com o texto "link em breve". Não invente URL.
- **Campo que você não sabe?** Escreva `[preencher]` e anote em `LINKS-PENDENTES.md`.
- **Tipos e contextos** novos: adicione em `TIPOS` / `CONTEXTOS` antes de usar. Para um tipo novo
  aparecer com ícone e cor próprios, adicione o path em `ICONS` (index.html) e uma regra
  `.tag--<tipo>` em `style.css`; sem isso ele usa o ícone e a cor padrão.
- **"Como funciona"**: só aparece quando o item tem `detalhe`. O painel mostra um bloco por
  pergunta, na ordem acima, e pula campos vazios.

## Busca e filtros

- A busca procura em nome, descrição, autores, tipo, categoria, contexto e em todos os textos do
  `detalhe`, sem diferenciar acento nem maiúscula ("pagina" acha "página").
- Os chips filtram por tipo, contexto e categoria. Dentro de um grupo vale "ou"; entre grupos e
  com a busca vale "e".
- O estado (busca e filtros) fica na URL (`?q=...&tipo=...`), então dá para mandar um link já
  filtrado para alguém.
- Atalho: `/` foca a busca.

## Comportamento dos cards

- O card inteiro é um link real (`<a>`) para a URL principal: abre em nova aba e o botão direito
  do navegador oferece "copiar link". Tecnicamente o `<a>` cobre o card via `::after`, porque HTML
  não permite botões dentro de `<a>`.
- "Baixar PRD", "Ver no Git" e "Como funciona" ficam acima desse link e não disparam a URL
  principal. Se `git` for igual a `url`, o botão "Ver no Git" não aparece (evita duplicar).
- O painel "Como funciona" é um `<dialog>`: fecha com Esc, com o X ou clicando fora, e devolve o
  foco ao botão que abriu.

## Testar localmente

```sh
python3 -m http.server 8765
# abra http://127.0.0.1:8765/
```

Confira em desktop e em largura de celular (380px): nada pode estourar horizontalmente.

## Atenção

A página não tem login. Quem tiver a URL vê os nomes dos projetos, descrições, autores e acessa os
links. Se algum projeto de destino tiver informação restrita, a proteção precisa existir no próprio
projeto. **Nunca coloque senha, código de acesso ou credencial em `projetos.js`.**
