import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function ListingShow() {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const loadListing = async () => {
    try {
      const res = await api.get(`/listings/${id}`);
      setList(res.data.listing);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load listing");
      navigate("/listings");
    }
  };

  useEffect(() => {
    loadListing();
  }, [id]);

  const handleDeleteListing = async () => {
    setIsDeleteLoading(true);
    try {
      const res = await api.delete(`/listings/${id}`);
      toast.success(res.data.message);
      navigate("/listings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete listing");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsReviewLoading(true);
    try {
      const res = await api.post(`/listings/${id}/reviews`, { review: { rating: Number(rating), comment } });
      toast.success(res.data.message);
      loadListing();
      setRating(1);
      setComment("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create review");
    } finally {
      setIsReviewLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await api.delete(`/listings/${id}/reviews/${reviewId}`);
      toast.success(res.data.message);
      loadListing();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  };

  if (!list) return null;

  const isOwner =
    user && String(list.owner._id) === String(user._id);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{list.title}</h1>

        <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-6">
          <img
            src={list.image?.url}
            alt={list.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-700 mb-4">{list.description}</p>
            <p className="text-xl font-semibold text-gray-800 mb-2">₹{list.price.toLocaleString("en-IN")} / night</p>
            <p className="text-gray-600 mb-1">📍 {list.location}, {list.country}</p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <Link
            to={`/listings/${list._id}/edit`}
            className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
          >
            Edit Listing
          </Link>
          <button
            disabled={isDeleteLoading}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition disabled:opacity-50"
            onClick={handleDeleteListing}
          >
            {isDeleteLoading ? "Deleting..." : "Delete Listing"}
          </button>
        </div>

        <div className="space-y-6">
          {user && (
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-300"} hover:text-yellow-500 transition`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isReviewLoading}
                  className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition disabled:opacity-50"
                >
                  {isReviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          )}

          {list.reviews.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">All Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {list.reviews.map((review) => (
                  <div key={review._id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{review.author.username}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt)
                          .toString()
                          .split(" ")
                          .slice(0, 4)
                          .join(" ")}
                      </span>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    {review.author._id === user._id && (
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
