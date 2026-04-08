#!/usr/bin/env bash
# hook-permission-discord.sh — Permission request via Discord button components
#
# Sends a permission request with Approve/Deny buttons to Discord.
# Polls for button interaction response.
#
# Epic 110 Story 110.18

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DISCORD_TOKEN="${DISCORD_TOKEN:-}"
CHANNEL_ID="${DISCORD_CHANNEL_ID:-}"

if [[ -z "${DISCORD_TOKEN}" || -z "${CHANNEL_ID}" ]]; then
    echo '{"hookSpecificOutput":{"decision":"deny"}}'
    exit 0
fi

# Read hook input from stdin
HOOK_INPUT=$(cat 2>/dev/null || echo '{}')
TOOL_NAME=$(echo "${HOOK_INPUT}" | jq -r '.tool_name // "unknown"' 2>/dev/null || echo "unknown")

REQ_ID="perm-$(date +%s)-$$"

# Send message with button components
RESPONSE=$(curl -s -X POST "https://discord.com/api/v10/channels/${CHANNEL_ID}/messages" \
    -H "Authorization: Bot ${DISCORD_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{
        \"content\": \"**Permission Request**\\nTool: \`${TOOL_NAME}\`\\nID: ${REQ_ID}\",
        \"components\": [{
            \"type\": 1,
            \"components\": [
                {\"type\": 2, \"style\": 3, \"label\": \"Approve\", \"custom_id\": \"${REQ_ID}_approve\"},
                {\"type\": 2, \"style\": 4, \"label\": \"Deny\", \"custom_id\": \"${REQ_ID}_deny\"}
            ]
        }]
    }" 2>/dev/null)

MSG_ID=$(echo "${RESPONSE}" | jq -r '.id // ""' 2>/dev/null || echo "")

# Poll for interaction (button click) — check channel messages for response pattern
TIMEOUT=1800
ELAPSED=0
while [[ ${ELAPSED} -lt ${TIMEOUT} ]]; do
    # Check for a reply message containing the approval decision
    MSGS=$(curl -s "https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?after=${MSG_ID}&limit=5" \
        -H "Authorization: Bot ${DISCORD_TOKEN}" 2>/dev/null)

    # Look for approve/deny in replies
    DECISION=$(echo "${MSGS}" | python3 -c "
import json, sys
try:
    msgs = json.loads(sys.stdin.read())
    for m in msgs:
        content = m.get('content', '').lower()
        if 'approve' in content or 'yes' in content or 'ok' in content:
            print('approve'); sys.exit()
        if 'deny' in content or 'no' in content or 'reject' in content:
            print('deny'); sys.exit()
except: pass
" 2>/dev/null)

    if [[ -n "${DECISION}" ]]; then
        echo "{\"hookSpecificOutput\":{\"decision\":\"${DECISION}\"}}"
        exit 0
    fi

    sleep 3
    ELAPSED=$((ELAPSED + 3))
done

# Timeout — fail-closed
echo '{"hookSpecificOutput":{"decision":"deny"}}'
exit 0
