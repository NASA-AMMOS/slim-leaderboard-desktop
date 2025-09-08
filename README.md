# SLIM Leaderboard Desktop

A cross-platform desktop application for analyzing GitHub repositories and organizations using the SLIM Best Practices Leaderboard tool.

[![SLIM](https://img.shields.io/badge/Best%20Practices%20from-SLIM-blue)](https://nasa-ammos.github.io/slim/)

## Description

This desktop application provides a native interface for running SLIM (Software Lifecycle Improvement & Modernization) best practices analysis on GitHub repositories and organizations. It features:

- 🖥️ Native desktop app for macOS, Windows, and Linux
- 🔒 Secure local token storage
- 🎯 Single repository or entire organization analysis
- 📊 Multiple output formats (Table, Tree, Markdown, Plain)
- ⚡ Real-time progress indicators
- 💾 Export analysis results
- 🎨 Professional black and white theme

## Links

[Releases](https://github.com/NASA-AMMOS/slim-leaderboard-desktop/releases) | [SLIM Documentation](https://nasa-ammos.github.io/slim/) | [Issue Tracker](https://github.com/NASA-AMMOS/slim-leaderboard-desktop/issues) | [SLIM Leaderboard Core](https://github.com/NASA-AMMOS/slim-leaderboard)

## Features

* **Native Desktop App** - Runs natively on macOS, Windows, and Linux
* **Secure Token Storage** - GitHub tokens encrypted and stored locally
* **Repository Analysis** - Analyze individual GitHub repositories for SLIM compliance
* **Organization Scanning** - Scan all repositories in a GitHub organization
* **Multiple Output Formats** - Table, Tree, Markdown, and Plain text formats
* **Export Results** - Save analysis results to file
* **Progress Tracking** - Real-time progress indicators during analysis
* **Professional UI** - Clean, minimalist black and white design

## Contents

* [Quick Start](#quick-start)
* [Changelog](#changelog)
* [FAQ](#frequently-asked-questions-faq)
* [Contributing Guide](#contributing)
* [License](#license)
* [Support](#support)

## Quick Start

This guide provides a quick way to get started with the SLIM Leaderboard Desktop application.

### Requirements

* Python 3.8 or higher (required for SLIM analysis)
* GitHub Personal Access Token (for API access)
* For development:
  * Node.js 18 or higher
  * Git (for submodules)

### Installation

#### Option 1: Download Pre-built Application (Recommended)

Download the latest release for your platform from the [Releases page](https://github.com/NASA-AMMOS/slim-leaderboard-desktop/releases):

- **macOS**: `SLIM-Leaderboard-[version].dmg`
- **Windows**: `SLIM-Leaderboard-Setup-[version].exe`  
- **Linux**: `SLIM-Leaderboard-[version].AppImage`

#### Option 2: Build from Source

1. **Clone the repository with submodules:**
   ```bash
   git clone --recursive https://github.com/NASA-AMMOS/slim-leaderboard-desktop.git
   cd slim-leaderboard-desktop
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Install Python dependencies for SLIM:**
   ```bash
   cd slim-leaderboard
   pip install -e .
   cd ..
   ```

### Running the Application

#### From Pre-built Binary
1. Double-click the downloaded application
2. Follow the first-time setup to configure your GitHub token

#### From Source (Development)
```bash
# Development mode with DevTools
npm run dev

# Production mode
npm start
```

#### Building Executables
```bash
# For current platform
npm run build

# For specific platforms
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux
```

### Usage Examples

1. **First Launch:**
   - Enter your GitHub Personal Access Token
   - Token is securely stored locally
   - Generate token at: https://github.com/settings/tokens

2. **Analyze a single repository:**
   - Select "Single Repository" from the dropdown
   - Enter repository URL: `https://github.com/NASA-AMMOS/slim-detect-secrets`
   - Choose output format (e.g., Table)
   - Click "Analyze"

3. **Analyze an entire organization:**
   - Select "Entire Organization" from the dropdown  
   - Enter organization URL: `https://github.com/nasa-ammos`
   - Choose output format and options
   - Click "Analyze"

4. **Export results:**
   - After analysis completes, click "Export" to save results


### Troubleshooting

1. **Python Not Found:**
   - Ensure Python 3.8+ is installed and in your PATH
   - Check Python status in the app's Settings

2. **Analysis Fails:**
   - Verify your GitHub token has the necessary permissions (repo scope)
   - Check your network connection
   - Ensure the target repository/organization exists and is accessible

3. **Build Issues:**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Ensure submodules are initialized: `git submodule update --init --recursive`

## Changelog

See our [CHANGELOG.md](CHANGELOG.md) for a history of our changes.

See our [releases page](https://github.com/NASA-AMMOS/slim-leaderboard-desktop/releases) for our key versioned releases.

## Frequently Asked Questions (FAQ)

**Q: Do I need to install Python separately?**
A: Yes, Python 3.8 or higher must be installed on your system for the SLIM analysis to work.

**Q: Is my GitHub token stored securely?**
A: Yes, tokens are encrypted using your system's secure storage (keychain on macOS/Linux, DPAPI on Windows).

**Q: Can I analyze private repositories?**
A: Yes, as long as your GitHub token has the necessary permissions (repo scope) for those repositories.

**Q: What's the difference between Single Repository and Entire Organization analysis?**
A: Single Repository analyzes one specific repository, while Entire Organization scans all accessible repositories within a GitHub organization.

**Q: Why is the analysis taking a long time?**
A: Large organizations or repositories with extensive history may take longer to analyze. The app will show progress updates during the analysis.

## Contributing

Interested in contributing to our project? Please see our: [CONTRIBUTING.md](CONTRIBUTING.md)

For guidance on how to interact with our team, please see our code of conduct located at: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

For guidance on our governance approach, including decision-making process and our various roles, please see our governance model at: [GOVERNANCE.md](GOVERNANCE.md)

## License

See our: [LICENSE](LICENSE)

## Support

- **Issues & Bug Reports**: [GitHub Issues](https://github.com/NASA-AMMOS/slim-leaderboard-desktop/issues)
- **SLIM Documentation**: [nasa-ammos.github.io/slim](https://nasa-ammos.github.io/slim/)
- **Main Repository**: [github.com/NASA-AMMOS/slim-leaderboard-desktop](https://github.com/NASA-AMMOS/slim-leaderboard-desktop)