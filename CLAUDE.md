# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SLIM Leaderboard Desktop is a cross-platform Electron application that provides a native interface for running SLIM (Software Lifecycle Improvement & Modernization) best practices analysis on GitHub repositories and organizations. The app features secure token storage, real-time progress tracking, and multiple output formats.

## Architecture

The application has three main components:

1. **Electron Main Process** (`electron/main.js`): Handles IPC communication, secure token storage, and Python subprocess management
2. **Renderer Process** (`renderer/`): Web-based UI using vanilla JavaScript, HTML, and CSS  
3. **SLIM Analysis Engine** (`slim-leaderboard/`): Python-based analysis tool included as a Git submodule

## Key Commands

### Development
```bash
# Install dependencies (Node and Python)
npm install
cd slim-leaderboard && pip install -e . && cd ..

# Run in development mode with DevTools
npm run dev

# Run in production mode
npm start
```

### Building
```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build:mac
npm run build:win  
npm run build:linux
```

### Testing
The project currently does not have a test suite configured. When implementing tests, consider testing:
- IPC communication between main and renderer processes
- Token storage/retrieval functionality
- Python subprocess execution

## Development Workflow

### Python Integration
The app uses `python-shell` to execute the SLIM analysis tool. The Python environment is configured in `electron/main.js`:
- Python path detection supports system Python and common virtual environments
- SLIM module path is dynamically resolved for both development and production
- GitHub token is passed via environment variable `GITHUB_TOKEN`

### Secure Token Storage
Uses `electron-store` with encryption for storing GitHub tokens:
- Tokens are encrypted using system keychain (macOS/Linux) or DPAPI (Windows)
- Storage configuration in `electron/main.js` lines 8-20

### IPC Communication
Main process exposes these IPC handlers:
- `save-token`, `get-token`, `has-token`, `clear-token`: Token management
- `run-analysis`: Execute SLIM analysis with progress updates
- `check-python`: Verify Python installation
- `open-external`: Open URLs in default browser

### Building & Distribution
Electron Builder configuration in `package.json`:
- Application ID: `gov.nasa.ammos.slim-leaderboard`
- Includes SLIM Python module as extra resource
- Platform-specific configurations for macOS (with code signing), Windows (NSIS installer), and Linux (AppImage/deb)

## Important Considerations

1. **Submodule Management**: The `slim-leaderboard` directory is a Git submodule. Always use `--recursive` when cloning
2. **Python Dependency**: The app requires Python 3.8+ to be installed on the user's system
3. **Token Security**: Never log or expose GitHub tokens in console output or error messages
4. **Cross-Platform Paths**: Use Node.js `path` module for all file paths to ensure cross-platform compatibility
5. **Error Handling**: Provide clear error messages for common issues (missing Python, invalid token, network errors)