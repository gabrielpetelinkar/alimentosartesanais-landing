# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What Is This Project

Synkra AIOS is an AI-Orchestrated System for Full Stack Development — a meta-framework that orchestrates AI agents through story-driven workflows. It is **not** a traditional application codebase; it is a development orchestration framework where agents (activated via `@agent-name`) execute tasks defined in markdown/YAML files.

The project is currently **greenfield** with no git repository initialized. Framework version is 4.2.13 (Pro enabled).

## Commands

Root `package.json` has no build/test/lint scripts. All tooling lives inside `.aios-core/`:

```bash
# Tests (run from .aios-core/)
cd .aios-core && npm run test:unit
cd .aios-core && npm run test:integration

# Linting & type checking (run from .aios-core/)
cd .aios-core && npm run lint
cd .aios-core && npm run typecheck
```

When a target project is being developed under this framework, use that project's own scripts for build/test/lint.

## Architecture

### Execution Model

The system follows a **task-first principle**: workflows are composed of connected tasks, not connected agents. Agents are the default executors, but the task definition (inputs, outputs, pre/post-conditions) is the source of truth.

```
User activates agent (@dev, @qa, etc.)
  → Agent reads task definition from .aios-core/development/tasks/
  → Task may include elicitation points (interactive prompts)
  → Agent executes task steps sequentially
  → Quality gates validate output
  → Status tracked in story files (docs/stories/)
```

### Key Directories

| Path | Purpose |
|------|---------|
| `.aios-core/development/agents/` | 12 agent persona definitions (markdown with YAML frontmatter) |
| `.aios-core/development/tasks/` | 200+ executable task definitions — the core of the system |
| `.aios-core/development/workflows/` | Multi-step workflow orchestrations (YAML) |
| `.aios-core/development/templates/` | Document and code generation templates |
| `.aios-core/development/scripts/` | 24+ JS utility scripts (story-manager, git-wrapper, etc.) |
| `.aios-core/core/` | Runtime engine — orchestration, elicitation, quality gates, IDS, synapse |
| `.aios-core/core-config.yaml` | Central framework configuration |
| `.aios-core/constitution.md` | 6 inviolable principles governing all agents |
| `docs/stories/` | Development stories (numbered by epic.story) |
| `docs/prd/` | Sharded PRD documents |
| `docs/architecture/` | Sharded architecture documents |
| `squads/` | Premium squad templates |

### Core Runtime Modules (`.aios-core/core/`)

- **orchestration/** (35 modules) — Agent coordination, workflow routing, task dispatching
- **elicitation/** — Interactive prompting engine (`elicitation-engine.js`, `session-manager.js`)
- **execution/** — Task execution engine with mode support (YOLO, Interactive, Pre-Flight)
- **quality-gates/** — Automated validation gates (G1-G6)
- **ids/** — Incremental Development System (REUSE > ADAPT > CREATE)
- **synapse/** — Memory bridge system, injected via hooks on each prompt
- **session/** — Session context management and state tracking

Entry points: `.aios-core/core/index.js` (CJS) and `index.esm.js` (ESM), exporting MetaAgent, TaskManager, ElicitationEngine, etc.

### Hook System

The SYNAPSE hook (`.claude/hooks/synapse-engine.js`) fires on every `UserPromptSubmit`, injecting context rules via `.aios-core/core/synapse/runtime/hook-runtime.js`. It has a 5s safety timeout and silently exits on errors to never block the user.

## Agent System

Agents are activated with `@agent-name` syntax. Commands use the `*` prefix (e.g., `*help`, `*create-story`).

| Agent | ID | Primary Authority |
|-------|-----|-------------------|
| AIOS Master | `@aios-master` | Framework governance, can execute any task |
| Developer (Dex) | `@dev` | Implementation, local git ops (NOT push) |
| QA | `@qa` | Quality verdicts, review gates |
| Architect (Aria) | `@architect` | System design, technology selection |
| Scrum Master (River) | `@sm` | Story creation |
| Product Owner (Pax) | `@po` | Story validation (10-point checklist) |
| Product Manager (Morgan) | `@pm` | Epic orchestration, requirements, specs |
| DevOps (Gage) | `@devops` | EXCLUSIVE: git push, PRs, releases, MCP management |
| Data Engineer (Dara) | `@data-engineer` | Schema design, migrations, RLS |
| Analyst | `@analyst` | Business analysis, research |
| UX Design Expert | `@ux-design-expert` | UX/UI design |
| Squad Creator | `@squad-creator` | Squad template creation |

Agent definitions live in `.aios-core/development/agents/{id}.md` with full persona, commands, and task dependencies.

## Constitution (Non-Negotiable)

Six principles from `.aios-core/constitution.md` that ALL agents must follow:

1. **CLI First** — CLI is source of truth. No UI before CLI works.
2. **Agent Authority** — Exclusive authorities cannot be violated. Only `@devops` pushes.
3. **Story-Driven** — No code without an associated story. Track progress via checkboxes.
4. **No Invention** — Specs derive only from requirements (FR-\*, NFR-\*, CON-\*).
5. **Quality First** — All quality gates must pass before merge.
6. **Absolute Imports** — Use `@/` aliases, not `../../../`.

## Story-Driven Development

All work flows through stories in `docs/stories/`:

1. `@sm` creates story → status: **Draft**
2. `@po` validates (10-point checklist, GO if >=7) → status: **Ready**
3. `@dev` implements → status: **InProgress**
4. `@qa` reviews (7 quality checks) → status: **InReview** → **Done**
5. `@devops` pushes

When implementing: update checkboxes `[ ]` → `[x]`, maintain the File List section, and follow acceptance criteria exactly.

## Conventions

- **Commits**: Conventional format with story reference — `feat: implement X [Story 2.1]`
- **Stories**: Named `{epicNum}.{storyNum}.story.md`
- **Decisions**: Logged in ADR format at `.ai/`
- **Dev execution modes**: YOLO (autonomous, 0-1 prompts), Interactive (default, 5-10 prompts), Pre-Flight (all questions upfront)
- **CodeRabbit**: Auto-fixes CRITICAL/HIGH issues, max 2 iterations in dev, 3 in QA. MEDIUM logged as tech debt, LOW ignored.
- **Dev file loads**: Framework expects `docs/framework/coding-standards.md`, `docs/framework/tech-stack.md`, `docs/framework/source-tree.md` on `@dev` activation

## Configuration

- `.aios-core/core-config.yaml` — Central framework config (IDE selection, PRD location, QA settings, feature flags)
- `.aios/project-status.yaml` — Auto-updated project state (current epic/story, git status)
- `.env` — Environment variables (never commit)
- `.claude/settings.local.json` — Local Claude Code permissions and hooks (gitignored)

## Multi-IDE Support

The framework targets 4 IDEs simultaneously. Each has its own config directory:

| IDE | Config Dir | Agent Definitions |
|-----|-----------|-------------------|
| Claude Code | `.claude/` | Rules in `.claude/rules/`, hooks in `.claude/hooks/` |
| Codex | `.codex/` | Uses `AGENTS.md` at root |
| Gemini | `.gemini/` | Rules and hooks mirrored from Claude |
| Antigravity | `.antigravity/` | Separate rules and agent configs |

---
*Synkra AIOS v4.2.13 — Claude Code Configuration*
