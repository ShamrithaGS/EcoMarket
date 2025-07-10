import { Product } from "@/types";
import { products } from "@/lib/data";

export class SearchService {
  static searchProducts(
    query: string,
    category: string = "All",
    sortBy: string = "relevance",
  ): Product[] {
    let filtered = [...products];

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter((product) => {
        return (
          product.name.toLowerCase().includes(lowercaseQuery) ||
          product.company.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.certifications.some((cert) =>
            cert.toLowerCase().includes(lowercaseQuery),
          )
        );
      });
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // relevance - keep original order or implement relevance scoring
        break;
    }

    return filtered;
  }

  static getProductById(id: number): Product | undefined {
    return products.find((product) => product.id === id);
  }

  static getProductsByCompany(companyName: string): Product[] {
    return products.filter((product) => product.company === companyName);
  }

  static getFeaturedProducts(limit: number = 4): Product[] {
    return products.filter((product) => product.rating >= 4.7).slice(0, limit);
  }

  static getProductsOnSale(): Product[] {
    // Mock sale logic - in real app this would come from database
    return products.filter((product) => product.id % 3 === 0);
  }
}

export const mockBackendAPI = {
  // Simulate API delay
  delay: (ms: number = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  // Auth API
  login: async (email: string, password: string) => {
    await mockBackendAPI.delay(1500);
    // Mock successful login
    return {
      id: Date.now(),
      name: email.split("@")[0],
      email,
      phone: "+91 9876543210",
      ecoTokens: 150,
    };
  },

  register: async (userData: any) => {
    await mockBackendAPI.delay(2000);
    return {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      ecoTokens: 100, // Welcome bonus
    };
  },

  // Product APIs
  getProducts: async (filters: any = {}) => {
    await mockBackendAPI.delay(800);
    return SearchService.searchProducts(
      filters.query || "",
      filters.category || "All",
      filters.sortBy || "relevance",
    );
  },

  getProduct: async (id: number) => {
    await mockBackendAPI.delay(500);
    return SearchService.getProductById(id);
  },

  // Order API
  placeOrder: async (orderData: any) => {
    await mockBackendAPI.delay(2000);
    return {
      orderId: `ORD-${Date.now()}`,
      status: "confirmed",
      estimatedDelivery: "2-3 business days",
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };
  },

  // Subscription API
  subscribe: async (planId: number) => {
    await mockBackendAPI.delay(1500);
    return {
      subscriptionId: `SUB-${Date.now()}`,
      status: "active",
      nextDelivery: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    };
  },
};
