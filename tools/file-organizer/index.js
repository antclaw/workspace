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

// 显示帮助
function showHelp() {
    console.log(`
文件批量重命名工具

用法:
  node index.js --dir <directory> --pattern <pattern> --rename <template> [options]

选项:
  --dir <path>          目录路径（必需）
  --pattern <pattern>   文件匹配模式（必需）
  --rename <template>   重命名模板（必需）
  --dry-run             预览模式，不实际执行
  --backup              备份原文件
  --verbose             详细输出

模板占位符:
  @NUM@    编号（从 1 开始）
  @DATE@   当前日期
  @TIME@   当前时间
  @NAME@   原文件名
  @EXT@    文件扩展名
  @LOWER@  小写
  @UPPER@  大写
  @FIRST@  首字母大写

示例:
  # 给图片添加编号
  node index.js --dir ./photos --pattern "*.jpg" --rename "@NUM@_photo.jpg"

  # 按日期重命名
  node index.js --dir ./files --pattern "*.txt" --rename "@DATE@_@NAME@.txt"

  # 预览重命名
  node index.js --dir ./files --pattern "*.jpg" --rename "IMG_@NUM@.jpg" --dry-run
    `);
}

// 检查必需参数
if (!params.dir || !params.pattern || !params.rename) {
    console.error('❌ 缺少必需参数');
    showHelp();
    process.exit(1);
}

// 检查目录是否存在
if (!fs.existsSync(params.dir)) {
    console.error('❌ 目录不存在:', params.dir);
    process.exit(1);
}

// 获取文件列表
function getFiles(dir, pattern) {
    const regex = new RegExp(pattern.replace(/\*/g, '.*').replace(/\?/g, '.'));
    const files = fs.readdirSync(dir).filter(file => regex.test(file));
    return files.sort();
}

// 重命名模板
function formatTemplate(template, index, filename, ext) {
    const date = new Date();
    const formatted = template
        .replace(/@NUM@/g, index + 1)
        .replace(/@DATE@/g, date.toISOString().split('T')[0])
        .replace(/@TIME@/g, date.toTimeString().split(' ')[0])
        .replace(/@NAME@/g, filename)
        .replace(/@EXT@/g, ext)
        .replace(/@LOWER@/g, filename.toLowerCase())
        .replace(/@UPPER@/g, filename.toUpperCase())
        .replace(/@FIRST@/g, filename.charAt(0).toUpperCase() + filename.slice(1).toLowerCase());

    return formatted;
}

// 重命名文件
function renameFile(oldPath, newPath, dryRun, backup) {
    if (dryRun) {
        console.log(`[预览] ${path.basename(oldPath)} → ${path.basename(newPath)}`);
        return true;
    }

    if (backup && fs.existsSync(newPath)) {
        console.error(`⚠️  文件已存在: ${path.basename(newPath)}`);
        return false;
    }

    try {
        fs.renameSync(oldPath, newPath);
        console.log(`✅ ${path.basename(oldPath)} → ${path.basename(newPath)}`);
        return true;
    } catch (error) {
        console.error(`❌ 重命名失败: ${path.basename(oldPath)} - ${error.message}`);
        return false;
    }
}

// 主函数
function main() {
    const files = getFiles(params.dir, params.pattern);
    const verbose = params.verbose;

    console.log(`📁 目录: ${params.dir}`);
    console.log(`🔍 匹配模式: ${params.pattern}`);
    console.log(`📝 重命名模板: ${params.rename}`);
    console.log(`📊 文件数量: ${files.length}`);
    console.log('');

    if (files.length === 0) {
        console.log('⚠️  没有找到匹配的文件');
        process.exit(0);
    }

    let successCount = 0;

    files.forEach((file, index) => {
        const oldPath = path.join(params.dir, file);
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        const newPath = path.join(params.dir, formatTemplate(params.rename, index, name, ext));

        if (verbose) {
            console.log(`\n[详细信息]`);
            console.log(`原文件: ${file}`);
            console.log(`新文件: ${path.basename(newPath)}`);
        }

        if (renameFile(oldPath, newPath, params.dryRun, params.backup)) {
            successCount++;
        }
    });

    console.log('');
    console.log(`✨ 完成！成功重命名 ${successCount}/${files.length} 个文件`);

    if (dryRun) {
        console.log('💡 提示: 使用 --dry-run 预览后，去掉该参数实际执行');
    }
}

main();
