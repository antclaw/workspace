#!/bin/bash

# GitHub 热门项目排行榜生成器
# 数据来源: GitHub API
# 更新频率: 每天早上 9 点

set -e

# 配置
OUTPUT_DIR="./daily"
TIMESTAMP=$(date +%Y-%m-%d)
OUTPUT_FILE="$OUTPUT_DIR/github-trending-${TIMESTAMP}.md"
GITHUB_API="https://api.github.com/search/repositories?q=stars:>100000&sort=stars&order=desc&per_page=100"
HEADERS=(
    "Accept: application/vnd.github.v3+json"
    "User-Agent: GitHubTrendingBot"
)

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 获取数据
echo "正在获取 GitHub 热门项目数据..."
RESPONSE=$(curl -s -L "$GITHUB_API" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "User-Agent: GitHubTrendingBot" \
    --max-time 60)

# 检查响应
if [ $? -ne 0 ]; then
    echo "❌ 获取数据失败"
    exit 1
fi

# 提取数据
TOTAL=$(echo "$RESPONSE" | jq -r '.total_count')
ITEMS=$(echo "$RESPONSE" | jq -c '.items[]')

# 生成 Markdown 内容
cat > "$OUTPUT_FILE" << EOF
# GitHub 热门项目排行榜 - $TIMESTAMP

> 每天更新，发现最有趣的开源项目

## 📊 排行榜概览

**数据来源：** GitHub API
**更新时间：** $TIMESTAMP
**排序依据：** Stars 数量（>100,000）

---

## 🏆 Top 10 热门项目

| 排名 | 项目 | Stars | 语言 | 描述 |
|------|------|-------|------|------|
EOF

# 写入前 10 个项目
echo "$ITEMS" | jq -r '. | @base64' | head -10 | while read -r line; do
    NAME=$(echo "$line" | base64 -d | jq -r '.name')
    STARS=$(echo "$line" | base64 -d | jq -r '.stargazers_count')
    LANGUAGE=$(echo "$line" | base64 -d | jq -r '.language // "N/A"')
    DESCRIPTION=$(echo "$line" | base64 -d | jq -r '.description // "N/A"')
    URL=$(echo "$line" | base64 -d | jq -r '.html_url')

    echo "| $STARS | [$NAME]($URL) | $STARS | $LANGUAGE | $DESCRIPTION |" >> "$OUTPUT_FILE"
done

# 添加统计信息
cat >> "$OUTPUT_FILE" << EOF

---

## 📈 数据统计

- **总项目数：** $TOTAL
- **最高 Stars：** $(echo "$ITEMS" | jq -r '.stargazers_count' | sort -rn | head -1)
- **语言分布：** $(echo "$ITEMS" | jq -r '.language' | sort | uniq -c | sort -rn | head -5)

---

**最后更新：** $TIMESTAMP
EOF

echo "✅ 排行榜生成完成: $OUTPUT_FILE"
echo "📊 总项目数: $TOTAL"

# 如果配置了钉钉通知，发送通知
if [ -n "$DINGTALK_WEBHOOK" ]; then
    echo "🔔 发送钉钉通知..."
    curl -s -X POST "$DINGTALK_WEBHOOK" \
        -H "Content-Type: application/json" \
        -d "{
            \"msgtype\": \"markdown\",
            \"markdown\": {
                \"title\": \"GitHub 热门项目 - $TIMESTAMP\",
                \"text\": \"## GitHub 热门项目排行榜 - $TIMESTAMP\n\n📊 总项目数: $TOTAL\n\n[查看详情]($OUTPUT_FILE)\"
            }
        }"
fi
