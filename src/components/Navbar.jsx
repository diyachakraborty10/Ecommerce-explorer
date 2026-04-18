import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-50/90 backdrop-blur-md shadow-sm px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        ShopEase
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-6">

        <Link
          to="/"
          className={`${active("/")} cursor-pointer`}
        >
          Home
        </Link>

        <Link
          to="/cart"
          className={`${active("/cart")} cursor-pointer`}
        >
          Cart ({cart.length})
        </Link>

        {user ? (
          <div className="flex items-center gap-3">

            <span className="text-gray-600 text-sm">
              {user}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition cursor-pointer"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg transition cursor-pointer"
          >
            Login
          </Link>
        )}

      </div>
    </nav>
  );
}