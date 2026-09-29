/* Teste local: monta a base e imprime tamanho e amostra. Não chama a API.
   Uso: node api/_testar-base.js */
import { carregarDados, montarBase } from './_base.js';

const d = carregarDados();
const base = montarBase(d);
const contagem = Object.fromEntries(Object.entries(d).map(([k, v]) => [k, Array.isArray(v) ? v.length : (v ? 1 : 0)]));
console.log('Coleções carregadas:', JSON.stringify(contagem));
console.log('Tamanho da base: ' + base.length + ' caracteres (~' + Math.round(base.length / 3.2) + ' tokens estimados)');
console.log('--- amostra ---');
console.log(base.slice(0, 1200));
