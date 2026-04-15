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

## 💖 Support Development
This tool is **free and open source**. If it saves you time, consider supporting future development:

### 🚀 **Instant Support via PayPal**
[![Donate with PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID_HERE)

**Click the button above to support instantly!**

### Alternative Methods:
- **PayPal**: paypal.me/ismailnyza
- **Bitcoin**: bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  
- **Ethereum**: 0xC9b90EF3273C5c271848Bb02461883C4078EAa5d

**Why support?** Your contribution helps:
- Add new features
- Fix bugs faster
- Create more free tools
- Support open source development

### 🎯 **Support Tiers:**
- **$5**: Gets you a thank you note and priority support
- **$10**: Early access to new features
- **$25**: Custom feature requests
- **$50**: Your name in the README as a sponsor

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