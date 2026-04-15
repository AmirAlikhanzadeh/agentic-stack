#!/usr/bin/env bash
# install.sh — copy an adapter into the consuming project
# Usage: ./install.sh <adapter-name> [target-dir]
#   adapter-name: claude-code | cursor | windsurf | opencode | openclient | hermes | standalone-python
#   target-dir:   where your consuming project lives (default: current dir)
set -euo pipefail

ADAPTER="${1:-}"
TARGET="${2:-$PWD}"
HERE="$(cd "$(dirname "$0")" && pwd)"

if [[ -z "$ADAPTER" ]]; then
  echo "usage: $0 <adapter-name> [target-dir]" >&2
  echo "adapters: claude-code cursor windsurf opencode openclient hermes standalone-python" >&2
  exit 2
fi

SRC="$HERE/adapters/$ADAPTER"
if [[ ! -d "$SRC" ]]; then
  echo "error: adapter '$ADAPTER' not found at $SRC" >&2
  exit 1
fi

echo "installing '$ADAPTER' into $TARGET"

# copy .agent/ brain if the target doesn't have one yet
if [[ ! -d "$TARGET/.agent" ]]; then
  cp -R "$HERE/.agent" "$TARGET/.agent"
  echo "  + .agent/ (portable brain)"
fi

case "$ADAPTER" in
  claude-code)
    cp "$SRC/CLAUDE.md" "$TARGET/CLAUDE.md"
    mkdir -p "$TARGET/.claude"
    cp "$SRC/settings.json" "$TARGET/.claude/settings.json"
    ;;
  cursor)
    mkdir -p "$TARGET/.cursor/rules"
    cp "$SRC/.cursor/rules/agentic-stack.mdc" "$TARGET/.cursor/rules/agentic-stack.mdc"
    ;;
  windsurf)
    cp "$SRC/.windsurfrules" "$TARGET/.windsurfrules"
    ;;
  opencode)
    cp "$SRC/AGENTS.md" "$TARGET/AGENTS.md"
    cp "$SRC/opencode.json" "$TARGET/opencode.json"
    ;;
  openclient)
    cp "$SRC/config.md" "$TARGET/.openclient-system.md"
    ;;
  hermes)
    cp "$SRC/AGENTS.md" "$TARGET/AGENTS.md"
    ;;
  standalone-python)
    cp "$SRC/run.py" "$TARGET/run.py"
    ;;
  *)
    echo "error: unknown adapter '$ADAPTER'" >&2
    exit 1
    ;;
esac

echo "done. see adapters/$ADAPTER/README.md for next steps."
