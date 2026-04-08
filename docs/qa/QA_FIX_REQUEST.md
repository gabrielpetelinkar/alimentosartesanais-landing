# QA Fix Request — Landing Page Ebook Produtores Artesanais

**From:** Quinn (QA) | **To:** @dev (Dex)
**Date:** 2026-02-22
**Gate Verdict:** CONCERNS — 3 HIGH issues to resolve

---

## H1: HOTMART_CHECKOUT_URL não utilizado

**File:** `js/main.js:6`
**Severity:** HIGH
**Issue:** A constante `HOTMART_CHECKOUT_URL` é declarada mas nunca utilizada. Os 3 CTAs no `index.html` têm URLs hardcoded diretamente no `href`.
**Fix:** Remover a constante não utilizada do `main.js` (dead code). As URLs nos CTAs do HTML são o approach correto para uma página estática sem build step.

---

## H2: aria-expanded não atualizado no FAQ accordion

**File:** `js/main.js:18-30`
**Severity:** HIGH (Acessibilidade)
**Issue:** Os botões FAQ têm `aria-expanded="false"` no HTML, mas o JS não atualiza esse atributo quando o item é ativado/desativado. Screen readers não comunicam o estado ao usuário.
**Fix:** No `initAccordion()`, ao toggling classes, também fazer:
- Resetar todos os `aria-expanded` para `"false"` ao fechar
- Setar `aria-expanded="true"` no item ativo

---

## H3: Footer links apontam para #

**File:** `index.html:500-501`
**Severity:** HIGH (Legal/Compliance)
**Issue:** Links de "Política de Privacidade" e "Termos de Uso" apontam para `#`. Para rodar Meta Ads, a política de privacidade é obrigatória e deve estar acessível.
**Fix:** Criar arquivo `privacidade.html` com política de privacidade básica (mencionando uso de GA4, Meta Pixel e cookies) e atualizar os links no footer. Termos de Uso pode manter placeholder por enquanto.

---

## Re-review criteria

Após os fixes, o gate será reavaliado. Critérios para PASS:
- [ ] H1: Sem dead code em main.js
- [ ] H2: aria-expanded toggle funcional no FAQ
- [ ] H3: Link de Política de Privacidade funcional
