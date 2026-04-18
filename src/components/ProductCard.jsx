import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-4 h-[260px] flex flex-col justify-between cursor-pointer hover:scale-[1.02]">

        <div className="h-28 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>

        <h2 className="text-sm text-gray-700 mt-2 line-clamp-2 min-h-[40px]">
          {product.title}
        </h2>

        <p className="text-lg font-semibold text-blue-600">
          ${product.price}
        </p>

      </div>
    </Link>
  );
}