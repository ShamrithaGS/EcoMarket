import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageCircle,
  Calendar,
  TreePine,
  Heart,
  Share2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const CommunitySection = () => {
  const { state } = useApp();

  const stats = [
    {
      number: "10,000+",
      label: "Community Members",
      icon: <Users className="h-5 w-5" />,
    },
    {
      number: "2,500",
      label: "Trees Planted",
      icon: <TreePine className="h-5 w-5" />,
    },
    { number: "50,000", label: "Plastic Items Avoided", icon: "♻️" },
    { number: "25", label: "Local Farmers Supported", icon: "👨‍🌾" },
  ];

  const activities = [
    {
      title: "Eco Challenge: Zero Waste Week",
      participants: 45,
      timeLeft: "3 days left",
      description: "Join our community challenge to go plastic-free for a week",
      badge: "Popular",
    },
    {
      title: "Farmers Market Virtual Tour",
      participants: 23,
      timeLeft: "Tomorrow, 2 PM",
      description:
        "Meet our partner farmers and see where your food comes from",
      badge: "Live Event",
    },
    {
      title: "DIY Eco-Friendly Cleaning Products",
      participants: 67,
      timeLeft: "Starting soon",
      description:
        "Learn to make natural cleaning products from kitchen ingredients",
      badge: "Workshop",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "This community has transformed how I shop. I've reduced my plastic waste by 80% and discovered amazing local farmers!",
      avatar: "👩‍💼",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      text: "The eco challenges are so motivating! My family now competes to see who can make the most sustainable choices.",
      avatar: "👨‍💻",
    },
    {
      name: "Anita Patel",
      location: "Bangalore",
      text: "Love supporting local farmers through this platform. The produce is fresher and I feel good about my impact.",
      avatar: "👩‍🎓",
    },
  ];

  const handleJoinActivity = (activityTitle: string) => {
    if (!state.isAuthenticated) {
      toast.error("Please sign in to join community activities");
      return;
    }

    toast.success(`Joined ${activityTitle}!`, {
      description: "You'll receive updates and reminders via email",
    });
  };

  const handleJoinCommunity = () => {
    if (!state.isAuthenticated) {
      toast.error("Please sign in to join our community");
      return;
    }

    toast.success("Welcome to the EcoMarket community!", {
      description: "You'll receive our weekly newsletter and event updates",
    });
  };

  const handleShareWithFriends = () => {
    if (navigator.share) {
      navigator.share({
        title: "EcoMarket - Sustainable Shopping",
        text: "Join me on EcoMarket for sustainable, eco-friendly shopping!",
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        description: "Share this link with your friends",
      });
    }
  };

  return (
    <div className="bg-eco-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Join Our Eco-Friendly Community
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with like-minded individuals, participate in sustainability
            challenges, and make a real difference together.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-white border-eco-200 hover:shadow-lg transition-shadow"
            >
              <div className="bg-eco-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                {typeof stat.icon === "string" ? (
                  <span className="text-xl">{stat.icon}</span>
                ) : (
                  <div className="text-eco-600">{stat.icon}</div>
                )}
              </div>
              <div className="text-2xl font-bold text-eco-700 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Current Activities */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Current Activities
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className="p-6 bg-white border-eco-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <Badge
                    className={`${
                      activity.badge === "Popular"
                        ? "bg-red-100 text-red-800"
                        : activity.badge === "Live Event"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {activity.badge}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    {activity.participants}
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {activity.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-eco-600 font-medium">
                    {activity.timeLeft}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleJoinActivity(activity.title)}
                    className="bg-eco-600 hover:bg-eco-700 text-white"
                  >
                    Join
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Testimonials */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Our Community Says
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white border-eco-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic">
                  "{testimonial.text}"
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Community CTA */}
        <Card className="p-8 bg-gradient-to-r from-eco-600 to-eco-700 text-white text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="h-8 w-8 fill-current" />
            <span className="text-3xl font-bold">
              Ready to Make a Difference?
            </span>
          </div>
          <p className="text-eco-100 mb-6 max-w-2xl mx-auto">
            Join our community of eco-warriors who are creating positive change
            one purchase at a time. Together, we're building a more sustainable
            future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleJoinCommunity}
              size="lg"
              className="bg-white text-eco-700 hover:bg-eco-50"
            >
              <Users className="h-5 w-5 mr-2" />
              {state.isAuthenticated ? "Join Activities" : "Join Community"}
            </Button>
            <Button
              onClick={handleShareWithFriends}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-eco-700"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share with Friends
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CommunitySection;
