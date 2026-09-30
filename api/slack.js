/* POST /api/slack: o assistente da Central do Fluxo dentro do Slack.
   O Slack manda para cá cada mensagem enviada ao bot (DM) e cada menção (@Central do Fluxo
   num canal). A função confere a assinatura, checa se quem perguntou está na lista de acesso,
   monta a conversa a partir do próprio histórico do Slack e responde com o mesmo cérebro
   da página (api/_cerebro.js), lendo os mesmos dados/*.js. Uma fonte só.

   Variáveis de ambiente (Vercel > Settings > Environment Variables):
   - SLACK_BOT_TOKEN        obrigatória. "Bot User OAuth Token" do app (começa com xoxb-).
   - SLACK_SIGNING_SECRET   obrigatória. "Signing Secret" do app (Basic Information).
   - SLACK_USUARIOS         obrigatória. IDs de quem pode usar, separados por vírgula
                            (ex.: U012ABC,U034DEF). Quem não está na lista não recebe resposta.
   - GEMINI_API_KEY         obrigatória (a mesma do chat da página).

   Como criar o app: ver README, seção "Bot no Slack" (há um manifesto pronto em slack-manifest.json). */

import { createHmac, timingSafeEqual } from 'node:crypto';
import { waitUntil } from '@vercel/functions';
import { normalizarMensagens, responder, mensagemErro, MAX_MENSAGENS } from './_cerebro.js';

const SITE = 'https://plataforma-central-naves.vercel.app';
const MAX_MSG_SLACK = 3900;         // limite prático por mensagem no Slack
const TOLERANCIA_ASSINATURA = 300;  // segundos; pedidos mais velhos que isso são recusados

/* ---------- utilidades ---------- */
function ok(corpo) {
  return new Response(corpo === undefined ? '' : (typeof corpo === 'string' ? corpo : JSON.stringify(corpo)), {
    status: 200, headers: { 'Content-Type': typeof corpo === 'object' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8' }
  });
}
function recusar(status, motivo) { return new Response(motivo, { status }); }

// Confere a assinatura do Slack (v0=HMAC-SHA256 do "v0:timestamp:corpo" com o signing secret).
export function assinaturaValida(segredo, timestamp, corpo, assinatura, agora = Math.floor(Date.now() / 1000)) {
  if (!segredo || !timestamp || !assinatura) return false;
  if (Math.abs(agora - Number(timestamp)) > TOLERANCIA_ASSINATURA) return false;
  const esperada = 'v0=' + createHmac('sha256', segredo).update('v0:' + timestamp + ':' + corpo).digest('hex');
  const a = Buffer.from(esperada), b = Buffer.from(String(assinatura));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function usuariosPermitidos() {
  return new Set(String(process.env.SLACK_USUARIOS || '').split(/[,\s]+/).map(s => s.trim()).filter(Boolean));
}

// Limpa o texto que vem do Slack: tira a menção ao bot e destrava links <url|texto>.
export function limparTextoSlack(texto, idBot) {
  return String(texto || '')
    .replace(idBot ? new RegExp('<@' + idBot + '(?:\\|[^>]*)?>', 'g') : /$^/, '')
    .replace(/<(https?:\/\/[^|>]+)\|([^>]*)>/g, '$2 ($1)')
    .replace(/<(https?:\/\/[^>]+)>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .trim();
}

// O cérebro responde em markdown simples; o Slack usa o "mrkdwn" dele.
export function paraMrkdwn(md) {
  let s = String(md || '');
  s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<$2|$1>');
  s = s.replace(/\[([^\]]+)\]\((#\/[^\s)]*)\)/g, (m, t, u) => '<' + SITE + '/' + u + '|' + t + '>');
  s = s.replace(/(^|[\s(])(#\/[a-z]*(?:\?[^\s<)]*)?)(?=[\s.,;)]|$)/g, (m, pre, u) => pre + '<' + SITE + '/' + u + '|' + u + '>');
  s = s.replace(/\*\*([^*\n]+)\*\*/g, '*$1*');
  s = s.replace(/^#{1,6}\s+(.*)$/gm, '*$1*');
  s = s.replace(/^\s*[-•]\s+/gm, '• ');
  return s.trim();
}

// Quebra respostas longas em mais de uma mensagem, de preferência em quebra de linha.
export function fatiar(texto, max = MAX_MSG_SLACK) {
  const partes = [];
  let resto = texto;
  while (resto.length > max) {
    let corte = resto.lastIndexOf('\n', max);
    if (corte < max / 2) corte = max;
    partes.push(resto.slice(0, corte));
    resto = resto.slice(corte).replace(/^\n+/, '');
  }
  if (resto) partes.push(resto);
  return partes;
}

/* ---------- API do Slack ---------- */
async function slack(metodo, corpo) {
  const r = await fetch('https://slack.com/api/' + metodo, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + process.env.SLACK_BOT_TOKEN },
    body: JSON.stringify(corpo)
  });
  const j = await r.json().catch(() => ({}));
  if (!j.ok) throw new Error('Slack ' + metodo + ' falhou: ' + (j.error || r.status));
  return j;
}

// Reconstrói a conversa a partir do histórico do Slack: na DM, as últimas mensagens do canal;
// num canal, a thread da menção. Mensagens do bot viram "assistente", as demais "usuario".
async function montarConversa(ev, idBot) {
  let mensagens = [];
  try {
    if (ev.channel_type === 'im') {
      const h = await slack('conversations.history', { channel: ev.channel, limit: MAX_MENSAGENS, inclusive: true, latest: ev.ts });
      mensagens = (h.messages || []).slice().reverse();
    } else if (ev.thread_ts) {
      const h = await slack('conversations.replies', { channel: ev.channel, ts: ev.thread_ts, limit: MAX_MENSAGENS + 1, inclusive: true, latest: ev.ts });
      mensagens = (h.messages || []).filter(m => Number(m.ts) <= Number(ev.ts));
    }
  } catch (e) {
    console.warn('Sem histórico do Slack (' + e.message + '); respondendo só à mensagem atual.');
  }
  if (!mensagens.some(m => m.ts === ev.ts)) mensagens.push(ev);
  const lista = mensagens
    .filter(m => m.text && (!m.subtype || m.subtype === 'bot_message' || m.subtype === 'thread_broadcast'))
    .map(m => ({
      papel: (m.bot_id || m.user === idBot) ? 'assistente' : 'usuario',
      texto: limparTextoSlack(m.text, idBot)
    }));
  return normalizarMensagens(lista);
}

async function tratarMensagem(ev, idBot) {
  const destino = { channel: ev.channel };
  if (ev.channel_type !== 'im') destino.thread_ts = ev.thread_ts || ev.ts;
  try { await slack('reactions.add', { channel: ev.channel, timestamp: ev.ts, name: 'eyes' }); } catch (e) { /* reação é só um sinal; segue sem ela */ }
  let texto;
  try {
    const contents = await montarConversa(ev, idBot);
    if (!contents) return;
    const r = await responder(contents);
    texto = paraMrkdwn(r.texto);
  } catch (e) {
    console.error('Bot do Slack: ' + (e && e.stack || e));
    texto = 'Não consegui responder agora. ' + mensagemErro(e);
  }
  for (const parte of fatiar(texto)) {
    await slack('chat.postMessage', { ...destino, text: parte, unfurl_links: false, unfurl_media: false });
  }
  try { await slack('reactions.remove', { channel: ev.channel, timestamp: ev.ts, name: 'eyes' }); } catch (e) { /* idem */ }
}

/* ---------- entrada ---------- */
// Eventos já vistos nesta instância, para não responder duas vezes se o Slack reenviar.
const vistos = new Map();
function jaVisto(id) {
  const agora = Date.now();
  for (const [k, t] of vistos) if (agora - t > 600000) vistos.delete(k);
  if (vistos.has(id)) return true;
  vistos.set(id, agora);
  return false;
}

export async function POST(req) {
  const corpo = await req.text();
  if (!assinaturaValida(process.env.SLACK_SIGNING_SECRET, req.headers.get('x-slack-request-timestamp'), corpo, req.headers.get('x-slack-signature'))) {
    return recusar(401, 'Assinatura inválida.');
  }
  let dados;
  try { dados = JSON.parse(corpo); } catch (e) { return recusar(400, 'Corpo inválido.'); }

  // Primeiro passo da configuração: o Slack manda um desafio e espera o mesmo texto de volta.
  if (dados.type === 'url_verification') return ok(dados.challenge || '');
  if (dados.type !== 'event_callback' || !dados.event) return ok();

  // Reenvio do Slack (quando não respondemos em 3 s): já estamos cuidando, só confirma.
  if (req.headers.get('x-slack-retry-num')) return ok();
  if (jaVisto(dados.event_id || (dados.event.channel + ':' + dados.event.ts))) return ok();

  const ev = dados.event;
  const idBot = dados.authorizations && dados.authorizations[0] && dados.authorizations[0].user_id;
  const ehDM = ev.type === 'message' && ev.channel_type === 'im';
  const ehMencao = ev.type === 'app_mention';
  if (!ehDM && !ehMencao) return ok();
  if (ev.bot_id || (ev.subtype && ev.subtype !== 'file_share') || !ev.user || ev.user === idBot) return ok();
  if (!ev.text || !limparTextoSlack(ev.text, idBot)) return ok();

  // Quem não está na lista não recebe resposta nenhuma (nem aviso).
  if (!usuariosPermitidos().has(ev.user)) {
    console.log('Bot do Slack: pergunta de ' + ev.user + ' ignorada (fora da lista SLACK_USUARIOS).');
    return ok();
  }
  if (!process.env.SLACK_BOT_TOKEN || !process.env.GEMINI_API_KEY) {
    console.error('Bot do Slack: falta SLACK_BOT_TOKEN ou GEMINI_API_KEY na Vercel.');
    return ok();
  }

  // Confirma para o Slack na hora (ele espera resposta em 3 s) e continua respondendo depois.
  waitUntil(tratarMensagem(ev, idBot));
  return ok();
}

export function GET() {
  return new Response('Endereço do bot do Slack da Central do Fluxo. O Slack manda POST para cá.', { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
