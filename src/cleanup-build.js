#!/usr/bin/env node

const fs = require('fs');

console.log('🧹 Cleaning up build conflicts...');

// Remove the duplicate App.tsx from root
if (fs.existsSync('App.tsx')) {
  const content = fs.readFileSync('App.tsx', 'utf8');
  // Only remove if it's not just a marker file
  if (content.includes('import') && content.includes('function')) {
    fs.unlinkSync('App.tsx');
    console.log('✅ Removed duplicate /App.tsx');
  } else {
    console.log('ℹ️ App.tsx is already a marker file');
  }
} else {
  console.log('ℹ️ No duplicate App.tsx found');
}

console.log('✅ Build cleanup complete');
