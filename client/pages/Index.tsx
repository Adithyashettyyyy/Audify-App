import { ArrowLeft, Download, Shuffle, Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AlbumCard } from "@shared/spotify";

export default function Index() {
  const [featuredAlbum, setFeaturedAlbum] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<AlbumCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      setLoading(true);

      // Load a featured album (let's use the first new release)
      const newReleasesResponse = await fetch(
        "/api/spotify/new-releases?limit=1",
      );
      if (newReleasesResponse.ok) {
        const newReleases = await newReleasesResponse.json();
        if (newReleases.albums.items.length > 0) {
          const albumId = newReleases.albums.items[0].id;

          // Get full album details with tracks
          const albumResponse = await fetch(`/api/spotify/albums/${albumId}`);
          if (albumResponse.ok) {
            const albumData = await albumResponse.json();
            setFeaturedAlbum(albumData);
            setTracks(albumData.tracks.items);
          }
        }
      }

      // Load recommendations
      const recommendationsResponse = await fetch(
        "/api/spotify/new-releases?limit=6&offset=1",
      );
      if (recommendationsResponse.ok) {
        const recommendationsData = await recommendationsResponse.json();
        const albumCards: AlbumCard[] = recommendationsData.albums.items.map(
          (album: any) => ({
            id: album.id,
            title: album.name,
            artist: album.artists[0]?.name || "Unknown Artist",
            cover: album.images[0]?.url || "/placeholder.svg",
            releaseDate: album.release_date,
            totalTracks: album.total_tracks,
          }),
        );
        setRecommendations(albumCards);
      }
    } catch (error) {
      console.error("Error loading featured content:", error);
      // Fallback to static content if Spotify API fails
      setFeaturedAlbum({
        name: "Echoes of the Past",
        artists: [{ name: "The Wandering Souls" }],
        release_date: "2023-01-01",
        album_type: "album",
        total_tracks: 6,
        images: [{ url: "" }],
      });
      setTracks([
        {
          name: "Whispers in the Wind",
          artists: [{ name: "The Wandering Souls" }],
        },
        { name: "City Lights", artists: [{ name: "The Wandering Souls" }] },
        {
          name: "Midnight Serenade",
          artists: [{ name: "The Wandering Souls" }],
        },
        {
          name: "Lost in the Crowd",
          artists: [{ name: "The Wandering Souls" }],
        },
        {
          name: "Echoes of the Past",
          artists: [{ name: "The Wandering Souls" }],
        },
        { name: "Silent Streets", artists: [{ name: "The Wandering Souls" }] },
      ]);
      setRecommendations([
        {
          id: "1",
          title: "Road Less Traveled",
          artist: "Various Artists",
          cover:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=center",
        },
        {
          id: "2",
          title: "Urban Dreams",
          artist: "Various Artists",
          cover:
            "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=200&h=200&fit=crop&crop=center",
        },
        {
          id: "3",
          title: "Hidden Paths",
          artist: "Various Artists",
          cover:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop&crop=center",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-5 lg:gap-12 lg:px-8">
          <div className="lg:col-span-2 px-4 lg:px-0 text-center lg:text-left">
            <div className="animate-pulse">
              <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-full lg:aspect-square mx-auto lg:mx-0 mb-6 lg:mb-8 bg-muted rounded-3xl"></div>
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-6 bg-muted rounded mb-2 w-3/4 mx-auto lg:mx-0"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto lg:mx-0"></div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:p-8 max-w-6xl mx-auto">
        <Link to="/search">
          <ArrowLeft
            size={24}
            className="text-foreground hover:text-muted-foreground transition-colors"
          />
        </Link>
        <ThemeToggle />
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-5 lg:gap-12 lg:px-8">
        {/* Left Side - Album Info (Mobile: Full width, Desktop: 2 columns) */}
        <div className="lg:col-span-2 px-4 lg:px-0 text-center lg:text-left">
          {/* Album Cover - Responsive sizing */}
          <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-full lg:h-auto lg:aspect-square mx-auto lg:mx-0 mb-6 lg:mb-8 rounded-3xl overflow-hidden bg-gradient-to-b from-stone-100 to-stone-200 relative">
            {/* Background landscape */}
            <div className="absolute inset-0">
              {/* Sky/background */}
              <div className="w-full h-full bg-gradient-to-b from-stone-100 to-stone-200"></div>

              {/* Mountain/hill silhouette */}
              <svg
                className="absolute bottom-0 w-full h-2/3"
                viewBox="0 0 224 150"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,150 L0,100 C40,85 80,95 120,80 C160,65 200,75 224,70 L224,150 Z"
                  fill="#7FB069"
                  opacity="0.8"
                />
              </svg>

              {/* Tree silhouettes */}
              <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
                {/* Pine trees with proper proportions */}
                <svg
                  width="20"
                  height="40"
                  viewBox="0 0 20 40"
                  className="text-green-900 w-4 h-8 lg:w-6 lg:h-12"
                >
                  <polygon points="10,0 5,15 15,15" fill="currentColor" />
                  <polygon points="10,8 4,20 16,20" fill="currentColor" />
                  <polygon points="10,16 3,28 17,28" fill="currentColor" />
                  <rect x="9" y="28" width="2" height="12" fill="#8B4513" />
                </svg>

                <svg
                  width="16"
                  height="35"
                  viewBox="0 0 16 35"
                  className="text-green-900 w-3 h-7 lg:w-5 lg:h-10"
                >
                  <polygon points="8,0 4,12 12,12" fill="currentColor" />
                  <polygon points="8,6 3,18 13,18" fill="currentColor" />
                  <polygon points="8,14 2,25 14,25" fill="currentColor" />
                  <rect x="7" y="25" width="2" height="10" fill="#8B4513" />
                </svg>

                <svg
                  width="24"
                  height="45"
                  viewBox="0 0 24 45"
                  className="text-green-900 w-5 h-10 lg:w-8 lg:h-14"
                >
                  <polygon points="12,0 6,18 18,18" fill="currentColor" />
                  <polygon points="12,10 4,25 20,25" fill="currentColor" />
                  <polygon points="12,20 3,35 21,35" fill="currentColor" />
                  <rect x="11" y="35" width="2" height="10" fill="#8B4513" />
                </svg>

                <svg
                  width="18"
                  height="38"
                  viewBox="0 0 18 38"
                  className="text-green-900 w-4 h-8 lg:w-6 lg:h-11"
                >
                  <polygon points="9,0 4,14 14,14" fill="currentColor" />
                  <polygon points="9,7 3,20 15,20" fill="currentColor" />
                  <polygon points="9,15 2,28 16,28" fill="currentColor" />
                  <rect x="8" y="28" width="2" height="10" fill="#8B4513" />
                </svg>
              </div>

              {/* Album title on cover */}
              <div className="absolute top-3 lg:top-4 left-3 lg:left-4 text-xs lg:text-sm text-gray-600 font-light tracking-wide">
                ECHOES OF THE PAST
              </div>
            </div>
          </div>

          {/* Album Info */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
            {featuredAlbum?.name || "Echoes of the Past"}
          </h1>
          <p className="text-muted-foreground mb-2 text-lg lg:text-xl">
            {featuredAlbum?.artists[0]?.name || "The Wandering Souls"}
          </p>
          <p className="text-muted-foreground text-sm lg:text-base mb-6 lg:mb-8">
            {featuredAlbum?.album_type?.charAt(0).toUpperCase() +
              featuredAlbum?.album_type?.slice(1) || "Album"}{" "}
            •{" "}
            {featuredAlbum?.release_date
              ? formatReleaseDate(featuredAlbum.release_date)
              : "2023"}{" "}
            • {featuredAlbum?.total_tracks || 6} tracks
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-center lg:justify-start gap-6 lg:gap-8 mb-8 lg:mb-12">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted w-10 h-10 lg:w-12 lg:h-12"
            >
              <Download size={20} className="lg:w-6 lg:h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted w-10 h-10 lg:w-12 lg:h-12"
            >
              <Shuffle size={20} className="lg:w-6 lg:h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted w-10 h-10 lg:w-12 lg:h-12"
            >
              <Heart size={20} className="lg:w-6 lg:h-6" />
            </Button>
            <Button
              size="icon"
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary hover:bg-primary/90"
            >
              <Play
                size={24}
                className="fill-current text-primary-foreground ml-1 lg:w-8 lg:h-8"
              />
            </Button>
          </div>
        </div>

        {/* Right Side - Track List and Info (Mobile: Full width, Desktop: 3 columns) */}
        <div className="lg:col-span-3">
          {/* Track List */}
          <div className="px-4 lg:px-0 space-y-4 lg:space-y-6 mb-8 lg:mb-12">
            <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 lg:hidden">
              Tracks
            </h2>
            {tracks.map((track, index) => (
              <div
                key={track.id || index}
                className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-8 lg:w-10 text-muted-foreground text-sm lg:text-base">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground font-medium text-base lg:text-lg">
                    {track.name || track.title}
                  </h3>
                  <p className="text-muted-foreground text-sm lg:text-base">
                    {track.artists?.[0]?.name || track.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="px-4 lg:px-0 mb-8 lg:mb-12">
            <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
              About the Album
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
              Echoes of the Past is a journey through the band's evolution,
              blending their signature indie sound with introspective lyrics
              about love, loss, and self-discovery.
            </p>
          </div>

          {/* Recommendations */}
          <div className="px-4 lg:px-0">
            <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
              You might also like
            </h2>
            <div className="flex lg:grid lg:grid-cols-3 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {recommendations.map((album) => (
                <Link
                  key={album.id}
                  to={`/album/${album.id}`}
                  className="flex-shrink-0 lg:flex-shrink w-32 lg:w-full hover:opacity-80 transition-opacity"
                >
                  <div className="w-32 h-32 lg:w-full lg:aspect-square rounded-2xl overflow-hidden mb-3">
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm lg:text-base font-medium truncate">
                    {album.title}
                  </p>
                  <p className="text-xs lg:text-sm text-muted-foreground truncate">
                    {album.artist}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
