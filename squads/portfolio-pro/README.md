# Portfolio Pro Squad

Professional portfolio creation squad powered by 8 elite minds with documented frameworks.

## Overview

Portfolio Pro creates high-impact professional portfolios through a 5-phase pipeline:

```
Brand Diagnosis → Narrative → Design → Case Studies → Sharing Strategy
```

Each phase is handled by specialized agents cloned from real experts with documented methodologies.

## Quick Start

```bash
# Activate the orchestrator
@portfolio-pro:portfolio-pro-chief

# Or activate a specific agent
@portfolio-pro:dorie-clark        # Brand diagnosis
@portfolio-pro:donald-miller      # Narrative architecture
@portfolio-pro:chris-do           # Design direction
@portfolio-pro:sarah-doody        # Case study writing
```

## Agents

### Tier 0 — Diagnosis (First Contact)

| Agent | Expert | Framework | Purpose |
|-------|--------|-----------|---------|
| `dorie-clark` | Dorie Clark | Reinvention Framework, Stand Out | Brand positioning & strategy |
| `william-arruda` | William Arruda | 360Reach, 3 C's | Brand assessment & audit |

### Tier 1 — Masters (Core Execution)

| Agent | Expert | Framework | Purpose |
|-------|--------|-----------|---------|
| `donald-miller` | Donald Miller | StoryBrand SB7 | Professional narrative |
| `chris-do` | Chris Do | Story/Values/Gift/Attention | Design direction & brand |
| `sarah-doody` | Sarah Doody | 5-Step Case Study, Portfolio Formula | Case study writing |

### Tier 2 — Systematizers (Frameworks)

| Agent | Expert | Framework | Purpose |
|-------|--------|-----------|---------|
| `nancy-duarte` | Nancy Duarte | VisualStory, Resonate, Slidedocs | Visual storytelling system |
| `ellen-lupton` | Ellen Lupton | Thinking with Type, Design Is Storytelling | Typography & design system |
| `austin-kleon` | Austin Kleon | Show Your Work (10 Rules) | Sharing strategy |

### Orchestrator

| Agent | Purpose |
|-------|---------|
| `portfolio-pro-chief` | Routes requests, manages pipeline, coordinates agents |

## Commands

### Orchestrator Commands
| Command | Description |
|---------|-------------|
| `*full-pipeline` | Run complete 5-phase portfolio creation |
| `*diagnose-brand` | Route to Phase 1 (brand diagnosis) |
| `*build-narrative` | Route to Phase 2 (narrative) |
| `*design-portfolio` | Route to Phase 3 (design) |
| `*write-cases` | Route to Phase 4 (case studies) |
| `*share-strategy` | Route to Phase 5 (sharing) |
| `*status` | Show current pipeline progress |
| `*help` | Show all commands |

## Workflows

| Workflow | Phases | Duration |
|----------|--------|----------|
| `wf-portfolio-pipeline.yaml` | 5 phases, human checkpoints | 4-8 hours |

## File Structure

```
squads/portfolio-pro/
├── agents/
│   ├── portfolio-pro-chief.md    # Orchestrator
│   ├── dorie-clark.md            # Tier 0: Brand positioning
│   ├── william-arruda.md         # Tier 0: Brand assessment
│   ├── donald-miller.md          # Tier 1: Narrative
│   ├── chris-do.md               # Tier 1: Design direction
│   ├── sarah-doody.md            # Tier 1: Case studies
│   ├── nancy-duarte.md           # Tier 2: Visual storytelling
│   ├── ellen-lupton.md           # Tier 2: Design systems
│   └── austin-kleon.md           # Tier 2: Sharing strategy
├── workflows/
│   └── wf-portfolio-pipeline.yaml
├── checklists/
│   └── portfolio-quality-checklist.md
├── data/
│   └── portfolio-pro-kb.md       # Knowledge base
├── config.yaml
└── README.md
```

## Target Client

**Giovana Petelinkar** — Communications & Digital Marketing professional with 7+ years experience in content strategy, social media management, copywriting, and creative leadership.

## Quality Standards

- All agents follow AIOS Hybrid Loader Architecture
- Portfolio validated against `portfolio-quality-checklist.md`
- Pass threshold: 7.0/10 across 5 quality dimensions
- Veto conditions enforce minimum standards per phase
