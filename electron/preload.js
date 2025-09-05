const { contextBridge, ipcRenderer } = require('electron');

// Expose protected APIs to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Token management
  saveToken: (token) => ipcRenderer.invoke('save-token', token),
  getToken: () => ipcRenderer.invoke('get-token'),
  hasToken: () => ipcRenderer.invoke('has-token'),
  clearToken: () => ipcRenderer.invoke('clear-token'),
  
  // Analysis
  runAnalysis: (options) => ipcRenderer.invoke('run-analysis', options),
  getLastAnalysis: () => ipcRenderer.invoke('get-last-analysis'),
  
  // System
  checkPython: () => ipcRenderer.invoke('check-python'),
  installDependencies: () => ipcRenderer.invoke('install-dependencies'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  
  // Progress events
  onAnalysisProgress: (callback) => {
    ipcRenderer.on('analysis-progress', (event, data) => callback(data));
  },
  onInstallProgress: (callback) => {
    ipcRenderer.on('install-progress', (event, data) => callback(data));
  },
  
  // Cleanup
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('analysis-progress');
    ipcRenderer.removeAllListeners('install-progress');
  }
});