#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building client only...');

// Change to client directory
process.chdir(path.join(__dirname, 'client'));

// Install only client dependencies
console.log('📦 Installing client dependencies...');
execSync('npm install --production', { stdio: 'inherit' });

// Build client
console.log('🔨 Building client...');
execSync('npm run build', { stdio: 'inherit' });

console.log('✅ Client build completed!');
