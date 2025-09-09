// Remove conflicting App.tsx file and clean build cache
const fs = require('fs');
const path = require('path');

// Remove the conflicting root App.tsx
const rootAppPath = path.join(__dirname, 'App.tsx');
if (fs.existsSync(rootAppPath)) {
  fs.unlinkSync(rootAppPath);
  console.log('✅ Removed conflicting root App.tsx');
} else {
  console.log('ℹ️ Root App.tsx already removed');
}

// Clean any build cache directories
const cacheDirs = ['node_modules/.vite', 'dist', '.vite'];
cacheDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✅ Cleaned cache: ${dir}`);
  }
});

console.log('🎉 Build conflicts resolved! Your app should now load properly.');