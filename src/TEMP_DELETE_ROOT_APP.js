#!/usr/bin/env node

// Script to safely remove the conflicting root App.tsx file
// This file is causing import conflicts with /src/App.tsx

const fs = require('fs');
const path = require('path');

const rootAppPath = path.join(__dirname, 'App.tsx');

try {
  if (fs.existsSync(rootAppPath)) {
    fs.unlinkSync(rootAppPath);
    console.log('✅ Successfully removed conflicting /App.tsx');
    console.log('✅ Entry point is now correctly: /src/main.tsx -> /src/App.tsx');
  } else {
    console.log('ℹ️ Root App.tsx does not exist or already removed');
  }
} catch (error) {
  console.error('❌ Error removing App.tsx:', error.message);
}
