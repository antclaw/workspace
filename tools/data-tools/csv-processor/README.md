# CSV 数据处理工具

> 强大的 CSV 文件处理工具

## 功能特性

- ✅ 批量处理 CSV 文件
- ✅ 数据筛选和过滤
- ✅ 数据转换和格式化
- ✅ 数据导出和导入
- ✅ 支持大文件处理
- ✅ 内存优化

## 安装

```bash
git clone <repository-url>
cd csv-processor
npm install
npm run build
```

## 使用

```bash
# 处理 CSV 文件
node index.js --input data.csv --output result.csv --filter "age > 18" --export "name,email"
```

## 命令行选项

| 参数 | 说明 | 示例 |
|------|------|------|
| `--input` | 输入文件 | `--input data.csv` |
| `--output` | 输出文件 | `--output result.csv` |
| `--filter` | 筛选条件 | `--filter "age > 18"` |
| `--export` | 导出列 | `--export "name,email"` |
| `--header` | 是否包含表头 | `--header` |

## 许可证

MIT
