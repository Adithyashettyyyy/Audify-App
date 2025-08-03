import {
  ArrowLeft,
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Book,
  Settings,
  CreditCard,
  Headphones,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HelpFAQs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    {
      title: "Getting Started",
      icon: <Book className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Account & Settings",
      icon: <Settings className="w-5 h-5 text-green-500" />,
      color: "bg-green-50 dark:bg-green-950/50",
    },
    {
      title: "Billing & Subscription",
      icon: <CreditCard className="w-5 h-5 text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      title: "Audio & Playback",
      icon: <Headphones className="w-5 h-5 text-orange-500" />,
      color: "bg-orange-50 dark:bg-orange-950/50",
    },
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create an account on Audify?",
      answer:
        "To create an account, tap the 'Sign Up' button on the welcome screen, enter your email address, create a password, and verify your email. You can also sign up using your Google or Facebook account for faster registration.",
    },
    {
      category: "Getting Started",
      question: "How do I search for music?",
      answer:
        "Use the search bar at the top of the Search tab. You can search for songs, artists, albums, or playlists. Type keywords and browse through the results organized by category.",
    },
    {
      category: "Getting Started",
      question: "How do I create playlists?",
      answer:
        "Go to Your Library, tap 'Create Playlist', give it a name and description. Then browse music and tap the '+' button next to any song to add it to your playlist.",
    },
    {
      category: "Account & Settings",
      question: "How do I change my profile information?",
      answer:
        "Go to Settings > Profile. Here you can update your display name, profile picture, email address, and other personal information. Changes are saved automatically.",
    },
    {
      category: "Account & Settings",
      question: "How do I enable dark mode?",
      answer:
        "Tap the theme toggle button (sun/moon icon) in the top right corner of any page, or go to Settings > Appearance to customize your theme preferences.",
    },
    {
      category: "Account & Settings",
      question: "How do I manage my privacy settings?",
      answer:
        "In Settings, scroll down to Privacy & Safety. Here you can control who sees your listening activity, playlists, and profile information.",
    },
    {
      category: "Billing & Subscription",
      question: "What's included in Audify Premium?",
      answer:
        "Premium includes ad-free listening, unlimited skips, offline downloads, high-quality audio, unlimited playlist creation, and access to exclusive content. See the Subscription page for full details.",
    },
    {
      category: "Billing & Subscription",
      question: "How do I cancel my subscription?",
      answer:
        "Go to Settings > Subscription > Manage Subscription. You can cancel anytime and will continue to have Premium access until your current billing period ends.",
    },
    {
      category: "Billing & Subscription",
      question: "Do you offer student discounts?",
      answer:
        "Yes! Students get 50% off Premium subscription. Verify your student status through our education partner to get the discount applied to your account.",
    },
    {
      category: "Audio & Playback",
      question: "Why can't I hear any music?",
      answer:
        "Check your device volume, ensure you're connected to internet, and verify the song has a preview available. Some tracks may not have full previews in the free version.",
    },
    {
      category: "Audio & Playback",
      question: "How do I adjust audio quality?",
      answer:
        "Premium users can adjust audio quality in Settings > Playback. Choose from Normal (96kbps), High (160kbps), or Very High (320kbps) quality based on your preference and data usage.",
    },
    {
      category: "Audio & Playback",
      question: "How do I download music for offline listening?",
      answer:
        "Premium feature only. Find the song, album, or playlist you want, then tap the download arrow icon. Downloaded music will be available in your Downloads section in Your Library.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

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
            <h1 className="text-xl lg:text-2xl font-semibold">Help & FAQs</h1>
          </div>
          <Logo size="sm" />
        </div>

        <div className="px-4 lg:px-8 space-y-8">
          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="mailto:zenocyber2@gmail.com"
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">Email Support</div>
                <div className="text-sm text-muted-foreground">
                  zenocyber2@gmail.com
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <MessageCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">Live Chat</div>
                <div className="text-sm text-muted-foreground">
                  Available 24/7
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Phone className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-medium">Phone Support</div>
                <div className="text-sm text-muted-foreground">
                  Premium members only
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          {!searchQuery && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform ${category.color}`}
                  >
                    <div className="flex justify-center mb-2">
                      {category.icon}
                    </div>
                    <div className="text-sm font-medium">{category.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {searchQuery ? "Search Results" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{faq.question}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {faq.category}
                      </div>
                    </div>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-4 pb-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Still Need Help */}
          <div className="text-center py-8 border-t">
            <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <Button asChild>
              <a href="mailto:zenocyber2@gmail.com">Contact Support</a>
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
