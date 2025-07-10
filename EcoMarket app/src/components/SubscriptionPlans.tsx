import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { subscriptionPlans } from "@/lib/data";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const SubscriptionPlans = () => {
  const { state } = useApp();

  const handleGetStarted = (plan: any) => {
    if (!state.isAuthenticated) {
      toast.error("Please sign in to subscribe to a plan");
      return;
    }

    toast.success(`Subscribed to ${plan.name}!`, {
      description: `You'll receive your first box within 3-5 days`,
    });
  };

  const handleCompareFeatures = () => {
    toast.info("Detailed comparison coming soon!", {
      description: "We're working on a comprehensive feature comparison page",
    });
  };

  return (
    <div id="subscription-plans" className="bg-eco-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Eco Subscription
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get curated eco-friendly products delivered to your door every
            month. Save money and reduce your environmental impact with our
            subscription plans.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-8 ${
                plan.popular
                  ? "border-eco-600 shadow-xl ring-2 ring-eco-600"
                  : "border-eco-200 hover:shadow-lg"
              } transition-all duration-300 bg-white`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-eco-600 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-600">
                    /{plan.deliveryFrequency.toLowerCase()}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-eco-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleGetStarted(plan)}
                className={`w-full ${
                  plan.popular
                    ? "bg-eco-600 hover:bg-eco-700 text-white"
                    : "bg-white border border-eco-600 text-eco-600 hover:bg-eco-50"
                }`}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include free shipping, easy cancellation, and 24/7
            customer support.
          </p>
          <Button
            onClick={handleCompareFeatures}
            variant="outline"
            className="border-eco-300 text-eco-700 hover:bg-eco-50"
          >
            Compare All Features
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
