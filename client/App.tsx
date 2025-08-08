import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load all pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Index = lazy(() => import("./pages/Index"));
const Search = lazy(() => import("./pages/Search"));
const Library = lazy(() => import("./pages/Library"));
const LikedSongs = lazy(() => import("./pages/LikedSongs"));
const LikedAlbums = lazy(() => import("./pages/LikedAlbums"));
const LikedArtists = lazy(() => import("./pages/LikedArtists"));
const Settings = lazy(() => import("./pages/Settings"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Subscription = lazy(() => import("./pages/Subscription"));
const HelpFAQs = lazy(() => import("./pages/HelpFAQs"));
const Profile = lazy(() => import("./pages/Profile"));
const Album = lazy(() => import("./pages/Album"));
const Artist = lazy(() => import("./pages/Artist"));
const Playlist = lazy(() => import("./pages/Playlist"));
const Category = lazy(() => import("./pages/Category"));
const NotFound = lazy(() => import("./pages/NotFound"));
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
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              </div>
            }>
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
            </Suspense>
          </BrowserRouter>
          </TooltipProvider>
        </NowPlayingProvider>
      </LikedSongsProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
