import express from "express";

const router = express.Router({ mergeParams: true });

import {
  addReaction,
  getTweetReactions,
  removeReaction,
} from "../controllers/reactions.js";

import protect from "../middlewares/protect.js";
import advancedResults from "../middlewares/advancedResults.js";

router
  .route("/")
  .get(getTweetReactions, advancedResults)
  .post(protect, addReaction)
  .delete(protect, removeReaction);

export default router;
