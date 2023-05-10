import mongoose from "mongoose";

import User from "../models/User.js";
import Tweet from "../models/Tweet.js";
import Reaction from "../models/Reaction.js";
import Follow from "../models/Follow.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

import { getPageAndLimit, getPagination } from "../utils/pagination.js";

// @desc    Get user info
// @route   GET /api/users/:id
// access   Public
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

const lookup = (from, localField, foreignField, as, pipeline = []) => ({
  $lookup: {
    from: from,
    localField,
    foreignField,
    pipeline,
    as,
  },
});

// @desc    Get user followers and following list
// @route   GET /api/users/:id/follows/:type
// access   Public
export const getFollowLists = (req, res, next) => {
  const { id, type } = req.params;

  if (type !== "followers" && type !== "following") {
    return next(
      new ErrorResponse(
        `${type} not supported as a follow type. only 'followers' and 'following'`,
        400
      )
    );
  }

  req.model = Follow;
  req.queryMethod = "find";
  req.controllerFilters =
    type === "followers" ? { followingId: id } : { followerId: id };
  req.populate = {
    path: type === "followers" ? "followerId" : "followingId",
    select: "name username avatar bio",
  };

  res.status(200);

  next();
};

// @desc    Get user tweets
// @route   GET /api/users/:id/tweets?withReplies=???
// access   Public
export const getUserTweets = asyncHandler(async (req, res, next) => {
  const id = new mongoose.Types.ObjectId(req.params.id);

  const { page: pageNum, limit: limitNum, withReplies } = req.query;

  const { page, limit, startIndex } = getPageAndLimit(pageNum, limitNum);

  const authorIdLookup = [
    lookup("users", "authorId", "_id", "authorId", [
      { $project: { name: 1, username: 1, avatar: 1 } },
    ]),
    { $unwind: "$authorId" },
  ];

  const tweetIdLookup = [
    lookup("tweets", "tweetId", "_id", "tweetId", authorIdLookup),
    {
      $unwind: { path: "$tweetId", preserveNullAndEmptyArrays: true },
    },
  ];

  const tweets = await User.aggregate([
    { $match: { _id: id } },
    lookup("tweets", "_id", "authorId", "userTweets", [
      ...(withReplies ? [] : [{ $match: { type: "tweet" } }]),
      ...authorIdLookup,
      ...(withReplies ? tweetIdLookup : []),
    ]),
    lookup("reactions", "_id", "authorId", "retweets", [
      { $match: { type: "retweet" } },
      ...tweetIdLookup,
    ]),
    { $addFields: { tweets: { $concatArrays: ["$userTweets", "$retweets"] } } },
    { $unwind: "$tweets" },
    { $sort: { "tweets.createdAt": -1 } },
    { $replaceRoot: { newRoot: "$tweets" } },
  ])
    .skip(startIndex)
    .limit(limit);

  const [totalTweets, totalRetweets] = await Promise.all([
    Tweet.countDocuments({ type: "tweet", authorId: id }),
    Reaction.countDocuments({ type: "retweet", authorId: id }),
  ]);

  const total = totalTweets + totalRetweets;

  const pagination = getPagination(page, limit, total, tweets.length);

  res.status(200).json({
    success: true,
    data: tweets,
    pagination,
    total,
  });
});

// @desc    Get user likes
// @route   GET /api/users/:id/likes
// access   Public
export const getUserLikes = (req, res, next) => {
  const { id: authorId } = req.params;

  req.model = Reaction;
  req.queryMethod = "find";
  req.controllerFilters = { type: "like", authorId };
  req.populate = {
    path: "tweetId",
    populate: { path: "authorId", select: "name username avatar" },
  };

  res.status(200);

  next();
};

// @desc    Get user media
// @route   GET /api/users/:id/media
// access   Public
export const getUserMedia = (req, res, next) => {
  const { id: authorId } = req.params;

  req.model = Tweet;
  req.queryMethod = "find";
  req.controllerFilters = { authorId, media: { $ne: [] } };
  req.populate = {
    path: "tweetId",
    select: "authorId",
    populate: { path: "authorId", select: "name username avatar" },
  };

  res.status(200);

  next();
};
