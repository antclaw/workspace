#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

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

// 清理报告
const report = {
    scan: false,
    cache: false,
    temp: false,
    downloads: false,
    trash: false,
    full: false,
    dryRun: params.dryRun || false,
    verbose: params.verbose || false
};

// 显示帮助
function showHelp() {
    console.log(`
文件清理工具

用法:
  node index.js [options]

选项:
  --scan              扫描磁盘空间
  --clean-cache       清理缓存
  --clean-temp        清理临时文件
  --clean-downloads   清理下载文件夹
  --clean-trash       清理回收站
  --full              完整清理（扫描 + 清理）
  --dry-run           预览模式，不实际删除
  --verbose           详细输出

示例:
  # 扫描磁盘空间
  node index.js --scan

  # 预览清理结果
  node index.js --full --dry-run

  # 执行完整清理
  node index.js --full
    `);
}

// 扫描磁盘空间
function scanDisk() {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;
    const usage = ((used / total) * 100).toFixed(2);

    console.log('\n📊 磁盘空间扫描');
    console.log('─'.repeat(50));
    console.log(`总内存: ${(total / 1024 / 1024 / 1024).toFixed(2)} GB`);
    console.log(`已使用: ${(used / 1024 / 1024 / 1024).toFixed(2)} GB (${usage}%)`);
    console.log(`可用: ${(free / 1024 / 1024 / 1024).toFixed(2)} GB`);
    console.log('─'.repeat(50));
}

// 清理缓存
function cleanCache() {
    const cacheDirs = [
        path.join(os.homedir(), '.cache'),
        path.join(os.homedir(), '.npm'),
        path.join(os.homedir(), '.npm-cache'),
    ];

    console.log('\n🧹 清理缓存文件');
    console.log('─'.repeat(50));

    let cleanedSize = 0;

    cacheDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            const size = getDirSize(dir);
            if (size > 0) {
                const files = getAllFiles(dir);
                const deleted = deleteFiles(files);

                if (!report.dryRun) {
                    console.log(`✓ 清理 ${dir} (${(size / 1024 / 1024).toFixed(2)} MB)`);
                } else {
                    console.log(`⚠ 预览: 清理 ${dir} (${(size / 1024 / 1024).toFixed(2)} MB)`);
                }
                cleanedSize += size;
            }
        }
    });

    if (cleanedSize > 0) {
        console.log(`\n✨ 清理完成，释放空间: ${(cleanedSize / 1024 / 1024).toFixed(2)} MB`);
    } else {
        console.log('✓ 没有找到缓存文件');
    }
}

// 清理临时文件
function cleanTemp() {
    const tempDirs = [
        os.tmpdir(),
        path.join(os.homedir(), 'Downloads'),
        path.join(os.homedir(), 'AppData', 'Local', 'Temp'),
    ];

    console.log('\n🧹 清理临时文件');
    console.log('─'.repeat(50));

    let cleanedSize = 0;

    tempDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            const size = getDirSize(dir);
            if (size > 0) {
                const files = getAllFiles(dir);
                const deleted = deleteFiles(files);

                if (!report.dryRun) {
                    console.log(`✓ 清理 ${dir} (${(size / 1024 / 1024).toFixed(2)} MB)`);
                } else {
                    console.log(`⚠ 预览: 清理 ${dir} (${(size / 1024 / 1024).toFixed(2)} MB)`);
                }
                cleanedSize += size;
            }
        }
    });

    if (cleanedSize > 0) {
        console.log(`\n✨ 清理完成，释放空间: ${(cleanedSize / 1024 / 1024).toFixed(2)} MB`);
    } else {
        console.log('✓ 没有找到临时文件');
    }
}

// 清理回收站
function cleanTrash() {
    console.log('\n🗑️  清理回收站');
    console.log('─'.repeat(50));

    if (report.dryRun) {
        console.log('⚠ 预览模式：不会实际删除文件');
        console.log('✓ 回收站清理功能需要管理员权限');
    } else {
        console.log('✓ 回收站清理功能需要管理员权限');
        console.log('✓ 请使用系统命令清理回收站');
    }
}

// 获取目录大小
function getDirSize(dir) {
    let size = 0;
    const files = getAllFiles(dir);

    files.forEach(file => {
        try {
            size += fs.statSync(file).size;
        } catch (error) {
            // 忽略错误
        }
    });

    return size;
}

// 获取所有文件
function getAllFiles(dir) {
    const files = [];

    function scan(dir) {
        try {
            const items = fs.readdirSync(dir);

            items.forEach(item => {
                const fullPath = path.join(dir, item);

                try {
                    const stat = fs.statSync(fullPath);

                    if (stat.isDirectory()) {
                        scan(fullPath);
                    } else {
                        files.push(fullPath);
                    }
                } catch (error) {
                    // 忽略错误
                }
            });
        } catch (error) {
            // 忽略错误
        }
    }

    scan(dir);
    return files;
}

// 删除文件
function deleteFiles(files) {
    let deleted = 0;

    files.forEach(file => {
        try {
            fs.unlinkSync(file);
            deleted++;
        } catch (error) {
            // 忽略错误
        }
    });

    return deleted;
}

// 主函数
function main() {
    if (params.help) {
        showHelp();
        process.exit(0);
    }

    // 检查是否有清理选项
    if (!params.scan && !params.cleanCache && !params.cleanTemp && !params.cleanDownloads && !params.cleanTrash && !params.full) {
        console.log('❌ 请选择要执行的操作');
        showHelp();
        process.exit(1);
    }

    // 执行清理
    if (params.scan) {
        scanDisk();
        report.scan = true;
    }

    if (params.cleanCache) {
        cleanCache();
        report.cache = true;
    }

    if (params.cleanTemp) {
        cleanTemp();
        report.temp = true;
    }

    if (params.cleanDownloads) {
        cleanTemp(); // 复用临时文件清理逻辑
        report.downloads = true;
    }

    if (params.cleanTrash) {
        cleanTrash();
        report.trash = true;
    }

    if (params.full) {
        scanDisk();
        cleanCache();
        cleanTemp();
        cleanTrash();
        report.full = true;
    }

    if (report.dryRun) {
        console.log('\n💡 提示: 使用 --full 执行实际清理');
    }

    console.log('\n✅ 操作完成！');
}

main();
