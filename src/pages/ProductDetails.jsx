import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <Loader />;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-200 via-indigo-100 to-gray-300 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-6">

        <img src={product.image} className="h-64 object-contain" />

        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600 mt-3">{product.description}</p>
            <p className="text-xl font-semibold text-blue-600 mt-4">
              ${product.price}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-6 cursor-pointer"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}