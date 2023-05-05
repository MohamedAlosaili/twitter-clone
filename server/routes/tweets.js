import express from "express";

const router = express.Router();

import {
  addTweet,
  deleteTweet,
  getTweet,
  getTweets,
  updateTweet,
} from "../controllers/tweets.js";

import protect from "../middlewares/protect.js";

router.route("/").get(getTweets).post(protect, addTweet);

router
  .route("/:id")
  .get(getTweet)
  .put(protect, updateTweet)
  .delete(protect, deleteTweet);

export default router;
