#!/usr/bin/env bash
# send-web.sh — Send message to local Web Chat
#
# Posts a message to the local web chat server's API.
#
# Usage: bash send-web.sh <recipient_id> "<message>" [--image /path]
#
# Environment:
#   WEB_PORT - Web chat port (default: 8080)
#   WEB_HOST - Web chat host (default: localhost)
#
# Epic 110 Story 110.17

set -uo pipefail

WEB_HOST="${WEB_HOST:-localhost}"
WEB_PORT="${WEB_PORT:-8080}"
RECIPIENT="${1:-agent}"
MESSAGE="${2:-}"

curl -s -X POST "http://${WEB_HOST}:${WEB_PORT}/api/messages" \
    -H "Content-Type: application/json" \
    -d "$(python3 -c "import json; print(json.dumps({'from': 'agent', 'to': '$RECIPIENT', 'text': '''$MESSAGE'''}))" 2>/dev/null || echo "{\"from\":\"agent\",\"text\":\"${MESSAGE}\"}")" \
    > /dev/null 2>&1 || true
