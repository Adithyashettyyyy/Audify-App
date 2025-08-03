import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Users,
  Shuffle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { useLikedSongs } from "@/contexts/LikedSongsContext";

export default function LikedArtists() {
  const { likedArtists, toggleLike } = useLikedSongs();

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

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(0)}K`;
    }
    return followers.toString();
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
            <h1 className="text-2xl lg:text-3xl font-bold">Liked Artists</h1>
          </div>
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <ThemeToggle />
          </div>
        </div>

        {likedArtists.length === 0 ? (
          // Empty State
          <div className="px-4 lg:px-8 py-12 lg:py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                <Users size={32} className="text-white" />
              </div>

              <h2 className="text-xl lg:text-2xl font-semibold mb-4">
                Artists you like will appear here
              </h2>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Save artists by tapping the heart icon.
              </p>

              <Link to="/search">
                <Button className="gap-2">
                  <Users size={16} />
                  Discover new artists
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Liked Artists Content
          <div className="px-4 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-2xl">
                <Users size={80} className="text-white" />
              </div>

              <div className="flex flex-col justify-end text-center md:text-left">
                <p className="text-sm font-medium mb-2">Collection</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Liked Artists
                </h1>
                <div className="text-sm text-muted-foreground">
                  <span>{likedArtists.length} artists</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-black"
              >
                <Shuffle size={20} />
              </Button>

              <Button variant="ghost" size="icon" className="w-10 h-10">
                <MoreHorizontal size={20} />
              </Button>
            </div>

            {/* Artists Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
              {likedArtists.map((artist) => (
                <div key={artist.id} className="group space-y-3 text-center">
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
                      className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Shuffle size={16} className="text-black" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-red-500"
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
                      <Heart size={14} className="fill-current" />
                    </Button>
                  </div>
                  <Link to={`/artist/${artist.id}`}>
                    <div>
                      <h3 className="font-medium truncate text-sm">{artist.name}</h3>
                      {artist.followers && (
                        <p className="text-xs text-muted-foreground">
                          {formatFollowers(artist.followers)} followers
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Added {formatDateAdded(artist.likedAt)}
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
