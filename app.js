/* Central do Fluxo: roteador de abas, busca geral, filtros, seções colapsáveis,
   painéis de detalhe e assistente. Sem build, sem dependências. Os dados vêm de dados/*.js. */
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
  function urlCurta(url) {
    return String(url || '').replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
  }
  function idSeguro(s) { return normalizar(s).replace(/[^a-z0-9]+/g, '-'); }
  function listarNomes(nomes) {
    var n = (nomes || []).map(function (x) { return x.replace(/\s*\(.*\)$/, ''); });
    if (n.length <= 1) return n.join('');
    return n.slice(0, -1).join(', ') + ' e ' + n[n.length - 1];
  }
  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var I = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 17h6"/>',
    send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
    grid: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8c-2-3-6-3-6-1s3 1 6 1zm0 0c2-3 6-3 6-1s-3 1-6 1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>'
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
    tiposEntrega: typeof TIPOS_ENTREGA !== 'undefined' ? TIPOS_ENTREGA : [],
    maisUsados: typeof MAIS_USADOS !== 'undefined' ? MAIS_USADOS : [],
    conhecimento: typeof CONHECIMENTO !== 'undefined' ? CONHECIMENTO : []
  };
  var CAT_AGENTES = 'Agentes de IA';
  var ROTULOS_PROJETO = [
    ['oQueFaz', 'O que faz'], ['comoFunciona', 'Como funciona'], ['ondeRoda', 'Onde roda'],
    ['responsavel', 'Quem cuida'], ['ondeVerSeEstaFuncionando', 'Onde ver se está funcionando'], ['oQueFazerSeQuebrar', 'O que fazer se quebrar']
  ];
  var ROTULOS_AGENTE = [
    ['oQueFaz', 'O que faz'], ['comoUsar', 'Como usar'], ['ondeFica', 'Onde fica'],
    ['atencao', 'Atenção'], ['ondeVerSeEstaFuncionando', 'Onde ver se está funcionando'], ['oQueFazerSeQuebrar', 'O que fazer se quebrar']
  ];
  function indexar(lista, campos) {
    lista.forEach(function (item) {
      var partes = [];
      campos.forEach(function (c) {
        var v = item[c];
        if (Array.isArray(v)) partes = partes.concat(v.map(function (x) { return typeof x === 'object' ? Object.keys(x).map(function (k) { return x[k]; }).join(' ') : x; }));
        else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { partes.push(v[k]); });
        else if (v) partes.push(v);
      });
      item._indice = normalizar(partes.join(' \n '));
    });
  }
  indexar(D.projetos, ['nome', 'descricao', 'tipo', 'categoria', 'status', 'autores', 'contexto', 'falta', 'detalhe']);
  indexar(D.agentes, ['nome', 'descricao', 'onde', 'paraQuem', 'status', 'responsavel', 'autores', 'detalhe']);
  indexar(D.links, ['nome', 'descricao', 'obs', 'grupo', 'url']);
  indexar(D.entregas, ['nome', 'descricao', 'tipo', 'frequencia', 'responsavel', 'operacao']);
  indexar(D.conhecimento, ['pergunta', 'resposta', 'tema', 'quem']);

  /* =========================== rotas =========================== */
  var SECOES = [
    { rota: '/', nome: 'Início', curto: 'Início', icone: 'home' },
    { rota: '/projetos', nome: 'Projetos e agentes', curto: 'Projetos', icone: 'grid' },
    { rota: '/links', nome: 'Links', curto: 'Links', icone: 'link' },
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
    if (rota === '/perguntar' || rota === '/recentes') rota = '/'; // abas antigas: viraram blocos do Início
    if (rota === '/agentes') { // a aba Agentes virou a seção "Agentes de IA" em Projetos e agentes
      rota = '/projetos';
      if (!params.get('categoria')) params.set('categoria', CAT_AGENTES);
      params.delete('quem'); params.delete('onde');
    }
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
  function busca(valor, placeholder, onInput, grande) {
    var input = el('input', { class: 'search__input', type: 'search', placeholder: placeholder, spellcheck: 'false', value: valor || '', 'aria-label': placeholder });
    var limpar = el('button', { class: 'search__clear', type: 'button', 'aria-label': 'Limpar busca', html: svg('x') });
    var wrap = el('div', { class: 'search' + (valor ? ' search--active' : '') + (grande ? ' search--lg' : '') }, [el('span', { class: 'search__icon', html: svg('search') }), input, limpar]);
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
  // Busca sempre à mostra; os chips ficam atrás do botão "Filtros" (abre sozinho se já houver filtro na URL).
  function barraFiltros(sb, grupos, contarAtivos, extras) {
    var painel = el('div', { class: 'toolbar__filters', id: 'filtros-' + Math.random().toString(36).slice(2, 8) }, grupos);
    var botao = el('button', { class: 'btn btn--ghost toolbar__toggle', type: 'button', 'aria-controls': painel.id });
    function abrir(sim) { painel.hidden = !sim; botao.setAttribute('aria-expanded', sim ? 'true' : 'false'); botao.classList.toggle('toolbar__toggle--on', sim); }
    botao.addEventListener('click', function () { abrir(painel.hidden); });
    var barra = el('div', { class: 'toolbar card' }, [el('div', { class: 'toolbar__row' }, [sb, botao].concat(extras || [])), painel]);
    barra.atualizar = function () {
      var n = contarAtivos();
      botao.innerHTML = svg('filter', 'btn__ico') + ' Filtros' + (n ? ' <span class="toolbar__n">' + n + '</span>' : '');
    };
    abrir(contarAtivos() > 0);
    barra.atualizar();
    return barra;
  }
  function limparChips(barra) { barra.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); }); }

  /* --- seções colapsáveis ---
     A classificação (categorias, grupos, tipos) fica como está nos dados; o que muda é a
     visualização: cada seção nasce fechada mostrando só o título e a contagem, e abre ao clicar.
     Com busca ou filtro ativo, as seções com resultado abrem sozinhas. O que a pessoa abriu
     fica lembrado na aba do navegador (sessionStorage). */
  var CHAVE_SECOES = 'central-fluxo-secoes';
  function lerSecoes() { try { return JSON.parse(sessionStorage.getItem(CHAVE_SECOES) || '{}') || {}; } catch (e) { return {}; } }
  function gravarSecao(id, aberta) {
    var s = lerSecoes(); if (aberta) s[id] = 1; else delete s[id];
    try { sessionStorage.setItem(CHAVE_SECOES, JSON.stringify(s)); } catch (e) { /* sem storage */ }
  }
  function secao(o) {
    var id = 'sec-' + idSeguro(o.id || o.titulo);
    var aberta = !!o.forcarAberta || !!lerSecoes()[id];
    var corpo = el('div', { class: 'secao__body', id: id + '-body' }, [o.corpo]);
    var botao = el('button', {
      class: 'secao__toggle', type: 'button', 'aria-expanded': aberta ? 'true' : 'false', 'aria-controls': corpo.id,
      html: '<span class="secao__chev">' + svg('chev') + '</span><span class="secao__title" id="' + id + '">' + esc(o.titulo) + '</span><span class="secao__count">' + esc(o.contagem) + '</span>' + (o.dica ? '<span class="secao__hint">' + esc(o.dica) + '</span>' : '')
    });
    var sec = el('section', { class: 'secao card' + (aberta ? ' secao--open' : ''), 'aria-labelledby': id }, [botao, corpo]);
    function definir(sim) {
      sec.classList.toggle('secao--open', sim); botao.setAttribute('aria-expanded', sim ? 'true' : 'false'); corpo.hidden = !sim;
      if (!o.forcarAberta) gravarSecao(id, sim);
    }
    corpo.hidden = !aberta;
    botao.addEventListener('click', function () { definir(corpo.hidden); });
    return sec;
  }

  /* --- card padrão (projeto, agente, entrega) ---
     Tag colorida no topo, título, descrição de uma linha, autor e data, e botões que dizem o que fazem. */
  function cardItem(o) {
    var cls = 'card item' + (o.pendente ? ' item--pending' : '') + (o.construcao ? ' item--building' : '');
    var art = el('article', { class: cls, 'data-acesso-tipo': o.tipoAcesso, 'data-acesso-nome': o.nome });
    if (o.tags && o.tags.length) art.appendChild(el('div', { class: 'item__tags' }, o.tags));
    art.appendChild(el('h3', { class: 'item__title', text: o.nome }));
    if (o.descricao) art.appendChild(el('p', { class: 'item__desc' + (o.clamp ? ' item__desc--clamp' : ''), text: o.descricao }));
    if (o.falta) art.appendChild(el('p', { class: 'item__falta', text: o.falta }));
    if (o.por) art.appendChild(el('p', { class: 'item__by', text: o.por }));
    var acoes = el('div', { class: 'item__actions' });
    (o.botoes || []).forEach(function (b) { if (b) acoes.appendChild(b); });
    if (o.pendente && !o.botoes.length) acoes.appendChild(el('span', { class: 'pending-label', text: 'link em breve' }));
    if (acoes.childNodes.length) art.appendChild(acoes);
    return art;
  }
  function botaoDetalhe(texto, abrir) {
    var b = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: texto, 'aria-haspopup': 'dialog' });
    b.addEventListener('click', function () { abrir(b); });
    return b;
  }
  function botaoLink(url, texto, primario, pequeno) {
    var a = el('a', Object.assign({ class: 'btn ' + (primario ? 'btn--primary' : 'btn--ghost') + (pequeno ? ' btn--sm' : '') }, linkAttrs(url)));
    a.innerHTML = texto + (primario ? ' ' + svg('ext') : '');
    return a;
  }
  function porLinha(autores, data) {
    var partes = [];
    if (autores && autores.length) partes.push('por ' + listarNomes(autores));
    var d = formatarData(data); if (d) partes.push(d);
    return partes.join(' · ');
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
  function tagTipo(tipo) { return tag(tipo, 'tag--' + idSeguro(tipo)); }
  function pill(texto) { return el('span', { class: 'ctx', text: texto }); }

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

  /* =========================== agentes =========================== */
  function abrirAgente(a, origem) {
    var meta = [tagTipo('agente'), pill(a.onde)];
    (a.paraQuem || []).forEach(function (p) { meta.push(pill('para ' + p)); });
    if (a.responsavel) meta.push(el('span', { text: 'cuida: ' + a.responsavel }));
    var por = porLinha(a.autores, a.data); if (por) meta.push(el('span', { text: por }));
    if (a.status) meta.push(el('span', { class: 'status' + (a.status === 'em construção' ? ' status--construcao' : ''), text: a.status }));
    var links = [];
    if (a.url) links.push(botaoLink(a.url, 'Abrir', true));
    if (a.git && a.git !== a.url) links.push(botaoLink(a.git, 'Ver no Git'));
    (a.links || []).forEach(function (l) { if (l.url) links.push(botaoLink(l.url, l.rotulo)); });
    abrirDetalhe({ tipoAcesso: 'Agente', kicker: 'Agente de IA', titulo: a.nome, descricao: a.descricao, meta: meta, blocos: ROTULOS_AGENTE.map(function (r) { return [r[1], a.detalhe && a.detalhe[r[0]]]; }), links: links }, origem);
  }
  function cardAgente(a) {
    var construcao = a.status === 'em construção';
    var botoes = [];
    if (a.url) botoes.push(botaoLink(a.url, 'Abrir', true, true));
    if (a.detalhe) botoes.push(botaoDetalhe('Como usar', function (b) { abrirAgente(a, b); }));
    if (a.git && a.git !== a.url) botoes.push(botaoLink(a.git, 'Git', false, true));
    return cardItem({
      tipoAcesso: 'Agente', nome: a.nome, descricao: a.descricao, construcao: construcao,
      tags: [tagTipo('agente'), pill(a.onde)].concat((a.paraQuem || []).map(function (p) { return pill(p); })),
      falta: construcao ? (a.falta || 'Em construção.') : '',
      por: porLinha(a.autores, a.data), botoes: botoes
    });
  }

  /* =========================== projetos =========================== */
  function abrirProjeto(p, origem) {
    var meta = [tagTipo(p.tipo)];
    (p.contexto || []).forEach(function (c) { meta.push(pill(c)); });
    var por = porLinha(p.autores, p.data); if (por) meta.push(el('span', { text: por }));
    if (p.status) meta.push(el('span', { class: 'status' + (p.status !== 'no ar' ? ' status--construcao' : ''), text: p.status }));
    var links = [];
    if (p.url) links.push(botaoLink(p.url, 'Abrir', true));
    if (p.guia) links.push(botaoLink(p.guia, 'Guia de instalação (PDF)'));
    if (p.prd) links.push(botaoLink(p.prd, 'Baixar PRD'));
    if (p.git && p.git !== p.url) links.push(botaoLink(p.git, 'Ver no Git'));
    var blocos = ROTULOS_PROJETO.map(function (r) { return [r[1], p.detalhe && p.detalhe[r[0]]]; });
    if (p.falta) blocos.unshift(['O que falta', p.falta]);
    abrirDetalhe({ tipoAcesso: 'Projeto', kicker: 'Projeto · ' + p.categoria, titulo: p.nome, descricao: p.descricao, meta: meta, blocos: blocos, links: links }, origem);
  }
  function cardProjeto(p) {
    var construcao = p.status && p.status !== 'no ar';
    var botoes = [];
    if (p.url) botoes.push(botaoLink(p.url, p.tipo === 'extensão' ? 'Baixar' : 'Abrir', true, true));
    if (p.detalhe) botoes.push(botaoDetalhe('Como funciona', function (b) { abrirProjeto(p, b); }));
    if (p.guia) botoes.push(botaoLink(p.guia, 'Guia', false, true));
    if (p.prd) botoes.push(botaoLink(p.prd, 'PRD', false, true));
    if (p.git && p.git !== p.url) botoes.push(botaoLink(p.git, 'Git', false, true));
    return cardItem({
      tipoAcesso: 'Projeto', nome: p.nome, descricao: p.descricao, pendente: !p.url && !p.detalhe, construcao: construcao,
      tags: [tagTipo(p.tipo)].concat((p.contexto || []).map(pill)),
      falta: construcao ? (p.falta || p.status) : '',
      por: porLinha(p.autores, p.data), botoes: botoes
    });
  }
  // Projetos e agentes numa lista só: cada agente vira um item de tipo "agente" na categoria "Agentes de IA".
  function itensProjetos() {
    var agentes = D.agentes.map(function (a) {
      return { _agente: a, nome: a.nome, tipo: 'agente', categoria: CAT_AGENTES, contexto: [], paraQuem: a.paraQuem || [], onde: a.onde, status: a.status, data: a.data, _indice: a._indice };
    });
    var projetos = D.projetos.map(function (p) { return Object.assign({ _projeto: p, paraQuem: [], onde: '' }, p); });
    return agentes.concat(projetos);
  }
  function ordenar(itens, ordem) {
    // Dentro da seção: o que está no ar vem antes do que está em construção; depois a ordem escolhida.
    return itens.slice().sort(function (a, b) {
      var ca = a.status && a.status !== 'no ar' ? 1 : 0, cb = b.status && b.status !== 'no ar' ? 1 : 0;
      if (ca !== cb) return ca - cb;
      if (ordem === 'az') return normalizar(a.nome).localeCompare(normalizar(b.nome));
      if (ordem === 'recentes') { var da = a.data || '', db = b.data || ''; if (da !== db) return da < db ? 1 : -1; }
      return 0;
    });
  }
  function viewProjetos(params) {
    var q = params.get('q') || '';
    var ordem = params.get('ordem') === 'az' ? 'az' : 'recentes';
    var sel = {
      categoria: new Set((params.get('categoria') || '').split(',').filter(Boolean)),
      tipo: new Set((params.get('tipo') || '').split(',').filter(Boolean)),
      contexto: new Set((params.get('contexto') || '').split(',').filter(Boolean)),
      quem: new Set((params.get('quem') || '').split(',').filter(Boolean)),
      onde: new Set((params.get('onde') || '').split(',').filter(Boolean))
    };
    var todos = itensProjetos();
    var root = el('div', { class: 'view fade-in' });
    root.appendChild(cabecalho('Projetos e agentes', 'Tudo que o time do Fluxo construiu, inclusive os agentes de IA. Clique numa seção para ver o que tem dentro.'));
    var tiposPresentes = D.tipos.filter(function (t) { return todos.some(function (p) { return p.tipo === t; }); });
    var todosQuem = []; D.agentes.forEach(function (a) { (a.paraQuem || []).forEach(function (p) { if (todosQuem.indexOf(p) === -1) todosQuem.push(p); }); });
    var todosOnde = []; D.agentes.forEach(function (a) { if (a.onde && todosOnde.indexOf(a.onde) === -1) todosOnde.push(a.onde); });
    var secoes = el('div', { class: 'secoes' });
    function ativos() { return sel.categoria.size + sel.tipo.size + sel.contexto.size + sel.quem.size + sel.onde.size; }
    function gravar() {
      params.delete('q'); params.delete('ordem');
      Object.keys(sel).forEach(function (k) { params.delete(k); if (sel[k].size) params.set(k, Array.from(sel[k]).join(',')); });
      if (q) params.set('q', q); if (ordem !== 'recentes') params.set('ordem', ordem);
      gravarRota('/projetos', params);
    }
    function render() {
      secoes.innerHTML = '';
      var vis = todos.filter(function (p) {
        if (sel.categoria.size && !sel.categoria.has(p.categoria)) return false;
        if (sel.tipo.size && !sel.tipo.has(p.tipo)) return false;
        if (sel.contexto.size && !(p.contexto || []).some(function (c) { return sel.contexto.has(c); })) return false;
        if (sel.quem.size && !(p.paraQuem || []).some(function (c) { return sel.quem.has(c); })) return false;
        if (sel.onde.size && !sel.onde.has(p.onde)) return false;
        return bate(p._indice, q);
      });
      var forcar = !!q || ativos() > 0;
      D.categorias.forEach(function (cat) {
        var itens = ordenar(vis.filter(function (p) { return p.categoria === cat; }), ordem);
        if (!itens.length) return;
        var grade = el('div', { class: 'grid' });
        itens.forEach(function (p) { grade.appendChild(p._agente ? cardAgente(p._agente) : cardProjeto(p._projeto)); });
        var n = itens.filter(function (p) { return p._agente; }).length;
        var contagem = n === itens.length ? plural(n, 'agente', 'agentes') : plural(itens.length, 'projeto', 'projetos');
        secoes.appendChild(secao({ id: 'proj-' + cat, titulo: cat, contagem: contagem, corpo: grade, forcarAberta: forcar }));
      });
      barra.atualizar();
      if (!vis.length) secoes.appendChild(vazio(null, function () { q = ''; sb.input.value = ''; Object.keys(sel).forEach(function (k) { sel[k].clear(); }); limparChips(barra); render(); }));
      gravar();
    }
    var sb = busca(q, 'Buscar por nome, descrição, autor ou como funciona…', function (v) { q = v; render(); });
    var selOrdem = el('select', { class: 'select', 'aria-label': 'Ordem', html: '<option value="recentes">Mais recentes</option><option value="az">A a Z</option>' });
    selOrdem.value = ordem;
    selOrdem.addEventListener('change', function () { ordem = selOrdem.value; render(); });
    var barra = barraFiltros(sb, [
      chips('Seção', D.categorias, sel.categoria, render),
      chips('Tipo', tiposPresentes, sel.tipo, render),
      chips('Contexto', D.contextos, sel.contexto, render),
      chips('Agentes para', todosQuem, sel.quem, render),
      chips('Agentes onde', todosOnde, sel.onde, render)
    ], ativos, [selOrdem]);
    root.appendChild(barra);
    root.appendChild(secoes);
    render();
    return root;
  }

  /* =========================== links =========================== */
  function cardLink(l) {
    var card = el('article', { class: 'card linkcard' + (l.url ? '' : ' linkcard--empty'), 'data-acesso-tipo': 'Link', 'data-acesso-nome': l.nome });
    card.appendChild(el('h3', { class: 'linkcard__name', text: l.nome }));
    if (l.url) card.appendChild(el('p', { class: 'linkcard__url', text: urlCurta(l.url) }));
    if (l.descricao) card.appendChild(el('p', { class: 'linkcard__desc', text: l.descricao }));
    if (l.obs) card.appendChild(el('p', { class: 'linkcard__obs', text: l.obs }));
    var acoes = el('div', { class: 'item__actions' });
    if (l.url) {
      acoes.appendChild(el('button', { class: 'btn btn--primary btn--sm', type: 'button', html: 'Copiar ' + svg('copy'), 'aria-label': 'Copiar link de ' + l.nome, on: { click: function () { copiar(l.url); registrarAcesso({ tipo: 'Link', nome: l.nome, url: l.url }); } } }));
      acoes.appendChild(botaoLink(l.url, 'Abrir ' + svg('ext'), false, true));
    } else {
      acoes.appendChild(el('span', { class: 'pending-label', text: 'link em breve' }));
    }
    card.appendChild(acoes);
    return card;
  }
  function viewLinks(params) {
    var q = params.get('q') || '';
    var grupos = new Set((params.get('grupo') || '').split(',').filter(Boolean));
    var root = el('div', { class: 'view fade-in' });
    var cont = contador(0, 'link', 'links');
    root.appendChild(cabecalho('Links', 'Reuniões, formulários, eventos, integração e treinamento, canais do Slack e ferramentas. Clique num grupo para abrir e copie ou abra em um clique.', [cont]));
    var lista = el('div', { class: 'secoes' });
    function gravar() { params.delete('q'); params.delete('grupo'); if (q) params.set('q', q); if (grupos.size) params.set('grupo', Array.from(grupos).join(',')); gravarRota('/links', params); }
    function render() {
      lista.innerHTML = '';
      var vis = D.links.filter(function (l) { return (!grupos.size || grupos.has(l.grupo)) && bate(l._indice, q); });
      var forcar = !!q || grupos.size > 0;
      D.gruposLinks.forEach(function (g) {
        var itens = vis.filter(function (l) { return l.grupo === g; });
        if (!itens.length) return;
        var grade = el('div', { class: 'grid grid--links' });
        itens.forEach(function (l) { grade.appendChild(cardLink(l)); });
        lista.appendChild(secao({ id: 'links-' + g, titulo: g, contagem: plural(itens.length, 'link', 'links'), corpo: grade, forcarAberta: forcar }));
      });
      cont.textContent = plural(vis.length, 'link', 'links');
      barra.atualizar();
      if (!vis.length) lista.appendChild(vazio(null, function () { q = ''; sb.input.value = ''; grupos.clear(); limparChips(barra); render(); }));
      gravar();
    }
    var sb = busca(q, 'Buscar link por nome, descrição ou endereço…', function (v) { q = v; render(); });
    var barra = barraFiltros(sb, [chips('Grupo', D.gruposLinks, grupos, render)], function () { return grupos.size; });
    root.appendChild(barra);
    root.appendChild(lista);
    root.appendChild(el('p', { class: 'footnote', text: 'Senhas e códigos de acesso nunca entram aqui: ficam no 1Password. Faltou algum link? Avise a AnaBe no Slack.' }));
    render();
    return root;
  }

  /* =========================== entregas =========================== */
  var ROTULO_TIPO_ENTREGA = { 'individual': 'Entregas individuais', 'coletiva': 'Entregas coletivas', 'extra': 'Entregas extras', 'bônus': 'Bônus' };
  function abrirEntrega(e, origem) {
    var meta = [tag(e.tipo, 'tag--entrega-' + idSeguro(e.tipo))];
    if (e.frequencia) meta.push(el('span', { text: e.frequencia }));
    var links = (e.links || []).map(function (l, i) { return botaoLink(l.url, l.rotulo, i === 0); });
    abrirDetalhe({ tipoAcesso: 'Entrega', kicker: 'Entrega ' + e.tipo, titulo: e.nome, descricao: e.descricao, meta: meta, blocos: [['Como entregamos', e.operacao], ['Frequência', e.frequencia], ['Quem cuida', e.responsavel]], links: links }, origem);
  }
  function cardEntrega(e) {
    var principal = e.links && e.links[0];
    var botoes = [botaoDetalhe('Como entregamos', function (b) { abrirEntrega(e, b); })];
    if (principal && principal.url) botoes.unshift(botaoLink(principal.url, principal.rotulo, true, true));
    return cardItem({
      tipoAcesso: 'Entrega', nome: e.nome, descricao: e.descricao, clamp: true,
      tags: [tag(e.tipo, 'tag--entrega-' + idSeguro(e.tipo))],
      por: e.frequencia ? 'Frequência: ' + e.frequencia : '',
      botoes: botoes
    });
  }
  function viewEntregas(params) {
    var q = params.get('q') || '';
    var tipos = new Set((params.get('tipo') || '').split(',').filter(Boolean));
    var root = el('div', { class: 'view fade-in' });
    root.appendChild(cabecalho('Entregas do Fluxo', 'O que o mentorado recebe. Clique num tipo para abrir e, no card, veja como o time entrega.'));
    var secoes = el('div', { class: 'secoes' });
    function gravar() { params.delete('q'); params.delete('tipo'); if (q) params.set('q', q); if (tipos.size) params.set('tipo', Array.from(tipos).join(',')); gravarRota('/entregas', params); }
    function render() {
      secoes.innerHTML = '';
      var vis = D.entregas.filter(function (e) { return (!tipos.size || tipos.has(e.tipo)) && bate(e._indice, q); });
      var forcar = !!q || tipos.size > 0;
      D.tiposEntrega.forEach(function (t) {
        var itens = vis.filter(function (e) { return e.tipo === t; });
        if (!itens.length) return;
        var grade = el('div', { class: 'grid' });
        itens.forEach(function (e) { grade.appendChild(cardEntrega(e)); });
        secoes.appendChild(secao({ id: 'ent-' + t, titulo: ROTULO_TIPO_ENTREGA[t] || t, contagem: plural(itens.length, 'entrega', 'entregas'), corpo: grade, forcarAberta: forcar }));
      });
      barra.atualizar();
      if (!vis.length) secoes.appendChild(vazio(null, function () { q = ''; sb.input.value = ''; tipos.clear(); limparChips(barra); render(); }));
      gravar();
    }
    var sb = busca(q, 'Buscar entrega por nome, descrição ou processo…', function (v) { q = v; render(); });
    var barra = barraFiltros(sb, [chips('Tipo', D.tiposEntrega, tipos, render)], function () { return tipos.size; });
    root.appendChild(barra);
    root.appendChild(secoes);
    render();
    return root;
  }

  /* =========================== perguntas frequentes (busca geral) =========================== */
  function abrirPergunta(c, origem) {
    var meta = [];
    if (c.tema) meta.push(tag(c.tema, 'tag--tema'));
    if (c.quem) meta.push(el('span', { text: 'quem sabe mais: ' + c.quem }));
    var links = (c.links || []).map(function (u, i) { return botaoLink(u, urlCurta(u), i === 0); });
    abrirDetalhe({ kicker: 'Pergunta frequente', titulo: c.pergunta, descricao: '', meta: meta, blocos: [['Resposta', c.resposta], ['Fonte', c.fonte]], links: links }, origem);
  }

  /* =========================== assistente (chat) =========================== */
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

  // Monta o painel do assistente. Devolve o elemento com `perguntar(texto)` e `focar()`.
  function montarChat() {
    var conversa = lerConversa();
    var lista = el('div', { class: 'chat__log', role: 'log', 'aria-live': 'polite', 'aria-label': 'Conversa' });
    var caixa = el('textarea', { class: 'chat__input', rows: '1', placeholder: 'Pergunte qualquer coisa sobre a operação do Fluxo…', 'aria-label': 'Sua pergunta', maxlength: '4000' });
    var enviar = el('button', { class: 'btn btn--primary chat__send', type: 'button', 'aria-label': 'Enviar', html: svg('send', 'btn__ico') });
    var limpar = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: 'Limpar conversa' });
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
        lista.appendChild(el('div', { class: 'chat__hello' }, [
          el('p', { text: 'Exemplos do que dá para perguntar:' }),
          el('div', { class: 'chat__sugestoes' }, SUGESTOES.map(function (s) {
            return el('button', { class: 'chip', type: 'button', text: s, on: { click: function () { caixa.value = s; mandar(); } } });
          }))
        ]));
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

    var painel = el('section', { class: 'card chat', 'aria-label': 'Assistente da central' }, [
      lista,
      el('div', { class: 'chat__compose' }, [caixa, enviar]),
      el('div', { class: 'chat__foot' }, [status, limpar])
    ]);
    painel.perguntar = function (texto) { caixa.value = texto; mandar(); };
    painel.focar = function () { caixa.focus(); };
    renderLog();
    return painel;
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
    if (info.abrir) acoes.appendChild(botaoDetalhe('Detalhes', info.abrir));
    if (info.url) {
      acoes.appendChild(el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Copiar link de ' + r.nome, title: 'Copiar link', html: svg('copy'), on: { click: function () { copiar(info.url); } } }));
      acoes.appendChild(el('a', Object.assign({ class: 'iconbtn', 'aria-label': 'Abrir ' + r.nome + ' em nova aba', title: 'Abrir em nova aba', html: svg('ext') }, linkAttrs(info.url))));
    }
    row.appendChild(acoes);
    return row;
  }
  function blocoRecentes() {
    var itens = lerRecentes().map(function (r) { return { r: r, info: resolverAcesso(r) }; }).filter(function (x) { return x.info; }).slice(0, 8);
    if (!itens.length) return null;
    var lista = el('div', { class: 'recent-list' });
    itens.forEach(function (x) { lista.appendChild(linhaRecente(x.r, x.info)); });
    var wrap = el('section', { class: 'home-block', 'aria-labelledby': 'home-recentes' });
    var limpar = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: 'Limpar histórico', on: { click: function () { gravarRecentes([]); wrap.remove(); } } });
    wrap.appendChild(el('div', { class: 'home-block__head' }, [el('h2', { class: 'home-block__title', id: 'home-recentes', text: 'Seus últimos acessos' }), limpar]));
    wrap.appendChild(el('div', { class: 'card' }, [lista]));
    wrap.appendChild(el('p', { class: 'footnote footnote--tight', text: 'Fica salvo só neste navegador.' }));
    return wrap;
  }

  /* =========================== início =========================== */
  // Índice da busca geral: tudo que existe na central, num lugar só.
  function indiceGeral() {
    var itens = [];
    D.agentes.forEach(function (a) { itens.push({ grupo: 'Agentes de IA', nome: a.nome, descricao: a.descricao, indice: a._indice, url: a.url, abrir: a.detalhe ? function (b) { abrirAgente(a, b); } : null, rotulo: 'Como usar', tipoAcesso: 'Agente' }); });
    D.projetos.forEach(function (p) { itens.push({ grupo: 'Projetos', nome: p.nome, descricao: p.descricao, indice: p._indice, url: p.url, abrir: p.detalhe ? function (b) { abrirProjeto(p, b); } : null, rotulo: 'Como funciona', tipoAcesso: 'Projeto' }); });
    D.links.forEach(function (l) { itens.push({ grupo: 'Links', nome: l.nome, descricao: l.descricao || l.obs, indice: l._indice, url: l.url, copiar: true, tipoAcesso: 'Link' }); });
    D.entregas.forEach(function (e) { itens.push({ grupo: 'Entregas', nome: e.nome, descricao: e.descricao, indice: e._indice, url: e.links && e.links[0] && ehExterno(e.links[0].url) ? e.links[0].url : '', abrir: function (b) { abrirEntrega(e, b); }, rotulo: 'Como entregamos', tipoAcesso: 'Entrega' }); });
    D.conhecimento.forEach(function (c) { itens.push({ grupo: 'Perguntas frequentes', nome: c.pergunta, descricao: c.resposta, indice: c._indice, url: '', abrir: function (b) { abrirPergunta(c, b); }, rotulo: 'Ver resposta' }); });
    return itens;
  }
  var GRUPOS_BUSCA = ['Agentes de IA', 'Projetos', 'Links', 'Entregas', 'Perguntas frequentes'];
  function linhaResultado(it) {
    var row = el('div', { class: 'linkrow', 'data-acesso-tipo': it.tipoAcesso || '', 'data-acesso-nome': it.tipoAcesso ? it.nome : '' });
    row.appendChild(el('div', { class: 'linkrow__text' }, [
      el('span', { class: 'linkrow__name', text: it.nome }),
      it.descricao ? el('span', { class: 'linkrow__desc linkrow__desc--clamp', text: it.descricao }) : null
    ]));
    var acoes = el('div', { class: 'linkrow__actions' });
    if (it.abrir) acoes.appendChild(botaoDetalhe(it.rotulo, it.abrir));
    if (it.url && it.copiar) acoes.appendChild(el('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Copiar link de ' + it.nome, title: 'Copiar link', html: svg('copy'), on: { click: function () { copiar(it.url); registrarAcesso({ tipo: 'Link', nome: it.nome, url: it.url }); } } }));
    if (it.url) acoes.appendChild(el('a', Object.assign({ class: 'iconbtn', 'aria-label': 'Abrir ' + it.nome + ' em nova aba', title: 'Abrir em nova aba', html: svg('ext') }, linkAttrs(it.url))));
    if (!it.url && !it.abrir) acoes.appendChild(el('span', { class: 'pending-label', text: 'link em breve' }));
    row.appendChild(acoes);
    return row;
  }
  function resolverMaisUsado(m) {
    var r = null;
    if (m.link) { var l = D.links.filter(function (x) { return x.id === m.link; })[0]; if (l && l.url) r = { nome: l.nome, url: l.url, tipo: 'Link' }; }
    else if (m.projeto) { var p = acharPorNome(D.projetos, m.projeto); if (p && p.url) r = { nome: p.nome, url: p.url, tipo: 'Projeto' }; }
    else if (m.agente) { var a = acharPorNome(D.agentes, m.agente); if (a && a.url) r = { nome: a.nome, url: a.url, tipo: 'Agente' }; }
    if (r) r.rotulo = m.rotulo || r.nome;
    return r;
  }
  function blocoTitulo(id, texto) { return el('h2', { class: 'home-block__title', id: id, text: texto }); }
  function viewInicio(params) {
    var root = el('div', { class: 'view fade-in view--home' });
    root.appendChild(cabecalho('O que você procura?', 'Busque em tudo que existe na central ou pergunte ao assistente, que responde com o que está cadastrado aqui.'));

    var q = (params.get('q') || '').trim();
    params.delete('q'); gravarRota('/', params);
    var chat = montarChat();
    var todos = indiceGeral();
    var resultados = el('div', { class: 'home-results' });
    var blocos = el('div', { class: 'home-blocks' });

    // Busca geral: procura em projetos, agentes, links, entregas e perguntas frequentes.
    var sb = busca('', 'Buscar em tudo: projetos, agentes, links, entregas e perguntas…', function (v) { buscar(v); }, true);
    function buscar(v) {
      var termo = v.trim();
      resultados.innerHTML = '';
      blocos.hidden = !!termo;
      resultados.hidden = !termo;
      if (!termo) return;
      var achados = todos.filter(function (it) { return bate(it.indice, termo); });
      var total = 0;
      GRUPOS_BUSCA.forEach(function (g) {
        var itens = achados.filter(function (it) { return it.grupo === g; });
        if (!itens.length) return;
        total += itens.length;
        var lista = el('div', { class: 'card home-results__group' }, [el('div', { class: 'section-card__head' }, [el('h2', { text: g }), el('span', { class: 'section__count', text: plural(itens.length, 'resultado', 'resultados') })])]);
        itens.slice(0, 12).forEach(function (it) { lista.appendChild(linhaResultado(it)); });
        if (itens.length > 12) lista.appendChild(el('p', { class: 'footnote footnote--tight', text: 'Mostrando 12 de ' + itens.length + '. Refine a busca para ver o resto.' }));
        resultados.appendChild(lista);
      });
      var perguntar = el('button', { class: 'btn btn--primary btn--sm', type: 'button', text: 'Perguntar ao assistente', on: { click: function () { sb.input.value = ''; sb.classList.remove('search--active'); buscar(''); chat.perguntar(termo); chat.scrollIntoView({ behavior: 'smooth', block: 'start' }); } } });
      resultados.appendChild(el('div', { class: 'card home-ask' }, [
        el('p', { text: total ? 'Não achou o que queria? O assistente pode responder com mais contexto.' : 'Nada com esse termo. Pergunte ao assistente: ele procura em tudo que está cadastrado.' }),
        perguntar
      ]));
    }
    root.appendChild(el('div', { class: 'home-search' }, [sb]));
    root.appendChild(resultados);

    // Assistente: o jeito mais rápido de achar o que é cada coisa, como funciona e quem cuida.
    var secChat = el('section', { class: 'home-block home-block--chat', 'aria-labelledby': 'home-chat' }, [
      el('div', { class: 'home-block__head' }, [blocoTitulo('home-chat', 'Pergunte ao assistente'), el('p', { class: 'home-block__sub', text: 'O que é cada coisa, como funciona, quem cuida e o link certo. Se não souber, ele diz quem sabe.' })]),
      chat,
      el('p', { class: 'footnote footnote--tight', text: 'O assistente só conhece o que está cadastrado aqui. Ele não vê o Slack nem o Fluxer. Nada de senha ou código por aqui.' })
    ]);
    blocos.appendChild(secChat);

    // Mais usados pelo time.
    var usados = D.maisUsados.map(resolverMaisUsado).filter(Boolean);
    if (usados.length) {
      var grade = el('div', { class: 'quick' });
      usados.forEach(function (u) {
        grade.appendChild(el('a', Object.assign({ class: 'card quick__item', 'data-acesso-tipo': u.tipo, 'data-acesso-nome': u.nome, title: u.nome, html: '<span class="quick__name">' + esc(u.rotulo) + '</span>' + svg('ext', 'quick__ico') }, linkAttrs(u.url))));
      });
      blocos.appendChild(el('section', { class: 'home-block', 'aria-labelledby': 'home-usados' }, [el('div', { class: 'home-block__head' }, [blocoTitulo('home-usados', 'Mais usados pelo time')]), grade]));
    }

    // Três portas com a contagem.
    var portas = el('div', { class: 'portas' }, [
      porta('#/projetos', D.projetos.length + D.agentes.length, 'Projetos e agentes', 'O que o time construiu e como usar'),
      porta('#/links', D.links.length, 'Links', 'Reuniões, eventos, canais e ferramentas'),
      porta('#/entregas', D.entregas.length, 'Entregas', 'O que o mentorado recebe')
    ]);
    blocos.appendChild(el('section', { class: 'home-block', 'aria-labelledby': 'home-tudo' }, [el('div', { class: 'home-block__head' }, [blocoTitulo('home-tudo', 'Tudo que tem aqui')]), portas]));

    var rec = blocoRecentes(); if (rec) blocos.appendChild(rec);
    root.appendChild(blocos);

    if (q) setTimeout(function () { chat.perguntar(q); }, 50);
    return root;
  }
  function porta(href, n, titulo, sub) {
    return el('a', { class: 'card porta', href: href, html: '<span class="porta__n">' + n + '</span><span class="porta__title">' + esc(titulo) + '</span><span class="porta__sub">' + esc(sub) + '</span>' });
  }

  /* =========================== montagem =========================== */
  var VIEWS = { '/': viewInicio, '/projetos': viewProjetos, '/links': viewLinks, '/entregas': viewEntregas };
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
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !dlg.open) {
      var i = app.querySelector('.search__input') || app.querySelector('.chat__input'); if (i) { e.preventDefault(); i.focus(); }
    }
  });
  render();
})();
