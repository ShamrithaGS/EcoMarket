import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Leaf, Users, Package } from "lucide-react";
import { useApp } from "@/context/AppContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleShopProduce = () => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: "Fresh Fruits" });
    const element = document.getElementById("product-catalog");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBrowseSubscriptions = () => {
    const element = document.getElementById("subscription-plans");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const featuredProducts = [
    { emoji: "🍎", name: "Organic Apples", price: "₹399/kg" },
    { emoji: "🥕", name: "Fresh Carrots", price: "₹279/kg" },
    { emoji: "🥬", name: "Baby Spinach", price: "₹279/bunch" },
    { emoji: "🥛", name: "Farm Fresh Milk", price: "₹65/liter" },
  ];

  return (
    <div className="relative bg-gradient-to-br from-eco-50 via-white to-eco-100 bg-hero-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <Badge className="bg-eco-100 text-eco-800 border-eco-200 mb-4">
                <Leaf className="w-3 h-3 mr-1" />
                🌱 Eco-Friendly • Direct from Farmers
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Sustainable
                <span className="text-eco-600 block">Groceries</span>
                <span className="text-2xl lg:text-3xl text-gray-600 font-normal">
                  Delivered Daily
                </span>
              </h1>
              <p className="text-lg text-gray-600 mt-6 max-w-lg">
                Shop eco-friendly products, organic groceries, and sustainable
                goods delivered straight from local farmers and conscious brands
                to your doorstep.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleShopProduce}
                size="lg"
                className="bg-eco-600 hover:bg-eco-700 text-white px-8 py-4 text-lg"
              >
                Shop Fresh Produce
              </Button>
              <Button
                onClick={handleBrowseSubscriptions}
                variant="outline"
                size="lg"
                className="border-eco-300 text-eco-700 hover:bg-eco-50 px-8 py-4 text-lg"
              >
                Browse Subscriptions
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-eco-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-eco-700">50+</div>
                <div className="text-sm text-gray-600">Local Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-eco-700">1000+</div>
                <div className="text-sm text-gray-600">Eco Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-eco-700">Same Day</div>
                <div className="text-sm text-gray-600">Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-eco-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-eco-100 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-eco-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Today's Fresh Picks
                  </h3>
                  <p className="text-sm text-gray-600">
                    Delivered within 2 hours
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-eco-50 rounded-lg hover:bg-eco-100 transition-colors cursor-pointer"
                  >
                    <span className="text-2xl">{product.emoji}</span>
                    <div>
                      <div className="font-medium text-sm text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-eco-600 font-semibold text-sm">
                        {product.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-eco-600 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5" />
                <div>
                  <div className="font-semibold">Free Delivery on ₹500+</div>
                  <div className="text-eco-100 text-sm">
                    Same day for most areas
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
