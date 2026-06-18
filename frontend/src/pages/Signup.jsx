import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/api/signup", { username, email, password });
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate("/listings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-md">
        <div className="text-center mb-8">
          <div className="text-rose-500 text-4xl mb-4">
            <i className="fa-solid fa-compass"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Sign Up to Wanderlust</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition w-full"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-500 hover:text-rose-600 font-medium">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
