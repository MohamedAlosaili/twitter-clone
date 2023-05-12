import express from "express";
import passport from "passport";

import profileRouter from "./profile.js";

import {
  forgotPassword,
  getMe,
  logOut,
  login,
  resetPassword,
  signup,
} from "../controllers/auth.js";

import protect from "../middlewares/protect.js";

const router = express.Router();

router.use("/profile", profileRouter);

router.post("/signup", signup);

router.post("/login", login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res, next) => {
    res.requestFrom = "Google";
    next();
  },
  login
);

router.post("/logout", logOut);

router.get("/me", protect, getMe);

router.post("/forgotpassword", forgotPassword);

router.post("/resetpassword", resetPassword);

export default router;
