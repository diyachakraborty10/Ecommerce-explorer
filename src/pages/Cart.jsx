import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-gray-300">
        <p className="text-gray-600 text-lg">Cart is empty</p>
      </div>
    );

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-200 via-indigo-100 to-gray-300 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">

        <h1 className="text-xl font-bold mb-6 text-gray-800">
          Your Cart
        </h1>

        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b py-4 gap-4">

            <div className="flex items-center gap-3 w-1/2">
              <img src={item.image} className="w-14 h-14 object-contain" />
              <p className="text-sm text-gray-700">
                {item.title.slice(0, 50)}...
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  item.quantity > 1 &&
                  updateQty(item.id, item.quantity - 1)
                }
                className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQty(item.id, item.quantity + 1)
                }
                className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="flex flex-col items-end gap-1">
              <p className="text-sm font-semibold text-blue-600">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-xs cursor-pointer"
              >
                Remove
              </button>
            </div>

          </div>
        ))}

        <h2 className="text-right font-semibold mt-6 text-lg">
          Total: ${total.toFixed(2)}
        </h2>

      </div>
    </div>
  );
}