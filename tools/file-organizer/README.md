# 文件批量重命名工具

> 强大的文件批量重命名工具，支持多种重命名规则

## 功能特性

- ✅ 批量重命名文件和文件夹
- ✅ 支持正则表达式替换
- ✅ 支持编号前缀/后缀
- ✅ 支持日期格式化
- ✅ 支持大小写转换
- ✅ 预览重命名结果
- ✅ 安全模式（先重命名到 .bak）

## 安装

```bash
git clone <repository-url>
cd file-organizer
npm install
npm run build
```

## 使用

```bash
# 基本用法
node index.js --dir "/path/to/files" --pattern "IMG_*.jpg" --rename "photo_@NUM@.jpg"

# 查看帮助
node index.js --help
```

## 命令行选项

| 参数 | 说明 | 示例 |
|------|------|------|
| `--dir` | 目录路径 | `--dir "/home/user/images"` |
| `--pattern` | 匹配模式 | `--pattern "*.jpg"` |
| `--rename` | 重命名模板 | `--rename "IMG_@NUM@.jpg"` |
| `--dry-run` | 预览模式 | `--dry-run` |
| `--backup` | 备份原文件 | `--backup` |
| `--verbose` | 详细输出 | `--verbose` |

## 重命名模板

支持以下占位符：

- `@NUM@` - 编号（从 1 开始）
- `@DATE@` - 当前日期
- `@TIME@` - 当前时间
- `@NAME@` - 原文件名
- `@EXT@` - 文件扩展名
- `@LOWER@` - 小写
- `@UPPER@` - 大写
- `@FIRST@` - 首字母大写

## 示例

```bash
# 给所有图片添加编号前缀
node index.js --dir ./photos --pattern "*.jpg" --rename "@NUM@_photo.jpg"

# 批量重命名视频文件
node index.js --dir ./videos --pattern "*.mp4" --rename "video_@DATE@_@NUM@.mp4"

# 转换文件名为小写
node index.js --dir ./files --pattern "*.TXT" --rename "@LOWER@"

# 预览重命名结果（不实际执行）
node index.js --dir ./files --pattern "*.jpg" --rename "IMG_@NUM@.jpg" --dry-run
```

## 许可证

MIT

---

**最后更新：** 2026-02-25
