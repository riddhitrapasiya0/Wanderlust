import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import MongoStore from "connect-mongo";

import ExpressError from "./utils/ExpressError.js";
import User from "./models/user.js";

import listingRouter from "./routes/listing.js";
import reviewsRouter from "./routes/review.js";
import userRouter from "./routes/user.js";

const app = express();

main()
  .then(() => console.log("Database connected."))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      process.env.RENDER_DOMAIN,
      process.env.VERCEL_DOMAIN
    ],
    credentials: true,
    allowedHeaders: ["Content-Type","Authorization"]
  }),
);

app.set("trust proxy", 1);

const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api", userRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong!",
  });
});

const PORT = process.env.PORT || 2006;

app.listen(PORT, () => {
  console.log(`App Listening on port: ${PORT}`);
});
