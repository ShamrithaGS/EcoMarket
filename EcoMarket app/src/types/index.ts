export interface Product {
  id: number;
  name: string;
  company: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  deliveryTime: string;
  organic: boolean;
  ecoFriendly: boolean;
  certifications: string[];
}

export interface Company {
  id: number;
  name: string;
  description: string;
  location: string;
  ecoFocus: string;
  image: string;
  website?: string;
  certifications: string[];
  foundedYear: number;
  productCount: number;
}

export interface Farmer {
  id: number;
  name: string;
  owner: string;
  location: string;
  image: string;
  specialties: string[];
  certifications: string[];
  experience: string;
  description: string;
  customers: number;
  products: number;
}

export interface DeliveryZone {
  zone: string;
  areas: string;
  cutoff: string;
  fee: string;
  icon: string;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  deliveryFrequency: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  ecoTokens: number;
}
