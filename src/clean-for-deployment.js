#!/usr/bin/env node

// Clean deployment preparation
const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning project for deployment...');

// Files to remove for clean deployment
const filesToRemove = [
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'node_modules',
  '.vercel',
  'dist',
  'build'
];

// Remove files if they exist
filesToRemove.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.rmSync(file, { recursive: true, force: true });
      console.log(`✅ Removed: ${file}`);
    }
  } catch (error) {
    console.log(`ℹ️  Could not remove ${file}: ${error.message}`);
  }
});

// Validate package.json
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✅ Package.json is valid: ${packageJson.name} v${packageJson.version}`);
} catch (error) {
  console.error('❌ Package.json is invalid:', error.message);
  process.exit(1);
}

console.log('🎉 Project cleaned for deployment!');
console.log('📋 Next steps:');
console.log('1. git add .');
console.log('2. git commit -m "Clean deployment - fix package.json corruption"');
console.log('3. git push origin main --force');
console.log('4. Redeploy on Vercel');
