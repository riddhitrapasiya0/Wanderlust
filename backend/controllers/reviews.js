import Listing from "../models/listing.js";
import Review from "../models/review.js";

const createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.json({ review: newReview, message: "New Review Created!" });
};

const destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.json({ message: "Review Successfully Deleted!" });
};

export default {
  createReview,
  destroyReview,
};
