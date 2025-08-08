#!/usr/bin/env node

/**
 * Script to update API calls in client code for production deployment
 * This script adds the createApiUrl import and updates fetch calls
 */

const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  'client/pages/Dashboard.tsx',
  'client/pages/Search.tsx',
  'client/pages/Index.tsx',
  'client/pages/Category.tsx',
  'client/pages/Artist.tsx',
  'client/pages/Album.tsx',
  'client/pages/Playlist.tsx',
];

// Import statement to add
const importStatement = "import { createApiUrl } from '@/config/api';";

// Function to update a file
function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Add import if not present
    if (!content.includes("import { createApiUrl }")) {
      // Find the last import statement
      const importRegex = /import.*from.*['"];?\n/g;
      const imports = content.match(importRegex);
      
      if (imports) {
        const lastImport = imports[imports.length - 1];
        const insertIndex = content.lastIndexOf(lastImport) + lastImport.length;
        content = content.slice(0, insertIndex) + importStatement + '\n' + content.slice(insertIndex);
        updated = true;
      }
    }

    // Update fetch calls
    const fetchRegex = /fetch\(['"`]\/api\//g;
    if (fetchRegex.test(content)) {
      content = content.replace(
        /fetch\(['"`](\/api\/[^'"`]+)['"`]/g,
        'fetch(createApiUrl(\'$1\'))'
      );
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🔄 Updating API calls for production deployment...\n');

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    updateFile(file);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('\n✅ API call updates completed!');
console.log('\n📝 Next steps:');
console.log('1. Test the changes locally: npm run dev');
console.log('2. Commit and push to GitHub');
console.log('3. Follow the deployment guide in DEPLOYMENT.md');
