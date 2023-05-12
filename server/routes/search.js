import express from "express";

const router = express.Router();

import { search } from "../controllers/search.js";

import advancedResults from "../middlewares/advancedResults.js";

router.get("/", search, advancedResults);

export default router;
