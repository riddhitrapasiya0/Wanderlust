import Listing from "../models/listing.js";

let index = async (req, res) => {
  const lists = await Listing.find();

  if (req.query.search) {
    let filterLists1 = lists.filter((lists) =>
      lists.title.includes(req.query.search),
    );
    return res.send(filterLists1);
  }
  if (req.query.category) {
    const filterLists = lists.filter(
      (list) => list.category === req.query.category,
    );

    return res.send(filterLists);
  }
  if (lists.length === 0) {
    return res.status(200).json({
      success: true,
      listings: [],
    });
  }
  res.send(lists);
};

let renderNewForm = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
    message: "You can create a new listing",
  });
};

let showListing = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!list) {
    return res.status(404).json({
      success: false,
      message: "Listing you requested for dose not exist!",
    });
  }

  res.status(200).json({
    success: true,
    listing: list,
  });
};

let createListing = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const url = req.file.path;
    const filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = {
      url,
      filename,
    };

    await newListing.save();

    res.status(201).json({
      success: true,
      message: "Listig Successfully Created!",
      listing: newListing,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let renderEditForm = async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  if (!list) {
    return res.status(404).json({
      success: false,
      message: "Listing you requested for dose not exist!",
    });
  }

  let originalImageUrl = list.image.url.replace("/upload", "/upload/w_250");
  console.log(originalImageUrl);

  res.status(200).json({
    success: true,
    listing: list,
    originalImageUrl,
  });
};

let updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { returnDocument: "after" }
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  res.status(200).json({
    success: true,
    message: "Listig Successfully Edited!",
    user: req.user,
    listing,
  });
};

let destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Listig Successfully Deleted!",
  });
};

export default {
  index,
  renderEditForm,
  renderNewForm,
  showListing,
  createListing,
  updateListing,
  destroyListing,
};
