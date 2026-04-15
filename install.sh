#!/bin/bash

# Smart File Organizer Installer
# One-line install: curl -L https://your-domain.com/install.sh | bash

set -e

echo "🚀 Installing Smart File Organizer..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Create installation directory
INSTALL_DIR="$HOME/.file-organizer"
mkdir -p "$INSTALL_DIR"

# Copy files
cp file-organizer.js "$INSTALL_DIR/"
cp package.json "$INSTALL_DIR/"
cp README.md "$INSTALL_DIR/"

# Install dependencies
cd "$INSTALL_DIR"
npm install --production

# Create symlink
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
    mkdir -p "$HOME/.local/bin"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"
fi

ln -sf "$INSTALL_DIR/file-organizer.js" "$HOME/.local/bin/file-organizer"
chmod +x "$HOME/.local/bin/file-organizer"

echo "✅ Installation complete!"
echo ""
echo "📋 Usage:"
echo "   file-organizer ~/Downloads --strategy=type"
echo "   file-organizer ~/Desktop --strategy=date"
echo "   file-organizer --help"
echo ""
echo "💡 Tip: Add ~/.local/bin to your PATH if not already there"
echo "   export PATH=\"\$HOME/.local/bin:\$PATH\""