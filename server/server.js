// Setup environment variables
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import path from "path";
import express from "express";
import colors from "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import passportSetup from "./config/passport.js";
passportSetup(passport);

// Route files
import auth from "./routes/auth.js";
import tweets from "./routes/tweets.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Mount Routes
app.use("/api/auth", auth);
app.use("/api/tweets", tweets);

// TODO: In production this will be client/dist
app.use(express.static(path.join(process.cwd(), "..", "testAPI", "dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(process.cwd(), "..", "testAPI", "dist", "index.html"))
);

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
