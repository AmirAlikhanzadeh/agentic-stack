#!/usr/bin/env node
'use strict';
const { cpSync, existsSync, mkdirSync, copyFileSync } = require('fs');
const path = require('path');

const PKG_ROOT = path.join(__dirname, '..');
const TARGET = process.cwd();
const ADAPTERS = [
  'claude-code', 'cursor', 'windsurf', 'opencode',
  'openclient', 'hermes', 'standalone-python',
];

const adapter = process.argv[2];

if (!adapter || adapter === '--help' || adapter === '-h') {
  console.log([
    'usage: npx create-agentic-stack <adapter>',
    '',
    'adapters:',
    '  claude-code      CLAUDE.md + .claude/settings.json hooks',
    '  cursor           .cursor/rules/*.mdc',
    '  windsurf         .windsurfrules',
    '  opencode         AGENTS.md + opencode.json',
    '  openclient       system-prompt include',
    '  hermes           AGENTS.md (agentskills.io compatible)',
    '  standalone-python  run.py (any LLM via env vars)',
    '',
    'docs: https://github.com/codejunkie99/agentic-stack',
  ].join('\n'));
  process.exit(adapter ? 0 : 2);
}

if (!ADAPTERS.includes(adapter)) {
  console.error(`error: unknown adapter '${adapter}'`);
  console.error(`adapters: ${ADAPTERS.join(' | ')}`);
  process.exit(1);
}

// copy .agent/ brain — skip if already present to protect existing memory
const agentDest = path.join(TARGET, '.agent');
if (existsSync(agentDest)) {
  console.log('  ~ .agent/ already exists — skipping (your memory is safe)');
} else {
  cpSync(path.join(PKG_ROOT, '.agent'), agentDest, { recursive: true });
  console.log('  + .agent/  (portable brain)');
}

// copy adapter-specific files
const src = path.join(PKG_ROOT, 'adapters', adapter);
const copy = (from, to) => {
  const dest = path.join(TARGET, to);
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileSync(path.join(src, from), dest);
  console.log(`  + ${to}`);
};

switch (adapter) {
  case 'claude-code':
    copy('CLAUDE.md', 'CLAUDE.md');
    copy('settings.json', '.claude/settings.json');
    break;
  case 'cursor':
    copy('.cursor/rules/agentic-stack.mdc', '.cursor/rules/agentic-stack.mdc');
    break;
  case 'windsurf':
    copy('.windsurfrules', '.windsurfrules');
    break;
  case 'opencode':
    copy('AGENTS.md', 'AGENTS.md');
    copy('opencode.json', 'opencode.json');
    break;
  case 'openclient':
    copy('config.md', '.openclient-system.md');
    break;
  case 'hermes':
    copy('AGENTS.md', 'AGENTS.md');
    break;
  case 'standalone-python':
    copy('run.py', 'run.py');
    break;
}

console.log('\ndone.');
console.log('next: edit .agent/memory/personal/PREFERENCES.md with your conventions.');
console.log('docs: https://github.com/codejunkie99/agentic-stack');
