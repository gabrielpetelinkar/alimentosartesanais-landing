# Task: Scale Perpetual Revenue

## Metadata
- **task_name:** Scale Perpetual Revenue
- **status:** pending
- **responsible_executor:** @creator-os:leandro-ladeira
- **execution_type:** Hybrid
- **estimated_time:** 2-4h (analysis) + ongoing optimization
- **input:**
  - Running perpetual funnel with at least 30 days of data
  - Current metrics: CPL, CPA, ROAS, conversion rates per stage
  - Current daily/monthly revenue
  - Traffic sources and budgets
  - Product details (price, upsells, ticket medio)
- **output:**
  - Funnel diagnostic with bottleneck identification
  - Stage-by-stage optimization plan
  - Traffic scaling strategy (budget expansion + new sources)
  - Upsell/downsell architecture for ticket medio increase
  - A/B testing roadmap
  - Revenue scaling projection (30/60/90 day targets)
- **acceptance_criteria:**
  - Current funnel metrics analyzed and bottlenecks identified
  - Optimization plan addresses the weakest funnel stage first
  - Traffic scaling plan includes budget milestones and new sources
  - Upsell architecture designed to increase ticket medio by 20-50%
  - A/B testing calendar with specific elements to test
  - Revenue projections based on realistic ROAS improvements

## Elicitation (Required)

### Step 1: Current Metrics
1. "What are your current funnel metrics? (CPL, conversion rates, ROAS)"
2. "What is your daily/monthly revenue from perpetual?"
3. "What is your current daily ad spend?"
4. "What is your ticket medio (average revenue per customer, including bumps/upsells)?"
5. "How long has the funnel been running?"

### Step 2: Funnel Health
1. "What is your landing page conversion rate?"
2. "What is your sales page conversion rate?"
3. "What is your checkout conversion rate?"
4. "What is your email open rate and click rate?"
5. "Do you have cart recovery emails running? What's the recovery rate?"

### Step 3: Growth Goals
1. "What is your revenue target for the next 90 days?"
2. "How much can you increase your daily ad budget?"
3. "Are you open to adding new traffic sources? (Google, YouTube, TikTok)"
4. "Do you have team members who can help with execution?"
5. "Are you running any organic traffic alongside paid? (Stories, content)"

## Action Items

### Phase 1: Funnel Diagnostic

**Diagnose by position — when metrics are below target:**

| Metric | Target | If Below Target → Fix |
|--------|--------|----------------------|
| CPL (Cost per Lead) | R$2-R$15 | Ad creatives, audience targeting, landing page headline |
| Landing page conversion | 25-35% | Headline, copy, design, page speed, mobile experience |
| Sales page conversion | 1-5% | Apply missing 12-step elements, improve copy, add proof |
| Checkout conversion | 30-50% | Simplify form, add trust badges, offer PIX, show guarantee |
| Email open rate | 15-25% | Subject lines, send time, sender name, list hygiene |
| Email click rate | 2-5% | Email copy, CTA placement, personalization |
| ROAS | 2x minimum | Fix the weakest stage FIRST, then scale |
| Cart recovery rate | 5-15% | Sequence timing, copy, incentive (bonus or discount) |

**Rule:** Always fix the WEAKEST stage first. Improving a 15% landing page to 25% is easier and more impactful than improving a 3% sales page to 4%.

### Phase 2: Traffic Scaling Strategy

**Scaling Rules:**
1. Only scale when ROAS is consistently > 2x for 7+ days
2. Increase budget by 20-30% at a time (not 2x overnight)
3. Wait 3-5 days after each increase before evaluating
4. If ROAS drops below 1.5x after scaling, pause and diagnose

**Traffic Expansion Roadmap:**

| Phase | Daily Budget | Sources | Timeline |
|-------|-------------|---------|----------|
| Foundation | R$30-50/day | Facebook/Instagram Ads | Month 1-2 |
| Optimization | R$100-200/day | FB/IG + Retargeting | Month 3-4 |
| Expansion | R$300-500/day | FB/IG + Google Ads | Month 5-6 |
| Scale | R$500-1000+/day | Multi-platform + YouTube | Month 7-12 |

**New Traffic Source Checklist:**
- [ ] Master one source first (FB/IG Ads recommended)
- [ ] Add retargeting on the same platform
- [ ] Add Google Search Ads for high-intent keywords
- [ ] Add YouTube Ads for top-of-funnel awareness
- [ ] Add organic layer (Stories 10x, content marketing)
- [ ] Test TikTok Ads for younger demographics (if applicable)

### Phase 3: Increase Ticket Medio

**Current ticket = product price. Target = product + 30-50% from bumps/upsells.**

| Strategy | Impact | Implementation |
|----------|--------|---------------|
| Order bump optimization | +R$30-60 per sale | Test different bumps, improve copy |
| Upsell page improvement | +R$150-500 per accepting buyer | Better offer, video upsell, urgency |
| Add downsell | +R$50-100 per upsell decliner | Lighter version of upsell |
| Post-purchase email upsell | +R$100-300 (7-14 days later) | New offer to existing buyers |
| Annual/premium tier | +R$500-2000 per upgrade | Premium coaching, community, done-for-you |

### Phase 4: A/B Testing Roadmap

**Priority order (highest impact first):**

| Priority | Element to Test | What to Test |
|----------|----------------|-------------|
| 1 | Ad creatives | Headlines, images/videos, hooks |
| 2 | Landing page headline | Different angles, premises, promises |
| 3 | Sales page headline | Same as above |
| 4 | Email subject lines | Curiosity, benefit, urgency, personal |
| 5 | CTA button copy | Benefit-driven text variations |
| 6 | Price presentation | Installments vs full price, anchoring |
| 7 | Order bump offer | Different products, prices, copy |
| 8 | Checkout page | Form fields, trust elements, layout |

**Testing Rules:**
- Test ONE element at a time
- Run each test for minimum 7 days or 100 conversions (whichever comes first)
- Statistical significance > 90% before declaring a winner
- Document every test in a log (what, why, result, action)

### Phase 5: Revenue Projection

**Conservative projection formula:**
```
Daily leads = Daily budget / CPL
Monthly leads = Daily leads x 30
Monthly sales = Monthly leads x Sales conversion rate
Monthly revenue = Monthly sales x Ticket medio
Monthly ROAS = Monthly revenue / Monthly ad spend
```

**Scaling projection template:**

| Month | Daily Budget | CPL | Leads/Day | Conv Rate | Sales/Month | Ticket Medio | Revenue | ROAS |
|-------|-------------|-----|-----------|-----------|-------------|-------------|---------|------|
| Current | R$[X] | R$[X] | [X] | [X]% | [X] | R$[X] | R$[X] | [X]x |
| +30 days | R$[X] | R$[X] | [X] | [X]% | [X] | R$[X] | R$[X] | [X]x |
| +60 days | R$[X] | R$[X] | [X] | [X]% | [X] | R$[X] | R$[X] | [X]x |
| +90 days | R$[X] | R$[X] | [X] | [X]% | [X] | R$[X] | R$[X] | [X]x |

## Output Example

```
SCALING PLAN: [Product Name]

═══ DIAGNOSTIC ═══
Weakest stage: [Stage] at [X]% (target: [Y]%)
Bottleneck: [Specific issue]
Priority fix: [Action]

═══ OPTIMIZATION PLAN ═══
1. [Stage] — [Specific optimization] — Expected impact: [X]%
2. [Stage] — [Specific optimization] — Expected impact: [X]%
3. [Stage] — [Specific optimization] — Expected impact: [X]%

═══ TRAFFIC SCALING ═══
Current: R$[X]/day → Target: R$[X]/day
Timeline: [X] months
New sources: [List]

═══ TICKET MEDIO ═══
Current: R$[X] → Target: R$[X]
Strategy: [Order bump + upsell plan]

═══ REVENUE PROJECTION ═══
Current: R$[X]/month
30 days: R$[X]/month
60 days: R$[X]/month
90 days: R$[X]/month
```

## Veto Conditions
- Funnel has less than 30 days of data → WARN, need baseline data before optimizing
- ROAS below 1x with no clear diagnosis → STOP, fix fundamentals before scaling
- Scaling budget by more than 50% overnight → STOP, scale 20-30% at a time
- No A/B testing plan → WARN, scaling without testing wastes budget
- Ignoring organic traffic entirely → WARN, organic improves margins significantly
- No cart recovery emails → STOP, this is free money being left on the table

## Handoff
When scaling is underway:
- @creator-os:stu-mclaren — convert one-time buyers into recurring members
- @creator-os:leandro-ladeira (stories-10x-strategy.md) — boost organic layer
- @creator-os:nicolas-cole — content scaling for organic traffic growth
