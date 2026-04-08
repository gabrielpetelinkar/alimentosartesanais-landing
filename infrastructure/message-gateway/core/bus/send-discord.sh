#!/usr/bin/env bash
# send-discord.sh — Send message to Discord channel via REST API
#
# Usage: bash send-discord.sh <channel_id> "<message>"
#
# Environment:
#   DISCORD_TOKEN - Discord bot token
#
# Epic 110 Story 110.18

set -uo pipefail

CHANNEL_ID="$1"
MESSAGE="${2:-}"
DISCORD_TOKEN="${DISCORD_TOKEN:-}"

if [[ -z "${DISCORD_TOKEN}" ]]; then
    echo "ERROR: DISCORD_TOKEN not set" >&2
    exit 1
fi

# Discord uses a 2000 char limit per message
if [[ ${#MESSAGE} -gt 2000 ]]; then
    # Split into chunks
    while [[ ${#MESSAGE} -gt 0 ]]; do
        CHUNK="${MESSAGE:0:2000}"
        MESSAGE="${MESSAGE:2000}"
        curl -s -X POST "https://discord.com/api/v10/channels/${CHANNEL_ID}/messages" \
            -H "Authorization: Bot ${DISCORD_TOKEN}" \
            -H "Content-Type: application/json" \
            -d "$(python3 -c "import json; print(json.dumps({'content': '''${CHUNK}'''}))" 2>/dev/null)" \
            > /dev/null 2>&1
    done
else
    curl -s -X POST "https://discord.com/api/v10/channels/${CHANNEL_ID}/messages" \
        -H "Authorization: Bot ${DISCORD_TOKEN}" \
        -H "Content-Type: application/json" \
        -d "$(python3 -c "import json; print(json.dumps({'content': '''${MESSAGE}'''}))" 2>/dev/null)" \
        > /dev/null 2>&1
fi
