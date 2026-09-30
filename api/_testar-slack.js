/* Teste local do bot do Slack, sem chamar o Slack nem o Gemini.
   Confere a assinatura, o desafio de configuração, a lista de acesso e a conversão de texto.
   Uso: node api/_testar-slack.js */
import { createHmac } from 'node:crypto';
import assert from 'node:assert/strict';

process.env.SLACK_SIGNING_SECRET = 'segredo-de-teste';
process.env.SLACK_USUARIOS = 'U_ANA, U_ELLEN,U_FE';
delete process.env.SLACK_BOT_TOKEN;

const { POST, assinaturaValida, paraMrkdwn, limparTextoSlack, fatiar, usuariosPermitidos } = await import('./slack.js');

function pedido(dados, extras = {}) {
  const corpo = JSON.stringify(dados);
  const ts = String(Math.floor(Date.now() / 1000));
  const assinatura = 'v0=' + createHmac('sha256', process.env.SLACK_SIGNING_SECRET).update('v0:' + ts + ':' + corpo).digest('hex');
  return new Request('http://localhost/api/slack', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-slack-request-timestamp': ts, 'x-slack-signature': extras.assinatura || assinatura, ...(extras.headers || {}) },
    body: corpo
  });
}

// 1. assinatura
assert.equal(assinaturaValida('s', '100', 'x', 'v0=errada', 100), false);
const assinada = 'v0=' + createHmac('sha256', 's').update('v0:100:x').digest('hex');
assert.equal(assinaturaValida('s', '100', 'x', assinada, 100), true);
assert.equal(assinaturaValida('s', '100', 'x', assinada, 100 + 301), false, 'pedido velho deve ser recusado');

// 2. pedido sem assinatura válida
let r = await POST(pedido({ type: 'url_verification', challenge: 'abc' }, { assinatura: 'v0=falsa' }));
assert.equal(r.status, 401);

// 3. desafio de configuração
r = await POST(pedido({ type: 'url_verification', challenge: 'abc123' }));
assert.equal(r.status, 200);
assert.equal(await r.text(), 'abc123');

// 4. lista de acesso
assert.deepEqual(Array.from(usuariosPermitidos()), ['U_ANA', 'U_ELLEN', 'U_FE']);
const evento = (user, extra = {}) => ({
  type: 'event_callback', event_id: 'Ev' + Math.random(),
  authorizations: [{ user_id: 'U_BOT' }],
  event: { type: 'message', channel_type: 'im', channel: 'D1', user, text: 'qual é o link do zoom?', ts: '1.0', ...extra }
});
r = await POST(pedido(evento('U_ESTRANHO')));
assert.equal(r.status, 200); // fora da lista: confirma ao Slack e não responde nada

// 5. pessoa da lista, mas sem token configurado: confirma ao Slack e registra erro no log
r = await POST(pedido(evento('U_ANA')));
assert.equal(r.status, 200);

// 6. mensagens do próprio bot e reenvios são ignorados sem erro
r = await POST(pedido(evento('U_BOT')));
assert.equal(r.status, 200);
r = await POST(pedido(evento('U_ANA'), { headers: { 'x-slack-retry-num': '1' } }));
assert.equal(r.status, 200);

// 7. limpeza do texto que vem do Slack
assert.equal(limparTextoSlack('<@U_BOT> qual o link de <https://vtsd.com.br/zoom|zoom> &amp; cia?', 'U_BOT'), 'qual o link de zoom (https://vtsd.com.br/zoom) & cia?');

// 8. conversão do markdown do assistente para o mrkdwn do Slack
const md = '**Zoom semanal**: [vtsd.com.br/zoom-semanal](https://vtsd.com.br/zoom-semanal)\n- sempre pelo Terminus\n- feedback <Tally>\n\nOnde ver na central: #/links';
const mr = paraMrkdwn(md);
assert.ok(mr.includes('*Zoom semanal*'), 'negrito');
assert.ok(mr.includes('<https://vtsd.com.br/zoom-semanal|vtsd.com.br/zoom-semanal>'), 'link');
assert.ok(mr.includes('• sempre pelo Terminus'), 'lista');
assert.ok(mr.includes('&lt;Tally&gt;'), 'escape');
assert.ok(mr.includes('<https://plataforma-central-naves.vercel.app/#/links|#/links>'), 'rota interna vira link do site');

// 9. respostas longas são fatiadas em quebras de linha
const longo = Array.from({ length: 200 }, (_, i) => 'linha ' + i + ' ' + 'x'.repeat(40)).join('\n');
const partes = fatiar(longo, 1000);
assert.ok(partes.length > 1 && partes.every(p => p.length <= 1000));
assert.equal(partes.join('\n'), longo);

console.log('Bot do Slack: ' + 9 + ' verificações ok.');
