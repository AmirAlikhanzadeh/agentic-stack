# OpenClient adapter

## Install
OpenClient doesn't have a project-root convention file the way Claude Code
or Cursor does. Two options:

**Option A (recommended):** Point OpenClient at the config file:

```bash
cp adapters/openclient/config.md ./.openclient-system.md
# then configure OpenClient to load this as its system prompt
```

**Option B:** Paste the contents of `config.md` into OpenClient's system
prompt settings directly.

Or:
```bash
./install.sh openclient
```

## What it wires up
A system-prompt include that instructs the agent to treat `.agent/` as
authoritative on every session.

## Verify
Ask "Read my lessons file." — it should open `.agent/memory/semantic/LESSONS.md`.

## Notes
OpenClient varies by version; some forks support `.openclient/` folders,
others use a single config file. Check your version's docs for where to
point the system prompt.
