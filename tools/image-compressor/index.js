#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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
图片压缩工具

用法:
  node index.js [options]

单个文件:
  --input <file> --output <file> --quality <0-100>
  --input <file> --output <file> --width <pixels> --height <pixels>

批量处理:
  --input-dir <dir> --output-dir <dir> --quality <0-100>

示例:
  # 压换单个图片
  node index.js --input photo.jpg --output compressed.jpg --quality 80

  # 批量压缩
  node index.js --input-dir ./photos --output-dir ./compressed --quality 75

  # 压缩并调整大小
  node index.js --input photo.jpg --output final.jpg --quality 80 --width 800 --height 600

  # 显示压缩报告
  node index.js --input photo.jpg --output compressed.jpg --quality 80 --report
    `);
}

// 显示压缩报告
function showReport(inputPath, outputPath, originalSize, compressedSize, quality, width, height) {
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(2);
    const savings = (originalSize - compressedSize) / 1024 / 1024;

    console.log('\n📊 压缩报告');
    console.log('━'.repeat(50));
    console.log(`文件名: ${path.basename(inputPath)}`);
    console.log(`原始大小: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`压缩后大小: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`压缩率: ${reduction}%`);
    console.log(`质量: ${quality}/100`);
    if (width || height) {
        console.log(`尺寸: ${width || 'auto'}x${height || 'auto'}`);
    }
    console.log('━'.repeat(50));
    console.log(`✅ 压缩成功！节省空间: ${savings.toFixed(2)} MB`);
    console.log('');
}

// 压缩图片
async function compressImage(input, output, quality, width, height) {
    console.log(`\n📦 压缩图片: ${path.basename(input)} → ${path.basename(output)}`);

    try {
        const originalSize = fs.statSync(input).size;

        const image = sharp(input);

        // 应用质量参数
        if (quality) {
            image = image.jpeg({ quality: parseInt(quality), mozjpeg: true });
        } else {
            image = image.jpeg({ quality: 80, mozjpeg: true });
        }

        // 应用尺寸调整
        if (width || height) {
            image = image.resize(parseInt(width) || null, parseInt(height) || null, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        await image.toFile(output);

        const compressedSize = fs.statSync(output).size;

        if (params.report) {
            showReport(input, output, originalSize, compressedSize, quality, width, height);
        } else {
            const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(2);
            const savings = (originalSize - compressedSize) / 1024 / 1024;
            console.log(`✅ 压缩成功！节省空间: ${savings.toFixed(2)} MB (${reduction}%)`);
        }

        return true;
    } catch (error) {
        console.error(`❌ 压缩失败: ${error.message}`);
        return false;
    }
}

// 批量压缩图片
async function batchCompressImages(inputDir, outputDir, quality, width, height) {
    console.log(`\n🔄 批量压缩图片`);
    console.log(`📁 输入目录: ${inputDir}`);
    console.log(`📁 输出目录: ${outputDir}`);
    console.log(`🎨 质量: ${quality || 80}/100`);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir).filter(f =>
        ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'].includes(path.extname(f).toLowerCase())
    );

    console.log(`📊 找到 ${files.length} 个图片文件\n`);

    let successCount = 0;
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + '.jpg');

        if (await compressImage(inputPath, outputPath, quality, width, height)) {
            successCount++;
            totalOriginalSize += fs.statSync(inputPath).size;
            totalCompressedSize += fs.statSync(outputPath).size;
        }
    }

    const totalSavings = (totalOriginalSize - totalCompressedSize) / 1024 / 1024;
    const totalReduction = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(2);

    console.log(`\n✨ 完成！成功压缩 ${successCount}/${files.length} 个图片`);
    console.log(`📊 总节省空间: ${totalSavings.toFixed(2)} MB (${totalReduction}%)`);
}

// 检查依赖
function checkDependencies() {
    try {
        require('sharp');
        console.log('✅ Sharp 已安装');
    } catch (error) {
        console.error('❌ Sharp 未安装');
        console.error('💡 安装命令: npm install sharp');
        process.exit(1);
    }
}

// 主函数
async function main() {
    if (params.help) {
        showHelp();
        process.exit(0);
    }

    // 检查依赖
    checkDependencies();

    // 检查是否有压缩选项
    if (!params.input && !params.inputDir) {
        console.log('❌ 请选择要执行的操作');
        showHelp();
        process.exit(1);
    }

    // 单个文件压缩
    if (params.input && params.output) {
        if (!params.quality && !params.width && !params.height) {
            console.log('❌ 压缩图片需要: --quality, --width, 或 --height');
            showHelp();
            process.exit(1);
        }

        const quality = params.quality || 80;
        const width = params.width;
        const height = params.height;

        await compressImage(params.input, params.output, quality, width, height);
    }

    // 批量压缩
    if (params.inputDir && params.outputDir) {
        const quality = params.quality || 80;
        const width = params.width;
        const height = params.height;

        await batchCompressImages(params.inputDir, params.outputDir, quality, width, height);
    }

    console.log('\n✅ 操作完成！');
}

main();
