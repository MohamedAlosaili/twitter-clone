import express from "express";
import passport from "passport";
import multer from "multer";

const router = express.Router();

import {
  forgotPassword,
  getMe,
  logOut,
  login,
  resetPassword,
  signup,
  updateProfile,
  updateProfileImages,
} from "../controllers/auth.js";

import uploadProfileImages from "../middlewares/uploadProfileImages.js";
import protect from "../middlewares/protect.js";

const upload = multer();

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

router.put("/profile", protect, updateProfile);

router.put(
  "/profile/images",
  protect,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "header", maxCount: 1 },
  ]),
  uploadProfileImages,
  updateProfileImages
);

router.post("/forgotpassword", forgotPassword);

router.post("/resetpassword", resetPassword);

export default router;
