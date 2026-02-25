# GitHub Actions 模板

> 常用 GitHub Actions 模板集合

## 模板列表

### 1. 自动部署到 Vercel
- 自动检测代码更新并部署到 Vercel
- 支持预览部署和主分支部署

### 2. 自动部署到 Netlify
- 自动检测代码更新并部署到 Netlify
- 支持环境变量配置

### 3. 自动发布到 npm
- 自动检测版本号变更并发布到 npm
- 自动生成 CHANGELOG

### 4. 自动备份到 GitHub Releases
- 定期备份项目到 GitHub Releases
- 支持标签版本管理

### 5. 自动代码质量检查
- 自动运行 ESLint、Prettier、TypeScript 检查
- 失败时阻止合并

### 6. 自动 Docker 构建
- 自动构建 Docker 镜像
- 推送到 Docker Hub

### 7. 自动定时任务
- 定期执行脚本任务
- 支持多种触发方式

## 使用方法

### 部署到 Vercel

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 许可证

MIT
