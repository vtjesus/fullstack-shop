"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCartToLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const addToCart = (item: CartItem) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};