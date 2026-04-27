import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// ==================== TYPES ====================

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishlistItem extends Product {}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status:
    | "pending"
    | "confirmed"
    | "shipping"
    | "delivered"
    | "cancelled"
    | "returned";
  items: CartItem[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

// ==================== CONTEXT ====================

interface CustomerContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    size?: string,
    color?: string,
  ) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "orderNumber" | "date">) => void;
  getOrderById: (orderId: string) => Order | undefined;
  cancelOrder: (orderId: string) => void;
  requestReturn: (orderId: string, reason: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void;
  getProductReviews: (productId: string) => Review[];
  markReviewHelpful: (reviewId: string) => void;

  // Customer Info
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null;
  updateCustomerInfo: (info: any) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined,
);

const CART_KEY = "fashion-store-cart";
const WISHLIST_KEY = "fashion-store-wishlist";
const ORDERS_KEY = "fashion-store-customer-orders";
const REVIEWS_KEY = "fashion-store-reviews";
const CUSTOMER_INFO_KEY = "fashion-store-customer-info";

// ==================== PROVIDER ====================

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [customerInfo, setCustomerInfo] = useState<any>(null);

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) setCartItems(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (storedWishlist) setWishlistItems(JSON.parse(storedWishlist));

      const storedOrders = localStorage.getItem(ORDERS_KEY);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        // Initialize with sample orders
        const sampleOrders: Order[] = [
          {
            id: "1",
            orderNumber: "DH2026042701",
            date: "27/04/2026 14:30",
            status: "delivered",
            items: [
              {
                id: "1",
                name: "Giày Chạy Bộ Nike Air Zoom Pegasus 40",
                price: 3290000,
                oldPrice: 3990000,
                image:
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
                quantity: 1,
                category: "Giày thể thao",
                brand: "Nike",
                description: "Giày chạy bộ cao cấp",
                sizes: ["40", "41", "42"],
                colors: ["Đen", "Trắng"],
                rating: 4.8,
                reviews: 156,
                inStock: true,
                selectedSize: "42",
                selectedColor: "Đen",
              },
            ],
            total: 3290000,
            shippingAddress:
              "123 Nguyễn Văn Linh, Phường 1, Quận 1, TP. Hồ Chí Minh",
            paymentMethod: "COD",
            trackingNumber: "VN123456789",
            customerInfo: {
              fullName: "Nguyễn Văn A",
              phone: "0123456789",
              email: "customer@example.com",
            },
          },
        ];
        setOrders(sampleOrders);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(sampleOrders));
      }

      const storedReviews = localStorage.getItem(REVIEWS_KEY);
      if (storedReviews) setReviews(JSON.parse(storedReviews));

      const storedCustomerInfo = localStorage.getItem(CUSTOMER_INFO_KEY);
      if (storedCustomerInfo) setCustomerInfo(JSON.parse(storedCustomerInfo));
    } catch (err) {
      console.error("Error loading customer data:", err);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (customerInfo) {
      localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify(customerInfo));
    }
  }, [customerInfo]);

  // ==================== CART METHODS ====================

  const addToCart = (
    product: Product,
    quantity: number = 1,
    size?: string,
    color?: string,
  ) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // ==================== WISHLIST METHODS ====================

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // ==================== ORDER METHODS ====================

  const createOrder = (
    orderData: Omit<Order, "id" | "orderNumber" | "date">,
  ) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: `DH${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(orders.length + 1).padStart(2, "0")}`,
      date: new Date().toLocaleString("vi-VN"),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order,
      ),
    );
  };

  const requestReturn = (orderId: string, reason: string) => {
    console.log(`Return requested for order ${orderId}: ${reason}`);
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "returned" } : order,
      ),
    );
  };

  // ==================== REVIEW METHODS ====================

  const addReview = (review: Omit<Review, "id" | "date" | "helpful">) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("vi-VN"),
      helpful: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter((review) => review.productId === productId);
  };

  const markReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review,
      ),
    );
  };

  // ==================== CUSTOMER INFO ====================

  const updateCustomerInfo = (info: any) => {
    setCustomerInfo(info);
  };

  return (
    <CustomerContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        orders,
        createOrder,
        getOrderById,
        cancelOrder,
        requestReturn,
        reviews,
        addReview,
        getProductReviews,
        markReviewHelpful,
        customerInfo,
        updateCustomerInfo,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within CustomerProvider");
  }
  return context;
}
