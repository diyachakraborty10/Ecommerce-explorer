import { useEffect, useState, useRef } from "react";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    getCategories().then(res => setCategories(res.data));
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);

    const result = products.filter(p =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(result);
    setPage(1);
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    setOpen(false);

    if (cat === "all") setFiltered(products);
    else getProductsByCategory(cat).then(res => setFiltered(res.data));

    setPage(1);
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500 mt-10">Error loading data</p>;

  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  const isFirstPage = page === 1;
  const isLastPage = start + itemsPerPage >= filtered.length;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-200 via-indigo-100 to-gray-300 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Explore Products
        </h1>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4">

          {/* Search */}
          <input
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none"
          />

          {/* Clear */}
          <button
            onClick={() => {
              setSearchTerm("");
              setFiltered(products);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer"
          >
            Clear
          </button>

          {/* CUSTOM DROPDOWN */}
          <div className="relative w-full md:w-60" ref={dropdownRef}>

            <button
              onClick={() => setOpen(!open)}
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-lg text-left cursor-pointer"
            >
              {selectedCategory === "all" ? "All Categories" : selectedCategory}
            </button>

            {open && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10 overflow-hidden">

                <div
                  onClick={() => handleCategory("all")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  All Categories
                </div>

                {categories.map(c => (
                  <div
                    key={c}
                    onClick={() => handleCategory(c)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {c}
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 mt-10">
              No products found
            </div>
          ) : (
            paginated.map(p => (
              <ProductCard key={p.id} product={p} />
            ))
          )}

        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">

            {!isFirstPage && (
              <button
                onClick={() => setPage(p => p - 1)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:scale-105 transition cursor-pointer"
              >
                ← Prev
              </button>
            )}

            {!isLastPage && (
              <button
                onClick={() => setPage(p => p + 1)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md hover:scale-105 transition cursor-pointer"
              >
                Next →
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
}