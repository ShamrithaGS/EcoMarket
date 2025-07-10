import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Gift, TreePine, Users, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TokenRewards = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const rewards = [
    {
      tokens: 100,
      reward: "₹50 Off Your Next Order",
      description: "Minimum order ₹500",
      icon: "💰",
    },
    {
      tokens: 250,
      reward: "Free Eco-Friendly Tote Bag",
      description: "Reusable jute shopping bag",
      icon: "👜",
    },
    {
      tokens: 500,
      reward: "Plant a Tree in Your Name",
      description: "We'll plant a tree and send you updates",
      icon: "🌳",
    },
    {
      tokens: 1000,
      reward: "VIP Member Status",
      description: "Exclusive products & early access",
      icon: "⭐",
    },
  ];

  const ways = [
    {
      action: "Make a Purchase",
      tokens: "1 token per ₹10 spent",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      action: "Write a Review",
      tokens: "50 tokens per review",
      icon: <Users className="h-5 w-5" />,
    },
    {
      action: "Refer a Friend",
      tokens: "200 tokens per referral",
      icon: <Users className="h-5 w-5" />,
    },
    {
      action: "Subscribe to Newsletter",
      tokens: "25 tokens one-time",
      icon: <TreePine className="h-5 w-5" />,
    },
  ];

  const handleRedeem = (reward: any) => {
    if (!state.isAuthenticated) {
      toast.error("Please sign in to redeem rewards");
      return;
    }

    if (!state.user || state.user.ecoTokens < reward.tokens) {
      toast.error(`You need ${reward.tokens} tokens to redeem this reward`);
      return;
    }

    // Deduct tokens
    const updatedUser = {
      ...state.user,
      ecoTokens: state.user.ecoTokens - reward.tokens,
    };
    dispatch({ type: "SET_USER", payload: updatedUser });

    toast.success(`${reward.reward} redeemed successfully!`, {
      description: "Check your account for details",
    });
  };

  const handleSignUp = () => {
    navigate("/signin");
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Earn Eco Tokens, Get Amazing Rewards
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every purchase helps you earn eco tokens that you can redeem for
            discounts, eco-friendly products, and even real environmental
            impact.
          </p>
          {state.isAuthenticated && (
            <div className="mt-4 inline-flex items-center gap-2 bg-eco-100 px-4 py-2 rounded-full">
              <Coins className="h-5 w-5 text-eco-600" />
              <span className="font-medium text-eco-800">
                You have {state.user?.ecoTokens} eco tokens
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* How to Earn */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Coins className="h-6 w-6 text-eco-600" />
              How to Earn Tokens
            </h3>
            <div className="space-y-4">
              {ways.map((way, index) => (
                <Card
                  key={index}
                  className="p-4 border-eco-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-eco-100 p-2 rounded-lg text-eco-600">
                        {way.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {way.action}
                        </h4>
                        <p className="text-sm text-gray-600">{way.tokens}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Gift className="h-6 w-6 text-eco-600" />
              Available Rewards
            </h3>
            <div className="space-y-4">
              {rewards.map((reward, index) => (
                <Card
                  key={index}
                  className="p-6 border-eco-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{reward.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {reward.reward}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {reward.description}
                        </p>
                        <Badge className="bg-eco-100 text-eco-800 border-eco-200">
                          <Coins className="w-3 h-3 mr-1" />
                          {reward.tokens} tokens
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRedeem(reward)}
                      disabled={
                        !state.isAuthenticated ||
                        !state.user ||
                        state.user.ecoTokens < reward.tokens
                      }
                      className="border-eco-300 text-eco-700 hover:bg-eco-50 disabled:opacity-50"
                    >
                      Redeem
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-eco-600 to-eco-700 text-white text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Coins className="h-8 w-8" />
            <span className="text-3xl font-bold">Start Earning Today!</span>
          </div>
          <p className="text-eco-100 mb-6 max-w-2xl mx-auto">
            Join thousands of eco-conscious shoppers who are earning rewards
            while making a positive impact on the planet.
          </p>
          <Button
            onClick={handleSignUp}
            size="lg"
            className="bg-white text-eco-700 hover:bg-eco-50"
          >
            {state.isAuthenticated
              ? "Start Shopping & Earning"
              : "Sign Up & Get 100 Free Tokens"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default TokenRewards;
