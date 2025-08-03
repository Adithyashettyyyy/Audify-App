import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlaylistCard } from "@shared/spotify";
import { useNowPlaying } from "@/components/NowPlaying";

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { playTrack } = useNowPlaying();
  const [category, setCategory] = useState<any>(null);
  const [playlists, setPlaylists] = useState<PlaylistCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      loadCategoryData();
    }
  }, [categoryId]);

  const loadCategoryData = async () => {
    setLoading(true);

    // Fallback category data
    const fallbackCategory = {
      id: categoryId,
      name: getCategoryName(categoryId || ""),
      icons: [
        {
          url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        },
      ],
    };

    const fallbackPlaylists: PlaylistCard[] = [
      {
        id: "1",
        title: "Pop Hits 2024",
        description: "The biggest pop songs right now",
        cover:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 50,
      },
      {
        id: "2",
        title: "Indie Pop Mix",
        description: "Fresh indie pop discoveries",
        cover:
          "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 35,
      },
      {
        id: "3",
        title: "Chill Pop Vibes",
        description: "Relaxed pop for any mood",
        cover:
          "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 42,
      },
      {
        id: "4",
        title: "Dance Pop Energy",
        description: "High-energy dance pop tracks",
        cover:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
        owner: "Spotify",
        totalTracks: 28,
      },
    ];

    try {
      // Try to load category details
      const categoryResponse = await fetch(
        `/api/spotify/categories/${categoryId}`,
      );
      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);
      } else {
        setCategory(fallbackCategory);
      }

      // Try to load category playlists
      const playlistsResponse = await fetch(
        `/api/spotify/categories/${categoryId}/playlists`,
      );
      if (playlistsResponse.ok) {
        const playlistsData = await playlistsResponse.json();
        const playlistCards: PlaylistCard[] = playlistsData.playlists.items.map(
          (playlist: any) => ({
            id: playlist.id,
            title: playlist.name,
            description: playlist.description,
            cover: playlist.images[0]?.url || "/placeholder.svg",
            owner: playlist.owner.display_name,
            totalTracks: playlist.tracks.total,
          }),
        );
        setPlaylists(playlistCards);
      } else {
        setPlaylists(fallbackPlaylists);
      }
    } catch (error) {
      console.error("Error loading category data:", error);
      setCategory(fallbackCategory);
      setPlaylists(fallbackPlaylists);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (id: string) => {
    const categoryNames: { [key: string]: string } = {
      "0JQ5DAqbMKFEC4WFtoNRpw": "Pop",
      "0JQ5DAqbMKFRY5ok2pxXJ0": "Rock",
      "0JQ5DAqbMKFDXXwE9BDJAr": "Hip-Hop",
      "0JQ5DAqbMKFKLfwjuJMoNC": "Country",
      "0JQ5DAqbMKFAUuhfA1HQH5": "Electronic",
      "0JQ5DAqbMKFEZPnFQSFB1T": "R&B",
    };
    return categoryNames[id] || "Music Genre";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between p-4 lg:p-8">
            <Link to="/search">
              <ArrowLeft size={24} className="text-foreground" />
            </Link>
            <ThemeToggle />
          </div>
          <div className="animate-pulse px-4 lg:px-8">
            <div className="h-8 bg-muted rounded mb-4 w-48"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square bg-muted rounded-xl"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-8">
          <Link to="/search">
            <ArrowLeft
              size={24}
              className="text-foreground hover:text-muted-foreground transition-colors"
            />
          </Link>
          <ThemeToggle />
        </div>

        {/* Category Header */}
        <div className="px-4 lg:px-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            {category?.icons?.[0]?.url && (
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden">
                <img
                  src={category.icons[0].url}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {category?.name || "Music Category"}
              </h1>
              <p className="text-muted-foreground">
                Discover the best {category?.name?.toLowerCase()} music
              </p>
            </div>
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="px-4 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">
            Popular {category?.name} Playlists
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                className="group space-y-3 hover:opacity-80 transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-square rounded-xl overflow-hidden relative">
                  <img
                    src={playlist.cover}
                    alt={playlist.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Play size={16} className="fill-current ml-0.5" />
                  </Button>
                </div>
                <div className="px-1">
                  <h3 className="font-medium truncate text-sm lg:text-base">
                    {playlist.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground truncate">
                    by {playlist.owner} • {playlist.totalTracks} tracks
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
