#!/bin/bash
PORT="${PORT:-8000}"
echo "🚀 Starting FletBox development server..."
echo "📡 http://localhost:$PORT"
echo "   SPA fallback on: /menu deep links and reloads resolve to index.html."
echo ""
echo "Press Ctrl+C to stop"
# python's http.server has no rewrite, so a reload on /menu was a 404.
exec npx flet-box run-spa --port "$PORT"
