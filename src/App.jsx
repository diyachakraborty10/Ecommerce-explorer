import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>

          <Navbar />

          <Routes>
            <Route path="/" element={<Protected><Home /></Protected>} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Protected><Cart /></Protected>} />
            <Route path="/product/:id" element={<Protected><ProductDetails /></Protected>} />
          </Routes>

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}