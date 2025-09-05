# Repository Rename Instructions

## Renaming from `slim-leaderboard-web` to `slim-leaderboard-desktop`

### Step 1: Rename on GitHub

1. Go to https://github.com/NASA-AMMOS/slim-leaderboard-web
2. Click on "Settings" tab
3. Under "General", find "Repository name"
4. Change from `slim-leaderboard-web` to `slim-leaderboard-desktop`
5. Click "Rename"

GitHub will automatically redirect the old URL to the new one.

### Step 2: Update Local Repository

```bash
# Update the remote URL in your local clone
git remote set-url origin https://github.com/NASA-AMMOS/slim-leaderboard-desktop.git

# Verify the change
git remote -v
```

### Step 3: Update Repository References

The following files need to be updated with the new repository name:

- `package.json` - Update repository URL
- `README.md` - Update all repository links
- `README-ELECTRON.md` - Update all repository links
- `.github/workflows/*.yml` - Update any repository references
- `electron/main.js` - Update GitHub links in the app
- `renderer/renderer.js` - Update GitHub links

### Step 4: Update Documentation

Replace all instances of:
- `slim-leaderboard-web` → `slim-leaderboard-desktop`
- Repository URLs from old to new

### Step 5: Clean Up Web-Specific Files

Since this is no longer a web app, consider removing:
- `app.py` (Flask backend)
- `run_production.sh` (Flask runner)
- `Dockerfile` & `docker-compose.yml` (unless keeping for Flask)
- `docs/` folder (GitHub Pages content)
- Old `index.html`, `script.js`, `styles.css` in root (keep renderer/ versions)

### Step 6: Update CI/CD

Update GitHub Actions workflows:
- Remove GitHub Pages deployment
- Focus on Electron app building and releases

### What GitHub Does Automatically

When you rename a repository on GitHub:
- ✅ Old URLs redirect to new repository
- ✅ Issues, PRs, and wikis are preserved
- ✅ Stars and watchers are maintained
- ✅ Forks continue to work
- ✅ Git history is preserved

### After Renaming

1. Update any external links to the repository
2. Notify team members of the change
3. Update any CI/CD pipelines that reference the old name
4. Update documentation sites that link to the repository