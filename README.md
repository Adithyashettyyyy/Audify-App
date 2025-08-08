# 🎵 Audify App

A modern, responsive music web application built with **React** and **Tailwind CSS**. It lets users explore, search, and play their favorite tracks using Spotify's powerful API.

## 🚀 Features

- 🔍 Search and explore albums, artists, and tracks
- 🎧 Music playback using Spotify API
- 💚 Like/Favorite your favorite tracks
- 🌗 Toggle between themes (dark/light or custom RGB themes)
- 📱 Fully responsive UI for desktop and mobile
- 🔀 Shuffle & Trending sections for recommendations

## 🛠️ Built With

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)
- [Express.js](https://expressjs.com/) (Backend)
- [TypeScript](https://www.typescriptlang.org/)

## 📦 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/Audify-App.git
   cd Audify-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Spotify API** (Optional)
   - Follow the guide in `SPOTIFY_SETUP.md`
   - Create a `.env` file with your Spotify credentials
   - Without credentials, the app will use fallback data

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:8081`
   - The app should load with demo data

## 🚀 Deployment

This app is configured for deployment with:
- **Client**: Netlify (Frontend)
- **Server**: Render (Backend)

### Quick Deployment

1. **Set up Spotify API** (Recommended)
   - Follow `SPOTIFY_SETUP.md` for credentials
   - This enables real Spotify data

2. **Deploy to Render** (Server)
   - Follow the guide in `DEPLOYMENT.md`
   - Set environment variables in Render dashboard

3. **Deploy to Netlify** (Client)
   - Connect your GitHub repository
   - Set build command: `npm run build:client`
   - Set publish directory: `dist/spa`

4. **Update API calls for production**
   ```bash
   npm run update-api-calls
   ```

### Environment Variables

**Render (Server)**:
```
NODE_ENV=production
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

**Netlify (Client)**:
```
VITE_API_BASE_URL=https://your-render-app-name.onrender.com
```

## 📁 Project Structure

```
Audify-App/
├── client/                 # React frontend
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── contexts/         # React contexts
│   └── config/           # Configuration files
├── server/               # Express backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── index.ts          # Server entry point
├── shared/               # Shared types and utilities
├── scripts/              # Build and deployment scripts
└── docs/                 # Documentation
```

## 🔧 Development Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run build:client     # Build client only
npm run build:server     # Build server only
npm run start            # Start production server
npm run test             # Run tests
npm run typecheck        # TypeScript validation
npm run update-api-calls # Update API calls for production
```

## 🐛 Troubleshooting

### Spotify API Issues
- **404 Errors**: Some endpoints require user auth, fallbacks are included
- **401 Errors**: Check your Spotify credentials
- **No credentials**: App works with fallback data

### Deployment Issues
- **CORS Errors**: Server has CORS configured
- **Build Failures**: Check all dependencies are installed
- **API Calls Failing**: Verify environment variables are set

## 📚 Documentation

- `SPOTIFY_SETUP.md` - Spotify API configuration guide
- `DEPLOYMENT.md` - Complete deployment instructions
- `AGENTS.md` - Development architecture details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Spotify Web API for music data
- Tailwind CSS for styling
- React community for excellent tooling
