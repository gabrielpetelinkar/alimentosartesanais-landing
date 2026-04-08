#!/usr/bin/env bash
# send-channel.sh — Channel-agnostic message sender (router)
#
# Routes messages to the correct channel adapter based on CHANNEL_TYPE.
# All business logic scripts call THIS instead of send-telegram.sh directly.
#
# Usage:
#   bash send-channel.sh <recipient_id> "<message>" [--image /path]
#
# Environment:
#   CHANNEL_TYPE    - Channel to use (telegram|web|discord). Default: telegram
#   CHAT_ID         - Telegram chat ID (when CHANNEL_TYPE=telegram)
#   BOT_TOKEN       - Telegram bot token (when CHANNEL_TYPE=telegram)
#   WEB_PORT        - Web chat port (when CHANNEL_TYPE=web, default: 8080)
#   DISCORD_TOKEN   - Discord bot token (when CHANNEL_TYPE=discord)
#
# Epic 110 Story 110.16 — Channel Abstraction Layer

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CHANNEL_TYPE="${CHANNEL_TYPE:-telegram}"
RECIPIENT="$1"
MESSAGE="${2:-}"
shift 2 || true

case "${CHANNEL_TYPE}" in
    telegram)
        bash "${SCRIPT_DIR}/send-telegram.sh" "${RECIPIENT}" "${MESSAGE}" "$@"
        ;;
    web)
        bash "${SCRIPT_DIR}/send-web.sh" "${RECIPIENT}" "${MESSAGE}" "$@"
        ;;
    discord)
        bash "${SCRIPT_DIR}/send-discord.sh" "${RECIPIENT}" "${MESSAGE}" "$@"
        ;;
    *)
        echo "ERROR: Unknown CHANNEL_TYPE=${CHANNEL_TYPE}. Supported: telegram, web, discord" >&2
        exit 1
        ;;
esac
