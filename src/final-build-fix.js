#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Final build fix - removing all conflicting files...');

// Step 1: Remove the problematic root App.tsx completely
console.log('\n📁 Checking for conflicting App.tsx...');
if (fs.existsSync('App.tsx')) {
  fs.unlinkSync('App.tsx');
  console.log('✅ Removed conflicting root App.tsx');
} else {
  console.log('✅ No conflicting root App.tsx found');
}

// Step 2: Verify src structure is correct
console.log('\n🔍 Verifying src structure...');
const requiredFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'index.html',
  'vite.config.ts'
];

let allGood = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allGood = false;
  }
});

// Step 3: Check main.tsx imports
if (fs.existsSync('src/main.tsx')) {
  const mainContent = fs.readFileSync('src/main.tsx', 'utf8');
  if (mainContent.includes("import App from './App")) {
    console.log('✅ main.tsx correctly imports App from ./App');
  } else {
    console.log('❌ main.tsx has incorrect App import');
    allGood = false;
  }
}

// Step 4: Verify App.tsx has default export
if (fs.existsSync('src/App.tsx')) {
  const appContent = fs.readFileSync('src/App.tsx', 'utf8');
  if (appContent.includes('export default')) {
    console.log('✅ App.tsx has default export');
  } else {
    console.log('❌ App.tsx missing default export');
    allGood = false;
  }
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 BUILD STRUCTURE FIXED!');
  console.log('✅ No conflicting files');
  console.log('✅ Correct Vite project structure');
  console.log('✅ Proper imports and exports');
  console.log('\n🚀 Ready to build:');
  console.log('   npm run build');
} else {
  console.log('❌ BUILD ISSUES REMAIN');
  console.log('Please fix the issues above before building.');
  process.exit(1);
}