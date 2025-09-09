// Temporary script to remove the problematic App.tsx
const fs = require('fs');

if (fs.existsSync('App.tsx')) {
  fs.unlinkSync('App.tsx');
  console.log('Removed problematic App.tsx');
}