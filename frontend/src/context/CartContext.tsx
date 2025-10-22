import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
}

export interface CouponState {
  code: string;
  isValid: boolean;
  discountPercent: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: { productId: number; name: string; image: string; price: number }, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  coupon: CouponState | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'octocat_cart';
const COUPON_STORAGE_KEY = 'octocat_coupon';

// Valid coupons with their discount percentages
const VALID_COUPONS: Record<string, number> = {
  'SAVE5': 5,
  'SAVE10': 10,
  'SAVE15': 15,
  'WELCOME': 20,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [coupon, setCoupon] = useState<CouponState | null>(() => {
    const stored = localStorage.getItem(COUPON_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Persist coupon to localStorage whenever it changes
  useEffect(() => {
    if (coupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [coupon]);

  const addToCart = (product: { productId: number; name: string; image: string; price: number }, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.productId);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now(),
          productId: product.productId,
          name: product.name,
          image: product.image,
          unitPrice: product.price,
          quantity,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  };

  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (VALID_COUPONS[upperCode]) {
      setCoupon({
        code: upperCode,
        isValid: true,
        discountPercent: VALID_COUPONS[upperCode],
      });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
        coupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
