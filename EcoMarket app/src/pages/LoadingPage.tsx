import { useEffect, useState } from "react";
import { Leaf, ShoppingCart, TreePine, Truck } from "lucide-react";

interface LoadingPageProps {
  onLoadingComplete?: () => void;
}

const LoadingPage = ({ onLoadingComplete }: LoadingPageProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const loadingMessages = [
    "Connecting to local farmers...",
    "Loading eco-friendly products...",
    "Calculating carbon footprints...",
    "Preparing sustainable packaging...",
    "Almost ready to go green!",
  ];

  const features = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "100% Eco-Friendly",
      description: "Every product is sustainably sourced",
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Direct from Farmers",
      description: "Supporting local agriculture",
    },
    {
      icon: <TreePine className="h-6 w-6" />,
      title: "Carbon Neutral",
      description: "All deliveries are carbon offset",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Same Day Delivery",
      description: "Fresh products delivered fast",
    },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          if (onLoadingComplete) {
            setTimeout(onLoadingComplete, 500);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-eco-50 via-white to-eco-100 z-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Logo and Brand */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24 mb-6">
            <Leaf className="w-24 h-24 text-eco-600 animate-pulse" />
            <div className="absolute inset-0 bg-eco-600 rounded-full opacity-20 animate-ping"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">EcoMarket</h1>
          <p className="text-lg text-eco-600 font-medium">
            Sustainable Living Made Simple
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-eco-100 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-eco-500 to-eco-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">
            {loadingMessages[currentMessage]}
          </p>
          <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
        </div>

        {/* Loading Animation */}
        <div className="mb-12">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-eco-600 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-eco-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-eco-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center opacity-75 hover:opacity-100 transition-opacity"
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: "fadeIn 0.5s ease-out forwards",
              }}
            >
              <div className="bg-eco-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 text-eco-600">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Preparing your sustainable shopping experience...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 0.75;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
