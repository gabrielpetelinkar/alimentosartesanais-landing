# ✈️ Squad: Cheap Flights

> **Encontrando passagens que o público geral não vê.**

Squad especializado em busca de passagens aéreas baratas usando todas as estratégias disponíveis: tarifas de erro, milhas brasileiras e internacionais, plataformas ocultas, consolidadores, técnicas táticas e award booking avançado.

---

## 🎯 Para que serve

- Encontrar tarifas de erro (70-95% desconto) antes que sejam corrigidas
- Emitir passagens com SMILES, LATAM Pass, TudoAzul, Azul Fidelidade
- Usar milhas internacionais para voar Business/First por preço de Economy
- Descobrir plataformas, OTAs e consolidadores que o público não conhece
- Travel hacking sistêmico: open-jaw, round-the-world, pricing por mercado
- Estratégia de cartões para acúmulo e maximização de milhas

---

## 🧠 Elite Minds do Squad

### TIER 0 — Diagnóstico (analisa antes de agir)

| Agent | Especialidade | Ativar |
|-------|---------------|--------|
| 🎯 Scott Keyes | Tarifas de erro, timing de compra, destino flexível | `@cheap-flights:scott-keyes` |
| 🇧🇷 Paulo Mafra | SMILES, LATAM Pass, TudoAzul, promoções BR | `@cheap-flights:paulo-mafra` |

### TIER 1 — Masters (execução principal)

| Agent | Especialidade | Ativar |
|-------|---------------|--------|
| 🏆 Gary Leff | Award booking avançado, parceiras, sweet spots | `@cheap-flights:gary-leff` |
| 💎 Ben Schlappig | Aspirational redemptions, plataformas ocultas | `@cheap-flights:ben-schlappig` |

### TIER 2 — Sistematizadores (frameworks estruturados)

| Agent | Especialidade | Ativar |
|-------|---------------|--------|
| 💳 Brian Kelly | Cartões de crédito, acúmulo e transferência de pontos | `@cheap-flights:brian-kelly` |
| 🔓 Chris Guillebeau | Travel hacking, consolidadores, táticas não-convencionais | `@cheap-flights:chris-guillebeau` |

### Orchestrator

| Agent | Função | Ativar |
|-------|--------|--------|
| ✈️ Cheap Flights Chief | Diagnóstico e roteamento para especialista certo | `@cheap-flights:cheap-flights-chief` |

---

## 🚀 Como usar

### Ponto de entrada (recomendado)
```
@cheap-flights:cheap-flights-chief
```
O Chief diagnostica seu caso e roteia para o especialista correto.

### Ativação direta por especialidade

```
# Encontrei passagem suspeita de ser tarifa de erro
@cheap-flights:scott-keyes

# Quero usar SMILES, LATAM Pass ou TudoAzul
@cheap-flights:paulo-mafra

# Tenho milhas internacionais (United, Amex, Chase)
@cheap-flights:gary-leff

# Quero voar Business/First com milhas
@cheap-flights:ben-schlappig

# Quero acumular milhas via cartões
@cheap-flights:brian-kelly

# Quero brechas táticas (open-jaw, consolidadores, OTAs ocultas)
@cheap-flights:chris-guillebeau
```

---

## 📋 Tasks disponíveis

| Task | Descrição | Como usar |
|------|-----------|-----------|
| `buscar-passagem` | Workflow completo de busca | `*buscar-passagem` |
| `otimizar-milhas` | Maximizar milhas existentes | `*otimizar-milhas` |
| `monitorar-tarifas` | Configurar alertas de preço | `*monitorar-tarifas` |

---

## 📚 Plataformas Cobertas

### Cash / Preço normal
- Google Flights, Momondo, Skyscanner
- Kiwi.com (self-transfer), JetRadar, Hopper
- Priceline Express Deals, Vayama, Tripsta

### Milhas Brasileiras
- SMILES (Gol), LATAM Pass, TudoAzul (Azul), Azul Fidelidade
- Livelo, Esfera, Membership Rewards Amex BR

### Milhas Internacionais
- United MileagePlus, AAdvantage, Delta SkyMiles
- Chase Ultimate Rewards, Amex Membership Rewards
- Air Canada Aeroplan, Virgin Atlantic Flying Club
- Turkish Miles&Smiles, Alaska Mileage Plan

### Award Booking
- Seats.aero, ExpertFlyer, AwardHacker, PointsYeah

### Consolidadores e OTAs Alternativas
- Airtreks (RTW), SkyBird Travel, Vayama
- MaxMilhas, Hotmilhas (milhas BR)
- Almundo, eDreams, BudgetAir

---

## ⚙️ Configuração

```yaml
Squad: cheap-flights
Versão: 1.0.0
Linguagem: pt-BR
Orquestrador: cheap-flights-chief
Agents: 7 (2 Tier0 + 2 Tier1 + 2 Tier2 + 1 Orchestrator)
```

---

*Squad cheap-flights v1.0 — Clone minds > create bots.*
