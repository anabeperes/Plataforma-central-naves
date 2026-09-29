/* Central do Fluxo: roteador de abas, busca, filtros e painéis de detalhe.
   Sem build, sem dependências. Os dados vêm de dados/*.js. */
(function () {
  'use strict';

  /* =========================== utilidades =========================== */
  function normalizar(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }
  var MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  function formatarData(d) {
    var m = /^(\d{4})-(\d{2})$/.exec(d || '');
    if (!m) return '';
    var mes = MESES[parseInt(m[2], 10) - 1];
    return mes ? mes + '/' + m[1] : '';
  }
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k === 'on') Object.keys(attrs.on).forEach(function (ev) { n.addEventListener(ev, attrs.on[ev]); });
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function frag(children) { var f = document.createDocumentFragment(); children.forEach(function (c) { if (c) f.appendChild(c); }); return f; }
  function termos(q) { return normalizar(q).split(/\s+/).filter(Boolean); }
  function bate(indice, q) { var ts = termos(q); return ts.every(function (t) { return indice.indexOf(t) !== -1; }); }
  function plural(n, s, p) { return n + ' ' + (n === 1 ? s : p); }
  function ehExterno(url) { return /^https?:\/\//i.test(url || ''); }
  function linkAttrs(url) {
    return ehExterno(url) ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : { href: url };
  }
  function quebrarPassos(txt) {
    return /^1\.\s/.test(txt) ? txt.replace(/\s(?=\d{1,2}\.\s)/g, '\n') : txt;
  }

  var I = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 17h6"/>',
    chat: '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/><path d="M9 12h.01M12 12h.01M15 12h.01"/>',
    send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
    grid: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8c-2-3-6-3-6-1s3 1 6 1zm0 0c2-3 6-3 6-1s-3 1-6 1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    'página': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    'lovable': '<path d="M12 21s-7-4.6-9-9.3C1.6 8.3 3.5 5 7 5c2 0 3.4 1.2 5 3 1.6-1.8 3-3 5-3 3.5 0 5.4 3.3 4 6.7C19 16.4 12 21 12 21z"/>',
    'skill': '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    'extensão': '<path d="M10 3a2 2 0 0 1 4 0v1h3a2 2 0 0 1 2 2v3h1a2 2 0 0 1 0 4h-1v3a2 2 0 0 1-2 2h-3v1a2 2 0 0 1-4 0v-1H7a2 2 0 0 1-2-2v-3H4a2 2 0 0 1 0-4h1V6a2 2 0 0 1 2-2h3z"/>',
    'automação': '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    'documentação': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    'calculadora': '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0"/>'
  };
  function svg(nome, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (I[nome] || I.link) + '</svg>';
  }

  /* =========================== dados =========================== */
  var D = {
    projetos: typeof PROJETOS !== 'undefined' ? PROJETOS : [],
    categorias: typeof CATEGORIAS !== 'undefined' ? CATEGORIAS : [],
    contextos: typeof CONTEXTOS !== 'undefined' ? CONTEXTOS : [],
    tipos: typeof TIPOS !== 'undefined' ? TIPOS : [],
    agentes: typeof AGENTES !== 'undefined' ? AGENTES : [],
    links: typeof LINKS !== 'undefined' ? LINKS : [],
    gruposLinks: typeof GRUPOS_LINKS !== 'undefined' ? GRUPOS_LINKS : [],
    entregas: typeof ENTREGAS !== 'undefined' ? ENTREGAS : [],
    tiposEntrega: typeof TIPOS_ENTREGA !== 'undefined' ? TIPOS_ENTREGA : []
  };
  var ROTULOS_PROJETO = [
    ['oQueFaz', 'O que faz'], ['comoFunciona', 'Como funciona'], ['ondeRoda', 'Onde roda'],
    ['responsavel', 'Quem cuida'], ['ondeVerSeEstaFuncionando', 'Onde ver se está funcionando'], ['oQueFazerSeQuebrar', 'O que fazer se quebrar']
  ];
  var ROTULOS_AGENTE = [
    ['oQueFaz', 'O que faz'], ['comoUsar', 'Como usar'], ['ondeFica', 'Onde fica'],
    ['atencao', 'Atenção'], ['ondeVerSeEstaFuncionando', 'Onde ver se está funcionando']
  ];
  function indexar(lista, campos) {
    lista.forEach(function (item) {
      var partes = [];
      campos.forEach(function (c) {
        var v = item[c];
        if (Array.isArray(v)) partes = partes.concat(v);
        else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { partes.push(v[k]); });
        else if (v) partes.push(v);
      });
      item._indice = normalizar(partes.join(' \n '));
    });
  }
  indexar(D.projetos, ['nome', 'descricao', 'tipo', 'categoria', 'status', 'autores', 'contexto', 'detalhe']);
  indexar(D.agentes, ['nome', 'descricao', 'onde', 'paraQuem', 'status', 'responsavel', 'autores', 'detalhe']);
  indexar(D.links, ['nome', 'descricao', 'obs', 'grupo', 'url']);
  indexar(D.entregas, ['nome', 'descricao', 'tipo', 'frequencia', 'responsavel', 'operacao']);

  /* =========================== rotas =========================== */
  var SECOES = [
    { rota: '/', nome: 'Visão geral', curto: 'Geral', icone: 'home' },
    { rota: '/recentes', nome: 'Últimos acessos', curto: 'Recentes', icone: 'clock' },
    { rota: '/agentes', nome: 'Agentes de IA', curto: 'Agentes', icone: 'bot' },
    { rota: '/projetos', nome: 'Projetos', curto: 'Projetos', icone: 'grid' },
    { rota: '/links', nome: 'Links importantes', curto: 'Links', icone: 'link' },
    { rota: '/entregas', nome: 'Entregas', curto: 'Entregas', icone: 'gift' }
  ];
  function lerRota() {
    var h = location.hash.replace(/^#/, '');
    if (!h) {
      // Compatibilidade com links antigos (?q=&tipo=... sem hash).
      if (location.search.length > 1) return { rota: '/projetos', params: new URLSearchParams(location.search) };
      return { rota: '/', params: new URLSearchParams() };
    }
    var i = h.indexOf('?');
    var rota = i === -1 ? h : h.slice(0, i);
    var params = new URLSearchParams(i === -1 ? '' : h.slice(i + 1));
    if (!rota.startsWith('/')) rota = '/' + rota;
    if (rota === '/perguntar') rota = '/'; // a aba Perguntar virou a Visão geral
    if (!SECOES.some(function (s) { return s.rota === rota; })) rota = '/';
    return { rota: rota, params: params };
  }
  function gravarRota(rota, params) {
    var qs = params.toString();
    var novo = '#' + rota + (qs ? '?' + qs : '');
    if (location.hash !== novo) history.replaceState(null, '', location.pathname + novo);
  }

  function renderNav() {
    var atual = lerRota().rota;
    ['nav-lateral', 'nav-inferior'].forEach(function (id) {
      var c = document.getElementById(id);
      c.innerHTML = '';
      SECOES.forEach(function (s) {
        var on = s.rota === atual;
        c.appendChild(el('a', {
          class: 'navitem' + (on ? ' navitem--on' : ''), href: '#' + s.rota, 'aria-current': on ? 'page' : null, title: s.nome,
          html: svg(s.icone, 'navitem__icon') + '<span class="navitem__label">' + (id === 'nav-inferior' ? s.curto : s.nome) + '</span>'
        }));
      });
    });
    var sec = SECOES.filter(function (s) { return s.rota === atual; })[0];
    document.getElementById('secao-atual').textContent = sec && sec.rota !== '/' ? sec.nome : '';
    document.title = (sec && sec.rota !== '/' ? sec.nome + ' · ' : '') + 'Central do Fluxo';
  }

  /* =========================== componentes =========================== */
  function cabecalho(titulo, subtitulo, extras) {
    return el('header', { class: 'pagehead' }, [
      el('div', { class: 'min0' }, [
        el('h1', { class: 'pagehead__title', text: titulo }),
        subtitulo ? el('p', { class: 'pagehead__sub', text: subtitulo }) : null
      ]),
      extras ? el('div', { class: 'pagehead__extras' }, extras) : null
    ]);
  }
  function busca(valor, placeholder, onInput) {
    var input = el('input', { class: 'search__input', type: 'search', placeholder: placeholder, spellcheck: 'false', value: valor || '', 'aria-label': placeholder });
    var limpar = el('button', { class: 'search__clear', type: 'button', 'aria-label': 'Limpar busca', html: svg('x') });
    var wrap = el('div', { class: 'search' + (valor ? ' search--active' : '') }, [el('span', { class: 'search__icon', html: svg('search') }), input, limpar]);
    input.addEventListener('input', function () { wrap.classList.toggle('search--active', !!input.value); onInput(input.value); });
    limpar.addEventListener('click', function () { input.value = ''; wrap.classList.remove('search--active'); onInput(''); input.focus(); });
    wrap.input = input;
    return wrap;
  }
  function chips(rotulo, valores, selecionados, onToggle) {
    var grupo = el('div', { class: 'filter-group', role: 'group', 'aria-label': rotulo }, [el('span', { class: 'filter-group__label', text: rotulo })]);
    valores.forEach(function (v) {
      var b = el('button', { class: 'chip', type: 'button', 'aria-pressed': selecionados.has(v) ? 'true' : 'false', text: v });
      b.addEventListener('click', function () {
        if (selecionados.has(v)) selecionados.delete(v); else selecionados.add(v);
        b.setAttribute('aria-pressed', selecionados.has(v) ? 'true' : 'false');
        onToggle();
      });
      grupo.appendChild(b);
    });
    return grupo;
  }
  function contador(n, s, p) { return el('span', { class: 'count', 'aria-live': 'polite', text: plural(n, s, p) }); }
  function vazio(texto, onLimpar) {
    return el('div', { class: 'empty' }, [
      el('h2', { text: 'Nada por aqui com esses filtros' }),
      el('p', { text: texto || 'Tente outra palavra, confira a grafia ou limpe os filtros.' }),
      el('button', { class: 'btn btn--primary', type: 'button', text: 'Limpar busca e filtros', on: { click: onLimpar } })
    ]);
  }
  function tag(texto, cls) { return el('span', { class: 'tag ' + (cls || ''), text: texto }); }
  function botaoLink(url, texto, primario) {
    var a = el('a', Object.assign({ class: 'btn ' + (primario ? 'btn--primary' : 'btn--ghost') }, linkAttrs(url)));
    a.innerHTML = texto + (primario ? ' ' + svg('arrow') : '');
    return a;
  }

  var toastTimer;
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 1800);
  }
  function copiar(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto).then(function () { toast('Link copiado'); }, function () { copiarFallback(texto); });
    }
    copiarFallback(texto);
  }
  function copiarFallback(texto) {
    var ta = el('textarea', { value: texto, style: 'position:fixed;opacity:0' });
    ta.value = texto; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Link copiado'); } catch (e) { toast('Não deu para copiar'); }
    document.body.removeChild(ta);
  }

  /* --- painel de detalhe (dialog) --- */
  var dlg = document.getElementById('detalhe');
  var ultimoFoco = null;
  function abrirDetalhe(o, origem) {
    ultimoFoco = origem || document.activeElement;
    dlg.setAttribute('data-acesso-tipo', o.tipoAcesso || '');
    dlg.setAttribute('data-acesso-nome', o.tipoAcesso ? o.titulo : '');
    if (o.tipoAcesso) registrarAcesso({ tipo: o.tipoAcesso, nome: o.titulo });
    document.getElementById('detalhe-kicker').textContent = o.kicker || '';
    document.getElementById('detalhe-titulo').textContent = o.titulo;
    document.getElementById('detalhe-desc').textContent = o.descricao || '';
    var meta = document.getElementById('detalhe-meta'); meta.innerHTML = '';
    (o.meta || []).forEach(function (m) { meta.appendChild(m); });
    var blocos = document.getElementById('detalhe-blocos'); blocos.innerHTML = '';
    (o.blocos || []).forEach(function (b) {
      if (!b[1]) return;
      blocos.appendChild(el('section', { class: 'detail__block' }, [el('h3', { text: b[0] }), el('p', { text: quebrarPassos(b[1]) })]));
    });
    var links = document.getElementById('detalhe-links'); links.innerHTML = '';
    (o.links || []).forEach(function (l) { links.appendChild(l); });
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    dlg.querySelector('.detail__inner').scrollTop = 0;
    document.getElementById('detalhe-fechar').focus();
  }
  function fecharDetalhe() { if (dlg.open) dlg.close(); }
  document.getElementById('detalhe-fechar').addEventListener('click', fecharDetalhe);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) fecharDetalhe(); });
  dlg.addEventListener('close', function () { if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus(); });
  // Links internos (#/...) dentro do dialog fecham o painel antes de navegar.
  dlg.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (a) fecharDetalhe();
  });

  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* =========================== agentes =========================== */
  function abrirAgente(a, origem) {
    var meta = [tag(a.onde, 'tag--onde')];
    (a.paraQuem || []).forEach(function (p) { meta.push(el('span', { class: 'ctx', text: p })); });
    if (a.responsavel) meta.push(el('span', { text: 'cuida: ' + a.responsavel }));
    var d = formatarData(a.data); if (d) meta.push(el('span', { text: d }));
    if (a.status) meta.push(el('span', { class: 'status' + (a.status === 'em construção' ? ' status--construcao' : ''), text: a.status }));
    var links = [];
    if (a.url) links.push(botaoLink(a.url, 'Abrir', true));
    abrirDetalhe({ tipoAcesso: 'Agente', kicker: 'Agente de IA', titulo: a.nome, descricao: a.descricao, meta: meta, blocos: ROTULOS_AGENTE.map(function (r) { return [r[1], a.detalhe && a.detalhe[r[0]]]; }), links: links }, origem);
  }
  function cardAgente(a) {
    var art = el('article', { class: 'card item' + (a.status === 'em construção' ? ' item--soft' : ''), 'data-acesso-tipo': 'Agente', 'data-acesso-nome': a.nome });
    art.appendChild(el('div', { class: 'item__top' }, [
      el('span', { class: 'item__icon', html: svg('bot') }),
      el('div', { class: 'item__tags' }, [tag(a.onde, 'tag--onde')].concat((a.paraQuem || []).map(function (p) { return el('span', { class: 'ctx', text: p }); })))
    ]));
    art.appendChild(el('h3', { class: 'item__title', text: a.nome }));
    art.appendChild(el('p', { class: 'item__desc', text: a.descricao }));
    art.appendChild(el('p', { class: 'item__meta', text: (a.responsavel ? 'Cuida: ' + a.responsavel : '') + (a.status !== 'no ar' ? ' · ' + a.status : '') }));
    var acoes = el('div', { class: 'item__actions' });
    if (a.url) acoes.appendChild(botaoLink(a.url, 'Abrir', true));
    var b = el('button', { class: 'btn btn--ghost btn--detail', type: 'button', text: 'Como usar', 'aria-haspopup': 'dialog' });
    b.addEventListener('click', function () { abrirAgente(a, b); });
    acoes.appendChild(b);
    art.appendChild(acoes);
    return art;
  }
  function viewAgentes(params) {
    var q = params.get('q') || '';
    var quem = new Set((params.get('quem') || '').split(',').filter(Boolean));
    var onde = new Set((params.get('onde') || '').split(',').filter(Boolean));
    var root = el('div', { class: 'view fade-in' });
    var cont = contador(0, 'agente', 'agentes');
    root.appendChild(cabecalho('Agentes de IA', 'O que cada agente faz, para quem é, onde fica dentro da operação e como usar sem errar.', [cont]));
    var todosQuem = []; D.agentes.forEach(function (a) { (a.paraQuem || []).forEach(function (p) { if (todosQuem.indexOf(p) === -1) todosQuem.push(p); }); });
    var todosOnde = []; D.agentes.forEach(function (a) { if (todosOnde.indexOf(a.onde) === -1) todosOnde.push(a.onde); });
    var grade = el('div', { class: 'grid' });
    function gravar() {
      params.delete('q'); params.delete('quem'); params.delete('onde');
      if (q) params.set('q', q); if (quem.size) params.set('quem', Array.from(quem).join(',')); if (onde.size) params.set('onde', Array.from(onde).join(','));
      gravarRota('/agentes', params);
    }
    function render() {
      grade.innerHTML = '';
      var vis = D.agentes.filter(function (a) {
        if (quem.size && !(a.paraQuem || []).some(function (p) { return quem.has(p); })) return false;
        if (onde.size && !onde.has(a.onde)) return false;
        return bate(a._indice, q);
      });
      vis.forEach(function (a) { grade.appendChild(cardAgente(a)); });
      cont.textContent = plural(vis.length, 'agente', 'agentes');
      if (!vis.length) grade.appendChild(vazio(null, function () { q = ''; quem.clear(); onde.clear(); sb.input.value = ''; barra.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); gravar(); render(); }));
      gravar();
    }
    var sb = busca(q, 'Buscar agente por nome, uso ou responsável…', function (v) { q = v; render(); });
    var barra = el('div', { class: 'toolbar card' }, [sb, chips('Para quem', todosQuem, quem, render), chips('Onde', todosOnde, onde, render)]);
    root.appendChild(barra);
    root.appendChild(grade);
    render();
    return root;
  }

  /* =========================== projetos =========================== */
  function abrirProjeto(p, origem) {
    var meta = [tag(p.tipo, 'tag--' + p.tipo)];
    (p.contexto || []).forEach(function (c) { meta.push(el('span', { class: 'ctx', text: c })); });
    if (p.autores && p.autores.length) meta.push(el('span', { text: 'por ' + p.autores.join(', ') }));
    var d = formatarData(p.data); if (d) meta.push(el('span', { text: d }));
    if (p.status) meta.push(el('span', { class: 'status', text: p.status }));
    var links = [];
    if (p.url) links.push(botaoLink(p.url, 'Abrir', true));
    if (p.prd) links.push(botaoLink(p.prd, 'Baixar PRD'));
    if (p.git && p.git !== p.url) links.push(botaoLink(p.git, 'Ver no Git'));
    abrirDetalhe({ tipoAcesso: 'Projeto', kicker: 'Projeto · ' + p.categoria, titulo: p.nome, descricao: p.descricao, meta: meta, blocos: ROTULOS_PROJETO.map(function (r) { return [r[1], p.detalhe && p.detalhe[r[0]]]; }), links: links }, origem);
  }
  function cardProjeto(p) {
    var pendente = !p.url;
    var art = el('article', { class: 'card item' + (pendente ? ' item--pending' : ''), 'aria-label': p.nome, 'data-acesso-tipo': 'Projeto', 'data-acesso-nome': p.nome });
    art.appendChild(el('div', { class: 'item__top' }, [el('span', { class: 'item__icon', html: svg(p.tipo) }), tag(p.tipo, 'tag--' + p.tipo)]));
    var titulo = el('h3', { class: 'item__title', text: p.nome });
    var desc = el('p', { class: 'item__desc', text: p.descricao });
    if (pendente) art.appendChild(el('div', {}, [titulo, desc]));
    else art.appendChild(el('a', { class: 'item__link', href: p.url, target: '_blank', rel: 'noopener noreferrer' }, [titulo, desc]));
    if (p.autores && p.autores.length) art.appendChild(el('p', { class: 'item__authors', text: p.autores.join(' · ') }));
    var meta = el('div', { class: 'item__metarow' });
    (p.contexto || []).forEach(function (c) { meta.appendChild(el('span', { class: 'ctx', text: c })); });
    if (p.status && p.status !== 'no ar') meta.appendChild(el('span', { class: 'status' + (p.status === 'em construção' ? ' status--construcao' : ''), text: p.status }));
    var d = formatarData(p.data); if (d) meta.appendChild(el('span', { class: 'item__date', text: d }));
    art.appendChild(meta);
    var acoes = el('div', { class: 'item__actions' });
    if (pendente) acoes.appendChild(el('span', { class: 'pending-label', text: 'link em breve' }));
    else acoes.appendChild(botaoLink(p.url, 'Abrir', true));
    if (p.prd) acoes.appendChild(botaoLink(p.prd, 'Baixar PRD'));
    if (p.git && p.git !== p.url) acoes.appendChild(botaoLink(p.git, 'Ver no Git'));
    if (p.detalhe) {
      var b = el('button', { class: 'btn btn--ghost btn--detail', type: 'button', text: 'Como funciona', 'aria-haspopup': 'dialog' });
      b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); abrirProjeto(p, b); });
      acoes.appendChild(b);
    }
    art.appendChild(acoes);
    return art;
  }
  function viewProjetos(params) {
    var q = params.get('q') || '';
    var sel = { tipo: new Set((params.get('tipo') || '').split(',').filter(Boolean)), contexto: new Set((params.get('contexto') || '').split(',').filter(Boolean)), categoria: new Set((params.get('categoria') || '').split(',').filter(Boolean)) };
    var root = el('div', { class: 'view fade-in' });
    var cont = contador(0, 'projeto', 'projetos');
    root.appendChild(cabecalho('Projetos do time', 'Tudo que o time do Fluxo construiu ou de que participa. Cada card responde o que é, para que serve e, nas automações e documentações, como funciona, onde roda e o que fazer se quebrar.', [cont]));
    var tiposPresentes = D.tipos.filter(function (t) { return D.projetos.some(function (p) { return p.tipo === t; }); });
    var secoes = el('div');
    function gravar() {
      params.delete('q'); ['tipo', 'contexto', 'categoria'].forEach(function (k) { params.delete(k); if (sel[k].size) params.set(k, Array.from(sel[k]).join(',')); });
      if (q) params.set('q', q);
      gravarRota('/projetos', params);
    }
    function render() {
      secoes.innerHTML = '';
      var vis = D.projetos.filter(function (p) {
        if (sel.tipo.size && !sel.tipo.has(p.tipo)) return false;
        if (sel.categoria.size && !sel.categoria.has(p.categoria)) return false;
        if (sel.contexto.size && !(p.contexto || []).some(function (c) { return sel.contexto.has(c); })) return false;
        return bate(p._indice, q);
      });
      D.categorias.forEach(function (cat) {
        var itens = vis.filter(function (p) { return p.categoria === cat; });
        if (!itens.length) return;
        var grade = el('div', { class: 'grid' });
        itens.forEach(function (p) { grade.appendChild(cardProjeto(p)); });
        var id = 'sec-' + normalizar(cat).replace(/[^a-z0-9]+/g, '-');
        secoes.appendChild(el('section', { class: 'section', 'aria-labelledby': id }, [
          el('div', { class: 'section__head' }, [el('h2', { class: 'section__title', id: id, text: cat }), el('span', { class: 'section__count', text: plural(itens.length, 'projeto', 'projetos') })]),
          grade
        ]));
      });
      cont.textContent = plural(vis.length, 'projeto', 'projetos');
      if (!vis.length) secoes.appendChild(vazio(null, function () { q = ''; sb.input.value = ''; Object.keys(sel).forEach(function (k) { sel[k].clear(); }); barra.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); render(); }));
      gravar();
    }
    var sb = busca(q, 'Buscar por nome, descrição, autor ou como funciona…', function (v) { q = v; render(); });
    var barra = el('div', { class: 'toolbar card' }, [sb, chips('Tipo', tiposPresentes, sel.tipo, render), chips('Contexto', D.contextos, sel.contexto, render), chips('Categoria', D.categorias, sel.categoria, render)]);
    root.appendChild(barra);
    root.appendChild(secoes);
    root.appendChild(el('p', { class: 'footnote', text: 'Os links abrem em uma nova aba. Para adicionar ou corrigir um projeto, edite dados/projetos.js.' }));
    render();
    return root;
  }

  /* =========================== links =========================== */
  function linhaLink(l) {
    var row = el('div', { class: 'linkrow' + (l.url ? '' : ' linkrow--empty'), 'data-acesso-tipo': 'Link', 'data-acesso-nome': l.nome });
    var texto = el('div', { class: 'linkrow__text' }, [
      el('span', { class: 'linkrow__name', text: l.nome }),
      el('span', { class: 'linkrow__desc', text: l.descricao }),
      l.obs ? el('span', { class: 'linkrow__obs', text: l.obs }) : null
    ]);
    row.appendChild(texto);
    var acoes = el('div', { class: 'linkrow__actions' });
    if (l.url) {
      acoes.appendChild(el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Copiar link de ' + l.nome, title: 'Copiar link', html: svg('copy'), on: { click: function () { copiar(l.url); registrarAcesso({ tipo: 'Link', nome: l.nome, url: l.url }); } } }));
      acoes.appendChild(el('a', Object.assign({ class: 'iconbtn', 'aria-label': 'Abrir ' + l.nome + ' em nova aba', title: 'Abrir em nova aba', html: svg('ext') }, linkAttrs(l.url))));
    } else {
      acoes.appendChild(el('span', { class: 'pending-label', text: 'link em breve' }));
    }
    row.appendChild(acoes);
    return row;
  }
  function viewLinks(params) {
    var q = params.get('q') || '';
    var grupos = new Set((params.get('grupo') || '').split(',').filter(Boolean));
    var root = el('div', { class: 'view fade-in' });
    var cont = contador(0, 'link', 'links');
    root.appendChild(cabecalho('Links importantes', 'O que a operação precisa ter à mão: recorrentes do dia a dia, eventos, integração e treinamento, canais do Slack e ferramentas. Copie ou abra em um clique.', [cont]));
    var lista = el('div');
    function gravar() { params.delete('q'); params.delete('grupo'); if (q) params.set('q', q); if (grupos.size) params.set('grupo', Array.from(grupos).join(',')); gravarRota('/links', params); }
    function render() {
      lista.innerHTML = '';
      var vis = D.links.filter(function (l) { return (!grupos.size || grupos.has(l.grupo)) && bate(l._indice, q); });
      D.gruposLinks.forEach(function (g) {
        var itens = vis.filter(function (l) { return l.grupo === g; });
        if (!itens.length) return;
        var card = el('section', { class: 'card linkgroup' }, [
          el('div', { class: 'section-card__head' }, [el('h2', { text: g }), el('span', { class: 'section__count', text: plural(itens.length, 'link', 'links') })])
        ]);
        itens.forEach(function (l) { card.appendChild(linhaLink(l)); });
        lista.appendChild(card);
      });
      cont.textContent = plural(vis.length, 'link', 'links');
      if (!vis.length) lista.appendChild(vazio(null, function () { q = ''; sb.input.value = ''; grupos.clear(); barra.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); render(); }));
      gravar();
    }
    var sb = busca(q, 'Buscar link por nome, descrição ou endereço…', function (v) { q = v; render(); });
    var barra = el('div', { class: 'toolbar card' }, [sb, chips('Grupo', D.gruposLinks, grupos, render)]);
    root.appendChild(barra);
    root.appendChild(lista);
    root.appendChild(el('p', { class: 'footnote', text: 'Senhas e códigos de acesso nunca entram aqui: ficam no 1Password. Para adicionar um link, edite dados/links.js.' }));
    render();
    return root;
  }

  /* =========================== entregas =========================== */
  function abrirEntrega(e, origem) {
    var meta = [tag(e.tipo, 'tag--entrega-' + normalizar(e.tipo).replace(/[^a-z]/g, ''))];
    if (e.frequencia) meta.push(el('span', { text: e.frequencia }));
    var links = (e.links || []).map(function (l, i) { return botaoLink(l.url, l.rotulo, i === 0); });
    abrirDetalhe({ tipoAcesso: 'Entrega', kicker: 'Entrega ' + e.tipo, titulo: e.nome, descricao: e.descricao, meta: meta, blocos: [['Como entregamos', e.operacao], ['Frequência', e.frequencia], ['Quem cuida', e.responsavel]], links: links }, origem);
  }
  function cardEntrega(e) {
    var art = el('article', { class: 'card item', 'data-acesso-tipo': 'Entrega', 'data-acesso-nome': e.nome });
    art.appendChild(el('div', { class: 'item__top' }, [el('span', { class: 'item__icon', html: svg('gift') }), tag(e.tipo, 'tag--entrega-' + normalizar(e.tipo).replace(/[^a-z]/g, ''))]));
    art.appendChild(el('h3', { class: 'item__title', text: e.nome }));
    art.appendChild(el('p', { class: 'item__desc item__desc--4', text: e.descricao }));
    art.appendChild(el('p', { class: 'item__meta', text: (e.frequencia ? e.frequencia : '') + (e.responsavel ? ' · ' + e.responsavel : '') }));
    var acoes = el('div', { class: 'item__actions' });
    var b = el('button', { class: 'btn btn--ghost btn--detail', type: 'button', text: 'Como entregamos', 'aria-haspopup': 'dialog' });
    b.addEventListener('click', function () { abrirEntrega(e, b); });
    if (e.links && e.links[0]) acoes.appendChild(botaoLink(e.links[0].url, e.links[0].rotulo, true));
    acoes.appendChild(b);
    art.appendChild(acoes);
    return art;
  }
  function viewEntregas(params) {
    var q = params.get('q') || '';
    var tipos = new Set((params.get('tipo') || '').split(',').filter(Boolean));
    var root = el('div', { class: 'view fade-in' });
    var cont = contador(0, 'entrega', 'entregas');
    root.appendChild(cabecalho('Entregas do Fluxo', 'O que o mentorado recebe, com a explicação do pitch, e como o time entrega por dentro: frequência, quem cuida e o processo.', [cont]));
    var secoes = el('div');
    var ROTULO_TIPO = { 'individual': 'Entregas individuais', 'coletiva': 'Entregas coletivas', 'extra': 'Entregas extras', 'bônus': 'Bônus' };
    function gravar() { params.delete('q'); params.delete('tipo'); if (q) params.set('q', q); if (tipos.size) params.set('tipo', Array.from(tipos).join(',')); gravarRota('/entregas', params); }
    function render() {
      secoes.innerHTML = '';
      var vis = D.entregas.filter(function (e) { return (!tipos.size || tipos.has(e.tipo)) && bate(e._indice, q); });
      D.tiposEntrega.forEach(function (t) {
        var itens = vis.filter(function (e) { return e.tipo === t; });
        if (!itens.length) return;
        var grade = el('div', { class: 'grid' });
        itens.forEach(function (e) { grade.appendChild(cardEntrega(e)); });
        var id = 'ent-' + normalizar(t).replace(/[^a-z]/g, '');
        secoes.appendChild(el('section', { class: 'section', 'aria-labelledby': id }, [
          el('div', { class: 'section__head' }, [el('h2', { class: 'section__title', id: id, text: ROTULO_TIPO[t] || t }), el('span', { class: 'section__count', text: plural(itens.length, 'entrega', 'entregas') })]),
          grade
        ]));
      });
      cont.textContent = plural(vis.length, 'entrega', 'entregas');
      if (!vis.length) secoes.appendChild(vazio(null, function () { q = ''; sb.input.value = ''; tipos.clear(); barra.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); render(); }));
      gravar();
    }
    var sb = busca(q, 'Buscar entrega por nome, descrição ou processo…', function (v) { q = v; render(); });
    var barra = el('div', { class: 'toolbar card' }, [sb, chips('Tipo', D.tiposEntrega, tipos, render)]);
    root.appendChild(barra);
    root.appendChild(secoes);
    root.appendChild(el('p', { class: 'footnote', text: 'Descrições seguem o Resumo do Pitch Fluxo. Para adicionar ou corrigir uma entrega, edite dados/entregas.js.' }));
    render();
    return root;
  }

  /* =========================== perguntar (chat) =========================== */
  var CHAVE_CHAT = 'central-fluxo-chat';
  var CHAVE_CODIGO = 'central-fluxo-codigo';
  var SUGESTOES = typeof SUGESTOES_CHAT !== 'undefined' ? SUGESTOES_CHAT : [
    'Qual é o link do Zoom semanal?',
    'Como funciona a automação de links das análises?',
    'O que o mentorado recebe no Fluxo?',
    'Quem cuida da remoção de inativos dos grupos?',
    'Onde vejo se o NavMaster está funcionando?'
  ];
  function lerConversa() { try { return JSON.parse(sessionStorage.getItem(CHAVE_CHAT) || '[]'); } catch (e) { return []; } }
  function gravarConversa(c) { try { sessionStorage.setItem(CHAVE_CHAT, JSON.stringify(c.slice(-30))); } catch (e) { /* sem storage */ } }
  function lerCodigo() { try { return localStorage.getItem(CHAVE_CODIGO) || ''; } catch (e) { return ''; } }
  function gravarCodigo(c) { try { if (c) localStorage.setItem(CHAVE_CODIGO, c); else localStorage.removeItem(CHAVE_CODIGO); } catch (e) { /* sem storage */ } }

  // Markdown mínimo e seguro: escapa tudo, depois liga links, negrito e listas.
  function renderMarkdown(txt) {
    var s = esc(txt);
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|#\/[^\s)]*)\)/g, function (m, t, u) { return ancora(u, t); });
    s = s.replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, function (m, pre, u) { return pre + ancora(u, u.replace(/^https?:\/\//, '')); });
    s = s.replace(/(^|[\s(])(#\/[a-z]*(?:\?[^\s<)]*)?)(?=[\s.,;)]|$)/g, function (m, pre, u) { return pre + ancora(u, u); });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    var linhas = s.split('\n'), html = '', lista = null;
    function fechar() { if (lista) { html += '</' + lista + '>'; lista = null; } }
    linhas.forEach(function (l) {
      var mUl = /^\s*[-•*]\s+(.*)$/.exec(l), mOl = /^\s*\d+[.)]\s+(.*)$/.exec(l);
      if (mUl || mOl) {
        var tipo = mUl ? 'ul' : 'ol';
        if (lista !== tipo) { fechar(); lista = tipo; html += '<' + tipo + '>'; }
        html += '<li>' + (mUl ? mUl[1] : mOl[1]) + '</li>';
      } else if (!l.trim()) { fechar(); }
      else { fechar(); html += '<p>' + l + '</p>'; }
    });
    fechar();
    return html;
  }
  function ancora(u, t) {
    var ext = /^https?:/i.test(u);
    return '<a href="' + u + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + t + '</a>';
  }

  function viewPerguntar(params) {
    var root = el('div', { class: 'view fade-in view--chat' });
    root.appendChild(cabecalho('Pergunte ao Fluxo', 'Um assistente que responde com o que está na central: o que é cada coisa, como funciona, quem cuida e o link certo. Se não souber, ele diz quem sabe.'));

    var conversa = lerConversa();
    var lista = el('div', { class: 'chat__log', role: 'log', 'aria-live': 'polite', 'aria-label': 'Conversa' });
    var caixa = el('textarea', { class: 'chat__input', rows: '1', placeholder: 'Pergunte qualquer coisa sobre a operação do Fluxo…', 'aria-label': 'Sua pergunta', maxlength: '4000' });
    var enviar = el('button', { class: 'btn btn--primary chat__send', type: 'button', 'aria-label': 'Enviar', html: svg('send', 'btn__ico') });
    var limpar = el('button', { class: 'btn btn--ghost', type: 'button', text: 'Limpar conversa' });
    var status = el('p', { class: 'chat__status', 'aria-live': 'polite' });
    var ocupado = false;

    function bolha(papel, texto) {
      var b = el('div', { class: 'chat__msg chat__msg--' + papel });
      b.appendChild(el('span', { class: 'chat__who', text: papel === 'usuario' ? 'Você' : 'Central' }));
      var corpo = el('div', { class: 'chat__body' });
      corpo.innerHTML = papel === 'usuario' ? '<p>' + esc(texto).replace(/\n/g, '<br>') + '</p>' : renderMarkdown(texto);
      b.appendChild(corpo);
      return b;
    }
    function renderLog() {
      lista.innerHTML = '';
      if (!conversa.length) {
        var boas = el('div', { class: 'chat__hello' }, [
          el('p', { text: 'Exemplos do que dá para perguntar:' }),
          el('div', { class: 'chat__sugestoes' }, SUGESTOES.map(function (s) {
            return el('button', { class: 'chip', type: 'button', text: s, on: { click: function () { caixa.value = s; mandar(); } } });
          }))
        ]);
        lista.appendChild(boas);
      }
      conversa.forEach(function (m) { lista.appendChild(bolha(m.papel, m.texto)); });
      rolar();
    }
    function rolar() { lista.scrollTop = lista.scrollHeight; }
    function ajustarAltura() { caixa.style.height = 'auto'; caixa.style.height = Math.min(caixa.scrollHeight, 160) + 'px'; }

    function pedirCodigo(msg) {
      var c = window.prompt((msg || 'Esta central pede um código de acesso para o assistente.') + '\nDigite o código:');
      if (c === null) return false;
      gravarCodigo(c.trim());
      return true;
    }

    function mandar() {
      var texto = caixa.value.trim();
      if (!texto || ocupado) return;
      ocupado = true; enviar.disabled = true; status.textContent = 'Pensando…';
      caixa.value = ''; ajustarAltura();
      conversa.push({ papel: 'usuario', texto: texto });
      gravarConversa(conversa); renderLog();
      var resposta = { papel: 'assistente', texto: '' };
      var b = bolha('assistente', '');
      b.classList.add('chat__msg--typing');
      lista.appendChild(b); rolar();
      var corpo = b.querySelector('.chat__body');

      var headers = { 'Content-Type': 'application/json' };
      var codigo = lerCodigo(); if (codigo) headers['x-central-codigo'] = codigo;
      fetch('/api/chat', { method: 'POST', headers: headers, body: JSON.stringify({ mensagens: conversa.slice(-16) }) })
        .then(function (r) {
          if (!r.ok) {
            return r.json().catch(function () { return {}; }).then(function (j) {
              if (r.status === 401 && j.pedirCodigo) {
                conversa.pop(); gravarConversa(conversa);
                if (pedirCodigo(j.erro)) { caixa.value = texto; terminar(); mandar(); return null; }
                terminar('Sem o código, o assistente não responde.'); renderLog(); return null;
              }
              throw new Error(j.erro || ('Erro ' + r.status));
            });
          }
          var leitor = r.body.getReader(), dec = new TextDecoder(), resto = '';
          function processar(linha) {
            if (!linha.trim()) return;
            var ev; try { ev = JSON.parse(linha); } catch (e) { return; }
            if (ev.t) { resposta.texto += ev.t; corpo.innerHTML = renderMarkdown(resposta.texto); rolar(); }
            if (ev.erro) throw new Error(ev.erro);
            if (ev.fim) status.textContent = ev.modelo ? 'Respondido por ' + ev.modelo : '';
          }
          function ler() {
            return leitor.read().then(function (x) {
              if (x.done) { if (resto) processar(resto); return; }
              resto += dec.decode(x.value, { stream: true });
              var partes = resto.split('\n'); resto = partes.pop();
              partes.forEach(processar);
              return ler();
            });
          }
          return ler();
        })
        .then(function () {
          if (resposta.texto) { conversa.push(resposta); gravarConversa(conversa); }
          b.classList.remove('chat__msg--typing');
          terminar();
        })
        .catch(function (e) {
          b.classList.remove('chat__msg--typing');
          corpo.innerHTML = '<p class="chat__erro">' + esc(e.message || 'Não deu para responder agora.') + '</p>';
          terminar();
        });
    }
    function terminar(msg) { ocupado = false; enviar.disabled = false; if (msg) status.textContent = msg; else if (status.textContent === 'Pensando…') status.textContent = ''; caixa.focus(); }

    enviar.addEventListener('click', mandar);
    caixa.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); mandar(); } });
    caixa.addEventListener('input', ajustarAltura);
    limpar.addEventListener('click', function () { conversa = []; gravarConversa(conversa); renderLog(); caixa.focus(); });

    var painel = el('section', { class: 'card chat' }, [
      lista,
      el('div', { class: 'chat__compose' }, [caixa, enviar]),
      el('div', { class: 'chat__foot' }, [status, limpar])
    ]);
    root.appendChild(painel);
    root.appendChild(el('p', { class: 'footnote', text: 'O assistente responde só com o que está em dados/*.js e nas perguntas frequentes. Ele não vê o Slack nem o Fluxer em tempo real. Nada de senha ou código por aqui.' }));
    renderLog();

    var inicial = (params.get('q') || '').trim();
    if (inicial) { params.delete('q'); gravarRota('/', params); caixa.value = inicial; setTimeout(mandar, 50); }
    setTimeout(function () { caixa.focus(); }, 0);
    return root;
  }

  /* =========================== últimos acessos =========================== */
  // Guarda neste navegador o que a pessoa abriu: links externos (em qualquer aba,
  // inclusive nas respostas do assistente) e os painéis de agentes, projetos e entregas.
  var CHAVE_RECENTES = 'central-fluxo-recentes';
  var MAX_RECENTES = 30;
  var ROTULO_ACESSO = { 'Link': 'Link', 'Agente': 'Agente de IA', 'Projeto': 'Projeto', 'Entrega': 'Entrega' };
  function lerRecentes() {
    try { var l = JSON.parse(localStorage.getItem(CHAVE_RECENTES) || '[]'); return Array.isArray(l) ? l : []; } catch (e) { return []; }
  }
  function gravarRecentes(l) { try { localStorage.setItem(CHAVE_RECENTES, JSON.stringify(l.slice(0, MAX_RECENTES))); } catch (e) { /* sem storage */ } }
  // Links soltos se distinguem pelo endereço; agentes, projetos e entregas pelo nome.
  function chaveAcesso(r) { return r.tipo + '|' + (r.tipo === 'Link' ? r.url : r.nome); }
  function registrarAcesso(item) {
    if (!item || !item.nome || !ROTULO_ACESSO[item.tipo]) return;
    var novo = { tipo: item.tipo, nome: item.nome, quando: Date.now() };
    if (item.tipo === 'Link') { if (!item.url) return; novo.url = item.url; }
    var chave = chaveAcesso(novo);
    gravarRecentes([novo].concat(lerRecentes().filter(function (r) { return chaveAcesso(r) !== chave; })));
  }
  function aoAbrirLink(e) {
    if (e.type === 'auxclick' && e.button !== 1) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !ehExterno(a.getAttribute('href'))) return;
    var dono = a.closest('[data-acesso-nome]:not([data-acesso-nome=""])');
    if (dono) registrarAcesso({ tipo: dono.getAttribute('data-acesso-tipo'), nome: dono.getAttribute('data-acesso-nome'), url: a.href });
    else registrarAcesso({ tipo: 'Link', nome: a.textContent.trim() || a.href, url: a.href });
  }
  document.addEventListener('click', aoAbrirLink, true);
  document.addEventListener('auxclick', aoAbrirLink, true);

  function haQuanto(ms) {
    var min = Math.floor((Date.now() - ms) / 60000);
    if (min < 1) return 'agora';
    if (min < 60) return 'há ' + min + ' min';
    var h = Math.floor(min / 60);
    if (h < 24) return 'há ' + h + ' h';
    var d = Math.floor(h / 24);
    if (d === 1) return 'ontem';
    if (d < 7) return 'há ' + d + ' dias';
    return new Date(ms).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }
  function acharPorNome(lista, nome) { return lista.filter(function (x) { return x.nome === nome; })[0]; }
  // Descobre descrição, link e painel de um acesso a partir dos dados atuais da central.
  function resolverAcesso(r) {
    var o = { descricao: '', url: r.url || '', abrir: null };
    if (r.tipo === 'Agente') {
      var a = acharPorNome(D.agentes, r.nome); if (!a) return null;
      o.descricao = a.descricao; o.url = a.url || ''; o.abrir = function (b) { abrirAgente(a, b); };
    } else if (r.tipo === 'Projeto') {
      var p = acharPorNome(D.projetos, r.nome); if (!p) return null;
      o.descricao = p.descricao; o.url = p.url || ''; if (p.detalhe) o.abrir = function (b) { abrirProjeto(p, b); };
    } else if (r.tipo === 'Entrega') {
      var en = acharPorNome(D.entregas, r.nome); if (!en) return null;
      o.descricao = en.descricao; o.url = en.links && en.links[0] && ehExterno(en.links[0].url) ? en.links[0].url : '';
      o.abrir = function (b) { abrirEntrega(en, b); };
    } else {
      var l = D.links.filter(function (x) { return x.url === r.url; })[0];
      if (l) o.descricao = l.descricao;
      else { try { o.descricao = new URL(r.url).hostname.replace(/^www\./, ''); } catch (e) { o.descricao = r.url; } }
    }
    return o;
  }
  function linhaRecente(r, info) {
    var row = el('div', { class: 'linkrow recent', 'data-acesso-tipo': r.tipo, 'data-acesso-nome': r.nome });
    row.appendChild(el('div', { class: 'linkrow__text' }, [
      el('span', { class: 'recent__meta', text: ROTULO_ACESSO[r.tipo] + ' · ' + haQuanto(r.quando) }),
      el('span', { class: 'linkrow__name', text: r.nome }),
      info.descricao ? el('span', { class: 'linkrow__desc', text: info.descricao }) : null
    ]));
    var acoes = el('div', { class: 'linkrow__actions' });
    if (info.abrir) {
      var b = el('button', { class: 'btn btn--ghost btn--detail', type: 'button', text: 'Detalhes', 'aria-haspopup': 'dialog' });
      b.addEventListener('click', function () { info.abrir(b); });
      acoes.appendChild(b);
    }
    if (info.url) {
      acoes.appendChild(el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Copiar link de ' + r.nome, title: 'Copiar link', html: svg('copy'), on: { click: function () { copiar(info.url); } } }));
      acoes.appendChild(el('a', Object.assign({ class: 'iconbtn', 'aria-label': 'Abrir ' + r.nome + ' em nova aba', title: 'Abrir em nova aba', html: svg('ext') }, linkAttrs(info.url))));
    }
    row.appendChild(acoes);
    return row;
  }
  function viewRecentes() {
    var root = el('div', { class: 'view fade-in' });
    var itens = lerRecentes().map(function (r) { return { r: r, info: resolverAcesso(r) }; }).filter(function (x) { return x.info; });
    var cont = contador(itens.length, 'acesso', 'acessos');
    var limpar = el('button', { class: 'btn btn--ghost', type: 'button', text: 'Limpar histórico', on: { click: function () { gravarRecentes([]); render(); } } });
    root.appendChild(cabecalho('Últimos acessos', 'O que você abriu por último na central, do mais recente para o mais antigo: links, agentes, projetos e entregas. Fica salvo só neste navegador.', itens.length ? [cont, limpar] : null));
    if (!itens.length) {
      root.appendChild(el('div', { class: 'empty' }, [
        el('h2', { text: 'Nada por aqui ainda' }),
        el('p', { text: 'Quando você abrir um link, um agente, um projeto ou uma entrega, ele aparece aqui para você voltar em um clique.' }),
        el('a', { class: 'btn btn--primary', href: '#/links', text: 'Ver links importantes' })
      ]));
      return root;
    }
    var card = el('section', { class: 'card linkgroup recent-list', 'aria-label': 'Últimos acessos' });
    itens.forEach(function (x) { card.appendChild(linhaRecente(x.r, x.info)); });
    root.appendChild(card);
    return root;
  }

  /* =========================== montagem =========================== */
  var VIEWS = { '/': viewPerguntar, '/recentes': viewRecentes, '/agentes': viewAgentes, '/projetos': viewProjetos, '/links': viewLinks, '/entregas': viewEntregas };
  var app = document.getElementById('app');
  function render() {
    var r = lerRota();
    if (!location.hash && location.search.length > 1) { history.replaceState(null, '', location.pathname + '#/projetos' + location.search); }
    fecharDetalhe();
    renderNav();
    app.innerHTML = '';
    app.appendChild(VIEWS[r.rota](r.params));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName) && !dlg.open) {
      var i = app.querySelector('.search__input') || app.querySelector('.chat__input'); if (i) { e.preventDefault(); i.focus(); }
    }
  });
  render();
})();
