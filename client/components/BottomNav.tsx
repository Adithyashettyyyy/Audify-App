import { Home, Search, Bookmark, Settings } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Bookmark, label: "Your Library", path: "/library" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 xl:relative xl:border-0 xl:bg-transparent xl:mt-8 xl:py-6 z-50">
      <div className="flex items-center justify-between w-full max-w-lg mx-auto xl:max-w-4xl xl:justify-center xl:gap-8">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-colors min-w-0 flex-1 xl:flex-row xl:gap-4 xl:px-6",
                isActive
                  ? "text-primary bg-primary/10 xl:bg-primary xl:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon
                size={20}
                className={cn(
                  "transition-transform flex-shrink-0",
                  isActive ? "scale-110" : "hover:scale-105",
                )}
              />
              <span className="text-xs font-medium text-center leading-tight xl:text-sm">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
