# 文件清理工具

> 一键清理系统垃圾文件，释放磁盘空间

## 功能特性

- ✅ 清理系统缓存文件
- ✅ 清理临时文件
- ✅ 清理浏览器缓存
- ✅ 清理下载文件夹
- ✅ 清理回收站
- ✅ 清理日志文件
- ✅ 扫描磁盘空间
- ✅ 预览清理结果
- ✅ 安全模式（不删除重要文件）
- ✅ 详细的清理报告

## 安装

```bash
git clone https://github.com/antclaw/file-cleaner.git
cd file-cleaner
npm install
npm run build
```

## 使用

```bash
# 基本用法
node index.js --scan

# 清理所有缓存
node index.js --clean-cache

# 清理临时文件
node index.js --clean-temp

# 清理下载文件夹
node index.js --clean-downloads

# 完整清理（扫描 + 清理）
node index.js --full --dry-run

# 查看帮助
node index.js --help
```

## 命令行选项

| 参数 | 说明 | 示例 |
|------|------|------|
| `--scan` | 扫描磁盘空间 | `--scan` |
| `--clean-cache` | 清理缓存 | `--clean-cache` |
| `--clean-temp` | 清理临时文件 | `--clean-temp` |
| `--clean-downloads` | 清理下载文件夹 | `--clean-downloads` |
| `--clean-trash` | 清理回收站 | `--clean-trash` |
| `--full` | 完整清理 | `--full` |
| `--dry-run` | 预览模式（不实际删除） | `--dry-run` |
| `--verbose` | 详细输出 | `--verbose` |

## 支持的清理类型

### 系统缓存
- 浏览器缓存（Chrome、Firefox、Safari）
- 应用缓存（Node.js、Python 等）
- 系统缓存（Linux、macOS、Windows）

### 临时文件
- 系统临时文件
- 用户临时文件
- 应用临时文件

### 下载文件夹
- 下载文件夹中的临时文件
- 下载文件夹中的重复文件

### 回收站
- 清空回收站
- 保留最近 7 天的文件

### 日志文件
- 系统日志
- 应用日志
- 应用程序日志

## 示例

```bash
# 扫描磁盘空间
node index.js --scan

# 预览清理结果（不实际删除）
node index.js --full --dry-run

# 执行完整清理
node index.js --full

# 只清理浏览器缓存
node index.js --clean-cache

# 清理临时文件和下载文件夹
node index.js --clean-temp --clean-downloads
```

## 注意事项

⚠️ **使用前请：**
1. 备份重要数据
2. 使用 `--dry-run` 预览
3. 确认要清理的文件
4. 检查清理报告

⚠️ **不会删除的文件：**
- 重要文档
- 用户数据
- 系统文件
- 安装包

## 许可证

MIT

---

**最后更新：** 2026-02-25
