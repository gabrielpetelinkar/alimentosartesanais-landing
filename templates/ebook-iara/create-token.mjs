#!/usr/bin/env node
/**
 * Cria token de acesso para ebook da Iara
 *
 * Uso:
 *   node create-token.mjs --product guia-campo-reproducao-equina --email comprador@email.com
 *   node create-token.mjs --product apostila-reproducao-animal --email outro@email.com --devices 5
 *   node create-token.mjs --list --product guia-campo-reproducao-equina
 *   node create-token.mjs --revoke TOKEN-AQUI
 */

import { randomBytes } from 'crypto';

const SUPABASE_URL = process.env.IARA_SUPABASE_URL || 'https://qfkzjhuuoudecxjfsigt.supabase.co';
const SUPABASE_KEY = process.env.IARA_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error('Erro: IARA_SUPABASE_SERVICE_ROLE_KEY não definida no .env');
  process.exit(1);
}

const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf('--' + name);
  return idx >= 0 ? args[idx + 1] : null;
};
const hasFlag = (name) => args.includes('--' + name);

async function supaFetch(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': opts.prefer || 'return=representation',
      ...opts.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error ${res.status}: ${err}`);
  }
  return res.json();
}

function generateToken() {
  return randomBytes(12).toString('base64url').toUpperCase();
}

// --- CREATE ---
if (!hasFlag('list') && !hasFlag('revoke')) {
  const product = getArg('product');
  const email = getArg('email') || '';
  const devices = parseInt(getArg('devices') || '3', 10);
  const transaction = getArg('transaction') || '';

  if (!product) {
    console.error('Uso: node create-token.mjs --product PRODUCT_ID [--email EMAIL] [--devices N] [--transaction TX]');
    process.exit(1);
  }

  const token = generateToken();
  const data = await supaFetch('ebook_tokens', {
    method: 'POST',
    body: JSON.stringify({
      token,
      email,
      product_id: product,
      hotmart_transaction: transaction || null,
      max_devices: devices,
    }),
  });

  console.log('\n--- Token Criado ---');
  console.log(`Token:      ${data[0].token}`);
  console.log(`Product:    ${data[0].product_id}`);
  console.log(`Email:      ${data[0].email || '(vazio)'}`);
  console.log(`Devices:    ${data[0].max_devices}`);
  console.log(`Link:       https://${product}.vercel.app?token=${data[0].token}`);
  console.log('');
}

// --- LIST ---
if (hasFlag('list')) {
  const product = getArg('product');
  const query = product
    ? `ebook_tokens?product_id=eq.${product}&order=created_at.desc&limit=50`
    : 'ebook_tokens?order=created_at.desc&limit=50';
  const data = await supaFetch(query);

  console.log(`\n--- ${data.length} tokens ---`);
  for (const t of data) {
    const status = t.active ? 'ATIVO' : 'REVOGADO';
    console.log(`[${status}] ${t.token} | ${t.product_id} | ${t.email || '-'} | ${t.devices_used}/${t.max_devices} devices | ${t.created_at.slice(0, 10)}`);
  }
  console.log('');
}

// --- REVOKE ---
if (hasFlag('revoke')) {
  const token = getArg('revoke') || args[args.indexOf('--revoke') + 1];
  if (!token) {
    console.error('Uso: node create-token.mjs --revoke TOKEN');
    process.exit(1);
  }

  await supaFetch(`ebook_tokens?token=eq.${token}`, {
    method: 'PATCH',
    body: JSON.stringify({ active: false }),
  });

  console.log(`Token ${token} revogado.`);
}
