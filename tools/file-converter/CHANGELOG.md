# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-02-25

### Added
- 图片格式转换（JPG ↔ PNG ↔ GIF ↔ WebP）
- PDF 工具（转 PDF、合并、分割、压缩）
- 视频格式转换（MP4 ↔ AVI ↔ MKV）
- 音频格式转换（MP3 ↔ WAV ↔ AAC）
- 批量转换支持

### Technical
- 使用 Commander.js 处理命令行参数
- 集成 ImageMagick、pdfjoin、Ghostscript、ffmpeg
- 支持多平台文件转换
