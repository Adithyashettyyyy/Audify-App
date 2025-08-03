import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Heart,
  Shuffle,
  TrendingUp,
  Clock,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { useNowPlaying } from "@/components/NowPlaying";
import { useLikedSongs } from "@/contexts/LikedSongsContext";
import {
  AlbumCard,
  ArtistCard,
  PlaylistCard,
  TrackCard,
} from "@shared/spotify";
import { demoTracks } from "@/data/demoTracks";

export default function Dashboard() {
  const { playTrack } = useNowPlaying();
  const { toggleLike, isLiked } = useLikedSongs();
  const [featuredPlaylists, setFeaturedPlaylists] = useState<PlaylistCard[]>(
    [],
  );
  const [newReleases, setNewReleases] = useState<AlbumCard[]>([]);
  const [topArtists, setTopArtists] = useState<ArtistCard[]>([]);
  const [trendingTracks, setTrendingTracks] = useState<TrackCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);

    // Default demo data for fallback
    const fallbackPlaylists: PlaylistCard[] = [
      {
        id: "1",
        title: "Today's Top Hits",
        description: "The most played songs right now",
        cover:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 50,
      },
      {
        id: "2",
        title: "Chill Hits",
        description: "Relax and unwind",
        cover:
          "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 30,
      },
      {
        id: "3",
        title: "RapCaviar",
        description: "Hip Hop Central",
        cover:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 65,
      },
      {
        id: "4",
        title: "Rock Classics",
        description: "Classic rock hits",
        cover:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 40,
      },
    ];

    const fallbackAlbums: AlbumCard[] = [
      {
        id: "1",
        title: "Midnights",
        artist: "Taylor Swift",
        cover:
          "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
        releaseDate: "2022-10-21",
        totalTracks: 13,
      },
      {
        id: "2",
        title: "Harry's House",
        artist: "Harry Styles",
        cover:
          "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=300&h=300&fit=crop",
        releaseDate: "2022-05-20",
        totalTracks: 13,
      },
      {
        id: "3",
        title: "The Tortured Poets Department",
        artist: "Taylor Swift",
        cover:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        releaseDate: "2024-04-19",
        totalTracks: 16,
      },
      {
        id: "4",
        title: "SOS",
        artist: "SZA",
        cover:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
        releaseDate: "2022-12-09",
        totalTracks: 23,
      },
    ];

    const fallbackArtists: ArtistCard[] = [
      {
        id: "1",
        name: "Taylor Swift",
        image:
          "https://images.unsplash.com/photo-1539375665275-f9de415ef9d0?w=300&h=300&fit=crop",
        followers: 95000000,
        genres: ["pop"],
      },
      {
        id: "2",
        name: "Harry Styles",
        image:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
        followers: 65000000,
        genres: ["pop", "rock"],
      },
      {
        id: "3",
        name: "The Weeknd",
        image:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
        followers: 85000000,
        genres: ["pop", "r&b"],
      },
      {
        id: "4",
        name: "Billie Eilish",
        image:
          "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=300&h=300&fit=crop",
        followers: 75000000,
        genres: ["pop", "alternative"],
      },
    ];

    const fallbackTracks: TrackCard[] = demoTracks.map((track) => ({
      id: track.id,
      name: track.title,
      title: track.title,
      artist: track.artist,
      album: track.album,
      duration: track.duration,
      previewUrl: track.previewUrl,
      albumCover: track.albumCover,
      spotifyUrl: `https://open.spotify.com/track/${track.id}`,
    }));

    // Set fallback data immediately to show content while loading
    setFeaturedPlaylists(fallbackPlaylists);
    setNewReleases(fallbackAlbums);
    setTopArtists(fallbackArtists);
    setTrendingTracks(fallbackTracks);
    setLoading(false);

    // Now enhance with real Spotify data
    try {
      // Load featured playlists
      fetch("/api/spotify/featured-playlists?limit=8")
        .then(async (response) => {
          if (response.ok) {
            const playlistsData = await response.json();
            if (playlistsData.playlists?.items?.length > 0) {
              const playlists: PlaylistCard[] = playlistsData.playlists.items
                .filter((playlist: any) => playlist && playlist.id)
                .map((playlist: any) => ({
                  id: playlist.id,
                  title: playlist.name || "Unknown Playlist",
                  description: playlist.description || "No description",
                  cover:
                    playlist.images?.[0]?.url || fallbackPlaylists[0].cover,
                  owner: playlist.owner?.display_name || "Unknown",
                  totalTracks: playlist.tracks?.total || 0,
                }));

              console.log(
                "✅ Loaded real featured playlists:",
                playlists.length,
              );
              setFeaturedPlaylists(playlists);
            }
          } else {
            console.log(
              "⚠️ Featured playlists API failed, using fallback data",
            );
          }
        })
        .catch((error) => {
          console.log(
            "⚠️ Featured playlists error, using fallback:",
            error.message,
          );
        });

      // Load new releases
      fetch("/api/spotify/new-releases?limit=8")
        .then(async (response) => {
          if (response.ok) {
            const releasesData = await response.json();
            if (releasesData.albums?.items?.length > 0) {
              const albums: AlbumCard[] = releasesData.albums.items
                .filter((album: any) => album && album.id)
                .map((album: any) => ({
                  id: album.id,
                  title: album.name || "Unknown Album",
                  artist: album.artists?.[0]?.name || "Unknown Artist",
                  cover: album.images?.[0]?.url || fallbackAlbums[0].cover,
                  releaseDate: album.release_date || "",
                  totalTracks: album.total_tracks || 0,
                }));

              console.log("✅ Loaded real new releases:", albums.length);
              setNewReleases(albums);
            }
          } else {
            console.log("⚠️ New releases API failed, using fallback data");
          }
        })
        .catch((error) => {
          console.log("⚠️ New releases error, using fallback:", error.message);
        });

      // Load popular artists
      fetch("/api/spotify/search?q=year:2024&type=artist&limit=8")
        .then(async (response) => {
          if (response.ok) {
            const artistsData = await response.json();
            if (artistsData.artists?.items?.length > 0) {
              const artists: ArtistCard[] = artistsData.artists.items
                .filter((artist: any) => artist && artist.id)
                .map((artist: any) => ({
                  id: artist.id,
                  name: artist.name || "Unknown Artist",
                  image: artist.images?.[0]?.url || fallbackArtists[0].image,
                  followers: artist.followers?.total || 0,
                  genres: artist.genres || [],
                }));

              console.log("✅ Loaded real popular artists:", artists.length);
              setTopArtists(artists);
            }
          } else {
            console.log("⚠️ Popular artists API failed, using fallback data");
          }
        })
        .catch((error) => {
          console.log(
            "⚠️ Popular artists error, using fallback:",
            error.message,
          );
        });

      // Load trending tracks
      fetch("/api/spotify/search?q=year:2024&type=track&limit=6")
        .then(async (response) => {
          if (response.ok) {
            const tracksData = await response.json();
            if (tracksData.tracks?.items?.length > 0) {
              const tracks: TrackCard[] = tracksData.tracks.items
                .filter((track: any) => track && track.id)
                .map((track: any) => ({
                  id: track.id,
                  name: track.name || "Unknown Track",
                  title: track.name || "Unknown Track",
                  artist: track.artists?.[0]?.name || "Unknown Artist",
                  album: track.album?.name || "Unknown Album",
                  duration: track.duration_ms || 0,
                  previewUrl: track.preview_url || "",
                  albumCover:
                    track.album?.images?.[0]?.url || "/placeholder.svg",
                  spotifyUrl: `https://open.spotify.com/track/${track.id}`,
                }));

              console.log("✅ Loaded real trending tracks:", tracks.length);
              setTrendingTracks(tracks);
            }
          } else {
            console.log("⚠️ Trending tracks API failed, using fallback data");
          }
        })
        .catch((error) => {
          console.log(
            "⚠️ Trending tracks error, using fallback:",
            error.message,
          );
        });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      // Fallback data is already set
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(0)}K`;
    }
    return followers.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
            <ThemeToggle />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-muted rounded-xl h-48 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 sm:pb-18 md:pb-20 lg:pb-0 xl:pb-0">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-7 md:mb-8 lg:mb-10">
          <div className="flex items-center gap-4">
            <Logo size="lg" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                audify
              </h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
                Discover trending music, artists, and playlists
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-7 md:mb-8 lg:mb-10">
          <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 md:p-5 lg:p-6">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-lg font-medium truncate">
                Featured Playlists
              </CardTitle>
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 pt-0">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                {featuredPlaylists.length}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground truncate">
                Curated collections
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 md:p-5 lg:p-6">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-lg font-medium truncate">
                New Releases
              </CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 pt-0">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                {newReleases.length}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground truncate">
                Latest albums
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 md:p-5 lg:p-6">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-lg font-medium truncate">
                Top Artists
              </CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 pt-0">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                {topArtists.length}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground truncate">
                Popular musicians
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 md:p-5 lg:p-6">
              <CardTitle className="text-xs sm:text-sm md:text-base lg:text-lg font-medium truncate">
                Trending Songs
              </CardTitle>
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 pt-0">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                {trendingTracks.length}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground truncate">
                Hot tracks
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="playlists" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-7 md:mb-8 lg:mb-10 h-auto p-1">
            <TabsTrigger
              value="playlists"
              className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3"
            >
              <span className="hidden sm:inline">Featured </span>Playlists
            </TabsTrigger>
            <TabsTrigger
              value="albums"
              className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3"
            >
              <span className="hidden sm:inline">New </span>Releases
            </TabsTrigger>
            <TabsTrigger
              value="artists"
              className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3"
            >
              <span className="hidden sm:inline">Top </span>Artists
            </TabsTrigger>
            <TabsTrigger
              value="tracks"
              className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 py-2 sm:py-3"
            >
              Trending
            </TabsTrigger>
          </TabsList>

          {/* Featured Playlists */}
          <TabsContent value="playlists">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {featuredPlaylists.map((playlist) => (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="group space-y-2 sm:space-y-3 hover:opacity-80 transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-square rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden relative">
                    <img
                      src={playlist.cover}
                      alt={playlist.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                    >
                      <Play
                        size={12}
                        className="sm:w-4 sm:h-4 md:w-5 md:h-5 fill-current ml-0.5"
                      />
                    </Button>
                  </div>
                  <div className="px-1">
                    <h3 className="font-medium truncate text-xs sm:text-sm md:text-base">
                      {playlist.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      by {playlist.owner} • {playlist.totalTracks} tracks
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* New Releases */}
          <TabsContent value="albums">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {newReleases.map((album) => (
                <div
                  key={album.id}
                  className="group space-y-3 hover:opacity-80 transition-opacity"
                >
                  <div className="aspect-square rounded-xl overflow-hidden relative">
                    <Link to={`/album/${album.id}`}>
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play size={16} className="fill-current ml-0.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity ${
                        isLiked(album.id, "album")
                          ? "text-red-500 opacity-100"
                          : "text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike({
                          id: album.id,
                          title: album.title,
                          artist: album.artist,
                          cover: album.cover,
                          releaseDate: album.releaseDate,
                          totalTracks: album.totalTracks,
                          type: "album",
                        });
                      }}
                    >
                      <Heart
                        size={14}
                        className={
                          isLiked(album.id, "album") ? "fill-current" : ""
                        }
                      />
                    </Button>
                  </div>
                  <Link to={`/album/${album.id}`}>
                    <div>
                      <h3 className="font-medium truncate">{album.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {album.artist} • {album.totalTracks} tracks
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Top Artists */}
          <TabsContent value="artists">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {topArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="group space-y-3 hover:opacity-80 transition-opacity text-center"
                >
                  <div className="aspect-square rounded-full overflow-hidden relative">
                    <Link to={`/artist/${artist.id}`}>
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Shuffle size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity ${
                        isLiked(artist.id, "artist")
                          ? "text-red-500 opacity-100"
                          : "text-white"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike({
                          id: artist.id,
                          name: artist.name,
                          image: artist.image,
                          followers: artist.followers,
                          genres: artist.genres,
                          type: "artist",
                        });
                      }}
                    >
                      <Heart
                        size={14}
                        className={
                          isLiked(artist.id, "artist") ? "fill-current" : ""
                        }
                      />
                    </Button>
                  </div>
                  <Link to={`/artist/${artist.id}`}>
                    <div>
                      <h3 className="font-medium truncate">{artist.name}</h3>
                      {artist.followers && (
                        <p className="text-sm text-muted-foreground">
                          {formatFollowers(artist.followers)} followers
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Trending Tracks */}
          <TabsContent value="tracks">
            <div className="space-y-2">
              {trendingTracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                  onClick={() => {
                    playTrack({
                      id: track.id,
                      name: track.title,
                      artist: track.artist,
                      previewUrl: track.previewUrl,
                      albumCover: track.albumCover,
                      duration: track.duration,
                      spotifyUrl: `https://open.spotify.com/track/${track.id}`,
                    });
                  }}
                >
                  <div className="w-8 text-muted-foreground text-sm flex items-center justify-center">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <Play
                      size={16}
                      className="hidden group-hover:block fill-current text-primary"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src={track.albumCover || "/placeholder.svg"}
                      alt={track.album}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{track.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {track.artist} • {track.album}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDuration(track.duration)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`opacity-0 group-hover:opacity-100 ${
                      isLiked(track.id, "track")
                        ? "text-red-500 opacity-100"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike({
                        id: track.id,
                        title: track.title,
                        artist: track.artist,
                        album: track.album,
                        duration: track.duration,
                        previewUrl: track.previewUrl,
                        albumCover: track.albumCover,
                        type: "track",
                      });
                    }}
                  >
                    <Heart
                      size={16}
                      className={
                        isLiked(track.id, "track") ? "fill-current" : ""
                      }
                    />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
