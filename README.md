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

This guide provides a quick way to get started with our project. Please see our [docs]([INSERT LINK TO DOCS SITE / WIKI HERE]) for a more comprehensive overview.

### Requirements

* Node.js 18 or higher (for development)
* Python 3.8 or higher (for SLIM analysis)
* Git (for submodules)
* GitHub Personal Access Token (for API access)

### Setup Instructions

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

### Run Instructions

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

#### Build Executable
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

### Download Pre-built Binaries

Download the latest release for your platform from the [Releases page](https://github.com/NASA-AMMOS/slim-leaderboard-desktop/releases):

- **macOS**: `SLIM-Leaderboard-1.0.0.dmg`
- **Windows**: `SLIM-Leaderboard-Setup-1.0.0.exe`  
- **Linux**: `SLIM-Leaderboard-1.0.0.AppImage`

### Development & Testing

1. **Run in development mode with DevTools:**
   ```bash
   npm run dev
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Check Python integration:**
   - Open Settings in the app
   - Check Python status indicator

## Changelog

See our [CHANGELOG.md](CHANGELOG.md) for a history of our changes.

See our [releases page]([INSERT LINK TO YOUR RELEASES PAGE]) for our key versioned releases.

<!-- ☝️ Replace with links to your changelog and releases page ☝️ -->

## Frequently Asked Questions (FAQ)

[INSERT LINK TO FAQ PAGE OR PROVIDE FAQ INLINE HERE]
<!-- example link to FAQ PAGE>
Questions about our project? Please see our: [FAQ]([INSERT LINK TO FAQ / DISCUSSION BOARD])
-->

<!-- example FAQ inline format>
1. Question 1
   - Answer to question 1
2. Question 2
   - Answer to question 2
-->

<!-- example FAQ inline with no questions yet>
No questions yet. Propose a question to be added here by reaching out to our contributors! See support section below.
-->

<!-- ☝️ Replace with a list of frequently asked questions from your project, or post a link to your FAQ on a discussion board ☝️ -->

## Contributing

[INSERT LINK TO CONTRIBUTING GUIDE OR FILL INLINE HERE]
<!-- example link to CONTRIBUTING.md>
Interested in contributing to our project? Please see our: [CONTRIBUTING.md](CONTRIBUTING.md)
-->

<!-- example inline contributing guide>
1. Create an GitHub issue ticket describing what changes you need (e.g. issue-1)
2. [Fork](INSERT LINK TO YOUR REPO FORK PAGE HERE, e.g. https://github.com/my_org/my_repo/fork) this repo
3. Make your modifications in your own fork
4. Make a pull-request in this repo with the code in your fork and tag the repo owner / largest contributor as a reviewer

**Working on your first pull request?** See guide: [How to Contribute to an Open Source Project on GitHub](https://kcd.im/pull-request)
-->

[INSERT LINK TO YOUR CODE_OF_CONDUCT.md OR SHARE TEXT HERE]
<!-- example link to CODE_OF_CONDUCT.md>
For guidance on how to interact with our team, please see our code of conduct located at: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
-->

<!-- ☝️ Replace with a text describing how people may contribute to your project, or link to your contribution guide directly ☝️ -->

[INSERT LINK TO YOUR GOVERNANCE.md OR SHARE TEXT HERE]
<!-- example link to GOVERNANCE.md>
For guidance on our governance approach, including decision-making process and our various roles, please see our governance model at: [GOVERNANCE.md](GOVERNANCE.md)
-->

## License

See our: [LICENSE](LICENSE)
<!-- ☝️ Replace with the text of your copyright and license, or directly link to your license file ☝️ -->

## Support

[INSERT CONTACT INFORMATION OR PROFILE LINKS TO MAINTAINERS AMONG COMMITTER LIST]

<!-- example list of contacts>
Key points of contact are: [@github-user-1](link to github profile) [@github-user-2](link to github profile)
-->

<!-- ☝️ Replace with the key individuals who should be contacted for questions ☝️ -->