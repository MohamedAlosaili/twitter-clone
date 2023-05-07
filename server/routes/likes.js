import express from "express";

const router = express.Router({ mergeParams: true });

import { addLike, getTweetLikes, removeLike } from "../controllers/likes.js";

import protect from "../middlewares/protect.js";

router
  .route("/")
  .get(getTweetLikes)
  .post(protect, addLike)
  .delete(protect, removeLike);

export default router;
