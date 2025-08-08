#!/bin/bash

# Optimized build script for Netlify
echo "🚀 Starting optimized build..."

# Install only production dependencies for client
npm ci --only=production --prefer-offline --no-audit

# Build client only (faster)
npm run build:client

echo "✅ Build completed!"
