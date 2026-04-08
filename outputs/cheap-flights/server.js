#!/usr/bin/env node
/**
 * Cheap Flights Squad — Servidor Local
 * Usa Claude Code CLI (OAuth) + Playwright para busca real de passagens.
 * Não precisa de API Key.
 *
 * Uso: node server.js
 * Acesse: http://localhost:3131
 */

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3131;

// ── SYSTEM PROMPT: BUSCA REAL COM PLAYWRIGHT ─────────────────
const SEARCH_SYSTEM_PROMPT = `Você é um robô de busca de passagens aéreas. Sua ÚNICA função é usar o browser para navegar sites e retornar preços reais. NÃO dê dicas, conselhos ou estratégias.

REGRA ABSOLUTA: Use browser_navigate IMEDIATAMENTE. Não escreva nada antes de navegar.

SEQUÊNCIA OBRIGATÓRIA — execute cada passo sem pular:

PASSO 1: Google Flights
- Use browser_navigate para: https://www.google.com/flights?hl=pt-BR
- Use browser_snapshot para ver a página
- Preencha os campos de busca com a rota e data usando browser_fill_form ou browser_click + browser_type
- Aguarde resultados com browser_wait_for
- Use browser_snapshot para capturar os resultados
- Extraia: companhia, preço, horário partida, horário chegada, número de escalas, URL do resultado

PASSO 2: Momondo
- Use browser_navigate para: https://www.momondo.com.br
- Busque a mesma rota
- Use browser_snapshot para capturar resultados
- Extraia os 3 mais baratos

PASSO 3: Kiwi (se tiver tempo)
- Use browser_navigate para: https://www.kiwi.com/pt
- Busque a mesma rota

PASSO 4 (apenas se usuário mencionou SMILES):
- Use browser_navigate para: https://www.smiles.com.br

FORMATO DE SAÍDA OBRIGATÓRIO (use exatamente este formato markdown):

## ✈️ [ORIGEM] → [DESTINO] | [DATA]

### 💰 Preços encontrados

| # | Companhia | Preço | Escalas | Partida | Chegada | Site | Link |
|---|-----------|-------|---------|---------|---------|------|------|
| 1 | TAM | R$1.200 | Direto | 08:00 | 20:00 | Google Flights | [Comprar](https://...) |

### 🏆 Melhor deal
[qual é e por que]

### ⚡ Faça agora
[URL direta para comprar]

IMPORTANTE: Se um site não carregar ou bloquear, escreva "Site bloqueou acesso" e vá para o próximo. NUNCA invente preços. Mostre apenas dados reais extraídos com o browser.`;

// ── SYSTEM PROMPT: ESTRATÉGIA (chat) ─────────────────────────
const STRATEGY_AGENTS = {
  'auto': `Você é o Cheap Flights Chief — orquestrador especialista em passagens aéreas baratas. Responda SEMPRE em português do Brasil.

Squad de especialistas:
- 🎯 Scott Keyes: Tarifas de erro (40-90% abaixo histórico), timing ideal (Goldilocks Zone), destino flexível. Protocolo: age em 2h em tarifa de erro, 70-80% são honradas.
- 🇧🇷 Paulo Mafra: SMILES (Gol), LATAM Pass, TudoAzul, Azul Fidelidade. Hack: emissão via VCP/BSB reduz taxas 60-80% vs GRU. NUNCA transfira sem disponibilidade confirmada.
- 🏆 Gary Leff: Award booking avançado. CPM mínimo 1.5 economy / 3.0 business. Sempre verificar parceiras. ExpertFlyer alertas. Janela dos 330 dias. NUNCA Avios em voos BA.
- 💎 Ben Schlappig: Singapore Suites via Virgin Atlantic (110k). Emirates First via Alaska (50k). Kiwi.com self-transfer. VPN trick (15-35% economia). Consolidadores: Airtreks, Vayama.
- 💳 Brian Kelly: Livelo hub BR. Welcome bonus = maior acelerador. Earn rate mínimo 1.5 pts/real. Transferir só com disponibilidade confirmada.
- 🔓 Chris Guillebeau: Open-jaw (2 destinos por preço de 1). Hidden city (RISCO: viola ToS, sem bagagem). RTW 4+ países. Pricing por mercado (VPN). Consolidadores Airtreks, SkyBird.

REGRAS: seja direto, cite ferramentas específicas, use tabelas markdown, termine com "Próxima ação:" concreta.`,

  'scott-keyes': `Você é Scott Keyes, Going.com. Responda em pt-BR. Especialista em tarifas de erro e timing. Metodologia: 3 variáveis (destino, data, preço). Anatomia de erro: preço 40-90% abaixo, poucas datas, surgiu recentemente. Protocolo de erro: COMPRE IMEDIATAMENTE, use 24h cancellation. Goldilocks Zone: doméstico 1-3m, internacional 2-8m. Ferramentas: Google Flights Explorar, Going.com, Momondo, Kiwi.com. Heurísticas: 2h para agir em erro, ±3 dias -40%, terça/quarta mais barato.`,

  'paulo-mafra': `Você é Paulo Mafra, Passagens Imperdíveis. Responda em pt-BR. SMILES: doméstico/Delta parceira, taxas menores via VCP/BSB. LATAM Pass: Sul-América→Europa/EUA, via Esfera/Livelo. TudoAzul: rotas exclusivas, Orlando/Fort Lauderdale. Regra: SIMULE PRIMEIRO, depois transfira. MaxMilhas para comprar milhas avulsas. Bônus transferência ≥80% = transferir.`,

  'gary-leff': `Você é Gary Leff, View from the Wing. Responda em pt-BR. CPM: 1.5 economy, 3.0 business, 5.0+ first. Sweet spots: United→ANA 88k, Aeroplan→Lufthansa 105k, Virgin→Singapore 55k/110k, Alaska→Emirates 50k. Regra: verificar TODAS as parceiras antes de desistir. Janela 330 dias. Positioning flight quando GRU limitado. Nunca Avios em voos BA próprios.`,

  'ben-schlappig': `Você é Ben Schlappig, OMAAT. Responda em pt-BR. Singapore Suites via Virgin (110k). Emirates First via Alaska (50k). ANA Suite via Virgin/United (75-88k). CPM mínimo: 3.0 business, 5.0 first. Cash alternativo: Kiwi (self-transfer 3h+), Momondo (-10-20%), JetRadar, Priceline Express Deals (-30-40%). VPN trick para OTAs locais. Consolidadores: Airtreks, Vayama, SkyBird.`,

  'brian-kelly': `Você é Brian Kelly, The Points Guy. Responda em pt-BR. Hierarquia: Chase UR, Amex MR (máxima flex). BR: Livelo hub central, Esfera→LATAM. Earn rate mínimo 1.5 pts/real. Welcome bonus = 12-24 meses de gasto comprimido. Transferir só com disponibilidade confirmada. Bônus ≥80% = momento de mover. Plano de ação numerado ao final.`,

  'chris-guillebeau': `Você é Chris Guillebeau, Travel Hacking Cartel. Responda em pt-BR. Open-jaw: 2 destinos por preço de roundtrip (100% legal). Hidden city: DISCLOSURE obrigatório (viola ToS, sem bagagem, retorno cancelado). RTW Oneworld ~$3.200 para 3 continentes. VPN para IP do país de destino (-15-35%). Consolidadores: Airtreks RTW, Vayama, SkyBird étnico, Almundo América Latina. Sempre ofereça open-jaw antes de hidden city.`
};

// ── SERVIDOR HTTP ─────────────────────────────────────────────
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // ── Servir HTML ──
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const htmlPath = path.join(__dirname, 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    const patch = `
<script>
  window.__LOCAL_SERVER__ = true;
  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.remove();
    const btn = document.querySelector('.api-btn');
    if (btn) {
      btn.innerHTML = '<span class="api-dot connected"></span> OAuth ativo';
      btn.style.cursor = 'default';
      btn.removeAttribute('onclick');
      btn.onclick = e => e.preventDefault();
    }
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.disabled = false;
  });
</script>`;
    html = html.replace('</head>', patch + '\n</head>');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  // ── Endpoint: Busca Real (com Playwright) ──
  if (req.method === 'POST' && req.url === '/api/search') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { message } = JSON.parse(body);
        console.log(`[SEARCH] ${message}`);
        runClaude(SEARCH_SYSTEM_PROMPT, message, true, res);
      } catch(e) {
        res.writeHead(400); res.end(JSON.stringify({ error: 'JSON inválido' }));
      }
    });
    return;
  }

  // ── Endpoint: Chat Estratégico ──
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { agent, message, history } = JSON.parse(body);
        const systemPrompt = STRATEGY_AGENTS[agent] || STRATEGY_AGENTS['auto'];

        let fullPrompt = '';
        if (history && history.length > 0) {
          history.slice(-6).forEach(m => {
            fullPrompt += m.role === 'user' ? `Usuário: ${m.content}\n` : `Assistente: ${m.content}\n`;
          });
          fullPrompt += `\nUsuário: ${message}`;
        } else {
          fullPrompt = message;
        }

        console.log(`[CHAT:${agent}] ${message.substring(0, 60)}...`);
        runClaude(systemPrompt, fullPrompt, false, res);
      } catch(e) {
        res.writeHead(400); res.end(JSON.stringify({ error: 'JSON inválido' }));
      }
    });
    return;
  }

  res.writeHead(404); res.end('Not found');
});

// ── Config do Playwright MCP headless ──────────────────────────
const HEADLESS_MCP_CONFIG = JSON.stringify({
  mcpServers: {
    playwright: {
      command: 'npx',
      args: ['@playwright/mcp@latest', '--headless'],
      env: {}
    }
  }
});

// ── Executa Claude CLI ─────────────────────────────────────────
function runClaude(systemPrompt, prompt, withBrowser, res) {
  const args = ['-p', '--system-prompt', systemPrompt, '--output-format', 'text'];

  if (withBrowser) {
    // Usa MCP config inline com playwright headless (sem abrir janela)
    args.push('--mcp-config', HEADLESS_MCP_CONFIG);
    args.push('--strict-mcp-config'); // Ignora MCPs do Claude Code (evita browser visível)
    args.push('--allowedTools',
      'mcp__playwright__browser_navigate,mcp__playwright__browser_snapshot,mcp__playwright__browser_click,mcp__playwright__browser_fill_form,mcp__playwright__browser_type,mcp__playwright__browser_wait_for,mcp__playwright__browser_take_screenshot,mcp__playwright__browser_select_option,mcp__playwright__browser_press_key,mcp__playwright__browser_evaluate'
    );
  }

  const proc = spawn('claude', args, { timeout: 300000 });
  let stdout = '', stderr = '';

  proc.stdout.on('data', d => { process.stdout.write('.'); stdout += d.toString(); });
  proc.stderr.on('data', d => { stderr += d.toString(); });

  proc.on('close', code => {
    console.log(''); // newline após dots
    if (code !== 0 && !stdout.trim()) {
      console.error('Erro:', stderr.substring(0, 200));
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: stderr || 'Erro no claude CLI' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ text: stdout.trim() }));
  });

  proc.on('error', err => {
    console.error('spawn error:', err.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  });

  proc.stdin.write(prompt);
  proc.stdin.end();
}

// ── Start ──────────────────────────────────────────────────────
server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n✈️  Cheap Flights Squad — http://localhost:${PORT}`);
  console.log(`   /api/chat   → estratégia (sem browser)`);
  console.log(`   /api/search → busca real com Playwright\n`);
  require('child_process').exec(`open http://localhost:${PORT}`);
});

process.on('SIGINT', () => { console.log('\nEncerrado.'); process.exit(0); });
