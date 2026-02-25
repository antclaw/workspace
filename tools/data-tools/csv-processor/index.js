#!/usr/bin/env node

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

// 解析 CSV
function parseCSV(filePath, hasHeader = true) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.trim().split('\n');
    const headers = hasHeader ? lines[0].split(',').map(h => h.trim()) : [];
    const data = [];

    for (let i = hasHeader ? 1 : 0; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row = {};

        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });

        data.push(row);
    }

    return { headers, data };
}

// 生成 CSV
function generateCSV(headers, data, hasHeader = true) {
    let csv = '';

    if (hasHeader) {
        csv += headers.join(',') + '\n';
    }

    data.forEach(row => {
        const values = headers.map(header => row[header] || '');
        csv += values.join(',') + '\n';
    });

    return csv;
}

// 筛选数据
function filterData(data, filter) {
    if (!filter) return data;

    try {
        // 简单的过滤条件解析
        const match = filter.match(/(\w+)\s*([><=!]+)\s*(.+)/);
        if (!match) return data;

        const [, field, operator, value] = match;
        const numValue = parseFloat(value);

        return data.filter(row => {
            const cellValue = row[field];

            if (operator === '>') return cellValue > numValue;
            if (operator === '<') return cellValue < numValue;
            if (operator === '=') return cellValue == value;
            if (operator === '!=') return cellValue != value;

            return true;
        });
    } catch (error) {
        console.error('❌ 筛选条件错误:', error.message);
        return data;
    }
}

// 导出列
function exportColumns(data, columns) {
    if (!columns) return data;

    const columnsList = columns.split(',').map(c => c.trim());
    const headers = columnsList;
    const result = data.map(row => {
        const newRow = {};
        columnsList.forEach(col => {
            newRow[col] = row[col] || '';
        });
        return newRow;
    });

    return { headers, data: result };
}

// 显示帮助
function showHelp() {
    console.log(`
CSV 数据处理工具

用法:
  node index.js --input <file.csv> --output <file.csv> [options]

选项:
  --input <path>    输入文件（必需）
  --output <path>   输出文件（必需）
  --filter <expr>   筛选条件，例如: "age > 18"
  --export <cols>   导出列，例如: "name,email"
  --header          是否包含表头（默认 true）

示例:
  # 筛选年龄大于 18 的记录
  node index.js --input users.csv --output adults.csv --filter "age > 18"

  # 只导出姓名和邮箱列
  node index.js --input users.csv --output names.csv --export "name,email"

  # 筛选并导出
  node index.js --input users.csv --output filtered.csv --filter "age > 18" --export "name,email"
    `);
}

// 主函数
function main() {
    if (params.help) {
        showHelp();
        process.exit(0);
    }

    if (!params.input || !params.output) {
        console.error('❌ 缺少必需参数');
        showHelp();
        process.exit(1);
    }

    const { headers, data } = parseCSV(params.input, params.header !== false);
    const filtered = filterData(data, params.filter);
    const { headers: exportHeaders, data: exported } = exportColumns(filtered, params.export);

    const csv = generateCSV(exportHeaders, exported, params.header !== false);
    fs.writeFileSync(params.output, csv, 'utf8');

    console.log(`✅ 处理完成！`);
    console.log(`📊 原始数据: ${data.length} 行`);
    console.log(`📊 筛选后: ${exported.length} 行`);
    console.log(`📁 输出文件: ${params.output}`);
}

main();
