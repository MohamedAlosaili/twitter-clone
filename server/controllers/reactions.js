import Reaction from "../models/Reaction.js";
import Tweet from "../models/Tweet.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Get tweet reactions (likes & retweets)
// @route   GET /api/tweets/:tweetId/reactions?type=like|retweet
// access   Public
export const getTweetReactions = (req, res, next) => {
  const { type } = req.query;
  const { tweetId } = req.params;

  req.model = Reaction;
  req.queryMethod = "find";
  req.controllerFilters = { tweetId, type };
  req.populate = { path: "authorId", select: "name username avatar bio" };

  res.status(200);

  next();
};

// @desc    Add reaction
// @route   POST /api/tweets/:tweetId/reactions
// access   Private - anyone logged in
export const addReaction = asyncHandler(async (req, res, next) => {
  const { tweetId } = req.params;

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return next(new ErrorResponse("Tweet not found", 404));
  }

  const type = req.body.type;
  await Reaction.create({ type, tweetId, authorId: req.user.id });

  res.status(201).json({
    success: true,
    data: null,
    message: `Reaction added`,
  });
});

// @desc    Remove reaction
// @route   DELETE /api/tweets/:tweetId/reactions?type=like|retweet
// access   Private - anyone logged in
export const removeReaction = asyncHandler(async (req, res, next) => {
  const { type } = req.query;
  const { tweetId } = req.params;

  const reaction = await Reaction.findOne({
    type,
    tweetId,
    authorId: req.user.id,
  });

  if (!reaction) {
    return next(new ErrorResponse(`No reaction found`, 404));
  }

  await reaction.deleteOne();

  res.status(200).json({
    success: true,
    data: null,
    message: `Reaction removed`,
  });
});
