#!/usr/bin/env node

// Simple build check script for Netlify deployment
console.log('🔍 Checking build configuration...');

const fs = require('fs');
const path = require('path');

// Check if required files exist
const requiredFiles = [
  'src/App.tsx',
  'src/main.tsx', 
  'index.html',
  'package.json',
  'vite.config.ts',
  'styles/globals.css'
];

let hasErrors = false;

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    hasErrors = true;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

// Check for duplicate App.tsx files - this is the most common deployment issue
if (fs.existsSync('App.tsx') && fs.existsSync('src/App.tsx')) {
  console.error('❌ CRITICAL ERROR: Duplicate App.tsx files found!');
  console.error('   You have both /App.tsx and /src/App.tsx');
  console.error('   This will cause build conflicts and deployment failures.');
  console.error('   🛠️  FIX: Delete the root level /App.tsx file');
  console.error('   Keep only /src/App.tsx (which has correct import paths)');
  hasErrors = true;
} else if (fs.existsSync('App.tsx') && !fs.existsSync('src/App.tsx')) {
  console.error('❌ Wrong App.tsx location! Move /App.tsx to /src/App.tsx');  
  hasErrors = true;
} else if (!fs.existsSync('src/App.tsx')) {
  console.error('❌ Missing /src/App.tsx - main app component not found!');
  hasErrors = true;
} else {
  console.log('✅ App.tsx correctly located at /src/App.tsx');
}

// Check package.json for required scripts
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (!pkg.scripts || !pkg.scripts.build) {
    console.error('❌ Missing build script in package.json');
    hasErrors = true;
  } else {
    console.log('✅ Build script found');
  }
} catch (e) {
  console.error('❌ Could not parse package.json');
  hasErrors = true;
}

if (hasErrors) {
  console.log('\n❌ Build configuration has errors. Please fix them before deploying.');
  process.exit(1);
} else {
  console.log('\n✅ Build configuration looks good!');
  process.exit(0);
}
