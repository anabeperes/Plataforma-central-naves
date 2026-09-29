/* POST /api/chat: responde perguntas sobre a operação do Fluxo usando o Gemini (Google).
   Recebe { mensagens: [{ papel: 'usuario'|'assistente', texto }] } e devolve a resposta em
   streaming (NDJSON: uma linha JSON por evento: {t:"trecho"} ... {fim:true}).

   Variáveis de ambiente (Vercel > Settings > Environment Variables):
   - GEMINI_API_KEY     obrigatória. Chave gratuita em aistudio.google.com (Get API key).
   - CHAT_CODIGO        opcional. Se definida, a página pede esse código uma vez e o envia no
                        cabeçalho x-central-codigo. Serve para a página pública não virar
                        um chat aberto para qualquer pessoa com a URL.
   - CHAT_MODELO        opcional. Sem ela, a função pergunta ao Google quais modelos a chave
                        tem e escolhe o "flash" mais novo (os nomes mudam com o tempo). */

import { GoogleGenAI, ApiError } from '@google/genai';
import { montarBase, INSTRUCOES } from './_base.js';

const MODELO_FIXO = process.env.CHAT_MODELO || '';
const MAX_MENSAGENS = 16;      // histórico enviado ao modelo (pares de pergunta e resposta)
const MAX_CARACTERES = 4000;   // por mensagem
const MAX_TOKENS_RESPOSTA = 2000;
const LIMITE_POR_MINUTO = 20;  // por IP, por instância

let baseCache = null;
function base() {
  if (!baseCache) baseCache = montarBase();
  return baseCache;
}

/* ---------- escolha do modelo ----------
   Os nomes dos modelos do Gemini mudam (2.0, 2.5, 3...). Sem CHAT_MODELO, lista os modelos que a
   chave enxerga, fica só com os que geram texto e prefere: "flash" (rápido e com plano gratuito),
   sem sufixos como lite/8b/image/tts/live/audio/exp/preview, versão mais alta primeiro. */
let modeloCache = '';
const modelosRuins = new Set();
function versaoDe(nome) {
  const m = /gemini-(\d+(?:\.\d+)?)/.exec(nome);
  return m ? parseFloat(m[1]) : 0;
}
function pontuar(nome) {
  let p = versaoDe(nome) * 100;
  if (/flash/.test(nome)) p += 50;
  if (/pro/.test(nome)) p += 30;
  if (/lite|8b|image|tts|live|audio|exp|preview|embedding|thinking|robotics|computer|learnlm|gemma|imagen|veo/.test(nome)) p -= 500;
  return p;
}
async function resolverModelo(ai) {
  if (MODELO_FIXO) return MODELO_FIXO;
  if (modeloCache) return modeloCache;
  const nomes = [];
  const pager = await ai.models.list({ config: { pageSize: 100 } });
  for await (const m of pager) {
    const nome = String(m.name || '').replace(/^models\//, '');
    if (!/^gemini-/.test(nome)) continue;
    if (m.supportedActions && m.supportedActions.length && !m.supportedActions.includes('generateContent')) continue;
    if (modelosRuins.has(nome)) continue;
    nomes.push(nome);
  }
  nomes.sort((a, b) => pontuar(b) - pontuar(a));
  if (!nomes.length) throw new Error('Nenhum modelo Gemini de texto disponível para esta chave.');
  modeloCache = nomes[0];
  console.log('Modelo escolhido: ' + modeloCache + ' (disponíveis: ' + nomes.slice(0, 6).join(', ') + ')');
  return modeloCache;
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
    role: m && m.papel === 'assistente' ? 'model' : 'user',
    text: String((m && m.texto) || '').slice(0, MAX_CARACTERES).trim()
  })).filter(m => m.text);
  if (!msgs.length || msgs[0].role !== 'user') return null;
  // Junta mensagens seguidas do mesmo papel para manter a alternância usuário/modelo.
  const limpas = [];
  for (const m of msgs) {
    const ultima = limpas[limpas.length - 1];
    if (ultima && ultima.role === m.role) ultima.text += '\n\n' + m.text; else limpas.push(m);
  }
  if (limpas[limpas.length - 1].role !== 'user') return null;
  return limpas.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
}

export async function POST(req) {
  if (!process.env.GEMINI_API_KEY) return json(500, { erro: 'GEMINI_API_KEY não configurada na Vercel.' });
  if (!mesmaOrigem(req)) return json(403, { erro: 'Origem não permitida.' });

  const codigo = process.env.CHAT_CODIGO;
  if (codigo && req.headers.get('x-central-codigo') !== codigo) return json(401, { erro: 'Código de acesso inválido.', pedirCodigo: true });

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'desconhecido';
  if (estourouLimite(ip)) return json(429, { erro: 'Muitas perguntas em sequência. Espere um minuto e tente de novo.' });

  let corpo;
  try { corpo = await req.json(); } catch (e) { return json(400, { erro: 'Corpo inválido.' }); }
  const contents = normalizarMensagens(corpo && corpo.mensagens);
  if (!contents) return json(400, { erro: 'Mande pelo menos uma pergunta.' });

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  // A instrução e a base ficam no systemInstruction, sempre iguais: o Gemini reaproveita esse
  // prefixo entre pedidos (cache implícito) e a resposta sai mais rápido.
  const params = {
    model: '',
    contents,
    config: {
      systemInstruction: INSTRUCOES + '\n\n# BASE DE CONHECIMENTO DA CENTRAL DO FLUXO\n\n' + base(),
      maxOutputTokens: MAX_TOKENS_RESPOSTA,
      temperature: 0.2
    }
  };

  const codificador = new TextEncoder();
  const stream = new ReadableStream({
    async start(controlador) {
      const enviar = obj => controlador.enqueue(codificador.encode(JSON.stringify(obj) + '\n'));
      let modelo = '';
      try {
        modelo = await resolverModelo(ai);
        let fluxo;
        try {
          fluxo = await ai.models.generateContentStream({ ...params, model: modelo });
        } catch (e) {
          // Modelo listado mas indisponível para esta chave: risca da lista e tenta o próximo.
          if (!(e instanceof ApiError) || e.status !== 404 || MODELO_FIXO) throw e;
          modelosRuins.add(modelo); modeloCache = '';
          modelo = await resolverModelo(ai);
          fluxo = await ai.models.generateContentStream({ ...params, model: modelo });
        }
        let texto = '';
        let motivo = '';
        let uso = null;
        let bloqueio = null;
        for await (const parte of fluxo) {
          const t = parte.text;
          if (t) { texto += t; enviar({ t }); }
          const cand = parte.candidates && parte.candidates[0];
          if (cand && cand.finishReason) motivo = cand.finishReason;
          if (parte.promptFeedback && parte.promptFeedback.blockReason) bloqueio = parte.promptFeedback.blockReason;
          if (parte.usageMetadata) uso = parte.usageMetadata;
        }
        if (bloqueio || motivo === 'SAFETY' || motivo === 'PROHIBITED_CONTENT') {
          if (!texto) enviar({ t: 'Não consigo responder a essa pergunta por aqui.' });
        } else if (motivo === 'MAX_TOKENS') {
          enviar({ t: '\n\n(resposta cortada por tamanho; pergunte de forma mais específica)' });
        } else if (!texto) {
          enviar({ t: 'Não encontrei isso na central. Tente perguntar de outro jeito ou fale com a Fernanda e a Ellen.' });
        }
        enviar({
          fim: true, modelo: modelo,
          uso: uso ? { entrada: uso.promptTokenCount || 0, cache: uso.cachedContentTokenCount || 0, saida: uso.candidatesTokenCount || 0 } : null
        });
      } catch (e) {
        enviar({ erro: mensagemErro(e, modelo) });
      } finally {
        controlador.close();
      }
    }
  });

  return new Response(stream, { headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' } });
}

function mensagemErro(e, modelo) {
  if (e instanceof ApiError) {
    if (e.status === 400 && /api key/i.test(e.message)) return 'Chave da API inválida. Confira GEMINI_API_KEY na Vercel.';
    if (e.status === 401 || e.status === 403) return 'Chave da API sem permissão. Confira GEMINI_API_KEY na Vercel.';
    if (e.status === 404) return 'Modelo "' + (modelo || MODELO_FIXO) + '" não encontrado. ' + (MODELO_FIXO ? 'Ajuste ou remova CHAT_MODELO na Vercel.' : 'Tente de novo em instantes.');
    if (e.status === 429) return 'Limite do plano gratuito atingido por enquanto. Espere um minuto e tente de novo.';
    if (e.status >= 500) return 'A API do Gemini está instável agora. Tente de novo em instantes.';
    return 'Erro da API (' + e.status + '): ' + e.message;
  }
  return 'Erro inesperado: ' + (e && e.message ? e.message : String(e));
}

export function GET() {
  return json(405, { erro: 'Use POST com { mensagens: [...] }.' });
}
