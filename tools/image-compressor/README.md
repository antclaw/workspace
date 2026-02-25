# 图片压缩工具

> 快速压缩图片，减少文件大小而不损失质量

## 功能特性

- ✅ 批量压缩图片
- ✅ 质量控制
- ✅ 调整大小
- ✅ 比较压缩前后大小
- ✅ 支持多种格式（JPG, PNG, WebP, GIF）
- ✅ 详细的压缩报告
- ✅ 预览压缩效果

## 安装

```bash
git clone https://github.com/antclaw/image-compressor.git
cd image-compressor
npm install
npm run build
```

## 使用

```bash
# 压换单个图片
node index.js --input photo.jpg --output compressed.jpg --quality 80

# 批量压缩图片
node index.js --input-dir ./photos --output-dir ./compressed --quality 80

# 调整图片大小
node index.js --input photo.jpg --output resized.jpg --width 800 --height 600

# 压缩并调整大小
node index.js --input photo.jpg --output final.jpg --quality 75 --width 800

# 查看压缩报告
node index.js --input photo.jpg --output compressed.jpg --quality 80 --report

# 查看帮助
node index.js --help
```

## 命令行选项

| 参数 | 说明 | 示例 |
|------|------|------|
| `--input` | 输入文件 | `--input photo.jpg` |
| `--output` | 输出文件 | `--output compressed.jpg` |
| `--input-dir` | 输入目录 | `--input-dir ./photos` |
| `--output-dir` | 输出目录 | `--output-dir ./compressed` |
| `--quality` | 压缩质量（1-100） | `--quality 80` |
| `--width` | 调整宽度 | `--width 800` |
| `--height` | 调整高度 | `--height 600` |
| `--report` | 显示压缩报告 | `--report` |
| `--verbose` | 详细输出 | `--verbose` |

## 支持的格式

- **输入：** JPG, JPEG, PNG, WebP, GIF, BMP
- **输出：** JPG, PNG, WebP

## 压缩质量建议

| 质量 | 文件大小 | 适用场景 |
|------|---------|---------|
| 95-100 | 大 | 照片、高质量图像 |
| 85-94 | 中大 | 社交媒体、网站 |
| 75-84 | 中 | 一般用途 |
| 65-74 | 中小 | 节省空间 |
| 55-64 | 小 | 网络传输、快速加载 |

## 示例

```bash
# 高质量压缩（适合照片）
node index.js --input photo.jpg --output photo_q90.jpg --quality 90

# 中等质量压缩（适合网站）
node index.js --input photo.jpg --output photo_q80.jpg --quality 80

# 低质量压缩（适合快速加载）
node index.js --input photo.jpg --output photo_q60.jpg --quality 60

# 批量压缩
node index.js --input-dir ./photos --output-dir ./compressed --quality 75

# 压缩并调整大小
node index.js --input photo.jpg --output final.jpg --quality 80 --width 800 --height 600

# 显示压缩报告
node index.js --input photo.jpg --output compressed.jpg --quality 80 --report
```

## 压缩报告示例

```
📊 压缩报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
文件名: photo.jpg
原始大小: 2.5 MB
压缩后大小: 500 KB
压缩率: 80.0%
质量: 80/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 压缩成功！节省空间: 2.0 MB
```

## 注意事项

⚠️ **使用前请：**
1. 备份原始图片
2. 使用 `--report` 预览压缩效果
3. 测试不同质量参数

⚠️ **压缩效果：**
- JPG 格式压缩效果最好
- PNG 格式压缩后可能变大（建议转换为 JPG）
- WebP 格式压缩效果最佳

⚠️ **不支持的功能：**
- GIF 动画
- 透明度保留（PNG）
- 调色板优化

## 依赖

```bash
npm install sharp
```

## 许可证

MIT

---

**最后更新：** 2026-02-25
