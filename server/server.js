// Setup environment variables
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on PORT:${PORT}`.yellow.bold)
);

process.on("unhandledRejection", error => {
  console.log(`${error.stack}`.red);

  server.close(() => process.exit(1));
});
