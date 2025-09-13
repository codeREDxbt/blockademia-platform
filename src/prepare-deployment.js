#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Blockademia for mainnet deployment...\n');

// Step 1: Remove duplicate App.tsx if it exists
console.log('📁 Checking for duplicate files...');
if (fs.existsSync('App.tsx')) {
  fs.unlinkSync('App.tsx');
  console.log('✅ Removed duplicate /App.tsx');
} else {
  console.log('✅ No duplicate App.tsx found');
}

// Step 2: Clean up temporary files
console.log('\n🗑️ Cleaning up temporary files...');
const tempFiles = [
  'temp-entrypoint-fix.js',
  'temp-old-app.txt',
  'remove-duplicate.js',
  'DELETED_APP_MARKER.md',
  'DELETE_OLD_APP.md',
  'REMOVED_OLD_APP.txt',
  'ROOT_APP_REMOVED.md'
];

tempFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`✅ Removed ${file}`);
  }
});

// Step 3: Verify critical files
console.log('\n🔍 Verifying critical files...');
const criticalFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'index.html',
  'package.json',
  'vite.config.ts',
  'styles/globals.css',
  'netlify.toml'
];

let allCriticalFilesExist = true;
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allCriticalFilesExist = false;
  }
});

// Step 4: Check environment configuration
console.log('\n🔧 Checking environment configuration...');
if (fs.existsSync('env.example')) {
  console.log('✅ Environment example file exists');
  const envContent = fs.readFileSync('env.example', 'utf8');
  if (envContent.includes('VITE_SUPABASE_URL') && envContent.includes('VITE_SUPABASE_ANON_KEY')) {
    console.log('✅ Required environment variables documented');
  } else {
    console.log('⚠️ Some environment variables may be missing from example');
  }
} else {
  console.log('⚠️ No env.example file found');
}

// Step 5: Verify package.json scripts
console.log('\n📦 Verifying build scripts...');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['dev', 'build', 'preview', 'type-check'];
  
  requiredScripts.forEach(script => {
    if (pkg.scripts && pkg.scripts[script]) {
      console.log(`✅ ${script} script configured`);
    } else {
      console.log(`❌ Missing ${script} script`);
      allCriticalFilesExist = false;
    }
  });
} catch (e) {
  console.log('❌ Could not parse package.json');
  allCriticalFilesExist = false;
}

// Step 6: Summary and final check
console.log('\n' + '='.repeat(60));
if (allCriticalFilesExist) {
  console.log('🎉 DEPLOYMENT READY!');
  console.log('✅ All critical files verified');
  console.log('✅ No duplicate files found');
  console.log('✅ Build configuration validated');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run type-check');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm run preview (optional testing)');
  console.log('4. Deploy to your hosting platform');
  console.log('\n🌐 Platform ready for mainnet launch! 🚀');
} else {
  console.log('❌ DEPLOYMENT NOT READY');
  console.log('Please fix the issues listed above before deploying.');
  process.exit(1);
}
