/* Monta a base de conhecimento do assistente a partir de dados/*.js.
   Os arquivos em dados/ declaram constantes globais (const PROJETOS = [...]) para a página;
   aqui eles são executados num contexto isolado (vm) e convertidos em texto legível,
   que vira o bloco cacheado do system prompt. Nada aqui chama a API. */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ARQUIVOS = ['projetos.js', 'agentes.js', 'links.js', 'entregas.js', 'operacao.js', 'conhecimento.js'];
const NOMES = [
  'PROJETOS', 'CATEGORIAS', 'CONTEXTOS', 'TIPOS',
  'AGENTES',
  'LINKS', 'GRUPOS_LINKS',
  'ENTREGAS', 'TIPOS_ENTREGA',
  'JORNADA', 'ROTINAS', 'ACESSO_RAPIDO',
  'CONHECIMENTO'
];

export function pastaDados() {
  // Na Vercel, process.cwd() é a raiz do projeto (dados/ entra via includeFiles no vercel.json).
  const candidatos = [
    path.join(process.cwd(), 'dados'),
    path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dados')
  ];
  for (const c of candidatos) if (fs.existsSync(c)) return c;
  throw new Error('Pasta dados/ não encontrada');
}

export function carregarDados() {
  const pasta = pastaDados();
  let codigo = '';
  for (const a of ARQUIVOS) {
    const p = path.join(pasta, a);
    if (fs.existsSync(p)) codigo += fs.readFileSync(p, 'utf8') + '\n;\n';
  }
  const coleta = '({' + NOMES.map(n => `${n}: (typeof ${n} !== 'undefined' ? ${n} : null)`).join(', ') + '})';
  const ctx = vm.createContext({});
  return vm.runInContext(codigo + coleta, ctx, { filename: 'dados.js', timeout: 2000 });
}

/* ---------- texto ---------- */
function linha(rotulo, valor) {
  if (valor === null || valor === undefined || valor === '' || (Array.isArray(valor) && !valor.length)) return '';
  const v = Array.isArray(valor) ? valor.join(', ') : String(valor);
  return `  ${rotulo}: ${v}\n`;
}
function bloco(detalhe, rotulos) {
  if (!detalhe) return '';
  let s = '';
  for (const [chave, rotulo] of rotulos) if (detalhe[chave]) s += linha(rotulo, detalhe[chave]);
  return s;
}

const ROTULOS_PROJETO = [
  ['oQueFaz', 'O que faz'], ['comoFunciona', 'Como funciona'], ['ondeRoda', 'Onde roda'],
  ['responsavel', 'Quem cuida'], ['ondeVerSeEstaFuncionando', 'Onde ver se está funcionando'], ['oQueFazerSeQuebrar', 'O que fazer se quebrar']
];
const ROTULOS_AGENTE = [
  ['oQueFaz', 'O que faz'], ['comoUsar', 'Como usar'], ['ondeFica', 'Onde fica'],
  ['atencao', 'Atenção'], ['ondeVerSeEstaFuncionando', 'Onde ver se está funcionando']
];

export function montarBase(d = carregarDados()) {
  let t = '';

  t += '# JORNADA DO MENTORADO\n';
  (d.JORNADA || []).forEach((j, i) => { t += `${i + 1}. [${j.etapa}] ${j.titulo}: ${j.texto}\n`; });

  t += '\n# ROTINAS DO TIME\n';
  (d.ROTINAS || []).forEach(r => { t += `- (${r.quando}) ${r.titulo}: ${r.texto}\n`; });

  t += '\n# ENTREGAS (o que o mentorado recebe)\n';
  (d.ENTREGAS || []).forEach(e => {
    t += `## ${e.nome} [${e.tipo}]\n`;
    t += linha('Descrição (pitch)', e.descricao);
    t += linha('Frequência', e.frequencia);
    t += linha('Quem cuida', e.responsavel);
    t += linha('Como entregamos', e.operacao);
    (e.links || []).forEach(l => { if (l.url) t += `  Link: ${l.rotulo}: ${l.url}\n`; });
  });

  t += '\n# AGENTES DE IA\n';
  (d.AGENTES || []).forEach(a => {
    t += `## ${a.nome} [${a.status || ''}]\n`;
    t += linha('Descrição', a.descricao);
    t += linha('Onde', a.onde);
    t += linha('Para quem', a.paraQuem);
    t += linha('Quem cuida', a.responsavel);
    t += linha('Autores', a.autores);
    t += linha('Data', a.data);
    t += linha('Link', a.url);
    t += bloco(a.detalhe, ROTULOS_AGENTE);
  });

  t += '\n# PROJETOS DO TIME\n';
  (d.PROJETOS || []).forEach(p => {
    t += `## ${p.nome} [${p.tipo}; ${p.categoria}; ${p.status || ''}]\n`;
    t += linha('Descrição', p.descricao);
    t += linha('Link', p.url || '(sem link ainda)');
    t += linha('PRD', p.prd);
    t += linha('Repositório', p.git);
    t += linha('Contexto', p.contexto);
    t += linha('Autores', p.autores);
    t += linha('Data', p.data);
    t += bloco(p.detalhe, ROTULOS_PROJETO);
  });

  t += '\n# LINKS IMPORTANTES\n';
  const grupos = d.GRUPOS_LINKS || [];
  const links = d.LINKS || [];
  const porGrupo = g => links.filter(l => l.grupo === g);
  const ordem = grupos.concat(links.map(l => l.grupo).filter(g => !grupos.includes(g)).filter((g, i, a) => a.indexOf(g) === i));
  ordem.forEach(g => {
    const itens = porGrupo(g);
    if (!itens.length) return;
    t += `## ${g}\n`;
    itens.forEach(l => {
      t += `- ${l.nome}: ${l.url || '(link ainda não cadastrado)'}`;
      if (l.descricao) t += ` — ${l.descricao}`;
      if (l.obs) t += ` (obs: ${l.obs})`;
      t += '\n';
    });
  });

  if (d.CONHECIMENTO && d.CONHECIMENTO.length) {
    t += '\n# PERGUNTAS FREQUENTES E COMBINADOS (fonte: Slack)\n';
    d.CONHECIMENTO.forEach(c => {
      t += `## ${c.pergunta}\n`;
      t += linha('Tema', c.tema);
      t += linha('Resposta', c.resposta);
      t += linha('Quem sabe mais', c.quem);
      t += linha('Fonte', c.fonte);
      t += linha('Links', c.links);
    });
  }

  return t;
}

export const INSTRUCOES = `Você é o assistente da Central do Fluxo, a central interna da operação da Mentoria Fluxo (RTG / Ready To Go). Quem conversa com você é alguém do time: navegadores, analisadores, time de eventos, liderança (Fernanda e Ellen) ou diretoria (Clara). Sua função é responder, em segundos, o que é cada coisa, para que serve, como funciona, quem cuida, onde olhar e qual é o link.

Regras:
1. Responda somente com o que está na base de conhecimento abaixo. Não invente nomes, datas, números, processos nem links. Se a base não tiver a resposta, diga claramente "Não encontrei isso na central" e indique quem provavelmente sabe (o responsável do item mais próximo, ou Fernanda e Ellen, que lideram o Fluxo). Nunca chute.
2. Quando pedirem um link, entregue a URL completa exatamente como está na base, com o nome do item, no formato [nome](url). Se o item existe mas está sem link, diga que o link ainda não foi cadastrado na central e quem cuida dele.
3. Responda em português do Brasil, direto e curto: primeiro a resposta, depois o contexto necessário. Use listas apenas quando houver vários itens. Sem emoji, sem caixa alta, sem jargão.
4. Quando a pergunta for sobre uma rotina ou entrega, diga a frequência e quem cuida. Quando for sobre uma automação ou agente, diga onde roda, como usar e onde ver se está funcionando.
5. Perguntas de diretoria (números, comparecimento, contratos, faturamento, NPS) geralmente não têm o dado bruto na base: diga onde o dado vive e quem tem acesso, em vez de estimar valores.
6. Nunca peça nem repita senhas, códigos de acesso ou credenciais. Se perguntarem, diga que ficam no 1Password com a liderança.
7. Se a pergunta não for sobre a operação do Fluxo, diga em uma frase que você só responde sobre a central e ofereça ajudar com isso.
8. Quando fizer sentido, feche com uma linha "Onde ver na central: #/rota" (rotas: #/recentes últimos acessos, #/agentes, #/projetos, #/links, #/entregas).`;
