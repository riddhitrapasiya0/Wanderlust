import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function ListingEdit() {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setList(res.data.listing);
        setTitle(res.data.listing.title);
        setDescription(res.data.listing.description);
        setPrice(res.data.listing.price);
        setCountry(res.data.listing.country);
        setLocation(res.data.listing.location);
        setCategory(res.data.listing.category);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load listing");
        navigate("/listings");
      }
    };
    loadListing();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("listing[title]", title);
    formData.append("listing[description]", description);
    if (image) {
      formData.append("listing[image]", image);
    }
    formData.append("listing[price]", price);
    formData.append("listing[location]", location);
    formData.append("listing[country]", country);
    formData.append("listing[category]", category);

    try {
      const res = await api.put(`/listings/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      navigate(`/listings/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update listing");
    } finally {
      setIsLoading(false);
    }
  };

  if (!list) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Listing</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="5"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Image</label>
            <img
              src={list.image?.url}
              alt={list.title}
              className="max-h-64 rounded-lg mb-3 object-cover"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <option value="">Select Category</option>
              <option value="Mountains">Mountains</option>
              <option value="Beach">Beach</option>
              <option value="Desert">Desert</option>
              <option value="Arctic">Arctic</option>
              <option value="Jungle">Jungle</option>
              <option value="Countryside">Countryside</option>
              <option value="Island">Island</option>
              <option value="Lakefront">Lakefront</option>
              <option value="Hill Station">Hill Station</option>
              <option value="Snow Stay">Snow Stay</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition w-full md:w-auto disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
