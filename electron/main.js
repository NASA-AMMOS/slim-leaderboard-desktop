const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');
const { PythonShell } = require('python-shell');

// Initialize secure storage for tokens
const store = new Store({
  encryptionKey: 'slim-leaderboard-2024', // In production, use a more secure key
  schema: {
    githubToken: {
      type: 'string',
      default: ''
    },
    lastAnalysis: {
      type: 'object',
      default: {}
    }
  }
});

let mainWindow;
let pythonProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '..', 'assets', 'icon.png'),
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#ffffff'
  });

  // Load the HTML file
  if (process.argv.includes('--dev')) {
    mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers

// Save GitHub Token
ipcMain.handle('save-token', async (event, token) => {
  try {
    store.set('githubToken', token);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Get GitHub Token
ipcMain.handle('get-token', async () => {
  try {
    const token = store.get('githubToken');
    return { success: true, token: token || '' };
  } catch (error) {
    return { success: false, token: '', error: error.message };
  }
});

// Check if token exists
ipcMain.handle('has-token', async () => {
  const token = store.get('githubToken');
  return !!token;
});

// Clear token
ipcMain.handle('clear-token', async () => {
  try {
    store.delete('githubToken');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Run SLIM Analysis
ipcMain.handle('run-analysis', async (event, options) => {
  const { repositoryUrl, targetType, outputFormat, verbose, emoji, unsorted } = options;
  const token = store.get('githubToken');

  if (!token) {
    return {
      success: false,
      error: 'GitHub token not configured. Please set it in Settings.'
    };
  }

  // Create temporary config file
  const configPath = path.join(app.getPath('temp'), 'slim-config.json');
  const config = {
    targets: [{
      type: targetType,
      name: repositoryUrl
    }]
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  // Build command arguments
  const args = [
    '-m', 'jpl.slim.leaderboard',
    '--output_format', outputFormat
  ];

  if (verbose) args.push('--verbose');
  if (emoji) args.push('--emoji');
  if (unsorted) args.push('--unsorted');
  args.push(configPath);

  // Set up Python environment
  const pythonPath = getPythonPath();
  const slimPath = getSlimLeaderboardPath();

  const options_python = {
    mode: 'text',
    pythonPath: pythonPath,
    pythonOptions: ['-u'], // Unbuffered output
    env: {
      ...process.env,
      GITHUB_TOKEN: token,
      PYTHONPATH: slimPath
    },
    args: args
  };

  return new Promise((resolve) => {
    let output = '';
    let errorOutput = '';

    // Send progress updates
    event.sender.send('analysis-progress', { message: 'Starting analysis...' });

    PythonShell.run(null, options_python, (err, results) => {
      // Clean up temp file
      try {
        fs.unlinkSync(configPath);
      } catch (e) {
        // Ignore cleanup errors
      }

      if (err) {
        console.error('Python error:', err);
        resolve({
          success: false,
          error: err.message || 'Analysis failed',
          output: errorOutput
        });
      } else {
        output = results ? results.join('\n') : '';
        
        // Save last analysis
        store.set('lastAnalysis', {
          repositoryUrl,
          targetType,
          outputFormat,
          timestamp: new Date().toISOString(),
          output: output
        });

        resolve({
          success: true,
          output: output,
          target_url: repositoryUrl,
          target_type: targetType,
          format: outputFormat
        });
      }
    });

    // Handle progress messages
    pythonProcess = new PythonShell(null, options_python);
    
    pythonProcess.on('message', (message) => {
      output += message + '\n';
      event.sender.send('analysis-progress', { message: 'Analyzing...', data: message });
    });

    pythonProcess.on('error', (err) => {
      errorOutput += err.message + '\n';
    });

    pythonProcess.on('close', () => {
      pythonProcess = null;
    });
  });
});

// Get last analysis
ipcMain.handle('get-last-analysis', async () => {
  const lastAnalysis = store.get('lastAnalysis');
  return lastAnalysis || null;
});

// Open external link
ipcMain.handle('open-external', async (event, url) => {
  shell.openExternal(url);
});

// Check Python installation
ipcMain.handle('check-python', async () => {
  try {
    const pythonPath = getPythonPath();
    const version = await getPythonVersion(pythonPath);
    return { 
      success: true, 
      version: version,
      path: pythonPath 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Python not found. Please install Python 3.8 or higher.' 
    };
  }
});

// Helper functions

function getPythonPath() {
  // In packaged app, use system Python
  // You might want to bundle Python or use a specific path
  if (process.platform === 'win32') {
    return 'python';
  }
  return 'python3';
}

function getSlimLeaderboardPath() {
  if (app.isPackaged) {
    // In production, slim-leaderboard is in resources
    return path.join(process.resourcesPath, 'slim-leaderboard', 'src');
  } else {
    // In development, use local path
    return path.join(__dirname, '..', 'slim-leaderboard', 'src');
  }
}

function getPythonVersion(pythonPath) {
  return new Promise((resolve, reject) => {
    PythonShell.runString(
      'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")',
      { pythonPath },
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      }
    );
  });
}

// Install SLIM dependencies on first run
ipcMain.handle('install-dependencies', async (event) => {
  const slimPath = getSlimLeaderboardPath();
  const requirementsPath = path.join(path.dirname(slimPath), 'requirements.txt');
  
  return new Promise((resolve) => {
    event.sender.send('install-progress', { message: 'Installing SLIM Leaderboard dependencies...' });
    
    const options = {
      mode: 'text',
      pythonPath: getPythonPath(),
      args: ['-m', 'pip', 'install', '-r', requirementsPath]
    };

    PythonShell.run(null, options, (err, results) => {
      if (err) {
        resolve({ success: false, error: err.message });
      } else {
        resolve({ success: true });
      }
    });
  });
});