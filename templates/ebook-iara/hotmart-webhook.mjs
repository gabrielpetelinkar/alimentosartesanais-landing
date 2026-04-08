#!/usr/bin/env node
/**
 * Webhook Hotmart → Cria token no Supabase
 *
 * Deploy como:
 * - Vercel Serverless Function (api/hotmart-webhook.js)
 * - Supabase Edge Function
 * - n8n webhook node
 *
 * Hotmart envia POST com:
 * - data.buyer.email
 * - data.purchase.transaction
 * - data.product.id / data.product.name
 * - event: "PURCHASE_APPROVED" | "PURCHASE_COMPLETE" | ...
 *
 * Mapeamento product_id Hotmart → product_id interno:
 */

const PRODUCT_MAP = {
  // Hotmart product ID → product_id interno
  // Preencher com IDs reais da Hotmart
  '0000000': 'guia-campo-reproducao-equina',
  // '1111111': 'apostila-reproducao-animal',
};

const SUPABASE_URL = process.env.IARA_SUPABASE_URL || 'https://qfkzjhuuoudecxjfsigt.supabase.co';
const SUPABASE_KEY = process.env.IARA_SUPABASE_SERVICE_ROLE_KEY;
const HOTMART_SECRET = process.env.HOTMART_WEBHOOK_SECRET || '';

import { randomBytes, createHmac } from 'crypto';

function generateToken() {
  return randomBytes(12).toString('base64url').toUpperCase();
}

async function createToken(email, productId, transaction) {
  const token = generateToken();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/ebook_tokens`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      token,
      email,
      product_id: productId,
      hotmart_transaction: transaction,
      max_devices: 3,
    }),
  });

  if (!res.ok) throw new Error(`Supabase error: ${await res.text()}`);
  return (await res.json())[0];
}

/**
 * Handler principal — adapte para seu runtime:
 *
 * Vercel: export default async function handler(req, res) { ... }
 * Supabase Edge: Deno.serve(async (req) => { ... })
 * n8n: use o nó "Webhook" + "HTTP Request" para Supabase
 */
export async function handleWebhook(body) {
  // Validar evento
  const event = body.event;
  if (event !== 'PURCHASE_APPROVED' && event !== 'PURCHASE_COMPLETE') {
    return { status: 'ignored', event };
  }

  const email = body.data?.buyer?.email;
  const transaction = body.data?.purchase?.transaction;
  const hotmartProductId = String(body.data?.product?.id || '');

  const productId = PRODUCT_MAP[hotmartProductId];
  if (!productId) {
    return { status: 'error', message: `Product ${hotmartProductId} not mapped` };
  }

  // Verificar se já existe token para essa transação
  const checkRes = await fetch(
    `${SUPABASE_URL}/rest/v1/ebook_tokens?hotmart_transaction=eq.${transaction}&select=token`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    }
  );
  const existing = await checkRes.json();
  if (existing.length > 0) {
    return { status: 'already_exists', token: existing[0].token };
  }

  // Criar token
  const record = await createToken(email, productId, transaction);

  const accessLink = `https://${productId}.vercel.app?token=${record.token}`;

  return {
    status: 'created',
    token: record.token,
    email,
    product_id: productId,
    access_link: accessLink,
  };
}

// --- Exemplo: Vercel Serverless ---
// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();
//   try {
//     const result = await handleWebhook(req.body);
//     res.status(200).json(result);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }
