import express from "express";
import multer from "multer";

const router = express.Router();

import repliesRouter from "./replies.js";
import reactionsRouter from "./reactions.js";

import {
  addTweet,
  deleteTweet,
  getTweet,
  getTweets,
  updateTweet,
} from "../controllers/tweets.js";

import advancedResults from "../middlewares/advancedResults.js";
import protect from "../middlewares/protect.js";
import uploadMedia from "../middlewares/uploadMedia.js";

router.use("/:tweetId/replies", repliesRouter);
router.use("/:tweetId/reactions", reactionsRouter);

const upload = multer();

router
  .route("/")
  .get(getTweets, advancedResults)
  .post(protect, upload.array("media"), uploadMedia, addTweet);

router
  .route("/:id")
  .get(getTweet)
  .put(protect, updateTweet)
  .delete(protect, deleteTweet);

export default router;
