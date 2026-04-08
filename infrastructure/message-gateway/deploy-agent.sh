#!/usr/bin/env bash
# deploy-agent.sh — Deploy AIOX Telegram Agent (100% local, zero external dependency)
#
# Source of truth:
#   - SOUL.md:        .aiox/message-gateway/SOUL.md
#   - Product config: .aiox/message-gateway/config.yaml
#   - Infra templates: infrastructure/message-gateway/*.template
#   - Gateway core:   infrastructure/message-gateway/core/ (internalized from CRM, MIT)
#
# Runtime target:
#   - Agent dir:  infrastructure/message-gateway/agents/aiox-master/
#   - Secrets:    ~/.claude-remote/default/config/aiox-master/.env
#
# Usage:
#   bash infrastructure/message-gateway/deploy-agent.sh
#
# Story 110.15: Zero external dependency — CRM internalized as AIOX feature

set -euo pipefail

# --- Resolve paths ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SINKRA_HUB_PATH="$(cd "${SCRIPT_DIR}/../.." && pwd)"
GATEWAY_ROOT="${SCRIPT_DIR}"

AGENT_NAME="aiox-master"
SOUL_SOURCE="${SINKRA_HUB_PATH}/.aiox/message-gateway/SOUL.md"
CONFIG_TEMPLATE="${SCRIPT_DIR}/config.json.template"
CLAUDE_TEMPLATE="${SCRIPT_DIR}/CLAUDE.md.template"
RUNTIME_DIR="${SINKRA_HUB_PATH}/.aiox/message-gateway"
AGENT_DIR="${RUNTIME_DIR}/agents/${AGENT_NAME}"
AGENT_TEMPLATE="${GATEWAY_ROOT}/agents/agent-template"
ENV_DIR="${HOME}/.claude-remote/default/config/${AGENT_NAME}"
ENV_FILE="${ENV_DIR}/.env"

# --- Validation ---
echo "==========================================="
echo "  AIOX Message Gateway — Deploy"
echo "==========================================="
echo ""
echo "  Sinkra Hub:    ${SINKRA_HUB_PATH}"
echo "  Framework:     ${GATEWAY_ROOT}"
echo "  Runtime:       ${RUNTIME_DIR}"
echo "  Agent:         ${AGENT_NAME}"
echo ""

if [[ ! -f "${SOUL_SOURCE}" ]]; then
    echo "ERROR: SOUL.md not found at ${SOUL_SOURCE}"
    exit 1
fi

if [[ ! -f "${CONFIG_TEMPLATE}" ]]; then
    echo "ERROR: config.json.template not found at ${CONFIG_TEMPLATE}"
    exit 1
fi

if [[ ! -d "${GATEWAY_ROOT}/core" ]]; then
    echo "ERROR: Gateway core not found at ${GATEWAY_ROOT}/core/"
    echo "This should not happen — core/ is part of the repo."
    exit 1
fi

# --- Check gateway is installed ---
if [[ ! -d "${HOME}/.claude-remote/default" ]]; then
    echo "Gateway not installed. Running install.sh..."
    bash "${GATEWAY_ROOT}/install.sh"
fi

# --- Create runtime + agent directory ---
mkdir -p "${RUNTIME_DIR}/agents"
echo "Creating agent directory..."
if [[ -d "${AGENT_DIR}" ]]; then
    echo "  Agent dir exists — updating files..."
else
    echo "  Copying from agent-template..."
    cp -r "${AGENT_TEMPLATE}" "${AGENT_DIR}"
fi

# --- Deploy SOUL.md ---
echo "Deploying SOUL.md..."
cp "${SOUL_SOURCE}" "${AGENT_DIR}/SOUL.md"

# --- Deploy CLAUDE.md ---
echo "Deploying CLAUDE.md..."
cp "${CLAUDE_TEMPLATE}" "${AGENT_DIR}/CLAUDE.md"

# --- Deploy config.json (resolve template variables) ---
echo "Deploying config.json..."
sed "s|\${SINKRA_HUB_PATH}|${SINKRA_HUB_PATH}|g" "${CONFIG_TEMPLATE}" > "${AGENT_DIR}/config.json"

# --- Deploy advanced hooks settings.json ---
SETTINGS_TEMPLATE="${GATEWAY_ROOT}/settings.json.aiox-master"
if [[ -f "${SETTINGS_TEMPLATE}" ]]; then
    echo "Deploying advanced hooks settings.json..."
    mkdir -p "${AGENT_DIR}/.claude"
    cp "${SETTINGS_TEMPLATE}" "${AGENT_DIR}/.claude/settings.json"
fi

# --- Setup .env (secrets — outside repo) ---
mkdir -p "${ENV_DIR}"

if [[ -f "${ENV_FILE}" ]]; then
    echo "Secrets .env exists at ${ENV_FILE} — preserving."
else
    echo ""
    echo "==========================================="
    echo "  SECRETS REQUIRED"
    echo "==========================================="
    echo ""
    echo "  Create ${ENV_FILE} with:"
    echo ""
    echo "    BOT_TOKEN=<your-telegram-bot-token>"
    echo "    CHAT_ID=<your-telegram-chat-id>"
    echo "    ALLOWED_USER=<your-telegram-user-id>"
    echo ""
    echo "  Then re-run this script."
    echo ""

    cat > "${ENV_FILE}" << 'ENVEOF'
BOT_TOKEN=
CHAT_ID=
ALLOWED_USER=
ENVEOF
    chmod 600 "${ENV_FILE}"
fi

# --- Symlink .env from secure location into agent dir ---
if [[ -f "${ENV_FILE}" ]]; then
    ln -sf "${ENV_FILE}" "${AGENT_DIR}/.env"
    echo "Linked .env: ${AGENT_DIR}/.env -> ${ENV_FILE}"
fi

# --- Verify ---
echo ""
echo "==========================================="
echo "  Deploy Complete"
echo "==========================================="
echo ""
echo "  Agent Dir:     ${AGENT_DIR}"
echo "  SOUL.md:       $(wc -l < "${AGENT_DIR}/SOUL.md") lines"
echo "  config.json:   $(cat "${AGENT_DIR}/config.json" | python3 -c "import sys,json; c=json.load(sys.stdin); print(f'model={c.get(\"model\",\"default\")}, working_dir={c.get(\"working_directory\",\"unset\")}')" 2>/dev/null || echo "parsed")"
echo "  .env:          $(if grep -q 'BOT_TOKEN=.\+' "${AGENT_DIR}/.env" 2>/dev/null; then echo "configured"; else echo "NEEDS CONFIGURATION"; fi)"
echo ""
echo "  Next steps:"
echo "    1. Ensure .env has BOT_TOKEN, CHAT_ID, ALLOWED_USER"
echo "    2. Run: bash ${GATEWAY_ROOT}/enable-agent.sh ${AGENT_NAME}"
echo "    3. Send a message to your Telegram bot"
echo ""
