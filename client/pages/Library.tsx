import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { Music, Heart, Download, Clock, ArrowLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLikedSongs } from "@/contexts/LikedSongsContext";

export default function Library() {
  const { getLikedSongsCount, getLikedAlbumsCount, getLikedArtistsCount } = useLikedSongs();
  return (
    <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      {/* Container for responsive layout */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <ArrowLeft
                size={24}
                className="text-foreground hover:text-muted-foreground transition-colors"
              />
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold">Your Library</h1>
          </div>
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <ThemeToggle />
          </div>
        </div>

        {/* Empty State */}
        <div className="px-4 lg:px-8 py-12 lg:py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Music size={32} className="text-muted-foreground" />
            </div>

            <h2 className="text-xl lg:text-2xl font-semibold mb-4">
              Your music collection
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Save your favorite songs, albums, and playlists here. Start
              exploring music to build your personal library.
            </p>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link
                to="/liked-songs"
                className="p-4 border border-border rounded-xl text-center hover:bg-muted/50 transition-colors cursor-pointer block"
              >
                <Heart
                  size={20}
                  className={`mx-auto mb-2 ${
                    getLikedSongsCount() > 0
                      ? "text-red-500 fill-current"
                      : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm font-medium">Liked Songs</span>
                <p className="text-xs text-muted-foreground mt-1">
                  {getLikedSongsCount()} songs
                </p>
              </Link>

              <Link
                to="/liked-albums"
                className="p-4 border border-border rounded-xl text-center hover:bg-muted/50 transition-colors cursor-pointer block"
              >
                <Music
                  size={20}
                  className={`mx-auto mb-2 ${
                    getLikedAlbumsCount() > 0
                      ? "text-blue-500"
                      : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm font-medium">Liked Albums</span>
                <p className="text-xs text-muted-foreground mt-1">
                  {getLikedAlbumsCount()} albums
                </p>
              </Link>

              <Link
                to="/liked-artists"
                className="p-4 border border-border rounded-xl text-center hover:bg-muted/50 transition-colors cursor-pointer block"
              >
                <Users
                  size={20}
                  className={`mx-auto mb-2 ${
                    getLikedArtistsCount() > 0
                      ? "text-green-500"
                      : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm font-medium">Liked Artists</span>
                <p className="text-xs text-muted-foreground mt-1">
                  {getLikedArtistsCount()} artists
                </p>
              </Link>

              <div className="p-4 border border-border rounded-xl text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Download
                  size={20}
                  className="mx-auto mb-2 text-muted-foreground"
                />
                <span className="text-sm font-medium">Downloads</span>
                <p className="text-xs text-muted-foreground mt-1">0 items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
