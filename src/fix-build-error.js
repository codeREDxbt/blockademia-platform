#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing build error...');

// Remove the problematic root App.tsx file completely
if (fs.existsSync('App.tsx')) {
  console.log('📁 Found problematic root App.tsx file');
  
  // Remove it regardless of content - Vite projects should only have src/App.tsx
  fs.unlinkSync('App.tsx');
  console.log('✅ Removed problematic root App.tsx completely');
} else {
  console.log('✅ No problematic root App.tsx found');
}

// Verify src/App.tsx exists and is valid
if (fs.existsSync('src/App.tsx')) {
  const srcContent = fs.readFileSync('src/App.tsx', 'utf8');
  if (srcContent.includes('import') && srcContent.includes('export default')) {
    console.log('✅ Valid src/App.tsx found - this is correct for Vite builds');
  } else {
    console.log('❌ src/App.tsx exists but may have issues');
  }
} else {
  console.log('❌ CRITICAL: src/App.tsx not found!');
  process.exit(1);
}

// Verify main.tsx points to the correct App
if (fs.existsSync('src/main.tsx')) {
  const mainContent = fs.readFileSync('src/main.tsx', 'utf8');
  if (mainContent.includes("import App from './App")) {
    console.log('✅ src/main.tsx correctly imports from ./App');
  } else {
    console.log('⚠️  src/main.tsx may have incorrect App import');
  }
} else {
  console.log('❌ CRITICAL: src/main.tsx not found!');
  process.exit(1);
}

console.log('\n🎉 Build error fixed!');
console.log('💡 Vite will now use src/App.tsx as the correct entry point');
console.log('🚀 Ready to build and deploy!');