# 网站监控工具

> 实时监控网站可用性和响应时间

## 功能特性

- ✅ 多网站同时监控
- ✅ 实时响应时间检测
- ✅ 可配置告警阈值
- ✅ HTTP 状态码检查
- ✅ 支持代理设置
- ✅ 告警通知（邮件/Telegram/DingTalk）

## 安装

```bash
git clone <repository-url>
cd website-monitor
npm install
npm run build
```

## 使用

```bash
# 启动监控
node index.js --config config.json

# 查看帮助
node index.js --help
```

## 配置文件示例

```json
{
  "websites": [
    {
      "name": "Google",
      "url": "https://www.google.com",
      "interval": 60,
      "alertThreshold": 2000
    },
    {
      "name": "GitHub",
      "url": "https://github.com",
      "interval": 120,
      "alertThreshold": 1500
    }
  ],
  "alert": {
    "type": "dingtalk",
    "webhook": "https://oapi.dingtalk.com/robot/send?access_token=xxx"
  }
}
```

## 许可证

MIT
