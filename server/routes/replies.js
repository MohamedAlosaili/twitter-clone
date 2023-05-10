import express from "express";
import multer from "multer";

const router = express.Router({ mergeParams: true });

import { getTweetReplies, addReply } from "../controllers/replies.js";

import protect from "../middlewares/protect.js";
import uploadMedia from "../middlewares/uploadMedia.js";
import advancedResults from "../middlewares/advancedResults.js";

const upload = multer();

router
  .route("/")
  .get(getTweetReplies, advancedResults)
  .post(protect, upload.array("media"), uploadMedia, addReply);

export default router;
