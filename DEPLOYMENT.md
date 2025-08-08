# Deployment Guide

This guide will help you deploy the Audify app with the client on Netlify and the server on Render.

## Prerequisites

1. **GitHub Repository**: Make sure your code is pushed to GitHub
2. **Spotify API Credentials**: Follow the setup in `SPOTIFY_SETUP.md`
3. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
4. **Render Account**: Sign up at [render.com](https://render.com)

## Step 1: Deploy Server to Render

### 1.1 Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `audify-server` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build:server`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if needed)

### 1.2 Configure Environment Variables

In your Render service settings, add these environment variables:

```
NODE_ENV=production
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

### 1.3 Deploy

1. Click "Create Web Service"
2. Wait for the build to complete
3. Note your service URL (e.g., `https://audify-server.onrender.com`)

## Step 2: Deploy Client to Netlify

### 2.1 Create Netlify Site

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure the build settings:
   - **Build command**: `npm run build:client`
   - **Publish directory**: `dist/spa`

### 2.2 Configure Environment Variables

In your Netlify site settings, add:

```
VITE_API_BASE_URL=https://your-render-app-name.onrender.com
```

Replace `your-render-app-name` with your actual Render service name.

### 2.3 Update Netlify Configuration

Update the `netlify.toml` file with your actual Render URL:

```toml
[build]
  command = "npm run build:client"
  publish = "dist/spa"

# Handle client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Proxy API calls to your Render server
[[redirects]]
  from = "/api/*"
  to = "https://your-actual-render-app-name.onrender.com/api/:splat"
  status = 200
  force = true
```

### 2.4 Deploy

1. Click "Deploy site"
2. Wait for the build to complete
3. Your site will be available at a Netlify URL

## Step 3: Update Client Code for Production

The client code needs to be updated to use the production API URL. Here's how to update the API calls:

### 3.1 Update API Calls

Replace direct API calls with the configured base URL. For example:

```typescript
// Before (development)
const response = await fetch('/api/spotify/featured-playlists');

// After (production-ready)
import { createApiUrl } from '@/config/api';
const response = await fetch(createApiUrl('/api/spotify/featured-playlists'));
```

### 3.2 Update All API Calls

You'll need to update these files:
- `client/pages/Dashboard.tsx`
- `client/pages/Search.tsx`
- `client/pages/Index.tsx`
- `client/pages/Category.tsx`
- Any other files making API calls

## Step 4: Test Your Deployment

### 4.1 Test Server (Render)

1. Visit your Render service URL
2. Test the health endpoint: `https://your-app.onrender.com/api/ping`
3. Test Spotify endpoints: `https://your-app.onrender.com/api/spotify/featured-playlists`

### 4.2 Test Client (Netlify)

1. Visit your Netlify site URL
2. Test that the app loads correctly
3. Test that API calls work (check browser network tab)
4. Test all features: search, navigation, etc.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Render server has CORS configured (already done in the code)

2. **API Calls Failing**: 
   - Check that the `VITE_API_BASE_URL` environment variable is set correctly
   - Verify your Render service is running
   - Check the browser console for errors

3. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Verify TypeScript compilation passes locally

4. **Environment Variables**:
   - Make sure Spotify credentials are set in Render
   - Verify the API base URL is set in Netlify

### Debugging

1. **Check Render Logs**: Go to your Render service → Logs
2. **Check Netlify Logs**: Go to your Netlify site → Deploys → Click on deploy → View logs
3. **Browser Console**: Check for JavaScript errors
4. **Network Tab**: Verify API calls are going to the correct URL

## Environment Variables Summary

### Render (Server)
```
NODE_ENV=production
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### Netlify (Client)
```
VITE_API_BASE_URL=https://your-render-app-name.onrender.com
```

## URLs to Update

1. **Netlify.toml**: Update the proxy redirect URL
2. **Client config**: Update the default API base URL
3. **Spotify Setup**: Update the redirect URI in Spotify Developer Dashboard

## Security Notes

- Never commit environment variables to Git
- Use Render's environment variable feature for secrets
- The `.env` file is already in `.gitignore`
- Consider using Render's auto-deploy feature for continuous deployment

## Next Steps

1. Set up a custom domain (optional)
2. Configure SSL certificates (handled by Netlify/Render)
3. Set up monitoring and logging
4. Configure CI/CD for automatic deployments
