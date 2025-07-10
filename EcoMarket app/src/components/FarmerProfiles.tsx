import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Award, Users, Package } from "lucide-react";
import { farmers } from "@/lib/data";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const FarmerProfiles = () => {
  const { dispatch } = useApp();

  const handleViewProducts = (farmerName: string) => {
    // This would filter products by farmer in a real app
    dispatch({ type: "SET_SEARCH_QUERY", payload: farmerName });
    const element = document.getElementById("product-catalog");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    toast.success(`Showing products from ${farmerName}`);
  };

  const handlePartnerClick = () => {
    toast.info("Partner registration form coming soon!", {
      description: "We'll notify you when the farmer partnership program opens",
    });
  };

  return (
    <div className="bg-eco-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Local Farmers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get to know the passionate farmers who grow your food with care,
            using sustainable practices that benefit both you and the
            environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {farmers.map((farmer) => (
            <Card
              key={farmer.id}
              className="p-6 bg-white hover:shadow-xl transition-all duration-300 border-eco-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl bg-eco-100 p-3 rounded-full">
                  {farmer.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {farmer.name}
                  </h3>
                  <p className="text-eco-600 font-medium">{farmer.owner}</p>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    {farmer.location}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        className="bg-eco-100 text-eco-800 border-eco-200"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {farmer.certifications.map((cert) => (
                      <Badge
                        key={cert}
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 border-yellow-200"
                      >
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {farmer.description}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-eco-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-eco-700">
                      {farmer.experience}
                    </div>
                    <div className="text-xs text-gray-600">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-eco-700">
                      {farmer.customers}
                    </div>
                    <div className="text-xs text-gray-600">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-eco-700">
                      {farmer.products}
                    </div>
                    <div className="text-xs text-gray-600">Products</div>
                  </div>
                </div>

                <Button
                  onClick={() => handleViewProducts(farmer.name)}
                  className="w-full bg-eco-600 hover:bg-eco-700 text-white mt-4"
                >
                  <Package className="h-4 w-4 mr-2" />
                  View Products
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-r from-eco-600 to-eco-700 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Want to Partner with Us?</h3>
          <p className="text-eco-100 mb-6 max-w-2xl mx-auto">
            Are you a local farmer interested in selling your fresh produce
            directly to consumers? Join our community of sustainable growers.
          </p>
          <Button
            onClick={handlePartnerClick}
            size="lg"
            className="bg-white text-eco-700 hover:bg-eco-50"
          >
            Become a Partner Farmer
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default FarmerProfiles;
