import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Product interface to match existing Product type
interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  sku: string;
  unit: string;
  supplierId: number;
  discount?: number;
}

export interface CartItem {
  id: number;              // Unique cart item ID
  productId: number;       // Reference to Product
  name: string;
  image: string;           // Product image path
  unitPrice: number;
  quantity: number;
  total: number;           // unitPrice * quantity
}

export interface OrderSummary {
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  shipping: number;
  grandTotal: number;
}

interface CartContextType {
  items: CartItem[];
  orderSummary: OrderSummary;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  getTotalItems: () => number;
  appliedCouponCode: string | null;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'octocat-cart';
const DEFAULT_SHIPPING = 10;

// Hardcoded coupons
const COUPONS: Record<string, number> = {
  'SAVE5': 5,
  'SAVE10': 10,
  'WELCOME15': 15,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setItems(data.items || []);
        setDiscountPercent(data.discountPercent || 0);
        setAppliedCouponCode(data.appliedCouponCode || null);
      } catch (error) {
        console.error('Failed to parse cart data:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      items,
      discountPercent,
      appliedCouponCode,
    }));
  }, [items, discountPercent, appliedCouponCode]);

  // Calculate order summary
  const calculateOrderSummary = (): OrderSummary => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = (subtotal * discountPercent) / 100;
    const shipping = items.length > 0 ? DEFAULT_SHIPPING : 0;
    const grandTotal = subtotal - discountAmount + shipping;

    return {
      subtotal,
      discountPercent,
      discountAmount,
      shipping,
      grandTotal,
    };
  };

  const orderSummary = calculateOrderSummary();

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.productId === product.productId);
      
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].total = updatedItems[existingItemIndex].unitPrice * updatedItems[existingItemIndex].quantity;
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now(), // Simple unique ID generation
          productId: product.productId,
          name: product.name,
          image: product.imgName,
          unitPrice: product.discount ? product.price * (1 - product.discount) : product.price,
          quantity,
          total: (product.discount ? product.price * (1 - product.discount) : product.price) * quantity,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id
          ? { ...item, quantity, total: item.unitPrice * quantity }
          : item
      )
    );
  };

  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (COUPONS[upperCode]) {
      setDiscountPercent(COUPONS[upperCode]);
      setAppliedCouponCode(upperCode);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setDiscountPercent(0);
    setAppliedCouponCode(null);
  };

  const clearCart = () => {
    setItems([]);
    setDiscountPercent(0);
    setAppliedCouponCode(null);
  };

  const getTotalItems = (): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        orderSummary, 
        addItem, 
        removeItem, 
        updateQuantity, 
        applyCoupon, 
        removeCoupon, 
        clearCart, 
        getTotalItems,
        appliedCouponCode,
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
