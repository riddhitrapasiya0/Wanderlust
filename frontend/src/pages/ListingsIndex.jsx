import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function ListingsIndex() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showTax, setShowTax] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    ;(async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category) params.set("category", category);
        const res = await api.get(`/api/listings?${params}`);
        setListings(res.data || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load listings");
      }
    })();
  }, [search, category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">
        Wanderlust Listings
      </h1>

      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations"
          className="border rounded-full px-6 py-2 w-full sm:w-80 outline-none"
        />

        <button type="submit" className="bg-rose-400 text-white rounded-full px-5 py-2 w-full sm:w-auto">
          <i className="fa-solid fa-magnifying-glass mr-1"></i> Search
        </button>
      </form>

      <div className="mb-8 border-b pb-4">
        <div className="flex gap-6 overflow-x-auto whitespace-nowrap py-2 scrollbar-hide">
          <div
            onClick={() => setCategory("")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-fire text-xl"></i>
            <p className="text-sm">Trending</p>
          </div>

          <div
            onClick={() => setCategory("Mountains")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-mountain text-xl"></i>
            <p className="text-sm">Mountains</p>
          </div>

          <div
            onClick={() => setCategory("Beach")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-umbrella-beach text-xl"></i>
            <p className="text-sm">Beach</p>
          </div>

          <div
            onClick={() => setCategory("Desert")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-sun text-xl"></i>
            <p className="text-sm">Desert</p>
          </div>

          <div
            onClick={() => setCategory("Arctic")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-snowflake text-xl"></i>
            <p className="text-sm">Arctic</p>
          </div>

          <div
            onClick={() => setCategory("Jungle")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-tree text-xl"></i>
            <p className="text-sm">Jungle</p>
          </div>

          <div
            onClick={() => setCategory("Island")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-igloo text-xl"></i>
            <p className="text-sm">Island</p>
          </div>

          <div
            onClick={() => setCategory("Lakefront")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-water text-xl"></i>
            <p className="text-sm">Lakefront</p>
          </div>

          <div
            onClick={() => setCategory("Hill Station")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-mountain-city text-xl"></i>
            <p className="text-sm">Hill Station</p>
          </div>

          <div
            onClick={() => setCategory("Snow Stay")}
            className="flex flex-col items-center text-gray-500 cursor-pointer hover:text-black flex-shrink-0"
          >
            <i className="fa-solid fa-igloo text-xl"></i>
            <p className="text-sm">Snow Stay</p>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end mt-4">
          <div className="border rounded-xl px-4 py-2 w-full sm:w-auto bg-white">
            <label className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
              Display total after taxes
              <input
                type="checkbox"
                checked={showTax}
                onChange={() => setShowTax(!showTax)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <NavLink to={`/listings/${listing._id}`} key={listing._id}>
            <div className="overflow-hidden cursor-pointer">
              <img
                src={listing.image?.url}
                alt={listing.title}
                className="w-full h-60 sm:h-64 md:h-72 rounded-2xl object-cover hover:scale-105 transition duration-300"
              />

              <div className="mt-2">
                <h3 className="font-semibold text-lg truncate">
                  {listing.title}
                </h3>

                <p className="text-gray-700">
                  ₹{showTax ? Math.round(listing.price * 1.18) : listing.price}{" "}
                  / night
                </p>

                {showTax && (
                  <p className="text-sm text-gray-500">Includes 18% GST</p>
                )}

                <p className="inline-block mt-2 text-blue-600">View Details</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ListingsIndex;
