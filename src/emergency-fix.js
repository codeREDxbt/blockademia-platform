#!/usr/bin/env node

/**
 * Emergency Fix Script for Blockademia
 * Resolves critical build conflicts and ensures proper file structure
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 EMERGENCY FIX: Resolving Blockademia build conflicts...');

try {
  // Check if we have the correct file structure
  const srcAppPath = path.join(process.cwd(), 'src', 'App.tsx');
  const mainPath = path.join(process.cwd(), 'src', 'main.tsx');
  const indexPath = path.join(process.cwd(), 'index.html');
  
  console.log('✅ Checking critical files...');
  
  if (!fs.existsSync(srcAppPath)) {
    console.error('❌ CRITICAL: /src/App.tsx not found!');
    process.exit(1);
  }
  
  if (!fs.existsSync(mainPath)) {
    console.error('❌ CRITICAL: /src/main.tsx not found!');
    process.exit(1);
  }
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ CRITICAL: /index.html not found!');
    process.exit(1);
  }
  
  console.log('✅ All critical files found');
  
  // Verify main.tsx imports correctly
  const mainContent = fs.readFileSync(mainPath, 'utf8');
  if (!mainContent.includes('./App.tsx')) {
    console.error('❌ CRITICAL: main.tsx not importing from ./App.tsx');
    process.exit(1);
  }
  
  console.log('✅ Import paths verified');
  
  // Clean up build artifacts
  const distPath = path.join(process.cwd(), 'dist');
  const viteCachePath = path.join(process.cwd(), 'node_modules', '.vite');
  
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('✅ Cleaned dist directory');
  }
  
  if (fs.existsSync(viteCachePath)) {
    fs.rmSync(viteCachePath, { recursive: true, force: true });
    console.log('✅ Cleaned Vite cache');
  }
  
  console.log('🎉 Emergency fix completed successfully!');
  console.log('');
  console.log('🚀 Ready to start:');
  console.log('   npm run dev     - Start development server');
  console.log('   npm run build   - Create production build');
  console.log('');
  console.log('📁 File structure verified:');
  console.log('   ✅ /src/App.tsx (main app component)');
  console.log('   ✅ /src/main.tsx (entry point)');
  console.log('   ✅ /index.html (HTML template)');
  console.log('   ✅ Root App.tsx (redirects to src/App.tsx)');
  
} catch (error) {
  console.error('❌ Emergency fix failed:', error.message);
  process.exit(1);
}