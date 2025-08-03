import { RequestHandler } from "express";
import { spotifyService } from "../services/spotify.js";

// Featured Playlists
export const getFeaturedPlaylists: RequestHandler = async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const data = await spotifyService.getFeaturedPlaylists(
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching featured playlists:", error);
    res.status(500).json({ error: "Failed to fetch featured playlists" });
  }
};

// New Releases
export const getNewReleases: RequestHandler = async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const data = await spotifyService.getNewReleases(
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    res.status(500).json({ error: "Failed to fetch new releases" });
  }
};

// Categories
export const getCategories: RequestHandler = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const data = await spotifyService.getCategories(
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Category Playlists
export const getCategoryPlaylists: RequestHandler = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { limit = 20, offset = 0 } = req.query;
    const data = await spotifyService.getCategoryPlaylists(
      categoryId,
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching category playlists:", error);
    res.status(500).json({ error: "Failed to fetch category playlists" });
  }
};

// Search
export const search: RequestHandler = async (req, res) => {
  try {
    const { q, type = "track,artist,album,playlist", limit = 20 } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const types = (type as string).split(",");
    const data = await spotifyService.search(q as string, types, Number(limit));
    res.json(data);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Failed to search" });
  }
};

// Get Album
export const getAlbum: RequestHandler = async (req, res) => {
  try {
    const { albumId } = req.params;
    const data = await spotifyService.getAlbum(albumId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching album:", error);
    res.status(500).json({ error: "Failed to fetch album" });
  }
};

// Get Artist
export const getArtist: RequestHandler = async (req, res) => {
  try {
    const { artistId } = req.params;
    const data = await spotifyService.getArtist(artistId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching artist:", error);
    res.status(500).json({ error: "Failed to fetch artist" });
  }
};

// Get Artist Albums
export const getArtistAlbums: RequestHandler = async (req, res) => {
  try {
    const { artistId } = req.params;
    const { limit = 20, offset = 0 } = req.query;
    const data = await spotifyService.getArtistAlbums(
      artistId,
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching artist albums:", error);
    res.status(500).json({ error: "Failed to fetch artist albums" });
  }
};

// Get Artist Top Tracks
export const getArtistTopTracks: RequestHandler = async (req, res) => {
  try {
    const { artistId } = req.params;
    const { market = "US" } = req.query;
    const data = await spotifyService.getArtistTopTracks(
      artistId,
      market as string,
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching artist top tracks:", error);
    res.status(500).json({ error: "Failed to fetch artist top tracks" });
  }
};

// Get Related Artists
export const getRelatedArtists: RequestHandler = async (req, res) => {
  try {
    const { artistId } = req.params;
    const data = await spotifyService.getRelatedArtists(artistId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching related artists:", error);
    res.status(500).json({ error: "Failed to fetch related artists" });
  }
};

// Get Playlist
export const getPlaylist: RequestHandler = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const data = await spotifyService.getPlaylist(playlistId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
};

// Get Playlist Tracks
export const getPlaylistTracks: RequestHandler = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { limit = 20, offset = 0 } = req.query;
    const data = await spotifyService.getPlaylistTracks(
      playlistId,
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    res.status(500).json({ error: "Failed to fetch playlist tracks" });
  }
};

// Get Recommendations
export const getRecommendations: RequestHandler = async (req, res) => {
  try {
    const params = req.query;
    const data = await spotifyService.getRecommendations(params);
    res.json(data);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};

// Get Available Genres
export const getAvailableGenres: RequestHandler = async (req, res) => {
  try {
    const data = await spotifyService.getAvailableGenres();
    res.json(data);
  } catch (error) {
    console.error("Error fetching available genres:", error);
    res.status(500).json({ error: "Failed to fetch available genres" });
  }
};

// Search specific content types
export const searchAlbums: RequestHandler = async (req, res) => {
  try {
    const { q, limit = 20, offset = 0 } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const data = await spotifyService.searchAlbums(
      q as string,
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error searching albums:", error);
    res.status(500).json({ error: "Failed to search albums" });
  }
};

export const searchArtists: RequestHandler = async (req, res) => {
  try {
    const { q, limit = 20, offset = 0 } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const data = await spotifyService.searchArtists(
      q as string,
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error searching artists:", error);
    res.status(500).json({ error: "Failed to search artists" });
  }
};

export const searchTracks: RequestHandler = async (req, res) => {
  try {
    const { q, limit = 20, offset = 0 } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const data = await spotifyService.searchTracks(
      q as string,
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error searching tracks:", error);
    res.status(500).json({ error: "Failed to search tracks" });
  }
};

export const searchPlaylists: RequestHandler = async (req, res) => {
  try {
    const { q, limit = 20, offset = 0 } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const data = await spotifyService.searchPlaylists(
      q as string,
      Number(limit),
      Number(offset),
    );
    res.json(data);
  } catch (error) {
    console.error("Error searching playlists:", error);
    res.status(500).json({ error: "Failed to search playlists" });
  }
};

// Get popular content by genre
export const getPopularByGenre: RequestHandler = async (req, res) => {
  try {
    const { genre } = req.params;
    const { limit = 20 } = req.query;
    const data = await spotifyService.getPopularByGenre(genre, Number(limit));
    res.json(data);
  } catch (error) {
    console.error("Error fetching popular content by genre:", error);
    res.status(500).json({ error: "Failed to fetch popular content by genre" });
  }
};
