import {
  ArrowLeft,
  Crown,
  Check,
  Star,
  Zap,
  Users,
  Music,
  Shield,
  Download,
  Volume2,
  Infinity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function Subscription() {
  const currentPlan = "free"; // or "premium"

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
            <h1 className="text-xl lg:text-2xl font-semibold">Subscription</h1>
          </div>
          <Logo size="sm" />
        </div>

        <div className="px-4 lg:px-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl text-white">
            <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
            <p className="text-lg opacity-90 max-w-md mx-auto">
              Unlock unlimited music, ad-free experience, and exclusive features
            </p>
          </div>

          {/* Current Plan Status */}
          <div className="bg-muted/30 rounded-xl p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Current Plan</h3>
                <p className="text-muted-foreground">
                  {currentPlan === "free" ? "Free Tier" : "Premium Member"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {currentPlan === "free" ? "₹0" : "₹149"}
                </div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Music className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-1">₹0</div>
                <div className="text-sm text-muted-foreground">
                  Forever free
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Millions of songs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Basic audio quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Shuffle play</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="w-4 h-4 text-red-500">✕</span>
                  <span className="text-sm line-through">Skip unlimited</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="w-4 h-4 text-red-500">✕</span>
                  <span className="text-sm line-through">Download music</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="w-4 h-4 text-red-500">✕</span>
                  <span className="text-sm line-through">
                    Ad-free experience
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                disabled={currentPlan === "free"}
              >
                {currentPlan === "free" ? "Current Plan" : "Downgrade"}
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                  RECOMMENDED
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium</h3>
                <div className="text-3xl font-bold mb-1">₹149</div>
                <div className="text-sm opacity-80">per month</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-sm">Everything in Free</span>
                </div>
                <div className="flex items-center gap-3">
                  <Infinity className="w-4 h-4 text-white" />
                  <span className="text-sm">Unlimited skips</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-white" />
                  <span className="text-sm">Offline downloads</span>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-white" />
                  <span className="text-sm">High quality audio</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-white" />
                  <span className="text-sm">Ad-free listening</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-white" />
                  <span className="text-sm">Exclusive content</span>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full bg-white text-black hover:bg-white/90"
                disabled={currentPlan === "premium"}
              >
                {currentPlan === "premium" ? "Active Plan" : "Upgrade Now"}
              </Button>
            </div>
          </div>

          {/* Family Plan */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Users className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Family Plan</h3>
                </div>
                <p className="text-sm opacity-90 mb-2">Perfect for families</p>
                <div className="text-2xl font-bold">
                  ₹229<span className="text-lg font-normal">/month</span>
                </div>
                <div className="text-sm opacity-80">Up to 6 accounts</div>
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant="secondary"
                  className="bg-white text-black hover:bg-white/90"
                >
                  Choose Family
                </Button>
              </div>
            </div>
          </div>

          {/* Why Choose Premium */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Why Choose Premium?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">
                    Offline Listening
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    Download your favorite songs and listen anywhere, anytime
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">
                    Ad-Free Experience
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-200">
                    Enjoy uninterrupted music without any advertisements
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">
                    High Quality Audio
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    Crystal clear sound with 320kbps audio quality
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-orange-900 dark:text-orange-100">
                    Exclusive Content
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-200">
                    Early access to new releases and premium podcasts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Accepted Payment Methods</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center p-3 bg-background rounded border">
                <span className="text-sm font-medium">UPI</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded border">
                <span className="text-sm font-medium">Credit Card</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded border">
                <span className="text-sm font-medium">Debit Card</span>
              </div>
              <div className="flex items-center justify-center p-3 bg-background rounded border">
                <span className="text-sm font-medium">Net Banking</span>
              </div>
            </div>
          </div>

          {/* Trial Banner */}
          <div className="text-center py-6 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl text-white">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-1">
              Start Your Free Trial
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Get 30 days of Premium absolutely free
            </p>
            <Button
              variant="secondary"
              className="bg-white text-black hover:bg-white/90"
            >
              Try Premium Free
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
