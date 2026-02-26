# GitHub 凭据

## 账号信息

**用户名：** antclaw
**密码：** hiclaw001

## 安全说明

- 此文件仅用于内部使用
- 已设置 600 权限
- 不要分享给任何人
- 不要提交到 git 仓库

## 使用方式

```bash
# 读取凭据
cat ~/.secrets/github-credentials.txt

# 登录 GitHub
gh auth login --with-token "ghp_$(cat ~/.secrets/github-tenant-token.txt 2>/dev/null || echo 'your-token-here')"
```

## 生成 Token

如果需要 Personal Access Token：

```bash
# 创建 Token
gh auth login

# 使用 Token
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

**创建时间：** 2026-02-25
**最后更新：** 2026-02-25
