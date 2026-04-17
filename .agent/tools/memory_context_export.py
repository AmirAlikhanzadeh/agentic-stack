#!/usr/bin/env python3
"""
memory_context_export.py

Reads the CitizenTea agent brain and prints a JSON context block
ready to inject into a Make.com Claude API system prompt.

Usage:
  python3 .agent/tools/memory_context_export.py

Output: JSON with 'preferences', 'lessons', and 'recent_episodes'
"""
import json
from pathlib import Path
from datetime import datetime, timedelta

BASE = Path(__file__).resolve().parent.parent / "memory"

def read_file(path):
    try:
        return Path(path).read_text(encoding="utf-8").strip()
    except FileNotFoundError:
        return ""

def get_recent_episodes(days=14):
    episodes_dir = BASE / "episodic"
    if not episodes_dir.exists():
        return ""
    cutoff = datetime.now() - timedelta(days=days)
    episodes = []
    for f in sorted(episodes_dir.glob("*.md"), reverse=True)[:20]:
        try:
            if datetime.fromtimestamp(f.stat().st_mtime) > cutoff:
                episodes.append(f.read_text(encoding="utf-8").strip())
        except Exception:
            pass
    return "\n\n---\n\n".join(episodes[:10])

context = {
    "preferences": read_file(BASE / "personal" / "PREFERENCES.md"),
    "lessons":     read_file(BASE / "semantic"  / "LESSONS.md"),
    "recent_episodes": get_recent_episodes(days=14)
}

print(json.dumps(context, ensure_ascii=False, indent=2))
