import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import { saveRedirectUrl } from "../middleware.js";
import passport from "passport";

import userController from "../controllers/users.js";

router.route("/user").get(userController.userAvailableChack);

router.post("/signup", wrapAsync(userController.signup));

router
  .route("/login")
  .post(saveRedirectUrl, 
    passport.authenticate("local"), userController.login);

router.post("/logout", userController.logout);

export default router;
