# Project Instructions (Claude Code)

This project uses the **agentic-stack** portable brain. All memory, skills,
and protocols live in `.agent/`.

## Before doing anything
1. Read `.agent/AGENTS.md` — it's the map.
2. Read `.agent/memory/personal/PREFERENCES.md` — how the user works.
3. Read `.agent/memory/semantic/LESSONS.md` — what we've learned.
4. Read `.agent/protocols/permissions.md` — what you can and cannot do.

## While working
- Consult `.agent/skills/_index.md` and load the full `SKILL.md` for any
  skill whose triggers match the task.
- Update `.agent/memory/working/WORKSPACE.md` as the task evolves.
- Log significant actions to `.agent/memory/episodic/AGENT_LEARNINGS.jsonl`
  via `.agent/tools/memory_reflect.py`.

## Rules that override defaults
- Never force push to `main`, `production`, or `staging`.
- Never delete episodic or semantic memory entries — archive them.
- Never modify `.agent/protocols/permissions.md`.
