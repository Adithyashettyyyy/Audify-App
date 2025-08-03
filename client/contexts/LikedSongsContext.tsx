import React, { createContext, useContext, useState, useEffect } from "react";

export interface LikedTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  previewUrl?: string;
  albumCover: string;
  likedAt: string;
  type: "track";
}

export interface LikedAlbum {
  id: string;
  title: string;
  artist: string;
  cover: string;
  releaseDate?: string;
  totalTracks?: number;
  likedAt: string;
  type: "album";
}

export interface LikedArtist {
  id: string;
  name: string;
  image: string;
  followers?: number;
  genres?: string[];
  likedAt: string;
  type: "artist";
}

export type LikedItem = LikedTrack | LikedAlbum | LikedArtist;

interface LikedSongsContextType {
  likedSongs: LikedTrack[];
  likedAlbums: LikedAlbum[];
  likedArtists: LikedArtist[];
  allLikedItems: LikedItem[];
  isLiked: (itemId: string, type?: "track" | "album" | "artist") => boolean;
  toggleLike: (item: Omit<LikedItem, "likedAt">) => void;
  getLikedSongsCount: () => number;
  getLikedAlbumsCount: () => number;
  getLikedArtistsCount: () => number;
  getTotalLikedCount: () => number;
}

const LikedSongsContext = createContext<LikedSongsContextType | undefined>(
  undefined,
);

export function LikedSongsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [likedSongs, setLikedSongs] = useState<LikedTrack[]>([]);
  const [likedAlbums, setLikedAlbums] = useState<LikedAlbum[]>([]);
  const [likedArtists, setLikedArtists] = useState<LikedArtist[]>([]);

  // Load liked items from localStorage on component mount
  useEffect(() => {
    const savedLikedSongs = localStorage.getItem("likedSongs");
    const savedLikedAlbums = localStorage.getItem("likedAlbums");
    const savedLikedArtists = localStorage.getItem("likedArtists");

    if (savedLikedSongs) {
      try {
        const songs = JSON.parse(savedLikedSongs);
        // Add type field if missing (for backward compatibility)
        const updatedSongs = songs.map((song: any) => ({
          ...song,
          type: song.type || "track",
        }));
        setLikedSongs(updatedSongs);
      } catch (error) {
        console.error("Error loading liked songs:", error);
      }
    }

    if (savedLikedAlbums) {
      try {
        setLikedAlbums(JSON.parse(savedLikedAlbums));
      } catch (error) {
        console.error("Error loading liked albums:", error);
      }
    }

    if (savedLikedArtists) {
      try {
        setLikedArtists(JSON.parse(savedLikedArtists));
      } catch (error) {
        console.error("Error loading liked artists:", error);
      }
    }
  }, []);

  // Save liked items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    localStorage.setItem("likedAlbums", JSON.stringify(likedAlbums));
  }, [likedAlbums]);

  useEffect(() => {
    localStorage.setItem("likedArtists", JSON.stringify(likedArtists));
  }, [likedArtists]);

  const allLikedItems: LikedItem[] = [
    ...likedSongs,
    ...likedAlbums,
    ...likedArtists,
  ];

  const isLiked = (itemId: string, type?: "track" | "album" | "artist"): boolean => {
    if (type) {
      switch (type) {
        case "track":
          return likedSongs.some((song) => song.id === itemId);
        case "album":
          return likedAlbums.some((album) => album.id === itemId);
        case "artist":
          return likedArtists.some((artist) => artist.id === itemId);
        default:
          return false;
      }
    }
    // Check all types if no type specified
    return allLikedItems.some((item) => item.id === itemId);
  };

  const toggleLike = (item: Omit<LikedItem, "likedAt">) => {
    const likedItem = {
      ...item,
      likedAt: new Date().toISOString(),
    } as LikedItem;

    switch (item.type) {
      case "track":
        setLikedSongs((prev) => {
          const isCurrentlyLiked = prev.some((song) => song.id === item.id);
          if (isCurrentlyLiked) {
            return prev.filter((song) => song.id !== item.id);
          } else {
            return [likedItem as LikedTrack, ...prev];
          }
        });
        break;

      case "album":
        setLikedAlbums((prev) => {
          const isCurrentlyLiked = prev.some((album) => album.id === item.id);
          if (isCurrentlyLiked) {
            return prev.filter((album) => album.id !== item.id);
          } else {
            return [likedItem as LikedAlbum, ...prev];
          }
        });
        break;

      case "artist":
        setLikedArtists((prev) => {
          const isCurrentlyLiked = prev.some((artist) => artist.id === item.id);
          if (isCurrentlyLiked) {
            return prev.filter((artist) => artist.id !== item.id);
          } else {
            return [likedItem as LikedArtist, ...prev];
          }
        });
        break;
    }
  };

  const getLikedSongsCount = (): number => {
    return likedSongs.length;
  };

  const getLikedAlbumsCount = (): number => {
    return likedAlbums.length;
  };

  const getLikedArtistsCount = (): number => {
    return likedArtists.length;
  };

  const getTotalLikedCount = (): number => {
    return likedSongs.length + likedAlbums.length + likedArtists.length;
  };

  return (
    <LikedSongsContext.Provider
      value={{
        likedSongs,
        likedAlbums,
        likedArtists,
        allLikedItems,
        isLiked,
        toggleLike,
        getLikedSongsCount,
        getLikedAlbumsCount,
        getLikedArtistsCount,
        getTotalLikedCount,
      }}
    >
      {children}
    </LikedSongsContext.Provider>
  );
}

export function useLikedSongs() {
  const context = useContext(LikedSongsContext);
  if (context === undefined) {
    throw new Error("useLikedSongs must be used within a LikedSongsProvider");
  }
  return context;
}
