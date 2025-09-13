// Remove the conflicting root App.tsx file
import fs from 'fs';
import path from 'path';

const rootAppPath = path.join(process.cwd(), 'App.tsx');

try {
  if (fs.existsSync(rootAppPath)) {
    fs.unlinkSync(rootAppPath);
    console.log('✅ Removed conflicting root App.tsx');
  } else {
    console.log('✅ Root App.tsx already removed');
  }
} catch (error) {
  console.error('❌ Error removing App.tsx:', error);
}

console.log('✅ Build configuration cleaned');
