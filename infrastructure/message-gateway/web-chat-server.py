#!/usr/bin/env python3
"""
Web Chat Server — Local chat interface for AIOX Agent (Epic 110 Story 110.17)

Zero external dependency. Pure Python stdlib (http.server + threading).
Serves HTML chat UI + REST API for message exchange.

Usage:
    python3 web-chat-server.py [--port 8080]

API:
    GET  /                          → Chat UI (HTML)
    GET  /api/messages?since=N      → Poll messages since ID N
    POST /api/messages              → Send message {"from":"user","text":"..."}
    POST /api/permission            → Create permission request
    GET  /api/permission/<id>       → Poll permission response
    POST /api/permission/<id>       → Submit permission decision {"decision":"approve|deny"}
    POST /api/callback              → Callback for inline buttons
"""

import json
import os
import sys
import threading
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# --- State (in-memory, thread-safe) ---
lock = threading.Lock()
messages = []  # [{id, from, to, text, timestamp, channel}]
permissions = {}  # {req_id: {id, tool, input, decision, timestamp}}
msg_counter = 0

PORT = int(sys.argv[sys.argv.index("--port") + 1]) if "--port" in sys.argv else 8080
TMUX_SESSION = os.environ.get("TMUX_SESSION", "crm-default-aiox-master")

import subprocess as _sp

def inject_into_tmux(text: str):
    """Inject user message into tmux session (same pattern as fast-checker.sh)."""
    try:
        # Format like Telegram messages so CC recognizes it
        formatted = f'=== WEB CHAT from user ===\n{text}\nReply using: bash ../../core/bus/send-web.sh user "<your reply>"'
        # Use tmux load-buffer + paste-buffer (safer than send-keys for special chars)
        _sp.run(["tmux", "set-buffer", "-b", "web-inject", formatted], check=True, timeout=5)
        _sp.run(["tmux", "paste-buffer", "-b", "web-inject", "-t", TMUX_SESSION], check=True, timeout=5)
        _sp.run(["tmux", "send-keys", "-t", TMUX_SESSION, "Enter"], check=True, timeout=5)
    except Exception as e:
        print(f"[web-chat] tmux inject failed: {e}", file=sys.stderr)


def capture_tmux_output():
    """Background thread: capture tmux pane output and post agent responses."""
    global msg_counter
    last_capture = ""
    while True:
        try:
            result = _sp.run(
                ["tmux", "capture-pane", "-t", TMUX_SESSION, "-p", "-S", "-50"],
                capture_output=True, text=True, timeout=5
            )
            current = result.stdout.strip()
            if current != last_capture and current:
                # Find new lines since last capture
                new_part = current
                if last_capture:
                    # Find where the new content starts
                    idx = current.find(last_capture[-200:])
                    if idx >= 0:
                        new_part = current[idx + len(last_capture[-200:]):]

                # Look for agent responses (lines with send-web.sh or agent output)
                for line in new_part.split("\n"):
                    line = line.strip()
                    if not line or line.startswith("===") or line.startswith("Reply using"):
                        continue
                    # Detect CC output markers
                    if line.startswith("\u23fa"):  # ⏺ marker
                        agent_text = line.lstrip("\u23fa ").strip()
                        if agent_text and len(agent_text) > 5:
                            with lock:
                                msg_counter += 1
                                messages.append({
                                    "id": msg_counter,
                                    "from": "agent",
                                    "to": "user",
                                    "text": agent_text,
                                    "timestamp": time.strftime("%H:%M:%S"),
                                    "channel": "web",
                                })
                last_capture = current
        except Exception:
            pass
        time.sleep(3)


# Start tmux capture thread
_capture_thread = threading.Thread(target=capture_tmux_output, daemon=True)
_capture_thread.start()

# --- HTML Chat UI ---
CHAT_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AIOX Agent — Web Chat</title>
<style>
  /* AIOX Brandbook Design System Tokens */
  :root {
    --bb-lime: #D1FF00; --bb-dark: #050505; --bb-surface: #0F0F11;
    --bb-surface-alt: #1C1E19; --cream: #F4F4F8; --gray-dim: #696969;
    --gray-muted: #999; --gray-charcoal: #3D3D3D; --color-error: #EF4444;
  }
  @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', -apple-system, system-ui, sans-serif; background: var(--bb-dark); color: var(--cream); height: 100vh; display: flex; flex-direction: column; }
  #header { background: var(--bb-surface); padding: 12px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 12px; }
  #header .avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--bb-lime); color: var(--bb-dark); display: flex; align-items: center; justify-content: center; font-family: 'Geist Mono', monospace; font-weight: 700; font-size: 14px; }
  #header h1 { font-size: 15px; font-weight: 600; color: var(--cream); }
  #header span { font-size: 12px; color: var(--gray-dim); }
  #header .status-dot { width: 8px; height: 8px; border-radius: 50%; margin-left: auto; }
  #header .status-dot.online { background: var(--bb-lime); }
  #header .status-dot.offline { background: var(--color-error); }
  #header .channel-tag { font-family: 'Geist Mono', monospace; font-size: 11px; color: var(--gray-muted); margin-left: 6px; }
  #messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; max-width: 768px; width: 100%; margin: 0 auto; }
  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; text-align: center; }
  .empty-state .icon { width: 64px; height: 64px; border-radius: 16px; background: rgba(209,255,0,0.1); border: 1px solid rgba(209,255,0,0.2); color: var(--bb-lime); display: flex; align-items: center; justify-content: center; font-family: 'Geist Mono', monospace; font-size: 28px; font-weight: 700; margin-bottom: 16px; }
  .empty-state h2 { font-size: 18px; font-weight: 600; color: var(--cream); }
  .empty-state p { font-size: 14px; color: var(--gray-dim); margin-top: 6px; }
  .msg { max-width: 80%; padding: 12px 16px; border-radius: 12px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
  .msg.user { align-self: flex-end; background: rgba(209,255,0,0.12); border: 1px solid rgba(209,255,0,0.2); border-bottom-right-radius: 4px; }
  .msg.agent { align-self: flex-start; background: var(--bb-surface); border: 1px solid rgba(255,255,255,0.06); border-bottom-left-radius: 4px; }
  .msg .meta { font-size: 11px; color: var(--gray-dim); margin-top: 6px; text-align: right; }
  .msg code { background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px; font-family: 'Geist Mono', monospace; font-size: 13px; }
  .msg pre { background: rgba(255,255,255,0.04); padding: 10px; border-radius: 6px; overflow-x: auto; margin: 8px 0; font-family: 'Geist Mono', monospace; font-size: 13px; border: 1px solid rgba(255,255,255,0.06); }
  .perm { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3); padding: 16px; border-radius: 12px; margin: 8px 0; }
  .perm h3 { color: var(--color-error); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
  .perm .tool { font-family: 'Geist Mono', monospace; font-size: 13px; background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px; }
  .perm .btns { display: flex; gap: 8px; margin-top: 12px; }
  .perm button { padding: 8px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; transition: opacity 0.2s; }
  .perm button:hover { opacity: 0.85; }
  .perm .approve { background: var(--bb-lime); color: var(--bb-dark); }
  .perm .deny { background: var(--color-error); color: #fff; }
  .perm .decided { opacity: 0.4; pointer-events: none; }
  #input-area { background: var(--bb-surface); padding: 12px 16px; border-top: 1px solid rgba(255,255,255,0.06); }
  #input-wrap { display: flex; gap: 10px; max-width: 768px; margin: 0 auto; }
  #input-area textarea { flex: 1; background: var(--bb-dark); color: var(--cream); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; font-size: 14px; resize: none; height: 44px; font-family: inherit; transition: border-color 0.2s; }
  #input-area textarea:focus { outline: none; border-color: rgba(209,255,0,0.4); }
  #input-area textarea::placeholder { color: var(--gray-dim); }
  #input-area button { background: var(--bb-lime); color: var(--bb-dark); border: none; border-radius: 8px; padding: 0 20px; cursor: pointer; font-size: 14px; font-weight: 600; transition: opacity 0.2s; }
  #input-area button:hover { opacity: 0.85; }
  #input-area button:disabled { opacity: 0.3; cursor: default; }
  #status { font-size: 11px; color: var(--bb-lime); padding: 4px 20px; background: rgba(209,255,0,0.04); font-family: 'Geist Mono', monospace; }
</style>
</head>
<body>
<div id="header">
  <div class="avatar">O</div>
  <div>
    <h1>The Oracle</h1>
    <span>AIOX Message Gateway</span>
  </div>
  <div class="status-dot online" id="statusDot"></div>
  <span class="channel-tag">web</span>
</div>
<div id="status">connected</div>
<div id="messages">
  <div class="empty-state" id="emptyState">
    <div class="icon">O</div>
    <h2>I've been expecting you</h2>
    <p>Send a message to start talking with The Oracle</p>
  </div>
</div>
<div id="input-area">
  <div id="input-wrap">
    <textarea id="input" placeholder="Message The Oracle..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
    <button onclick="sendMsg()">Send</button>
  </div>
</div>
<script>
let lastId = 0;
const messagesDiv = document.getElementById('messages');
const inputEl = document.getElementById('input');

async function sendMsg() {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = '';
  await fetch('/api/messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({from: 'user', text})
  });
}

async function poll() {
  try {
    const res = await fetch('/api/messages?since=' + lastId);
    const msgs = await res.json();
    for (const m of msgs) {
      if (m.id > lastId) lastId = m.id;
      const empty = document.getElementById('emptyState');
      if (empty) empty.remove();
      const div = document.createElement('div');
      div.className = 'msg ' + (m.from === 'user' ? 'user' : 'agent');
      div.innerHTML = escapeHtml(m.text) + '<div class="meta">' + m.from + ' · ' + (m.timestamp || '') + '</div>';
      messagesDiv.appendChild(div);
    }
    // Check permissions
    const permRes = await fetch('/api/permissions/pending');
    const perms = await permRes.json();
    for (const p of perms) {
      if (document.getElementById('perm-' + p.id)) continue;
      const div = document.createElement('div');
      div.id = 'perm-' + p.id;
      div.className = 'perm';
      div.innerHTML = '<h3>Permission Request</h3>' +
        '<p>Tool: <code>' + escapeHtml(p.tool) + '</code></p>' +
        '<div class="btns">' +
        '<button class="approve" onclick="decidePerm(\\'' + p.id + '\\',\\'approve\\')">Approve</button>' +
        '<button class="deny" onclick="decidePerm(\\'' + p.id + '\\',\\'deny\\')">Deny</button>' +
        '</div>';
      messagesDiv.appendChild(div);
    }
    if (msgs.length > 0 || perms.length > 0) messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch(e) {}
}

async function decidePerm(id, decision) {
  await fetch('/api/permission/' + id, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({decision})
  });
  const el = document.getElementById('perm-' + id);
  if (el) el.classList.add('decided');
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\\n/g,'<br>');
}

setInterval(poll, 2000);
poll();
inputEl.focus();
</script>
</body>
</html>"""


class ChatHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # Suppress access logs

    def _json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def _html(self, html):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode())

    def do_GET(self):
        global messages
        parsed = urlparse(self.path)

        if parsed.path == "/" or parsed.path == "/index.html":
            self._html(CHAT_HTML)

        elif parsed.path == "/api/messages":
            params = parse_qs(parsed.query)
            since = int(params.get("since", ["0"])[0])
            with lock:
                new_msgs = [m for m in messages if m["id"] > since]
            self._json(new_msgs)

        elif parsed.path.startswith("/api/permission/"):
            req_id = parsed.path.split("/")[-1]
            with lock:
                perm = permissions.get(req_id)
            if perm and perm.get("decision"):
                self._json({"decision": perm["decision"]})
            else:
                self._json(None)

        elif parsed.path == "/api/permissions/pending":
            with lock:
                pending = [p for p in permissions.values() if not p.get("decision")]
            self._json(pending)

        elif parsed.path == "/api/health":
            self._json({"status": "ok", "messages": len(messages), "port": PORT})

        else:
            self.send_error(404)

    def do_POST(self):
        global msg_counter
        content_len = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_len).decode() if content_len else "{}"

        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            self._json({"error": "invalid JSON"}, 400)
            return

        parsed = urlparse(self.path)

        if parsed.path == "/api/messages":
            with lock:
                msg_counter += 1
                msg = {
                    "id": msg_counter,
                    "from": data.get("from", "unknown"),
                    "to": data.get("to", "agent"),
                    "text": data.get("text", ""),
                    "timestamp": time.strftime("%H:%M:%S"),
                    "channel": "web",
                }
                messages.append(msg)

            # Inject user messages into tmux session (connects to Claude Code)
            if data.get("from") == "user" and data.get("text", "").strip():
                inject_into_tmux(data["text"])

            self._json(msg, 201)

        elif parsed.path == "/api/permission":
            req_id = data.get("id", f"perm-{int(time.time())}")
            with lock:
                permissions[req_id] = {
                    "id": req_id,
                    "tool": data.get("tool", "unknown"),
                    "input": data.get("input", {}),
                    "decision": None,
                    "timestamp": time.strftime("%H:%M:%S"),
                }
            self._json({"id": req_id}, 201)

        elif parsed.path.startswith("/api/permission/"):
            req_id = parsed.path.split("/")[-1]
            with lock:
                if req_id in permissions:
                    permissions[req_id]["decision"] = data.get("decision", "deny")
            self._json({"ok": True})

        elif parsed.path == "/api/callback":
            # Unified callback handler for inline buttons
            self._json({"ok": True})

        else:
            self.send_error(404)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


def main():
    server = HTTPServer(("0.0.0.0", PORT), ChatHandler)
    print(f"AIOX Web Chat running at http://localhost:{PORT}")
    print(f"Open in browser to chat with The Oracle")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down...")
        server.server_close()


if __name__ == "__main__":
    main()
