import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Plus,
  Minus,
  Truck,
  Leaf,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Product } from "@/types";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails = ({ product, isOpen, onClose }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { dispatch } = useApp();

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity },
    });
    toast.success(`${quantity}x ${product.name} added to cart!`);
    onClose();
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg bg-eco-50 flex items-center justify-center">
              <span className="text-8xl">{product.image}</span>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Company */}
            <div className="flex items-center gap-2 text-eco-600">
              <span>🏪</span>
              <span className="font-medium">{product.company}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
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
              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  In Stock
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              ₹{product.price}
              <span className="text-lg text-gray-500 ml-2">{product.unit}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm bg-eco-50 p-3 rounded-lg">
              <Truck className="h-4 w-4 text-eco-600" />
              <span className="text-gray-700">{product.deliveryTime}</span>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-900">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-eco-600 hover:bg-eco-700 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart - ₹{product.price * quantity}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                  className={`${
                    isFavorite
                      ? "border-red-300 text-red-600 hover:bg-red-50"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </div>

            {/* Additional Features */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>🌱</span>
                <span>Sustainably sourced and ethically produced</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📦</span>
                <span>Eco-friendly packaging included</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>🔄</span>
                <span>Easy returns within 7 days</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>🪙</span>
                <span>
                  Earn {Math.floor(product.price / 10)} eco tokens with this
                  purchase
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
