# AIOX Message Gateway

Multi-channel gateway for The Oracle (@aiox-master). Delivers the AIOX agent via Telegram, Web Chat, and Discord — same identity, same skills, same permissions across all channels.

## Architecture

```
You (any channel)
    │
    ├── Telegram ──→ fast-checker.sh (poll 3s)
    ├── Web Chat ──→ web-chat-server.py (localhost:8080)
    └── Discord  ──→ check-discord.sh (REST poll 5s)
            │
    send-channel.sh (router)
            │
    tmux paste-buffer
            │
    Claude Code (sinkra-hub)
      + SOUL.md (@aiox-master identity)
      + --dangerously-skip-permissions
      + Merged hooks (gateway + sinkra-hub)
            │
    launchd (auto-restart, --continue every 71h)
```

## Quick Start

```bash
# 1. Install (once)
bash infrastructure/message-gateway/install.sh

# 2. Configure channel (interactive)
bash infrastructure/message-gateway/setup-channel.sh

# 3. Deploy agent
bash infrastructure/message-gateway/deploy-agent.sh

# 4. Start
bash infrastructure/message-gateway/enable-agent.sh aiox-master
```

## Channel Setup Guides

### Telegram

1. Message `@BotFather` on Telegram → `/newbot` → get token
2. `setup-channel.sh` → `[1] Telegram` → paste token → sends test message
3. Deploy + enable → The Oracle responds on Telegram

### Web Chat

1. `setup-channel.sh` → `[2] Web Chat` → choose port (default 8080)
2. `python3 infrastructure/message-gateway/web-chat-server.py`
3. Open `http://localhost:8080` → chat in browser

### Discord

1. Create app at `discord.com/developers` → add bot → get token
2. Invite bot to server (scopes: bot; permissions: Send Messages, Read History)
3. `setup-channel.sh` → `[3] Discord` → paste token + channel ID

## File Structure

```
infrastructure/message-gateway/        ← COMMITTED (framework)
  core/bus/                            ← Channel adapters (send/check/hooks per channel)
  core/scripts/                        ← Agent lifecycle (wrapper, poller, launchd)
  deploy-agent.sh                      ← Generates agent in .aiox/
  enable-agent.sh / disable-agent.sh   ← Start/stop launchd service
  setup-channel.sh                     ← Interactive channel onboarding
  session-persist.sh                   ← SessionEnd → SQLite FTS5
  session-recall-server.py             ← MCP server for recall
  skill-lifecycle.py                   ← Skill promotion + security guard (73 patterns)
  artifact-tracker.sh                  ← SHA-256 drift detection
  web-chat-server.py                   ← Web Chat HTTP server
  tests/run-tests.sh                   ← 92 unit tests

.aiox/message-gateway/                 ← GITIGNORED (runtime)
  SOUL.md                              ← Agent identity
  config.yaml                          ← Skill thresholds + budget cap
  agents/aiox-master/                  ← Generated agent (CLAUDE.md, config, hooks)
```

## Management

| Action | Command |
|--------|---------|
| Configure channel | `bash infrastructure/message-gateway/setup-channel.sh` |
| Deploy | `bash infrastructure/message-gateway/deploy-agent.sh` |
| Start | `bash infrastructure/message-gateway/enable-agent.sh aiox-master` |
| Stop | `bash infrastructure/message-gateway/disable-agent.sh aiox-master` |
| View session | `tmux attach -t crm-default-aiox-master` |
| Logs | `tail -f ~/.claude-remote/default/logs/aiox-master/activity.log` |
| Skill status | `python3 infrastructure/message-gateway/skill-lifecycle.py status` |
| Run tests | `bash infrastructure/message-gateway/tests/run-tests.sh` |
| Web Chat | `python3 infrastructure/message-gateway/web-chat-server.py` |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Agent not starting | `launchctl list \| grep claude-remote` |
| Crashes repeatedly | Check `~/.claude-remote/default/logs/aiox-master/crashes.log` |
| Bot doesn't respond | Verify BOT_TOKEN: `curl https://api.telegram.org/bot<TOKEN>/getMe` |
| Trust prompt needed | `tmux attach -t crm-default-aiox-master` → approve → Ctrl-b d |
| Hooks not firing | Re-deploy: `bash infrastructure/message-gateway/deploy-agent.sh` |
| Web Chat won't connect | `curl http://localhost:8080/api/health` |

## Adding a New Channel

Create 3 files + update 3 routers:

1. `core/bus/send-<channel>.sh` — send message
2. `core/bus/check-<channel>.sh` — poll messages
3. `core/bus/hook-permission-<channel>.sh` — approval UI
4. Add case to `send-channel.sh`, `check-channel.sh`, `hook-permission-channel.sh`

Business logic (session-persist, skill-lifecycle, artifact-tracker) never changes.

## Security

- Blocklist hook blocks `git push`/`gh pr create` (Agent Authority)
- ALLOWED_USER filter per channel
- 73 regex security patterns block malicious auto-generated skills (8 categories)
- Secrets in `~/.claude-remote/` only (outside repo, chmod 600)
- All tokens gitignored

## License

Core scripts from [claude-remote-manager](https://github.com/grandamenium/claude-remote-manager) (MIT). See `LICENSE-CRM`.
