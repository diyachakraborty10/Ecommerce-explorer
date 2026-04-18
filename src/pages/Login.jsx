import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) return alert("Enter a name");
    login(name);
    navigate("/");
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-gray-300 px-4">

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full bg-gray-100 border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg cursor-pointer"
        >
          Login
        </button>

      </div>

    </div>
  );
}