import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import path from "path";
import fs from "fs";
import colors from "colors";
import connectDB from "./config/db.js";
connectDB();

import User from "./models/User.js";
import Tweet from "./models/Tweet.js";
import Reaction from "./models/Reaction.js";
import Follow from "./models/Follow.js";

// Sample data files
const users = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "_data", "users.json"), "utf8")
);
const tweets = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "_data", "tweets.json"), "utf8")
);
const replies = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "_data", "replies.json"), "utf8")
);
const reactions = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "_data", "reactions.json"), "utf8")
);
const follows = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "_data", "follows.json"), "utf8")
);

const arg = process.argv[2];

if (arg === "i") {
  importData();
} else if (arg === "d") {
  deleteData();
} else {
  console.log(`
Invlaid arg ❌

choose either 'i' or 'd'
args:
    i: Import sample data to database
    d: Delete all the data in the database
    `);
  process.exit(1);
}

async function importData() {
  try {
    await User.create(users);
    await Tweet.create(tweets);
    await Tweet.create(replies);
    await Reaction.create(reactions);
    await Follow.create(follows);

    console.log("Data imported ☑️".green.inverse);
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function deleteData() {
  try {
    await User.deleteMany();
    await Tweet.deleteMany();
    await Reaction.deleteMany();
    await Follow.deleteMany();

    console.log("Data deleted ☑️".red.inverse);
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
