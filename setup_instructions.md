# 🚀 Quick Setup Instructions

## For Windows Users

1. **Download and extract** all the game files to a folder called `micro-medics-game`

2. **Install Node.js** (if not already installed):
   - Go to https://nodejs.org/
   - Download and install the LTS version

3. **Open Command Prompt or PowerShell**:
   - Press `Win + R`, type `cmd`, press Enter
   - Navigate to your game folder: `cd path\to\micro-medics-game`

4. **Install and run**:
   ```bash
   npm install
   npm start
   ```

5. **Open your browser** to `http://localhost:3000`

## For Mac Users

1. **Download and extract** all the game files to a folder called `micro-medics-game`

2. **Install Node.js** (if not already installed):
   - Go to https://nodejs.org/
   - Download and install the LTS version
   - Or use Homebrew: `brew install node`

3. **Open Terminal**:
   - Press `Cmd + Space`, type "Terminal", press Enter
   - Navigate to your game folder: `cd /path/to/micro-medics-game`

4. **Install and run**:
   ```bash
   npm install
   npm start
   ```

5. **Open your browser** to `http://localhost:3000`

## For Linux Users

1. **Download and extract** all the game files to a folder called `micro-medics-game`

2. **Install Node.js** (if not already installed):
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm
   
   # CentOS/RHEL
   sudo yum install nodejs npm
   
   # Arch Linux
   sudo pacman -S nodejs npm
   ```

3. **Open Terminal** and navigate to your game folder:
   ```bash
   cd /path/to/micro-medics-game
   ```

4. **Install and run**:
   ```bash
   npm install
   npm start
   ```

5. **Open your browser** to `http://localhost:3000`

## Troubleshooting

### "npm command not found"
- Node.js is not installed or not in PATH
- Reinstall Node.js and restart your terminal

### "Permission denied" errors (Linux/Mac)
- Try using `sudo npm install` (not recommended)
- Better: Set up npm to install packages globally without sudo
- Or use a Node version manager like nvm

### Port 3000 already in use
- The game will automatically try other ports (3001, 3002, etc.)
- Or stop other applications using port 3000

### Game runs slowly
- Close other browser tabs and applications
- Try using Chrome or Firefox for best performance
- Ensure your device has sufficient RAM

## File Structure After Setup

```
micro-medics-game/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
└── .gitignore
```

## Next Steps

Once the game is running:
1. 🎮 Start with the tutorial
2. 🚀 Customize your nano-ship
3. 🧠 Learn about brain anatomy
4. 🏆 Unlock achievements
5. 💰 Collect coins to buy new ships

Happy gaming and learning! 🧠⚡