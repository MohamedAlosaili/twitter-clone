import express from "express";

const router = express.Router();

import {
  getFollowLists,
  getUserLikes,
  getUserMedia,
  getUserProfile,
  getUserTweets,
} from "../controllers/users.js";

import advancedResults from "../middlewares/advancedResults.js";

router.get("/:id", getUserProfile);

router.get("/:id/tweets", getUserTweets, advancedResults);

router.get("/:id/media", getUserMedia, advancedResults);

router.get("/:id/likes", getUserLikes, advancedResults);

router.get("/:id/follow/:type", getFollowLists, advancedResults);

export default router;
