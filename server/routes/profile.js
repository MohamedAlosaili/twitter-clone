import express from "express";
import multer from "multer";

import {
  addPinnedTweet,
  removePinnedTweet,
  updateProfile,
  updateProfileImages,
} from "../controllers/profile.js";

import protect from "../middlewares/protect.js";
import uploadProfileImages from "../middlewares/uploadProfileImages.js";

const router = express.Router();

const upload = multer();

router.put("/", protect, updateProfile);

router.put(
  "/images",
  protect,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "header", maxCount: 1 },
  ]),
  uploadProfileImages,
  updateProfileImages
);

router.post("/pinnedtweet", protect, addPinnedTweet);
router.delete("/pinnedtweet", protect, removePinnedTweet);

export default router;
