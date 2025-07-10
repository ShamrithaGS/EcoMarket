import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Clock,
  MapPin,
  Leaf,
  Shield,
  Navigation,
  Timer,
  CheckCircle,
  Package,
  Phone,
  Mail,
} from "lucide-react";
import { deliveryZones } from "@/lib/data";
import { toast } from "sonner";

const DeliveryInfo = () => {
  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-eco-600" />,
      title: "Carbon Neutral",
      description:
        "All deliveries are carbon offset through our sustainability program",
    },
    {
      icon: <Package className="h-6 w-6 text-eco-600" />,
      title: "Eco Packaging",
      description: "Compostable bags and recyclable materials only",
    },
    {
      icon: <Navigation className="h-6 w-6 text-eco-600" />,
      title: "GPS Tracking",
      description:
        "Real-time tracking so you know exactly when your order arrives",
    },
    {
      icon: <Timer className="h-6 w-6 text-eco-600" />,
      title: "Flexible Windows",
      description:
        "Choose your preferred delivery time slots that work for you",
    },
  ];

  const handleContactSupport = () => {
    toast.info("Customer support is here to help!", {
      description: "Call us at +91-800-ECO-MART or email support@ecomarket.in",
    });
  };

  const handleTrackOrder = () => {
    toast.info("Order tracking coming soon!", {
      description: "You'll receive tracking details via SMS and email",
    });
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Fresh Delivery to Your Door
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get farm-fresh produce delivered quickly and sustainably. We use
            eco-friendly packaging and carbon-neutral delivery methods.
          </p>
        </div>

        {/* Delivery Zones */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {deliveryZones.map((zone, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow border-eco-200"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{zone.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {zone.zone}
                </h3>
                <p className="text-gray-600 mb-4">{zone.areas}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-eco-600" />
                    <span>Order by {zone.cutoff}</span>
                  </div>
                  <Badge className="bg-eco-100 text-eco-800 border-eco-200">
                    {zone.fee}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow border-eco-200"
            >
              <div className="bg-eco-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Delivery Guarantee */}
        <Card className="p-8 bg-gradient-to-r from-eco-50 to-eco-100 border-eco-200 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Delivery Guarantee
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We guarantee the freshness of all our products. If you're not 100%
              satisfied with your delivery, we'll replace it or provide a full
              refund within 24 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-eco-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Fresh Guarantee</h4>
            </div>

            <div className="text-center">
              <div className="bg-eco-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">On-Time Promise</h4>
            </div>

            <div className="text-center">
              <div className="bg-eco-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Quality Assured</h4>
            </div>
          </div>
        </Card>

        {/* Customer Support */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 border-eco-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-eco-600" />
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Our customer support team is available 24/7 to help with any
              delivery questions or concerns.
            </p>
            <Button
              onClick={handleContactSupport}
              className="w-full bg-eco-600 hover:bg-eco-700 text-white"
            >
              Contact Support
            </Button>
          </Card>

          <Card className="p-6 border-eco-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Navigation className="h-5 w-5 text-eco-600" />
              Track Your Order
            </h3>
            <p className="text-gray-600 mb-4">
              Get real-time updates on your order status and delivery location
              with our advanced tracking system.
            </p>
            <Button
              onClick={handleTrackOrder}
              variant="outline"
              className="w-full border-eco-300 text-eco-700 hover:bg-eco-50"
            >
              Track Order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
