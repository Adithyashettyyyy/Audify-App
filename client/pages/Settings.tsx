import { ArrowLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const settingsItems = [
  { label: "Notifications", hasArrow: true },
  { label: "Subscription", hasArrow: true },
  { label: "Help & FAQs", hasArrow: true },
];

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  // Get profile data from localStorage
  const getStoredValue = (key: string, defaultValue: string) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      return stored || defaultValue;
    }
    return defaultValue;
  };

  const profileName = getStoredValue("profile_name", "Adithya Shetty");
  const profileImage = getStoredValue(
    "profile_image",
    "https://cdn.builder.io/api/v1/image/assets%2F4b41a191281c4735b11ef747b8228ff6%2F964bd9fda67a4b44953bdb9b72f53faa?format=webp&width=800",
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      {/* Container for responsive layout */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-8">
          <div className="flex items-center gap-4">
            <Link to="/library">
              <ArrowLeft
                size={24}
                className="text-foreground lg:w-6 lg:h-6 hover:text-muted-foreground transition-colors"
              />
            </Link>
            <h1 className="text-2xl lg:text-3xl font-semibold">Settings</h1>
          </div>
          <Logo size="sm" />
        </div>

        <div className="px-4 lg:px-8">
          {/* Profile Section */}
          <div className="mb-8 lg:mb-12">
            <Link
              to="/profile"
              className="flex items-center gap-4 lg:gap-6 p-4 lg:p-6 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <Avatar className="w-16 h-16 lg:w-20 lg:h-20">
                <AvatarImage src={profileImage} alt={profileName} />
                <AvatarFallback className="text-lg lg:text-xl">
                  {profileName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  {profileName}
                </h2>
                <p className="text-lg lg:text-xl text-muted-foreground">
                  View & Edit Profile
                </p>
              </div>
              <ChevronRight
                size={20}
                className="text-muted-foreground lg:w-6 lg:h-6"
              />
            </Link>
          </div>

          {/* Settings Items */}
          <div className="space-y-2 lg:space-y-4 mb-8 lg:mb-12">
            <Link
              to="/notifications"
              className="flex items-center justify-between py-4 lg:py-6 cursor-pointer hover:bg-muted/50 rounded-xl px-4 lg:px-6 transition-colors"
            >
              <span className="text-xl lg:text-2xl text-foreground">
                Notifications
              </span>
              <ChevronRight
                size={20}
                className="text-muted-foreground lg:w-6 lg:h-6"
              />
            </Link>

            <Link
              to="/subscription"
              className="flex items-center justify-between py-4 lg:py-6 cursor-pointer hover:bg-muted/50 rounded-xl px-4 lg:px-6 transition-colors"
            >
              <span className="text-xl lg:text-2xl text-foreground">
                Subscription
              </span>
              <ChevronRight
                size={20}
                className="text-muted-foreground lg:w-6 lg:h-6"
              />
            </Link>

            <Link
              to="/help-faqs"
              className="flex items-center justify-between py-4 lg:py-6 cursor-pointer hover:bg-muted/50 rounded-xl px-4 lg:px-6 transition-colors"
            >
              <span className="text-xl lg:text-2xl text-foreground">
                Help & FAQs
              </span>
              <ChevronRight
                size={20}
                className="text-muted-foreground lg:w-6 lg:h-6"
              />
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <div>
            <div className="flex items-center justify-between py-4 lg:py-6 px-4 lg:px-6 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-xl lg:text-2xl text-foreground">
                Dark Mode
              </span>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
