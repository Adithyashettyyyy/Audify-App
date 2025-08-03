import axios from "axios";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

class SpotifyService {
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;
  private refreshPromise: Promise<string> | null = null;
  private clientId: string;
  private clientSecret: string;
  private retryCount: number = 0;
  private maxRetries: number = 3;
  private apiCallCount: number = 0;
  private successfulCalls: number = 0;
  private failedCalls: number = 0;
  private lastTokenRefresh: number = 0;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || "";
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";

    if (!this.clientId || !this.clientSecret) {
      console.warn(
        "Spotify credentials not found. Some features may not work.",
      );
    }

    // Auto-refresh tokens every hour
    this.startTokenRefreshInterval();
  }

  private async getAccessToken(): Promise<string> {
    // Return existing valid token
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    // If already refreshing, wait for that promise
    if (this.refreshPromise) {
      return await this.refreshPromise;
    }

    // Start new refresh process
    this.refreshPromise = this.refreshToken();

    try {
      const token = await this.refreshPromise;
      this.refreshPromise = null;
      return token;
    } catch (error) {
      this.refreshPromise = null;
      throw error;
    }
  }

  private async refreshToken(): Promise<string> {
    try {
      console.log("Refreshing Spotify access token...");

      const credentials = Buffer.from(
        `${this.clientId}:${this.clientSecret}`,
      ).toString("base64");

      const response = await axios.post<SpotifyTokenResponse>(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 10000, // 10 second timeout
        },
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000 - 120000; // Refresh 2 min early
      this.lastTokenRefresh = Date.now();
      this.retryCount = 0; // Reset retry count on success

      console.log(`🔑 Token refreshed successfully. Expires in ${Math.floor((this.tokenExpiresAt - Date.now()) / 1000 / 60)} minutes`);

      return this.accessToken;
    } catch (error: any) {
      console.error("Failed to refresh Spotify access token:", {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        retryCount: this.retryCount
      });

      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`Retrying token refresh (${this.retryCount}/${this.maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount)); // Exponential backoff
        return this.refreshToken();
      }

      throw new Error(`Failed to authenticate with Spotify after ${this.maxRetries} attempts`);
    }
  }

  private startTokenRefreshInterval() {
    // Refresh token every 50 minutes (tokens expire in 1 hour)
    setInterval(() => {
      if (this.accessToken && Date.now() < this.tokenExpiresAt - 600000) { // 10 minutes before expiry
        console.log("Auto-refreshing Spotify token...");
        this.refreshToken().catch(console.error);
      }
    }, 50 * 60 * 1000); // 50 minutes
  }

  private async makeRequest(
    endpoint: string,
    params: Record<string, any> = {},
  ) {
    this.apiCallCount++;
    const token = await this.getAccessToken();

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
          timeout: 15000, // 15 second timeout
        },
      );

      this.successfulCalls++;
      console.log(`✅ Spotify API success: ${endpoint}`);
      return response.data;
    } catch (error: any) {
      this.failedCalls++;

      // If token expired, try to refresh and retry once
      if (error?.response?.status === 401) {
        console.log("🔄 Token expired, refreshing and retrying...");
        this.accessToken = null; // Force token refresh
        this.tokenExpiresAt = 0;

        try {
          const newToken = await this.getAccessToken();
          const retryResponse = await axios.get(
            `https://api.spotify.com/v1${endpoint}`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
              params,
              timeout: 15000,
            },
          );

          this.successfulCalls++;
          console.log(`✅ Spotify API retry success: ${endpoint}`);
          return retryResponse.data;
        } catch (retryError) {
          console.error(`❌ Spotify API retry failed for ${endpoint}:`, retryError);
          throw retryError;
        }
      }

      console.error(`❌ Spotify API request failed for ${endpoint}:`, {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data?.error
      });
      throw error;
    }
  }

  // Featured Playlists (using search fallback since browse endpoint requires user auth)
  async getFeaturedPlaylists(limit = 20, offset = 0) {
    try {
      // Try the browse endpoint first
      return await this.makeRequest("/browse/featured-playlists", {
        limit,
        offset,
      });
    } catch (error) {
      // Fallback to search for popular playlists
      console.log(
        "Browse endpoint failed, using search fallback for featured playlists",
      );
      const searchResult = await this.makeRequest("/search", {
        q: "top hits",
        type: "playlist",
        limit,
        offset,
      });

      // Format to match expected structure
      return {
        message: "Popular Playlists",
        playlists: searchResult.playlists || { items: [] },
      };
    }
  }

  // New Releases (using search fallback)
  async getNewReleases(limit = 20, offset = 0) {
    try {
      return await this.makeRequest("/browse/new-releases", { limit, offset });
    } catch (error) {
      console.log(
        "Browse endpoint failed, using search fallback for new releases",
      );
      const searchResult = await this.makeRequest("/search", {
        q: "year:2024",
        type: "album",
        limit,
        offset,
      });

      return {
        message: "New Releases",
        albums: searchResult.albums || { items: [] },
      };
    }
  }

  // Categories (using search fallback)
  async getCategories(limit = 50, offset = 0) {
    try {
      return await this.makeRequest("/browse/categories", { limit, offset });
    } catch (error) {
      console.log(
        "Browse endpoint failed, using hardcoded categories fallback",
      );
      // Return popular music categories
      const categories = [
        {
          id: "pop",
          name: "Pop",
          icons: [
            {
              url: "https://i.scdn.co/image/ab67fb8200005caf1e1d1f54b58a0090a0b65ba4",
            },
          ],
        },
        {
          id: "rock",
          name: "Rock",
          icons: [
            {
              url: "https://i.scdn.co/image/ab67fb8200005caf41829e61a9cb8ec5e8d9a6e8",
            },
          ],
        },
        {
          id: "hip-hop",
          name: "Hip Hop",
          icons: [
            {
              url: "https://i.scdn.co/image/ab67fb8200005caf29bc8cd5a8b8e1e3b816d8b2",
            },
          ],
        },
        {
          id: "electronic",
          name: "Electronic",
          icons: [
            {
              url: "https://i.scdn.co/image/ab67fb8200005caf90b72e63d71e8b7c636b6c7a",
            },
          ],
        },
        {
          id: "indie",
          name: "Indie",
          icons: [
            {
              url: "https://i.scdn.co/image/ab67fb8200005caf27c3b8b6ed7c90c1b5da8c13",
            },
          ],
        },
        {
          id: "classical",
          name: "Classical",
          icons: [
            {
              url: "https://i.scdn.co/image/ab67fb8200005caf69b5bc8e71d4c17e0fd7f2b1",
            },
          ],
        },
      ];

      return {
        categories: {
          items: categories.slice(offset, offset + limit),
          total: categories.length,
          limit,
          offset,
        },
      };
    }
  }

  // Category Playlists
  async getCategoryPlaylists(categoryId: string, limit = 20, offset = 0) {
    return this.makeRequest(`/browse/categories/${categoryId}/playlists`, {
      limit,
      offset,
    });
  }

  // Top Artists by Country
  async getTopArtists(limit = 20, offset = 0) {
    // Note: This endpoint requires user authentication, so we'll use search instead
    return this.makeRequest("/search", {
      q: "genre:pop",
      type: "artist",
      limit,
      offset,
    });
  }

  // Search
  async search(
    query: string,
    types: string[] = ["track", "artist", "album", "playlist"],
    limit = 20,
  ) {
    return this.makeRequest("/search", {
      q: query,
      type: types.join(","),
      limit,
    });
  }

  // Get Album
  async getAlbum(albumId: string) {
    return this.makeRequest(`/albums/${albumId}`);
  }

  // Get Artist
  async getArtist(artistId: string) {
    return this.makeRequest(`/artists/${artistId}`);
  }

  // Get Artist Albums
  async getArtistAlbums(artistId: string, limit = 20, offset = 0) {
    return this.makeRequest(`/artists/${artistId}/albums`, {
      limit,
      offset,
      include_groups: "album,single",
    });
  }

  // Get Artist Top Tracks
  async getArtistTopTracks(artistId: string, market = "US") {
    return this.makeRequest(`/artists/${artistId}/top-tracks`, { market });
  }

  // Get Related Artists
  async getRelatedArtists(artistId: string) {
    return this.makeRequest(`/artists/${artistId}/related-artists`);
  }

  // Get Playlist
  async getPlaylist(playlistId: string) {
    return this.makeRequest(`/playlists/${playlistId}`);
  }

  // Get Playlist Tracks
  async getPlaylistTracks(playlistId: string, limit = 20, offset = 0) {
    return this.makeRequest(`/playlists/${playlistId}/tracks`, {
      limit,
      offset,
    });
  }

  // Get Recommendations
  async getRecommendations(params: {
    seed_artists?: string[];
    seed_genres?: string[];
    seed_tracks?: string[];
    limit?: number;
    [key: string]: any;
  }) {
    try {
      return await this.makeRequest("/recommendations", params);
    } catch (error) {
      console.log("Recommendations endpoint failed, using search fallback");
      // Fallback to search for popular tracks
      const searchResult = await this.makeRequest("/search", {
        q: "genre:pop",
        type: "track",
        limit: params.limit || 20,
      });

      return {
        tracks: searchResult.tracks?.items || [],
      };
    }
  }

  // Get Available Genres
  async getAvailableGenres() {
    return this.makeRequest("/recommendations/available-genre-seeds");
  }

  // Get Shows (Podcasts)
  async getShows(ids: string[]) {
    return this.makeRequest("/shows", { ids: ids.join(",") });
  }

  // Search for specific content types
  async searchAlbums(query: string, limit = 20, offset = 0) {
    const result = await this.makeRequest("/search", {
      q: query,
      type: "album",
      limit,
      offset,
    });
    return result.albums;
  }

  async searchArtists(query: string, limit = 20, offset = 0) {
    const result = await this.makeRequest("/search", {
      q: query,
      type: "artist",
      limit,
      offset,
    });
    return result.artists;
  }

  async searchTracks(query: string, limit = 20, offset = 0) {
    const result = await this.makeRequest("/search", {
      q: query,
      type: "track",
      limit,
      offset,
    });
    return result.tracks;
  }

  async searchPlaylists(query: string, limit = 20, offset = 0) {
    const result = await this.makeRequest("/search", {
      q: query,
      type: "playlist",
      limit,
      offset,
    });
    return result.playlists;
  }

  // Get popular content by genre
  async getPopularByGenre(genre: string, limit = 20) {
    return this.makeRequest("/search", {
      q: `genre:${genre}`,
      type: "album,artist,track",
      limit,
    });
  }

  // Token Management Methods
  async getTokenStatus() {
    const now = Date.now();
    const timeUntilExpiry = this.tokenExpiresAt - now;
    const minutesUntilExpiry = Math.floor(timeUntilExpiry / 1000 / 60);

    return {
      hasToken: !!this.accessToken,
      isExpired: now >= this.tokenExpiresAt,
      expiresAt: new Date(this.tokenExpiresAt).toISOString(),
      minutesUntilExpiry: Math.max(0, minutesUntilExpiry),
      lastRefresh: this.lastTokenRefresh ? new Date(this.lastTokenRefresh).toISOString() : null,
      isRefreshing: !!this.refreshPromise,
    };
  }

  async forceRefreshToken() {
    console.log("🔄 Force refreshing token...");
    this.accessToken = null;
    this.tokenExpiresAt = 0;

    const newToken = await this.getAccessToken();
    const status = await this.getTokenStatus();

    return {
      token: newToken ? "***" + newToken.slice(-4) : null,
      status,
    };
  }

  async getApiStats() {
    const status = await this.getTokenStatus();
    const successRate = this.apiCallCount > 0 ? (this.successfulCalls / this.apiCallCount) * 100 : 0;

    return {
      totalCalls: this.apiCallCount,
      successfulCalls: this.successfulCalls,
      failedCalls: this.failedCalls,
      successRate: Math.round(successRate * 100) / 100,
      tokenStatus: status,
      retryCount: this.retryCount,
      maxRetries: this.maxRetries,
    };
  }

  // Health check method
  async healthCheck() {
    try {
      await this.getAvailableGenres();
      return { status: "healthy", timestamp: new Date().toISOString() };
    } catch (error) {
      return {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
}

export const spotifyService = new SpotifyService();
