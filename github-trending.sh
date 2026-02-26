#!/bin/bash

# GitHub 热门项目排行榜 - 每天早上 9 点执行

# 获取 GitHub 热门项目（stars > 100k）
API_URL="https://api.github.com/search/repositories?q=stars:>100000&sort=stars&order=desc&per_page=30"
OUTPUT_FILE="daily/github-trending-$(date +%Y-%m-%d).md"

# 生成 markdown 报告
{
    echo "# GitHub 热门项目排行榜 - $(date '+%Y-%m-%d')"
    echo ""
    echo "数据来源: GitHub API"
    echo "排序依据: Stars 数量（>100,000）"
    echo ""
    echo "---"
    echo ""

    # 获取并解析 JSON 数据
    curl -s "$API_URL" | jq -r '
        .items[] |
        "| \(.name) | \(.stargazers_count) ⭐ | \(.language // "N/A") | \(.description // "无描述") | [\(.html_url)](\(.html_url)) |"
    ' | awk -F'|' '{
        printf "| %-30s | %-8s | %-12s | %-80s | %s |\n", $2, $3, $4, $5, $6
    }' | awk 'BEGIN {FS="|"; OFS="|"} {
        if (NR == 1) {
            print "|", $1, $2, $3, $4, $5, $6
            print "|---|---|---|---|---|"
        } else {
            print "|", $1, $2, $3, $4, $5, $6
        }
    }'

    echo ""
    echo "---"
    echo ""
    echo "总项目数: $(curl -s "$API_URL" | jq -r '.total_count')"
} > "$OUTPUT_FILE"

# 发送到 DingTalk（如果配置了）
# message send --channel dingtalk --to 影子 --message-file "$OUTPUT_FILE"
