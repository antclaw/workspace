#!/usr/bin/env node

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 命令行参数解析
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
        const key = arg.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const nextArg = args[i + 1];
        if (!nextArg || nextArg.startsWith('--')) {
            params[key] = true;
        } else {
            params[key] = nextArg;
            i++;
        }
    }
}

// 加载配置
function loadConfig(configPath) {
    try {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
        console.error('❌ 配置文件加载失败:', error.message);
        process.exit(1);
    }
}

// 检查网站
function checkWebsite(site) {
    return new Promise((resolve) => {
        const protocol = site.url.startsWith('https') ? https : http;
        const startTime = Date.now();

        const req = protocol.get(site.url, {
            timeout: site.timeout || 10000
        }, (res) => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            const status = res.statusCode;

            resolve({
                name: site.name,
                url: site.url,
                status: status,
                responseTime: responseTime,
                online: status >= 200 && status < 500
            });
        });

        req.on('error', (error) => {
            resolve({
                name: site.name,
                url: site.url,
                status: 0,
                responseTime: Date.now() - startTime,
                online: false,
                error: error.message
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                name: site.name,
                url: site.url,
                status: 0,
                responseTime: Date.now() - startTime,
                online: false,
                error: 'Timeout'
            });
        });
    });
}

// 发送告警
function sendAlert(site, responseTime) {
    console.log(`\n⚠️  告警: ${site.name} (${site.url}) 响应时间过长`);
    console.log(`⏱️  响应时间: ${responseTime}ms`);
    console.log(`📊 状态码: ${site.status}`);
}

// 显示状态
function showStatus(websites) {
    console.log('\n📊 网站监控状态');
    console.log('─'.repeat(60));

    websites.forEach(site => {
        const icon = site.online ? '✅' : '❌';
        const color = site.online ? 'green' : 'red';
        console.log(`${icon} ${site.name.padEnd(20)} ${String(site.responseTime).padEnd(8)}ms ${site.status}`);
    });

    console.log('─'.repeat(60));
}

// 主函数
async function main() {
    if (params.help) {
        console.log(`
网站监控工具

用法:
  node index.js --config <config.json> [options]

选项:
  --config <path>  配置文件路径（必需）
  --help           显示帮助

配置文件示例:
  {
    "websites": [
      {
        "name": "Google",
        "url": "https://www.google.com",
        "interval": 60,
        "alertThreshold": 2000
      }
    ],
    "alert": {
      "type": "dingtalk",
      "webhook": "https://oapi.dingtalk.com/robot/send?access_token=xxx"
    }
  }
    `);
        process.exit(0);
    }

    if (!params.config) {
        console.error('❌ 缺少配置文件');
        process.exit(1);
    }

    const config = loadConfig(params.config);

    if (!config.websites || !Array.isArray(config.websites)) {
        console.error('❌ 配置文件格式错误：缺少 websites 数组');
        process.exit(1);
    }

    console.log(`🔍 监控 ${config.websites.length} 个网站\n`);

    while (true) {
        const results = await Promise.all(
            config.websites.map(site => checkWebsite(site))
        );

        showStatus(results);

        // 检查是否需要告警
        results.forEach(result => {
            if (result.online && result.responseTime > (config.websites.find(s => s.name === result.name)?.alertThreshold || 2000)) {
                sendAlert(result, result.responseTime);
            }
        });

        const interval = config.websites[0]?.interval || 60;
        console.log(`\n⏰ 下次检查: ${interval}秒后\n`);
        await new Promise(resolve => setTimeout(resolve, interval * 1000));
    }
}

main();
