import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  track?: {
    id: string;
    name: string;
    artist: string;
    previewUrl?: string | null;
    spotifyUrl?: string;
    albumCover?: string;
    duration?: number;
  };
  autoPlay?: boolean;
  onTrackEnd?: () => void;
  className?: string;
}

export default function AudioPlayer({
  track,
  autoPlay = false,
  onTrackEnd,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onTrackEnd?.();
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [onTrackEnd]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (autoPlay && track?.previewUrl && audioRef.current) {
      playAudio();
    }
  }, [track?.previewUrl, autoPlay]);

  const playAudio = async () => {
    if (!audioRef.current || !track?.previewUrl) return;

    try {
      setIsLoading(true);
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const openInSpotify = () => {
    if (track?.spotifyUrl) {
      window.open(track.spotifyUrl, "_blank");
    } else if (track?.id) {
      // Fallback to Spotify track URL
      window.open(`https://open.spotify.com/track/${track.id}`, "_blank");
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!track) return null;

  const hasPreview = Boolean(track.previewUrl);
  const demoAudioUrl =
    "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3";
  const audioUrl = track.previewUrl || demoAudioUrl;

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-4 space-y-4 shadow-lg",
        className,
      )}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Track Info */}
      <div className="flex items-center gap-3">
        {track.albumCover && (
          <img
            src={track.albumCover}
            alt={track.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate text-sm">{track.name}</h3>
          <p className="text-muted-foreground text-xs truncate">
            {track.artist}
          </p>
        </div>

        {/* Open in Spotify Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={openInSpotify}
          className="flex-shrink-0"
        >
          <ExternalLink size={14} className="mr-1" />
          <span className="hidden sm:inline">Spotify</span>
        </Button>
      </div>

      {/* Audio Player Controls - Always Available */}
      <>
        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" className="w-8 h-8" disabled>
            <SkipBack size={14} />
          </Button>

          <Button
            onClick={handlePlayPause}
            disabled={isLoading}
            className="w-12 h-12 rounded-full"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={16} className="fill-current" />
            ) : (
              <Play size={16} className="fill-current ml-0.5" />
            )}
          </Button>

          <Button variant="outline" size="icon" className="w-8 h-8" disabled>
            <SkipForward size={14} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span className="bg-primary/10 px-2 py-1 rounded text-xs">
              {hasPreview ? "30s Preview" : "Demo Audio"}
            </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="w-8 h-8"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={14} />
            ) : (
              <Volume2 size={14} />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="flex-1 max-w-24"
          />
        </div>
      </>

      {/* Spotify Link for Full Track */}
      {!hasPreview && (
        <div className="text-center pt-2">
          <Button
            onClick={openInSpotify}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <ExternalLink size={14} className="mr-2" />
            Listen Full Track on Spotify
          </Button>
        </div>
      )}
    </div>
  );
}
