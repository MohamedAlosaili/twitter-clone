import express from "express";
import passport from "passport";

const router = express.Router();

import { getMe, logOut, login, signup } from "../controllers/auth.js";

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

router.get("/me", getMe);

export default router;
