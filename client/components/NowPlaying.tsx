import React, { createContext, useContext, useState, ReactNode } from "react";
import AudioPlayer from "./AudioPlayer";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Track {
  id: string;
  name: string;
  artist: string;
  previewUrl?: string | null;
  spotifyUrl?: string;
  albumCover?: string;
  duration?: number;
}

interface NowPlayingContextType {
  currentTrack: Track | null;
  playTrack: (track: Track) => void;
  clearTrack: () => void;
  isPlayerVisible: boolean;
}

const NowPlayingContext = createContext<NowPlayingContextType | undefined>(
  undefined,
);

export function NowPlayingProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlayerVisible(true);
  };

  const clearTrack = () => {
    setCurrentTrack(null);
    setIsPlayerVisible(false);
  };

  return (
    <NowPlayingContext.Provider
      value={{ currentTrack, playTrack, clearTrack, isPlayerVisible }}
    >
      {children}
      {/* Fixed Bottom Player */}
      {isPlayerVisible && currentTrack && (
        <div className="fixed bottom-16 left-0 right-0 lg:bottom-4 lg:left-4 lg:right-4 lg:max-w-md lg:mx-auto z-40 p-3 lg:p-0">
          <div className="relative">
            <AudioPlayer
              track={currentTrack}
              autoPlay
              onTrackEnd={clearTrack}
              className="shadow-2xl bg-card/95 backdrop-blur-md border-2"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={clearTrack}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border shadow-md hover:bg-muted"
            >
              <X size={12} />
            </Button>
          </div>
        </div>
      )}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext);
  if (context === undefined) {
    throw new Error("useNowPlaying must be used within a NowPlayingProvider");
  }
  return context;
}
