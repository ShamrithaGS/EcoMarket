import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Leaf, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Loading from "@/components/Loading";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ecoTokens: 100, // Welcome bonus
      };

      dispatch({ type: "LOGIN", payload: newUser });
    } else {
      // Mock login
      const user = {
        id: 1,
        name: formData.name || "Demo User",
        email: formData.email,
        phone: "+91 9876543210",
        ecoTokens: 250,
      };

      dispatch({ type: "LOGIN", payload: user });
    }

    setIsLoading(false);
    navigate("/");
  };

  if (isLoading) {
    return (
      <Loading
        fullScreen
        message={isSignUp ? "Creating your account..." : "Signing you in..."}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-eco-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl border-eco-200">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-eco-600" />
            <span className="text-2xl font-bold text-eco-800">EcoMarket</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignUp ? "Join Our Community" : "Welcome Back"}
          </h1>
          <p className="text-gray-600">
            {isSignUp
              ? "Start your sustainable journey today"
              : "Sign in to continue your eco-friendly shopping"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <Label htmlFor="name" className="text-gray-700">
                Full Name
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 border-eco-200 focus:border-eco-500 focus:ring-eco-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 border-eco-200 focus:border-eco-500 focus:ring-eco-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number
              </Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 border-eco-200 focus:border-eco-500 focus:ring-eco-500"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 border-eco-200 focus:border-eco-500 focus:ring-eco-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 border-eco-200 focus:border-eco-500 focus:ring-eco-500"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-eco-600 hover:bg-eco-700 text-white py-6 text-lg"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-eco-600 hover:text-eco-700 font-medium"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        {!isSignUp && (
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-eco-600 hover:text-eco-700"
            >
              Forgot your password?
            </Link>
          </div>
        )}

        {isSignUp && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-eco-600 hover:text-eco-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-eco-600 hover:text-eco-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SignIn;
