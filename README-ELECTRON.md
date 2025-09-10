# SLIM Leaderboard Desktop Application

A cross-platform desktop application for analyzing GitHub repositories using SLIM (Software Lifecycle Improvement & Modernization) best practices.

## Features

- 🖥️ **Native Desktop App** - Runs on macOS, Windows, and Linux
- 🔒 **Secure Token Storage** - GitHub tokens stored securely on your local machine
- 🚀 **Fast Local Analysis** - Runs SLIM analysis directly on your computer
- 📊 **Multiple Output Formats** - Table, Tree, Markdown, and Plain text
- 🏢 **Organization Support** - Analyze entire GitHub organizations
- 💾 **Export Results** - Save analysis results to file
- 🎨 **Professional UI** - Clean, minimalist black and white design

## Installation

### Pre-built Binaries

Download the latest release for your platform:

- **macOS**: `SLIM-Leaderboard-1.0.0.dmg`
- **Windows**: `SLIM-Leaderboard-Setup-1.0.0.exe`
- **Linux**: `SLIM-Leaderboard-1.0.0.AppImage`

### Requirements

- Python 3.8 or higher must be installed on your system
- GitHub Personal Access Token (for API access)

## Development Setup

### Prerequisites

- Node.js 18 or higher
- Python 3.8 or higher
- Git

### Clone and Install

```bash
# Clone the repository with submodules
git clone --recursive https://github.com/NASA-AMMOS/slim-leaderboard-desktop.git
cd slim-leaderboard-desktop

# Install Node dependencies
npm install

# Install Python dependencies for SLIM
cd slim-leaderboard
pip install -e .
cd ..
```

### Run in Development

```bash
# Start the Electron app in development mode
npm run dev
```

### Build for Production

```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build:mac    # macOS
npm run build:win    # Windows  
npm run build:linux  # Linux

# Build for all platforms
npm run dist
```

Built applications will be in the `dist` folder.

## Usage

1. **Launch the Application**
   - Double-click the app icon or run from command line

2. **Configure GitHub Token** (First time only)
   - Enter your GitHub Personal Access Token
   - Token is stored securely on your machine
   - Generate token at: https://github.com/settings/tokens

3. **Run Analysis**
   - Select target type (Repository or Organization)
   - Enter the GitHub URL
   - Choose output format
   - Click "Analyze"

4. **View and Export Results**
   - Results display in the application
   - Click "Export" to save to file
   - Clear results to run new analysis

## Security

- GitHub tokens are stored encrypted on your local machine
- Tokens never leave your computer
- All analysis runs locally using your token
- No data is sent to external servers

## Architecture

```
slim-leaderboard-desktop/
├── electron/           # Electron main process
│   ├── main.js        # Main process & IPC handlers
│   └── preload.js     # Secure context bridge
├── renderer/          # Electron renderer process
│   ├── index.html     # UI markup
│   ├── renderer.js    # UI logic
│   └── styles.css     # Styling
├── slim-leaderboard/  # SLIM analysis engine (submodule)
└── package.json       # Electron configuration
```

## Token Security

The application uses Electron's secure storage mechanism:
- Tokens are encrypted using the system keychain (macOS/Linux) or DPAPI (Windows)
- Tokens are only accessible to the application
- Clear token option available in Settings

## Troubleshooting

### Python Not Found
- Ensure Python 3.8+ is installed and in PATH
- Check Python status in app Settings

### Analysis Fails
- Verify GitHub token has necessary permissions (repo scope)
- Check network connection
- Ensure target repository/organization exists

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure all submodules are initialized: `git submodule update --init --recursive`

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Apache License 2.0 - See [LICENSE](LICENSE) for details.

## Support

- Issues: [GitHub Issues](https://github.com/NASA-AMMOS/slim-leaderboard-desktop/issues)
- SLIM Documentation: [nasa-ammos.github.io/slim](https://nasa-ammos.github.io/slim/)

## Credits

Developed by NASA-AMMOS for the Software Lifecycle Improvement & Modernization (SLIM) initiative.