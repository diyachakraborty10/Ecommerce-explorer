import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const active = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-50/90 backdrop-blur-md shadow-sm px-4 py-3">

      {isLoginPage ? (
        <div className="flex justify-center">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-blue-600"
          >
            ShopEase
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">

          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold text-blue-600"
            >
              ShopEase
            </Link>

            <Link
              to="/cart"
              className={`md:hidden ${active("/cart")} text-sm`}
            >
              Cart ({cart.length})
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm md:text-base">

            <div className="flex gap-4">
              <Link to="/" className={active("/")}>
                Home
              </Link>

              <Link
                to="/cart"
                className={`hidden md:block ${active("/cart")}`}
              >
                Cart ({cart.length})
              </Link>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs md:text-sm truncate max-w-[80px] md:max-w-none">
                  {user}
                </span>

                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}