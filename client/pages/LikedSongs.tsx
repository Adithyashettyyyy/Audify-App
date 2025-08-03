import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Heart,
  ArrowLeft,
  Music,
  Shuffle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { useNowPlaying } from "@/components/NowPlaying";
import { useLikedSongs } from "@/contexts/LikedSongsContext";

export default function LikedSongs() {
  const { playTrack } = useNowPlaying();
  const { likedSongs, toggleLike, isLiked } = useLikedSongs();

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  };

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

  const totalDuration = likedSongs.reduce(
    (total, track) => total + (track.duration || 0),
    0,
  );

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      playTrack(likedSongs[0]);
    }
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
            <h1 className="text-2xl lg:text-3xl font-bold">Liked Songs</h1>
          </div>
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <ThemeToggle />
          </div>
          <ThemeToggle />
        </div>

        {likedSongs.length === 0 ? (
          // Empty State
          <div className="px-4 lg:px-8 py-12 lg:py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Heart size={32} className="text-white fill-current" />
              </div>

              <h2 className="text-xl lg:text-2xl font-semibold mb-4">
                Songs you like will appear here
              </h2>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Save songs by tapping the heart icon.
              </p>

              <Link to="/search">
                <Button className="gap-2">
                  <Music size={16} />
                  Find something you like
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Liked Songs Content
          <div className="px-4 lg:px-8">
            {/* Playlist Header */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="w-48 h-48 md:w-56 md:h-56 mx-auto md:mx-0 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-2xl">
                <Heart size={80} className="text-white fill-current" />
              </div>

              <div className="flex flex-col justify-end text-center md:text-left">
                <p className="text-sm font-medium mb-2">Playlist</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Liked Songs
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-muted-foreground">
                  <span>{likedSongs.length} songs</span>
                  <span className="hidden md:inline">•</span>
                  <span>
                    {Math.floor(totalDuration / 60000)} min{" "}
                    {Math.floor((totalDuration % 60000) / 1000)} sec
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-black"
                onClick={handlePlayAll}
              >
                <Play size={20} className="fill-current ml-1" />
              </Button>

              <Button variant="ghost" size="icon" className="w-10 h-10">
                <Shuffle size={20} />
              </Button>

              <Button variant="ghost" size="icon" className="w-10 h-10">
                <MoreHorizontal size={20} />
              </Button>
            </div>

            {/* Track List */}
            <div className="space-y-1">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Title</div>
                <div className="col-span-3 hidden md:block">Date added</div>
                <div className="col-span-2 text-right">Duration</div>
              </div>

              {/* Tracks */}
              {likedSongs.map((track, index) => (
                <div
                  key={track.id}
                  className="group grid grid-cols-12 gap-4 px-4 py-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => playTrack(track)}
                >
                  <div className="col-span-1 flex items-center">
                    <span className="group-hover:hidden text-muted-foreground">
                      {index + 1}
                    </span>
                    <Play
                      size={16}
                      className="hidden group-hover:block fill-current"
                    />
                  </div>

                  <div className="col-span-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded overflow-hidden">
                      <img
                        src={track.albumCover || "/placeholder.svg"}
                        alt={track.album}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{track.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 hidden md:flex items-center text-sm text-muted-foreground">
                    {formatDateAdded(track.likedAt)}
                  </div>

                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 w-8 h-8 text-green-500"
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
                        });
                      }}
                    >
                      <Heart size={14} className="fill-current" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {formatDuration(track.duration || 0)}
                    </span>
                  </div>
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
