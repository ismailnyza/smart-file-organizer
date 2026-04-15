#!/usr/bin/env node

/**
 * Smart File Organizer CLI
 * Version: 1.0.0
 * Price: $2.99
 * 
 * Organizes files by type, date, or custom rules.
 * Safe operations with undo functionality.
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const chalk = require('chalk');
const ora = require('ora');

// File type categories
const CATEGORIES = {
  images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.tiff'],
  documents: ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.md', '.csv', '.xls', '.xlsx'],
  code: ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c', '.h', '.html', '.css', '.json', '.yml', '.yaml'],
  archives: ['.zip', '.tar', '.gz', '.bz2', '.7z', '.rar'],
  media: ['.mp3', '.mp4', '.avi', '.mov', '.wav', '.flac'],
  executables: ['.exe', '.app', '.sh', '.bat', '.deb', '.rpm']
};

class FileOrganizer {
  constructor(options) {
    this.sourceDir = options.source;
    this.strategy = options.strategy || 'type';
    this.dryRun = options.dryRun || false;
    this.verbose = options.verbose || false;
    this.undoFile = path.join(this.sourceDir, '.file-organizer-undo.json');
    this.operations = [];
    this.stats = {
      total: 0,
      organized: 0,
      skipped: 0,
      errors: 0
    };
  }

  log(message, type = 'info') {
    const prefixes = {
      info: chalk.blue('ℹ'),
      success: chalk.green('✓'),
      warning: chalk.yellow('⚠'),
      error: chalk.red('✗')
    };
    console.log(`${prefixes[type]} ${message}`);
  }

  getCategoryForFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    
    for (const [category, extensions] of Object.entries(CATEGORIES)) {
      if (extensions.includes(ext)) {
        return category;
      }
    }
    
    return 'other';
  }

  getDatePath(filePath) {
    const stats = fs.statSync(filePath);
    const date = new Date(stats.mtime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return path.join(`${year}`, `${year}-${month}`);
  }

  async organizeFile(filePath) {
    const filename = path.basename(filePath);
    const relativePath = path.relative(this.sourceDir, filePath);
    
    let targetDir;
    let targetPath;

    try {
      switch (this.strategy) {
        case 'type':
          const category = this.getCategoryForFile(filename);
          targetDir = path.join(this.sourceDir, category);
          targetPath = path.join(targetDir, filename);
          break;

        case 'date':
          const datePath = this.getDatePath(filePath);
          targetDir = path.join(this.sourceDir, 'organized-by-date', datePath);
          targetPath = path.join(targetDir, filename);
          break;

        default:
          this.log(`Unknown strategy: ${this.strategy}`, 'warning');
          return false;
      }

      // Skip if already in correct location
      if (path.dirname(filePath) === targetDir) {
        this.stats.skipped++;
        if (this.verbose) {
          this.log(`${filename} already in correct location`, 'info');
        }
        return true;
      }

      // Record operation for undo
      this.operations.push({
        from: filePath,
        to: targetPath,
        timestamp: new Date().toISOString()
      });

      if (this.dryRun) {
        this.log(`[DRY RUN] Would move: ${relativePath} → ${path.relative(this.sourceDir, targetPath)}`, 'info');
        this.stats.organized++;
        return true;
      }

      // Create target directory if it doesn't exist
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Move the file
      fs.renameSync(filePath, targetPath);
      
      if (this.verbose) {
        this.log(`Moved: ${relativePath} → ${path.relative(this.sourceDir, targetPath)}`, 'success');
      }
      
      this.stats.organized++;
      return true;

    } catch (error) {
      this.log(`Error organizing ${filename}: ${error.message}`, 'error');
      this.stats.errors++;
      return false;
    }
  }

  async scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip hidden files and our undo file
      if (entry.name.startsWith('.') && entry.name !== '.file-organizer-undo.json') {
        continue;
      }

      if (entry.isDirectory()) {
        // Recursively scan subdirectories (optional)
        // await this.scanDirectory(fullPath);
        continue;
      }

      if (entry.isFile()) {
        this.stats.total++;
        await this.organizeFile(fullPath);
      }
    }
  }

  saveUndoInfo() {
    if (this.dryRun || this.operations.length === 0) {
      return;
    }

    const undoInfo = {
      timestamp: new Date().toISOString(),
      sourceDir: this.sourceDir,
      strategy: this.strategy,
      operations: this.operations
    };

    fs.writeFileSync(this.undoFile, JSON.stringify(undoInfo, null, 2));
    this.log(`Undo information saved to: ${this.undoFile}`, 'info');
  }

  async run() {
    const spinner = ora('Scanning directory...').start();
    
    try {
      // Validate source directory
      if (!fs.existsSync(this.sourceDir)) {
        spinner.fail(`Source directory not found: ${this.sourceDir}`);
        process.exit(1);
      }

      if (!fs.statSync(this.sourceDir).isDirectory()) {
        spinner.fail(`Source is not a directory: ${this.sourceDir}`);
        process.exit(1);
      }

      spinner.text = 'Organizing files...';
      await this.scanDirectory(this.sourceDir);
      
      // Save undo information
      this.saveUndoInfo();
      
      spinner.succeed('Organization complete!');
      
      // Print statistics
      console.log('\n' + chalk.bold('📊 Statistics:'));
      console.log(chalk.cyan(`  Total files: ${this.stats.total}`));
      console.log(chalk.green(`  Organized: ${this.stats.organized}`));
      console.log(chalk.yellow(`  Skipped: ${this.stats.skipped}`));
      console.log(chalk.red(`  Errors: ${this.stats.errors}`));
      
      if (this.dryRun) {
        console.log(chalk.yellow('\n⚠️  DRY RUN - No files were actually moved'));
        console.log('   Run without --dry-run to execute changes');
      }
      
      if (this.operations.length > 0 && !this.dryRun) {
        console.log(chalk.blue('\n💾 Undo file created:'));
        console.log(`   ${this.undoFile}`);
        console.log('   Use this file to revert changes if needed');
      }

    } catch (error) {
      spinner.fail(`Error: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI setup
program
  .name('file-organizer')
  .description('Smart file organization CLI tool')
  .version('1.0.0')
  .argument('<source>', 'Source directory to organize')
  .option('-s, --strategy <type>', 'Organization strategy (type|date)', 'type')
  .option('-d, --dry-run', 'Show what would be done without making changes')
  .option('-v, --verbose', 'Verbose output')
  .action(async (source, options) => {
    const organizer = new FileOrganizer({
      source: path.resolve(source),
      strategy: options.strategy,
      dryRun: options.dryRun,
      verbose: options.verbose
    });
    
    await organizer.run();
  });

// Undo command
program
  .command('undo')
  .description('Revert previous organization')
  .argument('[undo-file]', 'Undo file path (default: .file-organizer-undo.json in current dir)')
  .action((undoFile) => {
    undoFile = undoFile || '.file-organizer-undo.json';
    
    if (!fs.existsSync(undoFile)) {
      console.log(chalk.red(`Undo file not found: ${undoFile}`));
      process.exit(1);
    }

    const undoInfo = JSON.parse(fs.readFileSync(undoFile, 'utf8'));
    console.log(chalk.blue(`Reverting organization from ${undoInfo.timestamp}`));
    
    let reverted = 0;
    let errors = 0;
    
    for (const op of undoInfo.operations.reverse()) {
      try {
        if (fs.existsSync(op.to)) {
          fs.renameSync(op.to, op.from);
          console.log(chalk.green(`  Reverted: ${path.basename(op.to)}`));
          reverted++;
        }
      } catch (error) {
        console.log(chalk.red(`  Error reverting ${path.basename(op.to)}: ${error.message}`));
        errors++;
      }
    }
    
    console.log(chalk.bold('\n📊 Revert complete:'));
    console.log(chalk.green(`  Files reverted: ${reverted}`));
    console.log(chalk.red(`  Errors: ${errors}`));
    
    // Delete undo file
    fs.unlinkSync(undoFile);
    console.log(chalk.blue(`\nUndo file deleted: ${undoFile}`));
  });

// Parse command line arguments
program.parse();

// Show help if no arguments
if (process.argv.length === 2) {
  program.help();
}