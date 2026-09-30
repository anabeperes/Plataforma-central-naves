/* O "cérebro" do assistente: escolhe o modelo do Gemini, manda a base de conhecimento e
   devolve a resposta. É o mesmo para a página (api/chat.js) e para o bot do Slack (api/slack.js):
   uma fonte só (dados/*.js), uma instrução só (api/_base.js), um jeito só de responder.

   Variáveis de ambiente:
   - GEMINI_API_KEY   obrigatória. Chave gratuita em aistudio.google.com (Get API key).
   - CHAT_MODELO      opcional. Sem ela, a função pergunta ao Google quais modelos a chave
                      tem e escolhe o "flash" mais novo (os nomes mudam com o tempo). */

import { GoogleGenAI, ApiError } from '@google/genai';
import { montarBase, INSTRUCOES } from './_base.js';

export const MODELO_FIXO = process.env.CHAT_MODELO || '';
export const MAX_MENSAGENS = 16;      // histórico enviado ao modelo (pares de pergunta e resposta)
export const MAX_CARACTERES = 4000;   // por mensagem
const MAX_TOKENS_RESPOSTA = 2000;

let baseCache = null;
function base() {
  if (!baseCache) baseCache = montarBase();
  return baseCache;
}

/* ---------- escolha do modelo ----------
   Os nomes dos modelos do Gemini mudam (2.0, 2.5, 3...). Sem CHAT_MODELO, lista os modelos que a
   chave enxerga, fica só com os que geram texto e prefere: "flash" (rápido e com plano gratuito),
   sem sufixos como lite/8b/image/tts/live/audio/exp/preview, versão mais alta primeiro. */
let candidatosCache = null;
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
async function listarCandidatos(ai) {
  if (MODELO_FIXO) return [MODELO_FIXO];
  if (candidatosCache) return candidatosCache;
  const nomes = [];
  const pager = await ai.models.list({ config: { pageSize: 100 } });
  for await (const m of pager) {
    const nome = String(m.name || '').replace(/^models\//, '');
    if (!/^gemini-/.test(nome)) continue;
    if (m.supportedActions && m.supportedActions.length && !m.supportedActions.includes('generateContent')) continue;
    nomes.push(nome);
  }
  nomes.sort((a, b) => pontuar(b) - pontuar(a));
  if (!nomes.length) throw new Error('Nenhum modelo Gemini de texto disponível para esta chave.');
  candidatosCache = nomes;
  console.log('Modelos por ordem de preferência: ' + nomes.slice(0, 8).join(', '));
  return nomes;
}
// Erros em que vale tentar o próximo modelo: não existe (404), cota do plano gratuito (429),
// sobrecarregado ou instável (500, 503).
function valeTentarOutro(e) {
  return e instanceof ApiError && [404, 429, 500, 503].includes(e.status);
}

/* Converte [{ papel: 'usuario'|'assistente', texto }] no formato do Gemini, garantindo a
   alternância usuário/modelo e que a última mensagem seja do usuário. Devolve null se não
   houver pergunta. */
export function normalizarMensagens(entrada) {
  if (!Array.isArray(entrada) || !entrada.length) return null;
  const msgs = entrada.slice(-MAX_MENSAGENS).map(m => ({
    role: m && m.papel === 'assistente' ? 'model' : 'user',
    text: String((m && m.texto) || '').slice(0, MAX_CARACTERES).trim()
  })).filter(m => m.text);
  if (!msgs.length) return null;
  // Junta mensagens seguidas do mesmo papel para manter a alternância usuário/modelo.
  const limpas = [];
  for (const m of msgs) {
    const ultima = limpas[limpas.length - 1];
    if (ultima && ultima.role === m.role) ultima.text += '\n\n' + m.text; else limpas.push(m);
  }
  if (limpas[0].role !== 'user') limpas.shift();
  if (!limpas.length || limpas[limpas.length - 1].role !== 'user') return null;
  return limpas.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
}

/* Responde a uma conversa já normalizada. Chama aoTrecho(texto) a cada pedaço que chega e
   devolve { texto, modelo, uso } no fim. Em erro, lança a exceção com e.modelo preenchido. */
export async function responder(contents, aoTrecho) {
  if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY não configurada na Vercel.');
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
  const emitir = t => { if (aoTrecho) aoTrecho(t); };
  let modelo = '';
  try {
    const candidatos = await listarCandidatos(ai);
    let fluxo = null, ultimoErro = null;
    for (const nome of candidatos.slice(0, 4)) {
      modelo = nome;
      try { fluxo = await ai.models.generateContentStream({ ...params, model: nome }); break; }
      catch (e) {
        ultimoErro = e;
        if (!valeTentarOutro(e)) throw e;
        console.warn('Modelo ' + nome + ' falhou (' + e.status + '): ' + e.message + '. Tentando o próximo.');
      }
    }
    if (!fluxo) throw ultimoErro;
    let texto = '';
    let motivo = '';
    let uso = null;
    let bloqueio = null;
    for await (const parte of fluxo) {
      const t = parte.text;
      if (t) { texto += t; emitir(t); }
      const cand = parte.candidates && parte.candidates[0];
      if (cand && cand.finishReason) motivo = cand.finishReason;
      if (parte.promptFeedback && parte.promptFeedback.blockReason) bloqueio = parte.promptFeedback.blockReason;
      if (parte.usageMetadata) uso = parte.usageMetadata;
    }
    let extra = '';
    if (bloqueio || motivo === 'SAFETY' || motivo === 'PROHIBITED_CONTENT') {
      if (!texto) extra = 'Não consigo responder a essa pergunta por aqui.';
    } else if (motivo === 'MAX_TOKENS') {
      extra = '\n\n(resposta cortada por tamanho; pergunte de forma mais específica)';
    } else if (!texto) {
      extra = 'Não encontrei isso na central. Tente perguntar de outro jeito ou fale com a Fernanda e a Ellen.';
    }
    if (extra) { texto += extra; emitir(extra); }
    return {
      texto, modelo,
      uso: uso ? { entrada: uso.promptTokenCount || 0, cache: uso.cachedContentTokenCount || 0, saida: uso.candidatesTokenCount || 0 } : null
    };
  } catch (e) {
    if (e && typeof e === 'object') e.modelo = modelo;
    throw e;
  }
}

export function mensagemErro(e) {
  const modelo = e && e.modelo;
  const onde = modelo ? ' (modelo ' + modelo + ')' : '';
  if (e instanceof ApiError) {
    const detalhe = ' Detalhe do Google: ' + String(e.message || '').slice(0, 300);
    if (e.status === 400 && /api key/i.test(e.message)) return 'Chave da API inválida. Confira GEMINI_API_KEY na Vercel.';
    if (e.status === 401 || e.status === 403) return 'Chave da API sem permissão. Confira GEMINI_API_KEY na Vercel.' + detalhe;
    if (e.status === 404) return 'Modelo não encontrado' + onde + '. ' + (MODELO_FIXO ? 'Ajuste ou remova CHAT_MODELO na Vercel.' : 'Tente de novo em instantes.') + detalhe;
    if (e.status === 429) return 'Limite do plano gratuito atingido' + onde + '. Espere um minuto e tente de novo.' + detalhe;
    if (e.status >= 500) return 'A API do Gemini falhou' + onde + ', erro ' + e.status + '. Tente de novo em instantes.' + detalhe;
    return 'Erro da API (' + e.status + ')' + onde + ': ' + e.message;
  }
  return 'Erro inesperado' + onde + ': ' + (e && e.message ? e.message : String(e));
}
