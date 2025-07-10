import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Leaf,
  LogOut,
} from "lucide-react";
import { categories } from "@/lib/data";
import { useApp } from "@/context/AppContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: categoryName });
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  const handleAuthClick = () => {
    if (state.isAuthenticated) {
      // Show user menu or logout
      return;
    } else {
      navigate("/signin");
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-eco-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Leaf className="h-8 w-8 text-eco-600" />
              <div>
                <h1 className="text-xl font-bold text-eco-800">EcoMarket</h1>
                <p className="text-xs text-eco-600">Sustainable Living</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {categories.slice(0, 4).map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                onClick={() => handleCategoryClick(category.name)}
                className="text-gray-700 hover:text-eco-600 hover:bg-eco-50 transition-colors"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search eco-friendly products..."
                value={state.searchQuery}
                onChange={handleSearchChange}
                className="pl-10 border-eco-200 focus:border-eco-500 focus:ring-eco-500"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-4">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    Hello, {state.user?.name}
                  </p>
                  <p className="text-eco-600 text-xs">
                    🪙 {state.user?.ecoTokens} tokens
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex"
                onClick={handleAuthClick}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {state.cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-eco-600 text-white text-xs flex items-center justify-center">
                  {state.cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-eco-100 py-4 animate-slide-in">
            {/* Mobile Search */}
            <div className="px-4 mb-4 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={state.searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 border-eco-200 focus:border-eco-500 focus:ring-eco-500"
                />
              </div>
            </div>

            {/* Categories */}
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                onClick={() => handleCategoryClick(category.name)}
                className="w-full justify-start text-left py-3 hover:bg-eco-50"
              >
                <span className="mr-3">{category.icon}</span>
                {category.name}
              </Button>
            ))}

            {/* Mobile Auth */}
            <div className="mt-4 px-4">
              {state.isAuthenticated ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    Hello, {state.user?.name}
                  </p>
                  <p className="text-sm text-eco-600">
                    🪙 {state.user?.ecoTokens} eco tokens
                  </p>
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleAuthClick}
                  className="w-full bg-eco-600 hover:bg-eco-700 text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
