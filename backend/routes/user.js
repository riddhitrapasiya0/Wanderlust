import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import { saveRedirectUrl } from "../middleware.js";
import passport from "passport";

import userController from "../controllers/users.js";

router.post("/signup", wrapAsync(userController.signup));

router.post(
  "/login",
  saveRedirectUrl,
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        const message = info?.message || "Invalid username or password";
        req.flash("error", message);
        return res.status(401).json({ message });
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        next();
      });
    })(req, res, next);
  },
  userController.login
);

router.post("/logout", userController.logout);

export default router;
