import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Truck, Leaf, ShoppingCart, Eye } from "lucide-react";
import { products, categories } from "@/lib/data";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/types";

const ProductCatalog = () => {
  const { state, dispatch } = useApp();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (state.selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === state.selectedCategory,
      );
    }

    // Filter by search query
    if (state.searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          product.company
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()),
      );
    }

    setFilteredProducts(filtered.slice(0, 12)); // Show first 12 products
  }, [state.selectedCategory, state.searchQuery]);

  const handleCategoryChange = (category: string) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
  };

  const handleAddToCart = (product: any) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
    toast.success(`${product.name} added to cart!`, {
      description: `₹${product.price} ${product.unit}`,
    });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  return (
    <div
      id="product-catalog"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Fresh from Local Farmers & Eco Brands
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Support your community while enjoying the freshest produce and most
          sustainable products, delivered directly from farm to your table
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Button
          onClick={() => handleCategoryChange("All")}
          className={`${
            state.selectedCategory === "All"
              ? "bg-eco-600 hover:bg-eco-700 text-white"
              : "bg-white hover:bg-eco-50 hover:text-eco-600 text-gray-700 border border-gray-200"
          } transition-all duration-200`}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category.name}
            onClick={() => handleCategoryChange(category.name)}
            className={`${
              state.selectedCategory === category.name
                ? "bg-eco-600 hover:bg-eco-700 text-white"
                : "bg-white hover:bg-eco-50 hover:text-eco-600 text-gray-700 border border-gray-200"
            } transition-all duration-200`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* Search Results Info */}
      {state.searchQuery && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {filteredProducts.length} results for "{state.searchQuery}"
          </p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-gray-200 hover:border-eco-300"
          >
            <div className="relative p-6">
              <div className="aspect-square mb-4 rounded-lg bg-eco-50 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {product.organic && (
                  <Badge className="bg-eco-100 text-eco-800 border-eco-200">
                    <Leaf className="w-3 h-3 mr-1" />
                    Organic
                  </Badge>
                )}
                {product.ecoFriendly && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Eco-Friendly
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">
                  ({product.reviews})
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                <span className="text-eco-600">🏪</span>
                {product.company}
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm">
                <Truck className="h-4 w-4 text-eco-600" />
                <span className="text-gray-600">{product.deliveryTime}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    {product.unit}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => handleViewDetails(product)}
                  variant="outline"
                  className="w-full border-eco-300 text-eco-700 hover:bg-eco-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-eco-600 hover:bg-eco-700 text-white group-hover:bg-eco-700 transition-colors"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            {state.searchQuery
              ? `No products match your search "${state.searchQuery}"`
              : `No products in ${state.selectedCategory} category`}
          </p>
          <Button
            onClick={() => {
              dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
              dispatch({ type: "SET_SELECTED_CATEGORY", payload: "All" });
            }}
            variant="outline"
            className="border-eco-300 text-eco-700 hover:bg-eco-50"
          >
            Clear filters
          </Button>
        </div>
      )}

      <div className="text-center">
        <Button
          size="lg"
          variant="outline"
          className="border-eco-300 text-eco-700 hover:bg-eco-50"
          onClick={() => {
            // This would typically load more products
            toast.info("More products coming soon!");
          }}
        >
          View All Products
        </Button>
      </div>

      <ProductDetails
        product={selectedProduct}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default ProductCatalog;
