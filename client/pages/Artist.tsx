import { ArrowLeft, Play, Shuffle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AlbumCard, TrackCard, ArtistCard } from "@shared/spotify";

export default function Artist() {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<TrackCard[]>([]);
  const [albums, setAlbums] = useState<AlbumCard[]>([]);
  const [relatedArtists, setRelatedArtists] = useState<ArtistCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (artistId) {
      loadArtistData();
    }
  }, [artistId]);

  const loadArtistData = async () => {
    try {
      setLoading(true);

      // Load artist details
      const artistResponse = await fetch(`/api/spotify/artists/${artistId}`);
      if (artistResponse.ok) {
        const artistData = await artistResponse.json();
        setArtist(artistData);
      }

      // Load top tracks
      const topTracksResponse = await fetch(
        `/api/spotify/artists/${artistId}/top-tracks`,
      );
      if (topTracksResponse.ok) {
        const topTracksData = await topTracksResponse.json();
        const trackCards: TrackCard[] = topTracksData.tracks.map(
          (track: any) => ({
            id: track.id,
            name: track.name,
            title: track.name,
            artist: track.artists[0]?.name || "Unknown Artist",
            album: track.album.name,
            duration: track.duration_ms,
            previewUrl: track.preview_url,
            albumCover: track.album.images[0]?.url,
            spotifyUrl: `https://open.spotify.com/track/${track.id}`,
          }),
        );
        setTopTracks(trackCards);
      }

      // Load albums
      const albumsResponse = await fetch(
        `/api/spotify/artists/${artistId}/albums?limit=10`,
      );
      if (albumsResponse.ok) {
        const albumsData = await albumsResponse.json();
        const albumCards: AlbumCard[] = albumsData.items.map((album: any) => ({
          id: album.id,
          title: album.name,
          artist: album.artists[0]?.name || "Unknown Artist",
          cover: album.images[0]?.url || "/placeholder.svg",
          releaseDate: album.release_date,
          totalTracks: album.total_tracks,
        }));
        setAlbums(albumCards);
      }

      // Load related artists
      const relatedResponse = await fetch(
        `/api/spotify/artists/${artistId}/related-artists`,
      );
      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        const artistCards: ArtistCard[] = relatedData.artists
          .slice(0, 6)
          .map((artist: any) => ({
            id: artist.id,
            name: artist.name,
            image: artist.images[0]?.url || "/placeholder.svg",
            followers: artist.followers?.total,
            genres: artist.genres,
          }));
        setRelatedArtists(artistCards);
      }
    } catch (error) {
      console.error("Error loading artist data:", error);
    } finally {
      setLoading(false);
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between p-4 lg:p-8">
            <Link to="/search">
              <ArrowLeft size={24} className="text-foreground" />
            </Link>
            <ThemeToggle />
          </div>
          <div className="animate-pulse px-4 lg:px-8">
            <div className="text-center mb-8">
              <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-6 bg-muted rounded-full"></div>
              <div className="h-8 bg-muted rounded mb-2 w-48 mx-auto"></div>
              <div className="h-6 bg-muted rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist not found</h1>
          <Link to="/search" className="text-primary hover:underline">
            Back to Search
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
          <Link to="/search">
            <ArrowLeft
              size={24}
              className="text-foreground hover:text-muted-foreground transition-colors"
            />
          </Link>
          <ThemeToggle />
        </div>

        {/* Artist Hero Section */}
        <div className="text-center px-4 lg:px-8 mb-8 lg:mb-12">
          <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-6 lg:mb-8 rounded-full overflow-hidden">
            <img
              src={artist.images[0]?.url || "/placeholder.svg"}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-foreground">
            {artist.name}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6 text-muted-foreground">
            <span className="text-lg lg:text-xl">
              {formatFollowers(artist.followers.total)} followers
            </span>
          </div>

          {artist.genres && artist.genres.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {artist.genres.slice(0, 3).map((genre: string) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6 lg:gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted w-12 h-12"
            >
              <Shuffle size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted w-12 h-12"
            >
              <Heart size={24} />
            </Button>
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
            >
              <Play
                size={32}
                className="fill-current text-primary-foreground ml-1"
              />
            </Button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="px-4 lg:px-8 space-y-8 lg:space-y-12">
          {/* Top Tracks */}
          {topTracks.length > 0 && (
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                Popular tracks
              </h2>
              <div className="space-y-2">
                {topTracks.slice(0, 5).map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 hover:bg-muted/50 p-3 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="w-8 text-muted-foreground text-sm flex items-center justify-center">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <Play
                        size={16}
                        className="hidden group-hover:block fill-current"
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
                      <h3 className="text-foreground font-medium truncate">
                        {track.title}
                      </h3>
                      <p className="text-muted-foreground text-sm truncate">
                        {track.album}
                      </p>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {formatDuration(track.duration)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Albums */}
          {albums.length > 0 && (
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">Albums</h2>
              <div className="flex lg:grid lg:grid-cols-5 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                {albums.map((album) => (
                  <Link
                    key={album.id}
                    to={`/album/${album.id}`}
                    className="flex-shrink-0 lg:flex-shrink w-40 lg:w-full hover:opacity-80 transition-opacity"
                  >
                    <div className="w-40 h-40 lg:w-full lg:aspect-square rounded-xl overflow-hidden mb-3">
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-foreground truncate text-sm lg:text-base">
                      {album.title}
                    </h3>
                    <p className="text-muted-foreground text-xs lg:text-sm truncate">
                      {album.releaseDate &&
                        new Date(album.releaseDate).getFullYear()}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Artists */}
          {relatedArtists.length > 0 && (
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                Fans also like
              </h2>
              <div className="flex lg:grid lg:grid-cols-6 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                {relatedArtists.map((relatedArtist) => (
                  <Link
                    key={relatedArtist.id}
                    to={`/artist/${relatedArtist.id}`}
                    className="flex-shrink-0 lg:flex-shrink w-32 lg:w-full hover:opacity-80 transition-opacity text-center"
                  >
                    <div className="w-32 h-32 lg:w-full lg:aspect-square rounded-full overflow-hidden mb-3">
                      <img
                        src={relatedArtist.image}
                        alt={relatedArtist.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-foreground truncate text-sm lg:text-base">
                      {relatedArtist.name}
                    </h3>
                    {relatedArtist.followers && (
                      <p className="text-muted-foreground text-xs lg:text-sm">
                        {formatFollowers(relatedArtist.followers)} followers
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
