import express from "express";

const router = express.Router();

import { login, signup } from "../controllers/users.js";

router.post("/signup", signup);
router.post("/login", login);

export default router;
