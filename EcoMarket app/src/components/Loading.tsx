import { Leaf } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading = ({
  message = "Loading...",
  fullScreen = false,
}: LoadingProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Leaf className="h-16 w-16 text-eco-600 animate-pulse mx-auto mb-4" />
            <div className="absolute inset-0 bg-eco-600 rounded-full opacity-20 animate-ping"></div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            EcoMarket
          </h2>
          <p className="text-gray-600">{message}</p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-eco-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-eco-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-eco-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <Leaf className="h-8 w-8 text-eco-600 animate-spin mx-auto mb-2" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
