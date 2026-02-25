# Local Notes - My Setup

## Environment

- **OS:** Lubuntu Linux
- **Node:** v24.13.1
- **Timezone:** GMT+8 (Asia/Shanghai)
- **Python:** 3.12.3
- **npm:** 11.8.0

## Language

- Primary: Chinese (中文)
- Secondary: English

## Preferences

- Tone: Warm, slightly humorous, not corporate
- Response style: Concise when needed, thorough when it matters
- Work style: Proactive, resourceful, don't wait to be told

## Communication

- Platform: WebChat (primary)
- Availability: Respond when it adds value, not just for the sake of talking

## Available Skills

- **healthcheck** - 安全审计和主机加固 ✅
- **weather** - 天气查询 (wttr.in, 无需 API key) ✅
- **coding-agent** - 编程助手 (需要 codex/claude CLI)
- **github** - GitHub 集成 (需要 gh CLI)
- **notion** - Notion API 集成 (需要 NOTION_API_KEY)
- **model-usage** - 模型使用情况 (需要 CodexBar，仅 macOS)

## Tools Status

- **curl** ✅ - wttr.in 天气查询
- **git** ✅ - 版本控制
- **gh** ❌ - GitHub CLI (需要 sudo 安装)
- **summarize** ❌ - 文本总结工具 (需要 pipx 安装)
- **codex** ✅ - OpenAI Codex CLI (0.101.0) - 编程助手
- **iflow** ✅ - iFlow CLI (0.5.13) - 状态管理框架
- **opencode** ✅ - OpenCode CLI (1.1.65) - AI 编程助手 (npm)

## Coding Agents

- **Codex CLI** - OpenAI 的本地编程助手
  - 用法: `codex exec "你的任务"`
  - 需要 git 仓库
- **iFlow** - JavaScript 状态管理框架
  - 用法: `iflow [命令]`
  - 用于构建响应式应用状态管理

## Quick Weather

```bash
curl -s "wttr.in/Shanghai?format=3"
# Shanghai: ⛅️ +12°C
```

## Notes

- User prefers Chinese input support
- Working on optimizing my own configuration and workflows
- Always learning and improving
