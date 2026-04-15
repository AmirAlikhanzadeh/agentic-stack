# AGENTS.md — Hermes Agent adapter for agentic-stack

Hermes Agent (Nous Research) reads `AGENTS.md` as workspace-level context.
This file points it at the portable brain in `.agent/`.

## Startup (read in order)
1. `.agent/AGENTS.md` — the map
2. `.agent/memory/personal/PREFERENCES.md` — user conventions
3. `.agent/memory/semantic/LESSONS.md` — distilled lessons
4. `.agent/protocols/permissions.md` — hard rules

## Skills
Hermes supports the agentskills.io standard. Our skills under
`.agent/skills/<name>/SKILL.md` follow the same frontmatter-plus-body
shape. Use `/skills` in Hermes to browse them; load `SKILL.md` only
when triggers match the current task (progressive disclosure).

## Memory discipline
- Update `.agent/memory/working/WORKSPACE.md` as you work.
- After significant actions, run
  `python3 .agent/tools/memory_reflect.py <skill> <action> <outcome>`.
- Never delete memory entries; archive only.
- Optional: mirror high-signal state into Hermes's own `MEMORY.md` /
  `USER.md` if you want it inside Hermes's runtime persistence layer.

## Hard rules
- No force push to `main`, `production`, `staging`.
- No modification of `.agent/protocols/permissions.md`.
