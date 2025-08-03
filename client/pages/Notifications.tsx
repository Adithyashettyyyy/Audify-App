import { ArrowLeft, Bell, Music, Heart, Users, Volume2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Notifications() {
  const [settings, setSettings] = useState({
    newReleases: true,
    recommendations: true,
    likedSongs: false,
    socialActivity: true,
    playlistUpdates: true,
    promotions: false,
    emailNotifications: true,
    pushNotifications: true,
    soundEffects: true,
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationCategories = [
    {
      title: "Music Updates",
      icon: <Music size={20} className="text-blue-500" />,
      items: [
        {
          key: "newReleases",
          label: "New Releases",
          description:
            "Get notified when your favorite artists release new music",
        },
        {
          key: "recommendations",
          label: "Music Recommendations",
          description:
            "Personalized music suggestions based on your listening habits",
        },
        {
          key: "playlistUpdates",
          label: "Playlist Updates",
          description: "When playlists you follow get updated with new songs",
        },
      ],
    },
    {
      title: "Social & Activity",
      icon: <Users size={20} className="text-green-500" />,
      items: [
        {
          key: "likedSongs",
          label: "Liked Songs Updates",
          description: "When songs you liked get featured or recommended",
        },
        {
          key: "socialActivity",
          label: "Social Activity",
          description: "Friend activity and shared playlists",
        },
      ],
    },
    {
      title: "Promotions",
      icon: <Heart size={20} className="text-red-500" />,
      items: [
        {
          key: "promotions",
          label: "Special Offers",
          description: "Discounts, premium upgrades, and exclusive content",
        },
      ],
    },
    {
      title: "Delivery Method",
      icon: <Bell size={20} className="text-orange-500" />,
      items: [
        {
          key: "pushNotifications",
          label: "Push Notifications",
          description: "Get notifications on your device",
        },
        {
          key: "emailNotifications",
          label: "Email Notifications",
          description: "Receive updates via email",
        },
      ],
    },
    {
      title: "Audio Settings",
      icon: <Volume2 size={20} className="text-purple-500" />,
      items: [
        {
          key: "soundEffects",
          label: "Sound Effects",
          description: "Play sound effects for app interactions",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 lg:pb-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-8">
          <div className="flex items-center gap-4">
            <Link to="/settings">
              <ArrowLeft
                size={24}
                className="text-foreground hover:text-muted-foreground transition-colors"
              />
            </Link>
            <h1 className="text-xl lg:text-2xl font-semibold">Notifications</h1>
          </div>
          <Logo size="sm" />
        </div>

        <div className="px-4 lg:px-8 space-y-8">
          {notificationCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              <div className="flex items-center gap-3">
                {category.icon}
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-start justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="font-medium mb-1">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      checked={settings[item.key as keyof typeof settings]}
                      onCheckedChange={() => handleToggle(item.key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Quick Setup
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">
              Allow notifications to stay updated with the latest music and
              features.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    pushNotifications: true,
                    emailNotifications: true,
                  }))
                }
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Enable All
              </button>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    pushNotifications: false,
                    emailNotifications: false,
                  }))
                }
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Disable All
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
