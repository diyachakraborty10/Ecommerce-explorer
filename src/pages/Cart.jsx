import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return <p className="text-center mt-20">Cart is empty</p>;

  return (
    <div className="pt-20 min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        {cart.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-3"
          >
            <p className="w-40 text-sm">{item.title}</p>

            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                updateQty(item.id, Number(e.target.value))
              }
              className="w-16 border text-center rounded"
            />

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}

        <h2 className="font-bold text-lg mt-4 text-right">
          Total: ${total.toFixed(2)}
        </h2>

      </div>

    </div>
  );
}