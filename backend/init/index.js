import mongoose from "mongoose";
import { data } from "./data.js";
import Listing from "../models/listing.js";

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const listings = data.map((obj) => ({
    ...obj,
    owner: "6a314d6e3d247b82566873f6",
  }));
  await Listing.insertMany(listings);
  console.log("data was initialized");
};

export { initDB };
