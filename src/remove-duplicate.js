#!/usr/bin/env node

// Remove duplicate App.tsx file from root
const fs = require('fs');

console.log('🗑️ Removing duplicate App.tsx from root directory...');

if (fs.existsSync('App.tsx')) {
  fs.unlinkSync('App.tsx');
  console.log('✅ Removed /App.tsx');
} else {
  console.log('ℹ️ No root App.tsx found - already clean');
}

console.log('✅ Build structure cleaned for deployment');
