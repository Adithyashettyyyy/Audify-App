import { ArrowLeft, Download, Shuffle, Heart, Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TrackCard } from "@shared/spotify";
import { useNowPlaying } from "@/components/NowPlaying";
import { useLikedSongs } from "@/contexts/LikedSongsContext";

export default function Playlist() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { playTrack } = useNowPlaying();
  const { toggleLike, isLiked } = useLikedSongs();
  const [playlist, setPlaylist] = useState<any>(null);
  const [tracks, setTracks] = useState<TrackCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playlistId) {
      loadPlaylistData();
    }
  }, [playlistId]);

  const loadPlaylistData = async () => {
    setLoading(true);

    try {
      // Load playlist details
      const playlistResponse = await fetch(
        `/api/spotify/playlists/${playlistId}`,
      );
      if (playlistResponse.ok) {
        const playlistData = await playlistResponse.json();
        console.log("✅ Loaded real playlist data:", playlistData.name);
        setPlaylist(playlistData);

        // Convert tracks with better error handling
        const trackCards: TrackCard[] =
          playlistData.tracks?.items
            ?.filter((item: any) => item?.track && item.track.id)
            ?.map((item: any) => ({
              id: item.track.id,
              name: item.track.name || "Unknown Track",
              title: item.track.name || "Unknown Track",
              artist: item.track.artists?.[0]?.name || "Unknown Artist",
              album: item.track.album?.name || "Unknown Album",
              duration: item.track.duration_ms || 0,
              previewUrl: item.track.preview_url || "",
              albumCover:
                item.track.album?.images?.[0]?.url || "/placeholder.svg",
              spotifyUrl: `https://open.spotify.com/track/${item.track.id}`,
            })) || [];

        setTracks(trackCards);
        console.log("✅ Loaded tracks:", trackCards.length);
      } else {
        console.log(
          "⚠️ Playlist API failed with status:",
          playlistResponse.status,
        );
        setPlaylist(null);
      }
    } catch (error) {
      console.error("❌ Error loading playlist data:", error);
      setPlaylist(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between p-4 lg:p-8">
            <Link to="/">
              <ArrowLeft size={24} className="text-foreground" />
            </Link>
            <ThemeToggle />
          </div>
          <div className="animate-pulse px-4 lg:px-8">
            <div className="lg:grid lg:grid-cols-5 lg:gap-12">
              <div className="lg:col-span-2 text-center lg:text-left">
                <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-full lg:aspect-square mx-auto lg:mx-0 mb-6 bg-muted rounded-3xl"></div>
                <div className="h-8 bg-muted rounded mb-2"></div>
                <div className="h-6 bg-muted rounded mb-2 w-3/4 mx-auto lg:mx-0"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto lg:mx-0"></div>
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Playlist not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Dashboard
          </Link>
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
          <Link to="/">
            <ArrowLeft
              size={24}
              className="text-foreground hover:text-muted-foreground transition-colors"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 lg:px-8">
          {/* Left Side - Playlist Info */}
          <div className="lg:col-span-2 px-4 lg:px-0 text-center lg:text-left">
            {/* Playlist Cover */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 lg:w-full lg:aspect-square mx-auto lg:mx-0 mb-6 lg:mb-8 rounded-3xl overflow-hidden">
              <img
                src={playlist.images[0]?.url || "/placeholder.svg"}
                alt={playlist.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Playlist Info */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
              {playlist.name}
            </h1>
            <p className="text-muted-foreground mb-2 text-lg lg:text-xl">
              by {playlist.owner.display_name}
            </p>
            <p className="text-muted-foreground text-sm lg:text-base mb-6 lg:mb-8">
              {playlist.tracks.total} tracks
              {playlist.followers && ` • ${playlist.followers.total} likes`}
            </p>

            {playlist.description && (
              <p className="text-muted-foreground text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed">
                {playlist.description}
              </p>
            )}

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
                onClick={() => {
                  if (tracks.length > 0) {
                    playTrack(tracks[0]);
                  }
                }}
              >
                <Play
                  size={24}
                  className="fill-current text-primary-foreground ml-1 lg:w-8 lg:h-8"
                />
              </Button>
            </div>
          </div>

          {/* Right Side - Track List */}
          <div className="lg:col-span-3">
            {/* Track List Header */}
            <div className="px-4 lg:px-0 mb-4 lg:mb-6">
              <div className="flex items-center text-muted-foreground text-sm lg:text-base font-medium border-b border-border pb-2">
                <div className="w-8 lg:w-10">#</div>
                <div className="flex-1">Title</div>
                <div className="w-16 flex justify-center">
                  <Clock size={16} className="lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>

            {/* Track List */}
            <div className="px-4 lg:px-0 space-y-1 lg:space-y-2">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors cursor-pointer group"
                  onClick={() => playTrack(track)}
                >
                  <div className="w-8 lg:w-10 text-muted-foreground text-sm lg:text-base flex items-center justify-center">
                    <span className="group-hover:hidden">{index + 1}</span>
                    <Play
                      size={16}
                      className="hidden group-hover:block lg:w-5 lg:h-5 fill-current"
                    />
                  </div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded overflow-hidden">
                    <img
                      src={track.albumCover || "/placeholder.svg"}
                      alt={track.album}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-medium text-sm lg:text-base truncate">
                      {track.title}
                    </h3>
                    <p className="text-muted-foreground text-xs lg:text-sm truncate">
                      {track.artist} • {track.album}
                    </p>
                  </div>
                  <div className="w-8 flex justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`w-8 h-8 ${
                        isLiked(track.id, "track")
                          ? "text-red-500"
                          : "text-muted-foreground hover:text-foreground"
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
                        size={14}
                        className={
                          isLiked(track.id, "track") ? "fill-current" : ""
                        }
                      />
                    </Button>
                  </div>
                  <div className="w-16 text-muted-foreground text-xs lg:text-sm text-center">
                    {formatDuration(track.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
