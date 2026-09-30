/* POST /api/chat: responde perguntas sobre a operação do Fluxo usando o Gemini (Google).
   Recebe { mensagens: [{ papel: 'usuario'|'assistente', texto }] } e devolve a resposta em
   streaming (NDJSON: uma linha JSON por evento: {t:"trecho"} ... {fim:true}).
   O modelo, a base e a instrução ficam em api/_cerebro.js (os mesmos do bot do Slack).

   Variáveis de ambiente (Vercel > Settings > Environment Variables):
   - GEMINI_API_KEY     obrigatória (ver _cerebro.js).
   - CHAT_CODIGO        opcional. Se definida, a página pede esse código uma vez e o envia no
                        cabeçalho x-central-codigo. Serve para a página pública não virar
                        um chat aberto para qualquer pessoa com a URL.
   - CHAT_MODELO        opcional (ver _cerebro.js). */

import { normalizarMensagens, responder, mensagemErro } from './_cerebro.js';

const LIMITE_POR_MINUTO = 20;  // por IP, por instância

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

  const codificador = new TextEncoder();
  const stream = new ReadableStream({
    async start(controlador) {
      const enviar = obj => controlador.enqueue(codificador.encode(JSON.stringify(obj) + '\n'));
      try {
        const r = await responder(contents, t => enviar({ t }));
        enviar({ fim: true, modelo: r.modelo, uso: r.uso });
      } catch (e) {
        enviar({ erro: mensagemErro(e) });
      } finally {
        controlador.close();
      }
    }
  });

  return new Response(stream, { headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' } });
}

export function GET() {
  return json(405, { erro: 'Use POST com { mensagens: [...] }.' });
}
