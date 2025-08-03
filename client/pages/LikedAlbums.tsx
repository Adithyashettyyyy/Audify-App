import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Music,
  Play,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { useLikedSongs } from "@/contexts/LikedSongsContext";

export default function LikedAlbums() {
  const { likedAlbums, toggleLike, isLiked } = useLikedSongs();

  const formatDateAdded = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-8">
          <div className="flex items-center gap-4">
            <Link to="/library">
              <ArrowLeft
                size={24}
                className="text-foreground hover:text-muted-foreground transition-colors"
              />
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold">Liked Albums</h1>
          </div>
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <ThemeToggle />
          </div>
        </div>

        {likedAlbums.length === 0 ? (
          // Empty State
          <div className="px-4 lg:px-8 py-12 lg:py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Music size={32} className="text-white" />
              </div>

              <h2 className="text-xl lg:text-2xl font-semibold mb-4">
                Albums you like will appear here
              </h2>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Save albums by tapping the heart icon.
              </p>

              <Link to="/search">
                <Button className="gap-2">
                  <Music size={16} />
                  Discover new albums
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Liked Albums Content
          <div className="px-4 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl">
                <Music size={80} className="text-white" />
              </div>

              <div className="flex flex-col justify-end text-center md:text-left">
                <p className="text-sm font-medium mb-2">Collection</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Liked Albums
                </h1>
                <div className="text-sm text-muted-foreground">
                  <span>{likedAlbums.length} albums</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-black"
              >
                <Play size={20} className="fill-current ml-1" />
              </Button>

              <Button variant="ghost" size="icon" className="w-10 h-10">
                <MoreHorizontal size={20} />
              </Button>
            </div>

            {/* Albums Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
              {likedAlbums.map((album) => (
                <div key={album.id} className="group space-y-3">
                  <div className="aspect-square rounded-lg overflow-hidden relative">
                    <Link to={`/album/${album.id}`}>
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play size={16} className="fill-current ml-0.5 text-black" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-red-500"
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
                      <Heart size={14} className="fill-current" />
                    </Button>
                  </div>
                  <Link to={`/album/${album.id}`}>
                    <div>
                      <h3 className="font-medium truncate text-sm">{album.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {album.artist}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Added {formatDateAdded(album.likedAt)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
