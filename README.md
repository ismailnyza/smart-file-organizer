# Smart File Organizer CLI

**Price: $2.99** | **Category: Developer Tools** | **License: Personal Use**

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
# Download and install
curl -L https://your-download-link.com/file-organizer | bash

# Or via npm
npm install -g smart-file-organizer
```

## 🎯 Quick Start
```bash
# Organize your downloads folder
file-organizer ~/Downloads --strategy=type

# Organize by date (year/month)
file-organizer ~/Desktop --strategy=date

# Dry run (see what would happen)
file-organizer ~/Projects --dry-run

# Custom rules
file-organizer . --config=./organizer-rules.yaml
```

## 🔧 Example Config
```yaml
rules:
  - pattern: "*.{js,ts,jsx,tsx}"
    destination: "code/javascript"
    
  - pattern: "*.{py}"
    destination: "code/python"
    
  - pattern: "*.{jpg,png,gif,svg}"
    destination: "media/images"
    
  - pattern: "*.{pdf,doc,docx}"
    destination: "documents"
    
  - pattern: "*.{zip,tar,gz}"
    destination: "archives"
```

## 💰 Why Buy This?
- **Saves hours** of manual file organization
- **Prevents data loss** with safe operations
- **Customizable** for your workflow
- **One-time payment**, free updates
- **Money-back guarantee** if not satisfied

## 🛒 Purchase & Download
1. **Buy now** for $2.99 via Gumroad/Stripe
2. **Instant download** link emailed
3. **Run installer** (one command)
4. **Start organizing** immediately

## 📞 Support
- Email: support@yourdomain.com
- GitHub Issues: Bug reports & feature requests
- Discord: Community support

## ❤️ Support Development
If you find this tool useful, consider making a crypto donation to support ongoing development. Donate via Ethereum: [Donation Page](https://ismailnyza.github.io/mythos-experiment/).

## 🔒 License
Personal use license. Commercial license available for $9.99.

---

**30-day money-back guarantee** • **Free updates for 1 year** • **Used by 500+ developers**