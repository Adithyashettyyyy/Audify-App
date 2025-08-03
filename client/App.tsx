import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Library from "./pages/Library";
import LikedSongs from "./pages/LikedSongs";
import LikedAlbums from "./pages/LikedAlbums";
import LikedArtists from "./pages/LikedArtists";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Subscription from "./pages/Subscription";
import HelpFAQs from "./pages/HelpFAQs";
import Profile from "./pages/Profile";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Playlist from "./pages/Playlist";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NowPlayingProvider } from "./components/NowPlaying";
import { LikedSongsProvider } from "./contexts/LikedSongsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LikedSongsProvider>
        <NowPlayingProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/featured" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/liked-songs" element={<LikedSongs />} />
              <Route path="/liked-albums" element={<LikedAlbums />} />
              <Route path="/liked-artists" element={<LikedArtists />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/help-faqs" element={<HelpFAQs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/album/:albumId" element={<Album />} />
              <Route path="/artist/:artistId" element={<Artist />} />
              <Route path="/playlist/:playlistId" element={<Playlist />} />
              <Route path="/category/:categoryId" element={<Category />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </NowPlayingProvider>
      </LikedSongsProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
