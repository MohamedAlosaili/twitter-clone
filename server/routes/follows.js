import express from "express";

const router = express.Router();

import { addFollow, removeFollow } from "../controllers/follows.js";

import protect from "../middlewares/protect.js";

router.post("/", protect, addFollow);
router.delete("/:followingId", protect, removeFollow);

export default router;
