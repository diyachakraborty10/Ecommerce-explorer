import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState([]);

  // Load cart when user changes
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`cart_${user}`);
      setCart(stored ? JSON.parse(stored) : []);
    } else {
      setCart([]);
    }
  }, [user]);

  // Save cart
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);

    if (existing) {
      setCart(cart.map(i =>
        i.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map(i =>
      i.id === id ? { ...i, quantity: qty } : i
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);