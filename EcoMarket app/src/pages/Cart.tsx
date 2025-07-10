import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Truck,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

const Cart = () => {
  const { state, dispatch } = useApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
      toast.success("Item removed from cart");
    } else {
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: { productId, quantity: newQuantity },
      });
    }
  };

  const removeItem = (productId: number, productName: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    toast.success(`${productName} removed from cart`);
  };

  const handleCheckout = async () => {
    if (!state.isAuthenticated) {
      toast.error("Please sign in to checkout");
      return;
    }

    setIsCheckingOut(true);

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Award eco tokens for purchase
    const totalAmount = subtotal + deliveryFee;
    const tokensEarned = Math.floor(totalAmount / 10); // 1 token per ₹10

    if (state.user) {
      const updatedUser = {
        ...state.user,
        ecoTokens: state.user.ecoTokens + tokensEarned,
      };
      dispatch({ type: "SET_USER", payload: updatedUser });
    }

    dispatch({ type: "CLEAR_CART" });
    setIsCheckingOut(false);

    toast.success(
      `Order placed successfully! You earned ${tokensEarned} eco tokens! 🎉`,
    );
  };

  const subtotal = state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal >= 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover our eco-friendly products and start building a
              sustainable lifestyle.
            </p>
            <Link to="/">
              <Button className="bg-eco-600 hover:bg-eco-700 text-white">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-eco-600 hover:text-eco-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {state.cart.reduce((total, item) => total + item.quantity, 0)} items
            in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="space-y-6">
                {state.cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="w-20 h-20 rounded-lg bg-eco-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{item.product.image}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.product.company}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.product.organic && (
                          <Badge className="bg-eco-100 text-eco-800 text-xs">
                            Organic
                          </Badge>
                        )}
                        {item.product.ecoFriendly && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Eco-Friendly
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Truck className="h-4 w-4 text-eco-600" />
                        <span>{item.product.deliveryTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <div className="font-semibold text-gray-900">
                          ₹{item.product.price * item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₹{item.product.price} {item.product.unit}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeItem(item.productId, item.product.name)
                        }
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span
                    className={`font-medium ${deliveryFee === 0 ? "text-green-600" : ""}`}
                  >
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-sm text-gray-500">
                    Add ₹{500 - subtotal} more for free delivery
                  </p>
                )}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </div>

              {state.isAuthenticated && (
                <div className="mb-4 p-3 bg-eco-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <span>🪙</span>
                    <span className="text-eco-700">
                      You'll earn {Math.floor(total / 10)} eco tokens with this
                      order
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut || !state.isAuthenticated}
                className="w-full bg-eco-600 hover:bg-eco-700 text-white"
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    {state.isAuthenticated
                      ? "Proceed to Checkout"
                      : "Sign In to Checkout"}
                  </>
                )}
              </Button>

              {!state.isAuthenticated && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  <Link
                    to="/signin"
                    className="text-eco-600 hover:text-eco-700"
                  >
                    Sign in
                  </Link>{" "}
                  to complete your purchase
                </p>
              )}

              <div className="mt-6 space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-eco-600" />
                  <span>Free delivery on orders over ₹500</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>♻️</span>
                  <span>Eco-friendly packaging</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
