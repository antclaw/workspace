# Tools Setup Guide

## Currently Available

✅ **Installed:**
- curl
- git
- healthcheck skill
- weather skill (wttr.in)
- coding-agent skill
- github skill
- notion skill
- model-usage skill

❌ **Need to Install (require sudo):**

### GitHub CLI (gh)
```bash
sudo apt update && sudo apt install -y gh
```

### Coding Agent CLI (codex/claude)
- Codex: https://github.com/simonw/codex
- Claude Code: https://claude.ai/code
- OpenCode: https://github.com/anthropics/opencode
- Pi: https://github.com/mariozechner/pi-coding-agent

### Text Summarize
```bash
pipx install summarize
```

### Weather Alternative
Already available via wttr.in:
```bash
curl -s "wttr.in/<location>?format=3"
```

## Skills Activation

All skills are already installed. To use:

1. **Healthcheck** - Ask for security audit or host hardening
2. **Weather** - Ask "What's the weather?" or "Weather in [location]"
3. **Coding Agent** - Ask for coding tasks, use `pty:true` for interactive agents
4. **GitHub** - Ask about PRs, issues, or use `gh` commands
5. **Notion** - Need API key first: `mkdir -p ~/.config/notion && echo "ntn_your_key" > ~/.config/notion/api_key`
6. **Model Usage** - Ask about CodexBar cost data (macOS only)

## Priority Install Order

1. `gh` - GitHub integration (most useful)
2. `codex` - Coding assistant (if you code)
3. `summarize` - Text summarization

## Notes

- User prefers Chinese input support
- Working on Lubuntu Linux
- Need sudo password for package installation
