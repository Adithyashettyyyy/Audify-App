import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import apiRoutes from "./routes/api";
import {
  getFeaturedPlaylists,
  getNewReleases,
  getCategories,
  getCategoryPlaylists,
  search,
  getAlbum,
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
  getRelatedArtists,
  getPlaylist,
  getPlaylistTracks,
  getRecommendations,
  getAvailableGenres,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
  getPopularByGenre,
} from "./routes/spotify";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // API Management routes
  app.use("/api", apiRoutes);

  // Spotify API routes
  app.get("/api/spotify/featured-playlists", getFeaturedPlaylists);
  app.get("/api/spotify/new-releases", getNewReleases);
  app.get("/api/spotify/categories", getCategories);
  app.get(
    "/api/spotify/categories/:categoryId/playlists",
    getCategoryPlaylists,
  );
  app.get("/api/spotify/search", search);
  app.get("/api/spotify/albums/:albumId", getAlbum);
  app.get("/api/spotify/artists/:artistId", getArtist);
  app.get("/api/spotify/artists/:artistId/albums", getArtistAlbums);
  app.get("/api/spotify/artists/:artistId/top-tracks", getArtistTopTracks);
  app.get("/api/spotify/artists/:artistId/related-artists", getRelatedArtists);
  app.get("/api/spotify/playlists/:playlistId", getPlaylist);
  app.get("/api/spotify/playlists/:playlistId/tracks", getPlaylistTracks);
  app.get("/api/spotify/recommendations", getRecommendations);
  app.get("/api/spotify/genres", getAvailableGenres);
  app.get("/api/spotify/search/albums", searchAlbums);
  app.get("/api/spotify/search/artists", searchArtists);
  app.get("/api/spotify/search/tracks", searchTracks);
  app.get("/api/spotify/search/playlists", searchPlaylists);
  app.get("/api/spotify/genre/:genre/popular", getPopularByGenre);

  return app;
}
