# Central de Projetos

Página única e estática que lista os projetos do time e leva para cada um com um clique.
É um índice de links — não é portal, dashboard nem sistema.

## Arquivo

Tudo vive em `index.html` (HTML + CSS + JS inline, sem dependências e sem build step).

## Como adicionar ou editar um projeto

Edite apenas a constante `PROJETOS`, no `<script>` no fim do `index.html`:

```js
const PROJETOS = [
  { nome: 'Nome exibido', url: 'https://...', icon: 'calendar' },
  ...
];
```

`icon` aceita: `calendar`, `book`, `quote`, `archive`. Para um ícone novo, adicione o path
correspondente no objeto `ICONS` logo abaixo.

A ordem do array é a ordem de exibição.

## Deploy

Hospedagem estática. Não há build: basta servir o `index.html` na raiz.

## Atenção

A página não tem login. Quem tiver a URL vê os nomes dos projetos e acessa os links.
Se algum projeto de destino tiver informação restrita, a proteção precisa existir no
próprio projeto — esta página não oferece nenhuma.
