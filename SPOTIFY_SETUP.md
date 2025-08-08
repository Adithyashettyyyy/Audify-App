# Spotify API Setup Guide

## Overview
This app uses the Spotify Web API to fetch music data. To enable full functionality, you need to set up Spotify API credentials.

## Setup Instructions

### 1. Create a Spotify Developer Account
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Accept the terms of service

### 2. Create a New App
1. Click "Create App" in the dashboard
2. Fill in the app details:
   - **App name**: `Audify App` (or any name you prefer)
   - **App description**: `Music streaming app`
   - **Website**: `http://localhost:3000` (for development)
   - **Redirect URI**: `http://localhost:3000/callback` (for development)
3. Click "Save"

### 3. Get Your Credentials
1. In your app dashboard, you'll see:
   - **Client ID**: A long string of letters and numbers
   - **Client Secret**: Click "Show Client Secret" to reveal it

### 4. Configure Environment Variables
1. Create a `.env` file in the root directory of this project
2. Add your credentials:
   ```
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```
3. Replace `your_client_id_here` and `your_client_secret_here` with your actual credentials

### 5. Restart the Application
After adding the credentials, restart your development server:
```bash
npm run dev
```

## Current Behavior
- **Without credentials**: The app will use fallback data (demo playlists, albums, and categories)
- **With credentials**: The app will fetch real data from Spotify API

## Troubleshooting

### Common Issues

1. **404 Errors**: Some endpoints require user authentication. The app includes fallbacks for these cases.

2. **401 Errors**: Check that your credentials are correct and properly set in the `.env` file.

3. **Rate Limiting**: If you hit rate limits, the app will use fallback data.

### Security Notes
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore` to prevent accidental commits
- Keep your Client Secret secure and don't share it publicly

## API Endpoints Used
- `/browse/featured-playlists` - Featured playlists (requires user auth, has fallback)
- `/browse/new-releases` - New album releases
- `/browse/categories` - Music categories
- `/search` - Search for tracks, albums, artists, playlists

## Fallback Data
When Spotify API is unavailable, the app provides:
- Popular playlists (Today's Top Hits, Chill Hits, etc.)
- Recent album releases
- Music categories (Pop, Rock, Hip Hop, etc.)

This ensures the app remains functional even without Spotify credentials.
