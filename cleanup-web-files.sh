#!/bin/bash

# Script to remove web-specific files after transitioning to desktop app

echo "Cleaning up web-specific files..."

# Remove Flask backend files
rm -f app.py
rm -f run_production.sh

# Remove Docker files (unless needed for other purposes)
rm -f Dockerfile
rm -f docker-compose.yml

# Remove old web files in root (keeping renderer/ versions)
rm -f index.html
rm -f script.js
rm -f styles.css

# Remove GitHub Pages specific files
rm -rf docs/

# Remove old GitHub Actions workflows for web deployment
rm -f .github/workflows/deploy.yml
rm -f .github/workflows/analyze.yml

# Remove Flask requirements (keeping package.json for Electron)
rm -f requirements.txt

# Remove test config files
rm -f test-*.json

echo "Cleanup complete!"
echo ""
echo "Remaining structure:"
echo "- electron/     (Electron main process)"
echo "- renderer/     (Electron UI)"
echo "- assets/       (App icons and assets)"
echo "- slim-leaderboard/ (Analysis engine)"
echo ""
echo "Don't forget to:"
echo "1. Rename the repository on GitHub"
echo "2. Update git remote URL locally"
echo "3. Create new releases for the desktop app"