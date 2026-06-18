import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  const logout = async () => {
    try {
      const res = await api.post("/api/logout", {
        withCredentials: true,
      });

      setUser(null);
      navigate("/listings");
      toast.success(
        res?.data?.message ||
          "Thank you for using Wanderlust! You are logged out!",
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "User does not exist");
    }
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-8 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-6">
        <NavLink
          to="/listings"
          className="text-rose-500 text-3xl hover:scale-110 transition"
        >
          <i className="fa-solid fa-compass"></i>
        </NavLink>

        <NavLink
          to="/listings"
          className=" font-medium text-gray-700 hover:text-black"
        >
          Explore
        </NavLink>
      </div>

      <div className="flex items-center gap-5">
        {user && (
          <NavLink
            to="/listings/new"
            className="font-medium text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-full"
          >
            Airbnb your home
          </NavLink>
        )}

        {user ? (
          <button
            onClick={logout}
            className="px-4 py-2 border rounded-full hover:shadow-md"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/signup" className="font-medium">
              Sign up
            </NavLink>

            <NavLink to="/login" className="font-medium">
              Log in
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
