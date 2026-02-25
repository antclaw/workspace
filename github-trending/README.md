# GitHub 热门项目排行榜

> 每天自动生成 GitHub 热门项目排行榜，帮助你发现有趣的开源项目

## 🎯 功能特点

- 📊 **自动抓取** - 每天自动获取 GitHub 热门项目数据
- 📈 **实时排行** - 按 Stars 数量排序，展示 Top 100 项目
- 🌍 **多语言** - 支持多种编程语言的项目
- 📝 **Markdown 格式** - 生成易读的排行榜文档
- 🔔 **通知集成** - 可配置钉钉、企业微信等通知

## 🚀 快速开始

### 前置要求

- `curl` - HTTP 客户端
- `jq` - JSON 处理工具
- `bash` - Shell 环境

### 安装

```bash
# 克隆仓库
git clone <repository-url>
cd github-trending

# 确保有执行权限
chmod +x scrape-github-trending.sh
```

### 使用

```bash
# 生成排行榜
./scrape-github-trending.sh

# 查看生成的文件
cat daily/github-trending-2026-02-25.md
```

## 📁 目录结构

```
github-trending/
├── scrape-github-trending.sh  # 主脚本
├── daily/                      # 输出目录
│   └── github-trending-2026-02-25.md
├── .gitignore
└── README.md
```

## ⚙️ 配置

### 环境变量

```bash
# 钉钉通知（可选）
export DINGTALK_WEBHOOK="https://oapi.dingtalk.com/robot/send?access_token=xxx"
```

### Cron 定时任务

每天早上 9 点自动运行：

```bash
# 编辑 crontab
crontab -e

# 添加定时任务
0 9 * * * cd /path/to/github-trending && ./scrape-github-trending.sh >> /tmp/github-trending.log 2>&1
```

## 📊 输出示例

生成的 Markdown 文件包含：

- 🏆 Top 10 热门项目排行榜
- 📈 数据统计（总项目数、最高 Stars、语言分布）
- 🔗 项目链接和描述

## 🔧 自定义

### 修改查询参数

编辑 `scrape-github-trending.sh`：

```bash
# 修改 Stars 数量阈值
GITHUB_API="https://api.github.com/search/repositories?q=stars:>50000&sort=stars&order=desc&per_page=50"

# 修改每页返回数量
GITHUB_API="https://api.github.com/search/repositories?q=stars:>100000&sort=stars&order=desc&per_page=200"
```

### 添加其他通知方式

在脚本中添加 Slack、Telegram 等通知：

```bash
# Slack 通知
curl -X POST https://hooks.slack.com/services/xxx \
  -H 'Content-Type: application/json' \
  -d "{\"text\": \"GitHub 热门项目已更新\"}"

# Telegram 通知
curl -s -X POST https://api.telegram.org/botXXX/sendMessage \
  -d "chat_id=XXX&text=GitHub 热门项目已更新"
```

## 📖 数据来源

- **GitHub API** - https://api.github.com/search/repositories
- **排序依据** - Stars 数量（>100,000）
- **更新频率** - 每天一次

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

---

**最后更新：** 2026-02-25
