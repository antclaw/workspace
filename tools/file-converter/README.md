# 文件转换工具

> 一键转换文件格式，支持图片、PDF、视频、音频

## 功能特性

### 图片格式转换
- ✅ JPG ↔ PNG ↔ GIF ↔ WebP
- ✅ 批量转换
- ✅ 质量控制
- ✅ 调整大小

### PDF 工具
- ✅ 图片转 PDF
- ✅ PDF 合并
- ✅ PDF 分割
- ✅ PDF 压缩

### 视频格式转换
- ✅ MP4 ↔ AVI ↔ MKV
- ✅ 批量转换
- ✅ 质量控制

### 音频格式转换
- ✅ MP3 ↔ WAV ↔ AAC
- ✅ 批量转换
- ✅ 品质控制

## 安装

```bash
git clone https://github.com/antclaw/file-converter.git
cd file-converter
npm install
npm run build
```

## 使用

```bash
# 图片格式转换
node index.js --image --input photo.jpg --output photo.png --format png

# 批量转换图片
node index.js --image --input-dir ./photos --output-dir ./converted --format png

# 图片转 PDF
node index.js --pdf --image --input photo.jpg --output document.pdf

# PDF 合并
node index.js --pdf --merge --input file1.pdf --input file2.pdf --output merged.pdf

# PDF 分割
node index.js --pdf --split --input document.pdf --output-prefix page

# PDF 压缩
node index.js --pdf --compress --input document.pdf --output compressed.pdf

# 视频格式转换
node index.js --video --input video.mp4 --output video.avi --format avi

# 音频格式转换
node index.js --audio --input song.mp3 --output song.wav --format wav

# 查看帮助
node index.js --help
```

## 命令行选项

### 图片转换
| 参数 | 说明 | 示例 |
|------|------|------|
| `--image` | 图片转换模式 | `--image` |
| `--input` | 输入文件 | `--input photo.jpg` |
| `--output` | 输出文件 | `--output photo.png` |
| `--input-dir` | 输入目录 | `--input-dir ./photos` |
| `--output-dir` | 输出目录 | `--output-dir ./converted` |
| `--format` | 输出格式 | `--format png` |
| `--quality` | 质量参数 | `--quality 90` |
| `--width` | 调整宽度 | `--width 800` |
| `--height` | 调整高度 | `--height 600` |

### PDF 工具
| 参数 | 说明 | 示例 |
|------|------|------|
| `--pdf` | PDF 工具模式 | `--pdf` |
| `--image` | 图片转 PDF | `--pdf --image` |
| `--merge` | PDF 合并 | `--pdf --merge` |
| `--split` | PDF 分割 | `--pdf --split` |
| `--compress` | PDF 压缩 | `--pdf --compress` |
| `--input` | 输入文件 | `--input file.pdf` |
| `--output` | 输出文件 | `--output merged.pdf` |
| `--input-dir` | 输入目录 | `--input-dir ./pdfs` |
| `--output-dir` | 输出目录 | `--output-dir ./output` |

### 视频转换
| 参数 | 说明 | 示例 |
|------|------|------|
| `--video` | 视频转换模式 | `--video` |
| `--input` | 输入文件 | `--input video.mp4` |
| `--output` | 输出文件 | `--output video.avi` |
| `--format` | 输出格式 | `--format avi` |
| `--quality` | 裁码质量 | `--quality 80` |

### 音频转换
| 参数 | 说明 | 示例 |
|------|------|------|
| `--audio` | 音频转换模式 | `--audio` |
| `--input` | 输入文件 | `--input song.mp3` |
| `--output` | 输出文件 | `--output song.wav` |
| `--format` | 输出格式 | `--format wav` |
| `--quality` | 品质参数 | `--quality 128` |

## 支持的格式

### 图片格式
- **输入：** JPG, PNG, GIF, WebP, BMP, TIFF
- **输出：** JPG, PNG, GIF, WebP, BMP

### PDF 工具
- **输入：** PDF
- **输出：** PDF (合并、分割、压缩)

### 视频格式
- **输入：** MP4, AVI, MKV, MOV, WMV
- **输出：** MP4, AVI, MKV

### 音频格式
- **输入：** MP3, WAV, AAC, OGG, FLAC
- **输出：** MP3, WAV, AAC, OGG

## 示例

```bash
# 转换单个图片
node index.js --image --input photo.jpg --output photo.png --format png

# 批量转换图片
node index.js --image --input-dir ./photos --output-dir ./converted --format png

# 图片转 PDF
node index.js --pdf --image --input photo.jpg --output document.pdf

# 合并 PDF
node index.js --pdf --merge --input file1.pdf --input file2.pdf --output merged.pdf

# 分割 PDF
node index.js --pdf --split --input document.pdf --output-prefix page

# 压缩 PDF
node index.js --pdf --compress --input document.pdf --output compressed.pdf

# 转换视频格式
node index.js --video --input video.mp4 --output video.avi --format avi

# 转换音频格式
node index.js --audio --input song.mp3 --output song.wav --format wav
```

## 注意事项

⚠️ **使用前请：**
1. 确保安装了必要的依赖
2. 检查输入文件格式
3. 确保有足够的磁盘空间
4. 备份重要文件

⚠️ **性能说明：**
- 图片转换：1MB 图片约需 1-2 秒
- PDF 合并：10 页 PDF 约需 5-10 秒
- 视频转换：1 分钟视频约需 1-2 分钟

⚠️ **不支持的功能：**
- 视频裁剪
- 视频剪辑
- 视频特效
- 音频录制

## 依赖

### 图片转换
```bash
npm install sharp
```

### PDF 工具
```bash
npm install pdf-lib
```

### 视频转换
```bash
npm install fluent-ffmpeg
```

### 音频转换
```bash
npm install fluent-ffmpeg
```

## 许可证

MIT

---

**最后更新：** 2026-02-25
