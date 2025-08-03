import { Router } from "express";
import { spotifyService } from "../services/spotify.js";

const router = Router();

// API Health Check
router.get("/health", async (req, res) => {
  try {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: "1.0.0",
      services: {
        spotify: "checking...",
      },
    };

    // Check Spotify service
    try {
      await spotifyService.getAvailableGenres();
      health.services.spotify = "healthy";
    } catch (error) {
      health.services.spotify = "unhealthy";
      health.status = "degraded";
    }

    res.json(health);
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Internal server error",
    });
  }
});

// Token Status
router.get("/token-status", async (req, res) => {
  try {
    const status = await spotifyService.getTokenStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get token status",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Refresh Token Manually
router.post("/refresh-token", async (req, res) => {
  try {
    const result = await spotifyService.forceRefreshToken();
    res.json({
      success: true,
      message: "Token refreshed successfully",
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to refresh token",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// API Stats
router.get("/stats", async (req, res) => {
  try {
    const stats = await spotifyService.getApiStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get API stats",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
