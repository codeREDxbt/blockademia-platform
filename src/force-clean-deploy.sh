#!/bin/bash

# Force clean deployment script for Blockademia
echo "🚀 Preparing clean deployment..."

# Remove any corrupted lock files
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Clean any potential git issues
git rm --cached package.json 2>/dev/null || true

# Add files for commit
git add .gitignore
git add package.json
git add .

# Commit with force
git commit -m "DEPLOYMENT FIX: Clean package.json - remove corrupted dependencies"

# Force push to overwrite corrupted remote
git push origin main --force

echo "✅ Clean deployment ready! Redeploy on Vercel now."
