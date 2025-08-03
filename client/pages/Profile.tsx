import { ArrowLeft, Camera, Edit3, Save, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BottomNav from "@/components/BottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  // Load initial data from localStorage or use defaults
  const getStoredValue = (key: string, defaultValue: string) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      return stored || defaultValue;
    }
    return defaultValue;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(() =>
    getStoredValue("profile_name", "Adithya Shetty"),
  );
  const [email, setEmail] = useState(() =>
    getStoredValue("profile_email", "adithya.shetty@example.com"),
  );
  const [profileImage, setProfileImage] = useState(() =>
    getStoredValue(
      "profile_image",
      "https://cdn.builder.io/api/v1/image/assets%2F4b41a191281c4735b11ef747b8228ff6%2F964bd9fda67a4b44953bdb9b72f53faa?format=webp&width=800",
    ),
  );
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("profile_name", tempName);
    localStorage.setItem("profile_email", tempEmail);

    // Update state
    setName(tempName);
    setEmail(tempEmail);
    setIsEditing(false);

    console.log("✅ Profile saved to browser storage!");
  };

  const handleCancel = () => {
    setTempName(name);
    setTempEmail(email);
    setIsEditing(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB to avoid localStorage issues)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image too large! Please choose an image smaller than 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageData = e.target.result as string;

          // Save to localStorage immediately
          localStorage.setItem("profile_image", imageData);

          // Update state
          setProfileImage(imageData);

          console.log("✅ Profile image saved to browser storage!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 sm:pb-18 md:pb-20 lg:pb-0 xl:pb-0">
      {/* Container for responsive layout */}
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
          <Link to="/settings">
            <ArrowLeft
              size={20}
              className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-foreground hover:text-muted-foreground transition-colors"
            />
          </Link>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
            Profile
          </h1>
          <ThemeToggle />
        </div>

        <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          {/* Profile Picture Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 mx-auto border-4 border-background shadow-xl">
                <AvatarImage src={profileImage} alt={name} />
                <AvatarFallback className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-br from-primary/20 to-primary/10">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* Camera Button */}
              <label className="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-all duration-300 hover:scale-110 shadow-lg">
                <Camera
                  size={16}
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-primary-foreground"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-3 sm:mt-4 md:mt-5 lg:mt-6 max-w-sm mx-auto">
              Click the camera icon to change your profile picture
            </p>
          </div>

          {/* Profile Information */}
          <div className="space-y-6 mb-8">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Display Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="h-12"
                  placeholder="Enter your display name"
                />
              ) : (
                <div className="h-12 px-3 py-2 border border-border rounded-md flex items-center justify-between bg-muted/50">
                  <span className="text-foreground">{name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="h-12"
                  placeholder="Enter your email address"
                />
              ) : (
                <div className="h-12 px-3 py-2 border border-border rounded-md flex items-center justify-between bg-muted/50">
                  <span className="text-foreground">{email}</span>
                </div>
              )}
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-foreground">42</div>
                <div className="text-sm text-muted-foreground">Playlists</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-foreground">1.2K</div>
                <div className="text-sm text-muted-foreground">Liked Songs</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-foreground">156</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {isEditing ? (
              <div className="flex gap-3">
                <Button onClick={handleSave} className="flex-1 h-12" size="lg">
                  <Save size={20} className="mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 h-12"
                  size="lg"
                >
                  <X size={20} className="mr-2" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full h-12"
                size="lg"
              >
                <Edit3 size={20} className="mr-2" />
                Edit Profile
              </Button>
            )}

            {/* Additional Options */}
            <div className="space-y-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full h-12 justify-start"
                size="lg"
              >
                Privacy Settings
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 justify-start"
                size="lg"
              >
                Account Security
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-destructive hover:text-destructive"
                size="lg"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to reset your profile? This will clear your custom name and photo.",
                    )
                  ) {
                    localStorage.removeItem("profile_name");
                    localStorage.removeItem("profile_email");
                    localStorage.removeItem("profile_image");
                    window.location.reload();
                  }
                }}
              >
                Reset Profile Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
