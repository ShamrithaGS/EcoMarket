import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartItem, Product, User } from "@/types";

interface AppState {
  user: User | null;
  cart: CartItem[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  isAuthenticated: boolean;
}

type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SELECTED_CATEGORY"; payload: string }
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | {
      type: "UPDATE_CART_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

const initialState: AppState = {
  user: null,
  cart: [],
  isLoading: false,
  searchQuery: "",
  selectedCategory: "All",
  isAuthenticated: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload.product.id,
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.productId === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            productId: action.payload.product.id,
            quantity: action.payload.quantity,
            product: action.payload.product,
          },
        ],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== action.payload),
      };
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false, cart: [] };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ecomarket-cart");
    const savedUser = localStorage.getItem("ecomarket-user");

    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        cart.forEach((item: CartItem) => {
          dispatch({
            type: "ADD_TO_CART",
            payload: { product: item.product, quantity: item.quantity },
          });
        });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: "LOGIN", payload: user });
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ecomarket-cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("ecomarket-user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("ecomarket-user");
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
