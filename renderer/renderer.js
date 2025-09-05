// Renderer process JavaScript for Electron app

class SlimLeaderboardDesktop {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.checkInitialSetup();
    }

    initializeElements() {
        // Setup elements
        this.setupSection = document.getElementById('setup-section');
        this.mainContent = document.getElementById('main-content');
        this.tokenInput = document.getElementById('token-input');
        this.saveTokenBtn = document.getElementById('save-token-btn');

        // Settings elements
        this.settingsBtn = document.getElementById('settings-btn');
        this.settingsModal = document.getElementById('settings-modal');
        this.closeModalBtn = document.querySelector('.close');
        this.clearTokenBtn = document.getElementById('clear-token-btn');
        this.tokenStatusText = document.getElementById('token-status-text');
        this.pythonStatus = document.getElementById('python-status');

        // Form elements
        this.form = document.getElementById('repository-form');
        this.submitBtn = document.getElementById('analyze-btn');
        this.loader = document.getElementById('loader');
        this.btnText = document.querySelector('.btn-text');
        this.targetTypeSelect = document.getElementById('target-type');
        this.urlLabel = document.getElementById('url-label');
        this.urlHelp = document.getElementById('url-help');
        this.repoUrlInput = document.getElementById('repo-url');

        // Progress elements
        this.progressSection = document.getElementById('progress-section');
        this.progressBar = document.getElementById('progress-bar');
        this.progressText = document.getElementById('progress-text');

        // Results elements
        this.resultsSection = document.getElementById('results-section');
        this.resultsContent = document.getElementById('results-content');
        this.errorSection = document.getElementById('error-section');
        this.errorMessage = document.getElementById('error-message');
        this.clearBtn = document.getElementById('clear-results');
        this.exportBtn = document.getElementById('export-results');

        // Links
        this.generateTokenLink = document.getElementById('generate-token-link');
        this.githubLink = document.getElementById('github-link');
        this.slimLink = document.getElementById('slim-link');
    }

    initializeEventListeners() {
        // Setup events
        this.saveTokenBtn.addEventListener('click', this.saveToken.bind(this));
        this.generateTokenLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.electronAPI.openExternal('https://github.com/settings/tokens/new?description=SLIM%20Leaderboard%20Desktop&scopes=repo');
        });

        // Settings events
        this.settingsBtn.addEventListener('click', this.openSettings.bind(this));
        this.closeModalBtn.addEventListener('click', this.closeSettings.bind(this));
        this.clearTokenBtn.addEventListener('click', this.clearToken.bind(this));
        
        // Form events
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.targetTypeSelect.addEventListener('change', this.handleTargetTypeChange.bind(this));
        this.clearBtn.addEventListener('click', this.clearResults.bind(this));
        this.exportBtn.addEventListener('click', this.exportResults.bind(this));

        // External links
        this.githubLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.electronAPI.openExternal('https://github.com/NASA-AMMOS/slim-leaderboard-desktop');
        });
        
        this.slimLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.electronAPI.openExternal('https://nasa-ammos.github.io/slim/');
        });

        // Progress listeners
        window.electronAPI.onAnalysisProgress((data) => {
            if (data.message) {
                this.progressText.textContent = data.message;
            }
        });

        // Close modal when clicking outside
        window.onclick = (event) => {
            if (event.target == this.settingsModal) {
                this.closeSettings();
            }
        };

        // Initialize form state
        this.handleTargetTypeChange();
    }

    async checkInitialSetup() {
        // Check if token exists
        const hasToken = await window.electronAPI.hasToken();
        
        if (!hasToken) {
            this.setupSection.style.display = 'block';
            this.mainContent.style.display = 'none';
        } else {
            this.setupSection.style.display = 'none';
            this.mainContent.style.display = 'block';
            
            // Check Python installation
            this.checkPythonStatus();
            
            // Load last analysis if exists
            this.loadLastAnalysis();
        }
    }

    async saveToken() {
        const token = this.tokenInput.value.trim();
        
        if (!token) {
            this.showError('Please enter a valid GitHub token');
            return;
        }

        if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
            this.showError('Invalid token format. GitHub tokens start with ghp_ or github_pat_');
            return;
        }

        this.saveTokenBtn.disabled = true;
        this.saveTokenBtn.textContent = 'Saving...';

        const result = await window.electronAPI.saveToken(token);
        
        if (result.success) {
            this.setupSection.style.display = 'none';
            this.mainContent.style.display = 'block';
            this.tokenInput.value = '';
            this.checkPythonStatus();
        } else {
            this.showError('Failed to save token: ' + result.error);
        }

        this.saveTokenBtn.disabled = false;
        this.saveTokenBtn.textContent = 'Save Token and Continue';
    }

    async clearToken() {
        if (confirm('Are you sure you want to clear your GitHub token?')) {
            const result = await window.electronAPI.clearToken();
            if (result.success) {
                this.setupSection.style.display = 'block';
                this.mainContent.style.display = 'none';
                this.settingsModal.style.display = 'none';
            }
        }
    }

    async checkPythonStatus() {
        const result = await window.electronAPI.checkPython();
        
        if (result.success) {
            this.pythonStatus.innerHTML = `✅ Python ${result.version} installed`;
        } else {
            this.pythonStatus.innerHTML = `❌ ${result.error}`;
        }
    }

    openSettings() {
        this.settingsModal.style.display = 'block';
        this.checkPythonStatus();
    }

    closeSettings() {
        this.settingsModal.style.display = 'none';
    }

    handleTargetTypeChange() {
        const targetType = this.targetTypeSelect.value;
        
        if (targetType === 'organization') {
            this.urlLabel.textContent = 'GitHub Organization URL';
            this.repoUrlInput.placeholder = 'https://github.com/nasa-ammos';
            this.urlHelp.textContent = 'Enter a GitHub organization URL (e.g., https://github.com/nasa-ammos)';
        } else {
            this.urlLabel.textContent = 'GitHub Repository URL';
            this.repoUrlInput.placeholder = 'https://github.com/owner/repository';
            this.urlHelp.textContent = 'Enter a GitHub repository URL';
        }
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const targetUrl = formData.get('repo-url');
        const targetType = formData.get('target-type');
        const outputFormat = formData.get('output-format');
        const verbose = formData.get('verbose') === 'on';
        const emoji = formData.get('emoji') === 'on';
        const unsorted = formData.get('unsorted') === 'on';

        if (!this.validateGitHubUrl(targetUrl, targetType)) {
            const errorMsg = targetType === 'organization' 
                ? 'Please enter a valid GitHub organization URL' 
                : 'Please enter a valid GitHub repository URL';
            this.showError(errorMsg);
            return;
        }

        this.setLoadingState(true);
        this.hideError();
        this.hideResults();
        this.showProgress(targetType);

        try {
            const result = await window.electronAPI.runAnalysis({
                repositoryUrl: targetUrl,
                targetType,
                outputFormat,
                verbose,
                emoji,
                unsorted
            });
            
            this.hideProgress();
            
            if (result.success) {
                this.showResults(result, outputFormat);
            } else {
                this.showError(result.error || 'Analysis failed');
            }
        } catch (error) {
            this.hideProgress();
            this.showError(error.message || 'An error occurred while analyzing the target');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateGitHubUrl(url, targetType) {
        if (targetType === 'organization') {
            const orgPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/?$/;
            return orgPattern.test(url);
        } else {
            const repoPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;
            return repoPattern.test(url);
        }
    }

    showProgress(targetType) {
        const isOrg = targetType === 'organization';
        const message = isOrg 
            ? 'Analyzing organization repositories...' 
            : 'Analyzing repository...';
        
        this.progressText.textContent = message;
        this.progressSection.style.display = 'block';
        this.progressSection.classList.add('fade-in');
        
        this.simulateProgress(isOrg);
    }

    simulateProgress(isOrganization) {
        const duration = isOrganization ? 120000 : 30000;
        const interval = 1000;
        const totalSteps = duration / interval;
        let currentStep = 0;
        
        this.progressInterval = setInterval(() => {
            currentStep++;
            const progress = (currentStep / totalSteps) * 100;
            this.progressBar.style.width = `${progress}%`;
            
            if (progress < 25) {
                this.progressText.textContent = 'Fetching repository data...';
            } else if (progress < 50) {
                this.progressText.textContent = 'Analyzing SLIM best practices...';
            } else if (progress < 75) {
                this.progressText.textContent = 'Processing compliance checks...';
            } else if (progress < 95) {
                this.progressText.textContent = 'Generating report...';
            } else {
                this.progressText.textContent = 'Finalizing analysis...';
            }
            
            if (currentStep >= totalSteps) {
                clearInterval(this.progressInterval);
            }
        }, interval);
    }

    hideProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        this.progressSection.style.display = 'none';
        this.progressBar.style.width = '0%';
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.btnText.style.display = 'none';
            this.loader.style.display = 'block';
        } else {
            this.submitBtn.disabled = false;
            this.btnText.style.display = 'block';
            this.loader.style.display = 'none';
        }
    }

    showResults(data, format) {
        this.hideError();
        
        let formattedOutput = '';
        
        if (format === 'MARKDOWN') {
            formattedOutput = this.formatMarkdownOutput(data.output);
        } else {
            formattedOutput = `<pre>${this.escapeHtml(data.output)}</pre>`;
        }
        
        this.resultsContent.innerHTML = formattedOutput;
        this.resultsSection.style.display = 'block';
        this.resultsSection.classList.add('fade-in');
        
        // Store current results for export
        this.currentResults = data;
        
        this.resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    formatMarkdownOutput(output) {
        if (!output) return 'No output received';
        
        const lines = output.split('\n');
        let formattedHtml = '';
        let inCodeBlock = false;
        
        for (const line of lines) {
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    formattedHtml += '</pre>\n';
                    inCodeBlock = false;
                } else {
                    formattedHtml += '<pre><code>';
                    inCodeBlock = true;
                }
                continue;
            }
            
            if (inCodeBlock) {
                formattedHtml += this.escapeHtml(line) + '\n';
                continue;
            }
            
            if (line.startsWith('# ')) {
                formattedHtml += `<h1>${this.escapeHtml(line.substring(2))}</h1>\n`;
            } else if (line.startsWith('## ')) {
                formattedHtml += `<h2>${this.escapeHtml(line.substring(3))}</h2>\n`;
            } else if (line.startsWith('### ')) {
                formattedHtml += `<h3>${this.escapeHtml(line.substring(4))}</h3>\n`;
            } else if (line.trim()) {
                formattedHtml += `<p>${this.escapeHtml(line)}</p>\n`;
            }
        }
        
        if (inCodeBlock) {
            formattedHtml += '</code></pre>\n';
        }
        
        return formattedHtml;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorSection.style.display = 'block';
        this.hideResults();
    }

    hideError() {
        this.errorSection.style.display = 'none';
    }

    hideResults() {
        this.resultsSection.style.display = 'none';
    }

    clearResults() {
        this.hideResults();
        this.hideError();
        this.hideProgress();
        this.currentResults = null;
    }

    async loadLastAnalysis() {
        const lastAnalysis = await window.electronAPI.getLastAnalysis();
        if (lastAnalysis && lastAnalysis.output) {
            // Optionally show last analysis results
            console.log('Last analysis available:', lastAnalysis.timestamp);
        }
    }

    exportResults() {
        if (!this.currentResults) return;
        
        const blob = new Blob([this.currentResults.output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `slim-analysis-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SlimLeaderboardDesktop();
});