import { useEffect, useState } from "react";
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

  const handleSearch = (value) => {
    setSearchTerm(value);
    const result = products.filter(p =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  };

  const handleCategory = (cat) => {
    if (cat === "all") setFiltered(products);
    else getProductsByCategory(cat).then(res => setFiltered(res.data));
    setPage(1);
  };

  if (loading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500 mt-10">Error loading data</p>;

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

        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4">

          <input
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-gray-100 border border-gray-300 p-3 rounded-lg focus:outline-none"
          />

          <button
            onClick={() => {
              setSearchTerm("");
              setFiltered(products);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer"
          >
            Clear
          </button>

          <select
            onChange={(e) => handleCategory(e.target.value)}
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>

        </div>

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

        {filtered.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">

            {!isFirstPage && (
              <button
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                Prev
              </button>
            )}

            {!isLastPage && (
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                Next
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
}