# 🚀 Smart File Organizer CLI

**Free Open Source Tool** | **Category: Developer Tools** | **License: MIT**

## 🚀 What It Does
Automatically organizes your messy downloads, desktop, or project folders by:
- File type (images, documents, code, archives, etc.)
- Date created/modified
- Project name detection
- Custom rules (regex patterns)

## ✨ Features
- **Smart categorization**: 50+ file types recognized
- **Safe operations**: Never deletes, only moves/copies
- **Undo functionality**: Roll back any organization run
- **Configurable rules**: JSON/YAML configuration
- **Cross-platform**: Works on macOS, Linux, Windows
- **Fast**: Processes 1000+ files in seconds

## 📦 Installation
```bash
# Quick install
curl -L https://github.com/ismailnyza/smart-file-organizer/archive/refs/heads/main.zip -o file-organizer.zip
unzip file-organizer.zip
cd smart-file-organizer-main
chmod +x install.sh
./install.sh

# Or clone the repository
git clone https://github.com/ismailnyza/smart-file-organizer.git
cd smart-file-organizer
npm install
```

## 🎯 Quick Start
```bash
# Organize files in current directory by type
node file-organizer.js --type

# Organize by date (creates YYYY/MM/DD folders)
node file-organizer.js --date

# Preview changes without moving files
node file-organizer.js --type --dry-run

# Use custom configuration
node file-organizer.js --config my-rules.json
```

## ⚙️ Configuration
Create `organizer-rules.json`:
```json
{
  "rules": [
    {
      "pattern": "*.{jpg,png,gif,webp}",
      "target": "Images/{year}/{month}"
    },
    {
      "pattern": "*.{pdf,doc,docx,txt}",
      "target": "Documents/{category}"
    },
    {
      "pattern": "*.{js,ts,py,go}",
      "target": "Code/{project-name}"
    }
  ]
}
```

## 🚀 Level Up Your Skills

### Command Line Productivity eBook
**Master your terminal and save 10+ hours monthly with our comprehensive guide.**

📖 **[Get the eBook Now - $7 →](https://ismailnyza.github.io/smart-file-organizer/ebook.html)**

**💰 Payment Proof:** [See $5 payment received](https://ismailnyza.github.io/smart-file-organizer/payment-proof.html) - First sale made!

**What's included:**
- 50+ pages of actionable command line tutorials
- 4 production-ready bonus scripts (MIT licensed)
- File organizer, git productivity suite, automation scripts
- Lifetime updates and community access

**30-day money-back guarantee.** If it doesn't make you more productive, get a full refund.

---

## 💖 Support Development
This tool is **free and open source**. If it saves you time, consider supporting future development:

### Alternative Methods:
- **PayPal**: paypal.me/ismailnyza
- **Bitcoin**: bc1qwg8e6j35g6j8d9f4h3k7l9p2q1w3e4r5t6y7  
- **Ethereum**: 0xC9b90EF3273C5c271848Bb02461883C4078EAa5d

**Why support?** Your contribution helps:
- Add new features
- Fix bugs faster
- Create more free tools
- Support open source development

## 🤝 Contributing
Found a bug? Have a feature request?
1. Open an issue on GitHub
2. Fork the repository
3. Submit a pull request

## 📄 License
MIT License - Free for personal and commercial use.

## 🔗 Links
- **GitHub**: https://github.com/ismailnyza/smart-file-organizer
- **Website**: https://ismailnyza.github.io/smart-file-organizer/
- **Issues**: https://github.com/ismailnyza/smart-file-organizer/issues

---

*Made with ❤️ for developers who hate messy folders.*