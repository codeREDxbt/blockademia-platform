#!/usr/bin/env node

/**
 * Clean Build Script for Blockademia
 * Removes problematic files and ensures clean build
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Blockademia clean build process...');

// Check if root App.tsx exists and remove it
const rootAppPath = path.join(process.cwd(), 'App.tsx');
if (fs.existsSync(rootAppPath)) {
  try {
    fs.unlinkSync(rootAppPath);
    console.log('✅ Removed problematic root App.tsx file');
  } catch (error) {
    console.log('❌ Could not remove root App.tsx:', error.message);
    console.log('⚠️  Please manually delete the root App.tsx file');
  }
} else {
  console.log('✅ Root App.tsx not found (good!)');
}

// Verify src/App.tsx exists
const srcAppPath = path.join(process.cwd(), 'src', 'App.tsx');
if (fs.existsSync(srcAppPath)) {
  console.log('✅ Found src/App.tsx (correct location)');
} else {
  console.log('❌ src/App.tsx not found! This is required.');
  process.exit(1);
}

// Verify src/main.tsx exists
const mainPath = path.join(process.cwd(), 'src', 'main.tsx');
if (fs.existsSync(mainPath)) {
  console.log('✅ Found src/main.tsx');
} else {
  console.log('❌ src/main.tsx not found! This is required.');
  process.exit(1);
}

// Clean dist directory if it exists
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
  console.log('✅ Cleaned dist directory');
}

// Clean vite cache
const viteCachePath = path.join(process.cwd(), 'node_modules', '.vite');
if (fs.existsSync(viteCachePath)) {
  fs.rmSync(viteCachePath, { recursive: true, force: true });
  console.log('✅ Cleaned Vite cache');
}

console.log('🎉 Clean build preparation complete!');
console.log('');
console.log('Next steps:');
console.log('1. Run: npm run dev (to start development server)');
console.log('2. Run: npm run build (to create production build)');
console.log('');
console.log('If you see any errors, check that:');
console.log('- The root App.tsx file is completely deleted');
console.log('- All components in /components exist');
console.log('- All contexts in /contexts exist');