// Spotify API Response Types

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  type: "artist";
  uri: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  images?: SpotifyImage[];
  genres?: string[];
  popularity?: number;
  followers?: {
    total: number;
  };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  type: "album";
  uri: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  images: SpotifyImage[];
  artists: SpotifyArtist[];
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  album_type: "album" | "single" | "compilation";
  genres?: string[];
  popularity?: number;
  tracks?: {
    items: SpotifyTrack[];
    total: number;
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  type: "track";
  uri: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  artists: SpotifyArtist[];
  album?: SpotifyAlbum;
  duration_ms: number;
  explicit: boolean;
  popularity?: number;
  preview_url: string | null;
  track_number?: number;
  disc_number?: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  type: "playlist";
  uri: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  images: SpotifyImage[];
  description: string | null;
  owner: {
    id: string;
    display_name: string;
    type: "user";
  };
  tracks: {
    total: number;
    items?: SpotifyPlaylistTrack[];
  };
  followers?: {
    total: number;
  };
  public?: boolean;
  collaborative?: boolean;
}

export interface SpotifyPlaylistTrack {
  track: SpotifyTrack;
  added_at: string;
  added_by: {
    id: string;
    type: "user";
  };
}

export interface SpotifyCategory {
  id: string;
  name: string;
  href: string;
  icons: SpotifyImage[];
}

export interface SpotifyPagingObject<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string | null;
  previous: string | null;
}

export interface SpotifyFeaturedPlaylistsResponse {
  message?: string;
  playlists: SpotifyPagingObject<SpotifyPlaylist>;
}

export interface SpotifyNewReleasesResponse {
  albums: SpotifyPagingObject<SpotifyAlbum>;
}

export interface SpotifyCategoriesResponse {
  categories: SpotifyPagingObject<SpotifyCategory>;
}

export interface SpotifySearchResponse {
  albums?: SpotifyPagingObject<SpotifyAlbum>;
  artists?: SpotifyPagingObject<SpotifyArtist>;
  tracks?: SpotifyPagingObject<SpotifyTrack>;
  playlists?: SpotifyPagingObject<SpotifyPlaylist>;
}

export interface SpotifyRecommendationsResponse {
  tracks: SpotifyTrack[];
  seeds: Array<{
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string | null;
    id: string;
    initialPoolSize: number;
    type: "artist" | "track" | "genre";
  }>;
}

export interface SpotifyGenresResponse {
  genres: string[];
}

export interface SpotifyArtistTopTracksResponse {
  tracks: SpotifyTrack[];
}

export interface SpotifyRelatedArtistsResponse {
  artists: SpotifyArtist[];
}

// Helper types for our application
export interface AlbumCard {
  id: string;
  title: string;
  artist: string;
  cover: string;
  releaseDate?: string;
  totalTracks?: number;
}

export interface ArtistCard {
  id: string;
  name: string;
  image: string;
  followers?: number;
  genres?: string[];
}

export interface TrackCard {
  id: string;
  name: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  previewUrl?: string;
  albumCover?: string;
  spotifyUrl?: string;
}

export interface PlaylistCard {
  id: string;
  title: string;
  description?: string;
  cover: string;
  owner: string;
  totalTracks: number;
}

export interface CategoryCard {
  id: string;
  name: string;
  image: string;
}
