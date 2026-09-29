/* POST /api/chat: responde perguntas sobre a operação do Fluxo usando o Claude.
   Recebe { mensagens: [{ papel: 'usuario'|'assistente', texto }] } e devolve a resposta em
   streaming (NDJSON: uma linha JSON por evento: {t:"trecho"} ... {fim:true}).

   Variáveis de ambiente (Vercel > Settings > Environment Variables):
   - ANTHROPIC_API_KEY  obrigatória.
   - CHAT_CODIGO        opcional. Se definida, a página pede esse código uma vez e o envia no
                        cabeçalho x-central-codigo. Serve para a página pública não virar
                        um chat aberto para qualquer pessoa com a URL.
   - CHAT_MODELO        opcional. Padrão: claude-opus-5-5. */

import Anthropic from '@anthropic-ai/sdk';
import { montarBase, INSTRUCOES } from './_base.js';

const MODELO = process.env.CHAT_MODELO || 'claude-opus-5-5';
const MAX_MENSAGENS = 16;      // histórico enviado ao modelo (pares de pergunta e resposta)
const MAX_CARACTERES = 4000;   // por mensagem
const MAX_TOKENS_RESPOSTA = 2000;
const LIMITE_POR_MINUTO = 20;  // por IP, por instância

let baseCache = null;
function base() {
  if (!baseCache) baseCache = montarBase();
  return baseCache;
}

const janelas = new Map();
function estourouLimite(ip) {
  const agora = Date.now();
  const j = janelas.get(ip) || [];
  const recentes = j.filter(t => agora - t < 60000);
  recentes.push(agora);
  janelas.set(ip, recentes);
  if (janelas.size > 5000) janelas.clear();
  return recentes.length > LIMITE_POR_MINUTO;
}

function json(status, corpo) {
  return new Response(JSON.stringify(corpo), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
}

function mesmaOrigem(req) {
  const origem = req.headers.get('origin');
  if (!origem) return true; // navegadores mandam origin em POST; sem origin, deixa passar (curl, testes)
  try { return new URL(origem).host === req.headers.get('host'); } catch (e) { return false; }
}

function normalizarMensagens(entrada) {
  if (!Array.isArray(entrada) || !entrada.length) return null;
  const msgs = entrada.slice(-MAX_MENSAGENS).map(m => ({
    role: m && m.papel === 'assistente' ? 'assistant' : 'user',
    content: String((m && m.texto) || '').slice(0, MAX_CARACTERES).trim()
  })).filter(m => m.content);
  if (!msgs.length || msgs[0].role !== 'user') return null;
  // O modelo exige alternância; junta mensagens seguidas do mesmo papel.
  const limpas = [];
  for (const m of msgs) {
    const ultima = limpas[limpas.length - 1];
    if (ultima && ultima.role === m.role) ultima.content += '\n\n' + m.content; else limpas.push(m);
  }
  if (limpas[limpas.length - 1].role !== 'user') return null;
  return limpas;
}

export async function POST(req) {
  if (!process.env.ANTHROPIC_API_KEY) return json(500, { erro: 'ANTHROPIC_API_KEY não configurada na Vercel.' });
  if (!mesmaOrigem(req)) return json(403, { erro: 'Origem não permitida.' });

  const codigo = process.env.CHAT_CODIGO;
  if (codigo && req.headers.get('x-central-codigo') !== codigo) return json(401, { erro: 'Código de acesso inválido.', pedirCodigo: true });

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'desconhecido';
  if (estourouLimite(ip)) return json(429, { erro: 'Muitas perguntas em sequência. Espere um minuto e tente de novo.' });

  let corpo;
  try { corpo = await req.json(); } catch (e) { return json(400, { erro: 'Corpo inválido.' }); }
  const mensagens = normalizarMensagens(corpo && corpo.mensagens);
  if (!mensagens) return json(400, { erro: 'Mande pelo menos uma pergunta.' });

  const client = new Anthropic();
  const params = {
    model: MODELO,
    max_tokens: MAX_TOKENS_RESPOSTA,
    output_config: { effort: 'medium' },
    system: [
      { type: 'text', text: INSTRUCOES },
      // A base é grande e estável: fica cacheada (prefixo) e sai quase de graça nas próximas perguntas.
      { type: 'text', text: '# BASE DE CONHECIMENTO DA CENTRAL DO FLUXO\n\n' + base(), cache_control: { type: 'ephemeral' } }
    ],
    messages: mensagens
  };

  const codificador = new TextEncoder();
  const stream = new ReadableStream({
    async start(controlador) {
      const enviar = obj => controlador.enqueue(codificador.encode(JSON.stringify(obj) + '\n'));
      let fluxo;
      try {
        try {
          // Fallback do servidor: se o modelo recusar por política, a API refaz no modelo de reserva.
          fluxo = client.beta.messages.stream({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' });
          await primeiroEvento(fluxo);
        } catch (e) {
          if (!(e instanceof Anthropic.BadRequestError)) throw e;
          // Conta ou SDK sem o beta de fallback: refaz sem ele.
          fluxo = client.messages.stream(params);
        }
        let texto = '';
        for await (const evento of fluxo) {
          if (evento.type === 'content_block_delta' && evento.delta.type === 'text_delta') {
            texto += evento.delta.text;
            enviar({ t: evento.delta.text });
          }
        }
        const final = await fluxo.finalMessage();
        if (final.stop_reason === 'refusal') {
          enviar({ t: texto ? '' : 'Não consigo responder a essa pergunta por aqui.' });
        } else if (final.stop_reason === 'max_tokens') {
          enviar({ t: '\n\n(resposta cortada por tamanho; pergunte de forma mais específica)' });
        }
        enviar({ fim: true, modelo: final.model, uso: { entrada: final.usage.input_tokens, cache: final.usage.cache_read_input_tokens || 0, saida: final.usage.output_tokens } });
      } catch (e) {
        enviar({ erro: mensagemErro(e) });
      } finally {
        controlador.close();
      }
    }
  });

  return new Response(stream, { headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' } });
}

// Espera a conexão abrir para que um 400 (parâmetro não aceito) apareça antes de começarmos a responder.
function primeiroEvento(fluxo) {
  return new Promise((resolve, reject) => {
    fluxo.once('connect', resolve);
    fluxo.once('error', reject);
  });
}

function mensagemErro(e) {
  if (e instanceof Anthropic.AuthenticationError) return 'Chave da API inválida. Confira ANTHROPIC_API_KEY na Vercel.';
  if (e instanceof Anthropic.RateLimitError) return 'A API está no limite de uso. Tente de novo em instantes.';
  if (e instanceof Anthropic.APIConnectionError) return 'Não deu para falar com a API agora. Tente de novo.';
  if (e instanceof Anthropic.APIError) return 'Erro da API (' + e.status + '): ' + e.message;
  return 'Erro inesperado: ' + (e && e.message ? e.message : String(e));
}

export function GET() {
  return json(405, { erro: 'Use POST com { mensagens: [...] }.' });
}
