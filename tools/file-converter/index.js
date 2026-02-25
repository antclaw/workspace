#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

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
文件转换工具

用法:
  node index.js [options]

图片转换:
  --image --input <file> --output <file> --format <format>
  --image --input-dir <dir> --output-dir <dir> --format <format>

PDF 工具:
  --pdf --image --input <image> --output <pdf>
  --pdf --merge --input <file1> --input <file2> ... --output <merged>
  --pdf --split --input <pdf> --output-prefix <prefix>
  --pdf --compress --input <pdf> --output <compressed>

视频转换:
  --video --input <file> --output <file> --format <format>

音频转换:
  --audio --input <file> --output <file> --format <format>

示例:
  # 转换单个图片
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
    `);
}

// 图片格式转换
async function convertImage(input, output, format, quality, width, height) {
    console.log(`\n🖼️  转换图片: ${path.basename(input)} → ${path.basename(output)}`);

    try {
        // 使用 ImageMagick 转换
        const args = [];

        if (quality) {
            args.push('-quality', quality);
        }

        if (width && height) {
            args.push('-resize', `${width}x${height}!`);
        } else if (width) {
            args.push('-resize', `${width}!`);
        } else if (height) {
            args.push('-resize', `x${height}`);
        }

        args.push(input, output);

        await execAsync(`convert ${args.join(' ')}`, { stdio: 'inherit' });

        const stats = fs.statSync(output);
        console.log(`✅ 转换成功！文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
        return true;
    } catch (error) {
        console.error(`❌ 转换失败: ${error.message}`);
        return false;
    }
}

// 批量转换图片
async function batchConvertImages(inputDir, outputDir, format, quality, width, height) {
    console.log(`\n🔄 批量转换图片`);
    console.log(`📁 输入目录: ${inputDir}`);
    console.log(`📁 输出目录: ${outputDir}`);
    console.log(`🎨 格式: ${format}`);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir).filter(f =>
        ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(f).toLowerCase())
    );

    console.log(`📊 找到 ${files.length} 个图片文件\n`);

    let successCount = 0;

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + '.' + format);

        if (await convertImage(inputPath, outputPath, format, quality, width, height)) {
            successCount++;
        }
    }

    console.log(`\n✨ 完成！成功转换 ${successCount}/${files.length} 个图片`);
}

// 图片转 PDF
async function imageToPDF(image, pdf) {
    console.log(`\n📄 图片转 PDF: ${path.basename(image)} → ${path.basename(pdf)}`);

    try {
        await execAsync(`convert "${image}" "${pdf}"`, { stdio: 'inherit' });

        const stats = fs.statSync(pdf);
        console.log(`✅ 转换成功！文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
        return true;
    } catch (error) {
        console.error(`❌ 转换失败: ${error.message}`);
        return false;
    }
}

// PDF 合并
async function mergePDF(files, output) {
    console.log(`\n🔗 合并 PDF 文件`);

    try {
        const args = ['-input', ...files, '-output', output];
        await execAsync(`pdfjoin ${args.join(' ')} -o - | gs -sDEVICE=pdfwrite -dBATCH -dNOPAUSE -dQUIET -sOutputFile="${output}" -`, { stdio: 'inherit' });

        const stats = fs.statSync(output);
        console.log(`✅ 合并成功！文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
        return true;
    } catch (error) {
        console.error(`❌ 合并失败: ${error.message}`);
        return false;
    }
}

// PDF 分割
async function splitPDF(pdf, prefix) {
    console.log(`\n✂️  分割 PDF: ${path.basename(pdf)}`);

    try {
        const args = [`-dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=${prefix}_%d.pdf "${pdf}"`];
        await execAsync(`gs ${args.join(' ')}`, { stdio: 'inherit' });

        const files = fs.readdirSync('.').filter(f => f.startsWith(prefix) && f.endsWith('.pdf'));
        console.log(`✅ 分割成功！生成了 ${files.length} 个 PDF 文件`);
        return true;
    } catch (error) {
        console.error(`❌ 分割失败: ${error.message}`);
        return false;
    }
}

// PDF 压缩
async function compressPDF(input, output) {
    console.log(`\n📦 压缩 PDF: ${path.basename(input)} → ${path.basename(output)}`);

    try {
        await execAsync(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${output}" "${input}"`, { stdio: 'inherit' });

        const inputStats = fs.statSync(input);
        const outputStats = fs.statSync(output);
        const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(2);

        console.log(`✅ 压缩成功！减少了 ${reduction}%`);
        return true;
    } catch (error) {
        console.error(`❌ 压缩失败: ${error.message}`);
        return false;
    }
}

// 视频格式转换
async function convertVideo(input, output, format, quality) {
    console.log(`\n🎬 转换视频: ${path.basename(input)} → ${path.basename(output)}`);

    try {
        await execAsync(`ffmpeg -i "${input}" -c:v libx264 -preset medium -crf ${quality || 23} "${output}"`, { stdio: 'inherit' });

        const stats = fs.statSync(output);
        console.log(`✅ 转换成功！文件大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
        return true;
    } catch (error) {
        console.error(`❌ 转换失败: ${error.message}`);
        return false;
    }
}

// 音频格式转换
async function convertAudio(input, output, format, quality) {
    console.log(`\n🎵 转换音频: ${path.basename(input)} → ${path.basename(output)}`);

    try {
        await execAsync(`ffmpeg -i "${input}" -b:a ${quality || 128}k "${output}"`, { stdio: 'inherit' });

        const stats = fs.statSync(output);
        console.log(`✅ 转换成功！文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
        return true;
    } catch (error) {
        console.error(`❌ 转换失败: ${error.message}`);
        return false;
    }
}

// 检查依赖
function checkDependencies() {
    const dependencies = {
        image: 'convert (ImageMagick)',
        pdf: 'pdfjoin, gs (Ghostscript)',
        video: 'ffmpeg',
        audio: 'ffmpeg'
    };

    for (const [type, dep] of Object.entries(dependencies)) {
        console.log(`\n🔍 检查 ${type} 转换依赖: ${dep}`);
        try {
            execSync(`which ${dep.split(' ')[0]}`, { stdio: 'ignore' });
            console.log(`✅ ${dep} 已安装`);
        } catch (error) {
            console.error(`❌ ${dep} 未安装`);
            console.error(`💡 安装命令: sudo apt-get install ${dep.split(' ').join(' ')}`);
            process.exit(1);
        }
    }
}

// 主函数
async function main() {
    if (params.help) {
        showHelp();
        process.exit(0);
    }

    // 检查依赖
    if (params.image || params.pdf || params.video || params.audio) {
        checkDependencies();
    }

    // 图片转换
    if (params.image) {
        if (params.input && params.output && params.format) {
            await convertImage(params.input, params.output, params.format, params.quality, params.width, params.height);
        } else if (params.inputDir && params.outputDir && params.format) {
            await batchConvertImages(params.inputDir, params.outputDir, params.format, params.quality, params.width, params.height);
        } else {
            console.error('❌ 图片转换需要: --input 或 --input-dir');
            showHelp();
            process.exit(1);
        }
    }

    // PDF 工具
    if (params.pdf) {
        if (params.image && params.input && params.output) {
            await imageToPDF(params.input, params.output);
        } else if (params.merge && params.input && params.output) {
            await mergePDF(params.input, params.output);
        } else if (params.split && params.input && params.outputPrefix) {
            await splitPDF(params.input, params.outputPrefix);
        } else if (params.compress && params.input && params.output) {
            await compressPDF(params.input, params.output);
        } else {
            console.error('❌ PDF 工具需要指定操作类型: --image, --merge, --split, 或 --compress');
            showHelp();
            process.exit(1);
        }
    }

    // 视频转换
    if (params.video) {
        if (params.input && params.output && params.format) {
            await convertVideo(params.input, params.output, params.format, params.quality);
        } else {
            console.error('❌ 视频转换需要: --input, --output, --format');
            showHelp();
            process.exit(1);
        }
    }

    // 音频转换
    if (params.audio) {
        if (params.input && params.output && params.format) {
            await convertAudio(params.input, params.output, params.format, params.quality);
        } else {
            console.error('❌ 音频转换需要: --input, --output, --format');
            showHelp();
            process.exit(1);
        }
    }

    console.log('\n✅ 操作完成！');
}

main();
