import "dotenv/config";

import express from "express";
const app = express();
import mongoose from "mongoose";
import methodOverride from "method-override";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import cors from "cors";
import User from "./models/user.js";
import ExpressError from "./utils/ExpressError.js";

import listingRouter from "./routes/listing.js";
import reviewsRouter from "./routes/review.js";
import userRouter from "./routes/user.js";

const DBurl = process.env.ATLASDB_URL;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

main()
  .then(() => {
    console.log("cunnection succsessful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DBurl);
}

const store = MongoStore.create({
  mongoUrl: DBurl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  },
};

if (process.env.NODE_ENV === "production") {
  sessionOptions.cookie.secure = true;
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
  })
);

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/api/user", (req, res) => {
  res.json({ user: req.user || null });
});

app.get("/api/flash", (req, res) => {
  const success = req.flash("success");
  const error = req.flash("error");
  res.json({ success: success[0] || null, error: error[0] || null });
});

app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api", userRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  console.log(err);
  res.status(statusCode).json({ statusCode, message });
});

const port = process.env.PORT || 2006;

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
