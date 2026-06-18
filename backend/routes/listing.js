import express from "express"
const router = express.Router();
import { isLoggedin, isOwner, validateListing } from "../middleware.js";
import wrapAsync from "../utils/wrapAsync.js"
import listingController from "../controllers/listings.js";
import multer from "multer";
import { storage } from "../cloudConfig.js";
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));

export default router;
