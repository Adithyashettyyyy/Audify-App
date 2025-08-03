import {
  Search as SearchIcon,
  ArrowLeft,
  Filter,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AlbumCard,
  ArtistCard,
  PlaylistCard,
  CategoryCard,
} from "@shared/spotify";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [albums, setAlbums] = useState<AlbumCard[]>([]);
  const [artists, setArtists] = useState<ArtistCard[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistCard[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const [filterViews, setFilterViews] = useState("");
  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [loading, setLoading] = useState(false);

  // Store original data for filtering
  const [originalAlbums, setOriginalAlbums] = useState<AlbumCard[]>([]);
  const [originalArtists, setOriginalArtists] = useState<ArtistCard[]>([]);
  const [originalPlaylists, setOriginalPlaylists] = useState<PlaylistCard[]>(
    [],
  );

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Apply filters when filter options change
  useEffect(() => {
    applyFilters();
  }, [sortBy, filterViews, originalAlbums, originalArtists, originalPlaylists]);

  const applyFilters = () => {
    // Filter and sort albums
    let filteredAlbums = [...originalAlbums];

    // Filter by popularity (simulated using total tracks as proxy)
    if (filterViews) {
      filteredAlbums = filteredAlbums.filter((album) => {
        const tracks = album.totalTracks || 0;
        switch (filterViews) {
          case "viral":
            return tracks >= 15; // Viral albums tend to be longer
          case "popular":
            return tracks >= 10;
          case "trending":
            return tracks >= 8;
          case "emerging":
            return tracks >= 5;
          default:
            return true;
        }
      });
    }

    // Sort albums
    switch (sortBy) {
      case "newest":
        filteredAlbums.sort((a, b) =>
          (b.releaseDate || "").localeCompare(a.releaseDate || ""),
        );
        break;
      case "oldest":
        filteredAlbums.sort((a, b) =>
          (a.releaseDate || "").localeCompare(b.releaseDate || ""),
        );
        break;
      case "views":
        filteredAlbums.sort(
          (a, b) => (b.totalTracks || 0) - (a.totalTracks || 0),
        );
        break;
      case "alphabetical":
        filteredAlbums.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // relevance - keep original order
        break;
    }

    setAlbums(filteredAlbums);

    // Filter and sort artists
    let filteredArtists = [...originalArtists];

    // Filter by popularity (using followers)
    if (filterViews) {
      filteredArtists = filteredArtists.filter((artist) => {
        const followers = artist.followers || 0;
        switch (filterViews) {
          case "viral":
            return followers >= 50000000; // 50M+ followers
          case "popular":
            return followers >= 10000000; // 10M+ followers
          case "trending":
            return followers >= 1000000; // 1M+ followers
          case "emerging":
            return followers >= 100000; // 100K+ followers
          default:
            return true;
        }
      });
    }

    // Sort artists
    switch (sortBy) {
      case "views":
        filteredArtists.sort((a, b) => (b.followers || 0) - (a.followers || 0));
        break;
      case "alphabetical":
        filteredArtists.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // relevance, newest, oldest - keep original order for artists
        break;
    }

    setArtists(filteredArtists);

    // Filter and sort playlists
    let filteredPlaylists = [...originalPlaylists];

    // Filter by popularity (using total tracks as proxy)
    if (filterViews) {
      filteredPlaylists = filteredPlaylists.filter((playlist) => {
        const tracks = playlist.totalTracks || 0;
        switch (filterViews) {
          case "viral":
            return tracks >= 50;
          case "popular":
            return tracks >= 30;
          case "trending":
            return tracks >= 20;
          case "emerging":
            return tracks >= 10;
          default:
            return true;
        }
      });
    }

    // Sort playlists
    switch (sortBy) {
      case "views":
        filteredPlaylists.sort(
          (a, b) => (b.totalTracks || 0) - (a.totalTracks || 0),
        );
        break;
      case "alphabetical":
        filteredPlaylists.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // relevance, newest, oldest - keep original order for playlists
        break;
    }

    setPlaylists(filteredPlaylists);
  };

  const loadInitialData = async () => {
    setLoading(true);

    // Immediate fallback data to prevent empty states
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
        title: "Un Verano Sin Ti",
        artist: "Bad Bunny",
        cover:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        releaseDate: "2022-05-06",
        totalTracks: 23,
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
        title: "RapCaviar",
        description: "Hip Hop Central",
        cover:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 65,
      },
      {
        id: "3",
        title: "Pop Rising",
        description: "The next generation of pop superstars",
        cover:
          "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 40,
      },
      {
        id: "4",
        title: "Chill Hits",
        description: "Kick back to the best new and recent chill",
        cover:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 30,
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
        name: "The Weeknd",
        image:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
        followers: 85000000,
        genres: ["pop", "r&b"],
      },
      {
        id: "3",
        name: "Harry Styles",
        image:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
        followers: 65000000,
        genres: ["pop", "rock"],
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

    const fallbackCategories: CategoryCard[] = [
      {
        id: "pop",
        name: "Pop",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      },
      {
        id: "rock",
        name: "Rock",
        image:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      },
      {
        id: "hip-hop",
        name: "Hip Hop",
        image:
          "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=300&h=300&fit=crop",
      },
      {
        id: "electronic",
        name: "Electronic",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      },
      {
        id: "indie",
        name: "Indie",
        image:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      },
      {
        id: "classical",
        name: "Classical",
        image:
          "https://images.unsplash.com/photo-1539375665275-f9de415ef9d0?w=300&h=300&fit=crop",
      },
    ];

    // Set fallback data immediately
    setAlbums(fallbackAlbums);
    setPlaylists(fallbackPlaylists);
    setArtists(fallbackArtists);
    setCategories(fallbackCategories);

    // Store originals for filtering
    setOriginalAlbums(fallbackAlbums);
    setOriginalPlaylists(fallbackPlaylists);
    setOriginalArtists(fallbackArtists);

    setLoading(false);

    try {
      // Try to enhance with real data in background
      fetch("/api/spotify/new-releases")
        .then(async (response) => {
          if (response.ok) {
            const newReleases = await response.json();
            const albumCards: AlbumCard[] =
              newReleases.albums?.items
                ?.filter((album: any) => album && album.id)
                ?.map((album: any) => ({
                  id: album.id,
                  title: album.name || "Unknown Album",
                  artist: album.artists?.[0]?.name || "Unknown Artist",
                  cover: album.images?.[0]?.url || fallbackAlbums[0].cover,
                  releaseDate: album.release_date || "",
                  totalTracks: album.total_tracks || 0,
                })) || [];

            if (albumCards.length > 0) {
              setOriginalAlbums(albumCards);
              setAlbums(albumCards);
            }
          }
        })
        .catch(() => {
          // Keep fallback data
        });

      // Try to enhance playlists in background
      fetch("/api/spotify/featured-playlists")
        .then(async (response) => {
          if (response.ok) {
            const featuredPlaylists = await response.json();
            const playlistCards: PlaylistCard[] =
              featuredPlaylists.playlists?.items
                ?.filter((playlist: any) => playlist && playlist.id)
                ?.map((playlist: any) => ({
                  id: playlist.id,
                  title: playlist.name || "Unknown Playlist",
                  description: playlist.description || "No description",
                  cover:
                    playlist.images?.[0]?.url || fallbackPlaylists[0].cover,
                  owner: playlist.owner?.display_name || "Unknown",
                  totalTracks: playlist.tracks?.total || 0,
                })) || [];

            if (playlistCards.length > 0) {
              setOriginalPlaylists(playlistCards);
              setPlaylists(playlistCards);
            }
          }
        })
        .catch(() => {
          // Keep fallback data
        });

      // Try to enhance categories in background
      fetch("/api/spotify/categories")
        .then(async (response) => {
          if (response.ok) {
            const categoriesData = await response.json();
            const categoryCards: CategoryCard[] =
              categoriesData.categories?.items
                ?.filter((category: any) => category && category.id)
                ?.map((category: any) => ({
                  id: category.id,
                  name: category.name || "Unknown Category",
                  image:
                    category.icons?.[0]?.url || fallbackCategories[0].image,
                })) || [];

            if (categoryCards.length > 0) {
              setCategories(categoryCards);
            }
          }
        })
        .catch(() => {
          // Keep fallback data
        });

      // Try to enhance artists in background
      fetch("/api/spotify/search?q=genre:pop&type=artist&limit=20")
        .then(async (response) => {
          if (response.ok) {
            const artistsData = await response.json();
            const artistCards: ArtistCard[] =
              artistsData.artists?.items
                ?.filter((artist: any) => artist && artist.id)
                ?.map((artist: any) => ({
                  id: artist.id,
                  name: artist.name || "Unknown Artist",
                  image: artist.images?.[0]?.url || fallbackArtists[0].image,
                  followers: artist.followers?.total || 0,
                  genres: artist.genres || [],
                })) || [];

            if (artistCards.length > 0) {
              setOriginalArtists(artistCards);
              setArtists(artistCards);
            }
          }
        })
        .catch(() => {
          // Keep fallback data
        });
    } catch (error) {
      console.error("Error loading initial data:", error);
      // Fallback data is already set
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadInitialData();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(query)}&type=album,artist,playlist&limit=20`,
      );

      if (response.ok) {
        const searchResults = await response.json();

        // Update albums
        if (searchResults.albums) {
          const albumCards: AlbumCard[] = searchResults.albums.items
            .filter((album: any) => album && album.id)
            .map((album: any) => ({
              id: album.id,
              title: album.name || "Unknown Album",
              artist: album.artists?.[0]?.name || "Unknown Artist",
              cover: album.images?.[0]?.url || "/placeholder.svg",
              releaseDate: album.release_date || "",
              totalTracks: album.total_tracks || 0,
            }));
          setOriginalAlbums(albumCards);
          setAlbums(albumCards);
        }

        // Update artists
        if (searchResults.artists) {
          const artistCards: ArtistCard[] = searchResults.artists.items
            .filter((artist: any) => artist && artist.id)
            .map((artist: any) => ({
              id: artist.id,
              name: artist.name || "Unknown Artist",
              image: artist.images?.[0]?.url || "/placeholder.svg",
              followers: artist.followers?.total || 0,
              genres: artist.genres || [],
            }));
          setOriginalArtists(artistCards);
          setArtists(artistCards);
        }

        // Update playlists
        if (searchResults.playlists) {
          const playlistCards: PlaylistCard[] = searchResults.playlists.items
            .filter((playlist: any) => playlist && playlist.id)
            .map((playlist: any) => ({
              id: playlist.id,
              title: playlist.name || "Unknown Playlist",
              description: playlist.description || "No description",
              cover: playlist.images?.[0]?.url || "/placeholder.svg",
              owner: playlist.owner?.display_name || "Unknown",
              totalTracks: playlist.tracks?.total || 0,
            }));
          setOriginalPlaylists(playlistCards);
          setPlaylists(playlistCards);
        }
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 sm:pb-18 md:pb-20 lg:pb-0 xl:pb-0">
      {/* Container for responsive layout */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Link to="/">
              <ArrowLeft
                size={20}
                className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-foreground hover:text-muted-foreground transition-colors"
              />
            </Link>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              Search
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <ThemeToggle />
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10">
          <div className="relative max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto lg:mx-0 mb-4">
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              placeholder="Search for albums, artists, playlists..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const debounceTimer = setTimeout(() => {
                  handleSearch(e.target.value);
                }, 500);
                return () => clearTimeout(debounceTimer);
              }}
              className="pl-10 pr-4 bg-muted border-0 rounded-lg h-12 text-foreground placeholder:text-muted-foreground text-base focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto lg:mx-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
            >
              <Filter size={16} />
              Filters
            </button>

            {searchQuery && (
              <span className="text-sm text-muted-foreground">
                {albums.length + artists.length + playlists.length} results
              </span>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto lg:mx-0 mt-4 p-4 bg-muted/50 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 rounded border border-border bg-background text-foreground"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="views">Most Popular</option>
                    <option value="alphabetical">A-Z</option>
                  </select>
                </div>

                {/* Views/Popularity Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Popularity
                  </label>
                  <select
                    value={filterViews}
                    onChange={(e) => setFilterViews(e.target.value)}
                    className="w-full p-2 rounded border border-border bg-background text-foreground"
                  >
                    <option value="">All</option>
                    <option value="viral">Viral (10M+ plays)</option>
                    <option value="popular">Popular (1M+ plays)</option>
                    <option value="trending">Trending (100K+ plays)</option>
                    <option value="emerging">Emerging (10K+ plays)</option>
                  </select>
                </div>
              </div>

              {/* Quick Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSortBy("newest");
                    setFilterViews("");
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Calendar size={12} />
                  Latest 2024
                </button>
                <button
                  onClick={() => {
                    setSortBy("views");
                    setFilterViews("viral");
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <TrendingUp size={12} />
                  Viral Hits
                </button>
                <button
                  onClick={() => {
                    setSortBy("oldest");
                    setFilterViews("");
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  <Clock size={12} />
                  Classics
                </button>
                <button
                  onClick={() => {
                    setSortBy("relevance");
                    setFilterViews("");
                  }}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="px-4 lg:px-8">
          <Tabs defaultValue="albums" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-auto p-0 mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0">
              <TabsTrigger
                value="albums"
                className="text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none pb-2 lg:pb-3 text-sm lg:text-base"
              >
                Albums
              </TabsTrigger>
              <TabsTrigger
                value="artists"
                className="text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none pb-2 lg:pb-3 text-sm lg:text-base"
              >
                Artists
              </TabsTrigger>
              <TabsTrigger
                value="playlists"
                className="text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none pb-2 lg:pb-3 text-sm lg:text-base"
              >
                Playlists
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none pb-2 lg:pb-3 text-sm lg:text-base"
              >
                Genres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="albums" className="mt-0">
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                  {searchQuery ? "Search Results" : "New Releases"}
                </h2>
                {loading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="space-y-3 animate-pulse">
                        <div className="aspect-square rounded-xl bg-muted"></div>
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
                    {albums.map((album) => (
                      <Link
                        key={album.id}
                        to={`/album/${album.id}`}
                        className="space-y-3 hover:opacity-80 transition-opacity group"
                      >
                        <div className="aspect-square rounded-xl lg:rounded-2xl overflow-hidden">
                          <img
                            src={album.cover}
                            alt={album.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground truncate text-sm lg:text-base">
                            {album.title}
                          </h3>
                          <p className="text-sm lg:text-base text-muted-foreground truncate">
                            {album.artist}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="artists" className="mt-0">
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                  {searchQuery ? "Artists" : "Popular Artists"}
                </h2>
                {loading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="space-y-3 animate-pulse">
                        <div className="aspect-square rounded-full bg-muted"></div>
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
                    {artists.map((artist) => (
                      <Link
                        key={artist.id}
                        to={`/artist/${artist.id}`}
                        className="space-y-3 hover:opacity-80 transition-opacity group text-center"
                      >
                        <div className="aspect-square rounded-full overflow-hidden">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground truncate text-sm lg:text-base">
                            {artist.name}
                          </h3>
                          {artist.followers && (
                            <p className="text-sm text-muted-foreground">
                              {(artist.followers / 1000000).toFixed(1)}M
                              followers
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="playlists" className="mt-0">
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                  {searchQuery ? "Playlists" : "Featured Playlists"}
                </h2>
                {loading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="space-y-3 animate-pulse">
                        <div className="aspect-square rounded-xl bg-muted"></div>
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                    {playlists.map((playlist) => (
                      <Link
                        key={playlist.id}
                        to={`/playlist/${playlist.id}`}
                        className="space-y-3 hover:opacity-80 transition-opacity group"
                      >
                        <div className="aspect-square rounded-xl lg:rounded-2xl overflow-hidden">
                          <img
                            src={playlist.cover}
                            alt={playlist.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground truncate text-sm lg:text-base">
                            {playlist.title}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {playlist.totalTracks} tracks
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="mt-0">
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                  Browse by Genre
                </h2>
                {loading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="space-y-3 animate-pulse">
                        <div className="aspect-square rounded-xl bg-muted"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="space-y-3 hover:opacity-80 transition-opacity group"
                      >
                        <div className="aspect-square rounded-xl lg:rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground truncate text-sm lg:text-base text-center">
                            {category.name}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
