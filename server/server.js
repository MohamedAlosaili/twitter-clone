// Setup environment variables
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

// Route files
import auth from "./routes/auth.js";

const app = express();
connectDB();

app.use(express.json());

// Mount Routes
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`.yellow.bold);
  console.log(
    `Environment: `.yellow.bold + `${process.env.NODE_ENV}`.blue.bold
  );
});

process.on("unhandledRejection", error => {
  console.log(`${error.stack}`.red);

  server.close(() => process.exit(1));
});
