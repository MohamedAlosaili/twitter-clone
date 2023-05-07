import Like from "../models/Like.js";
import Tweet from "../models/Tweet.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Get tweet likes
// @route   GET /api/tweets/:tweetId/likes
// access   Public
export const getTweetLikes = asyncHandler(async (req, res, next) => {
  const { tweetId } = req.params;

  const likes = await Like.find({ tweetId }).populate(
    "authorId",
    "name username avatar bio"
  );

  res.status(200).json({
    success: true,
    data: likes,
  });
});

// @desc    Add like
// @route   POST /api/tweets/:tweetId/likes
// access   Private - anyone logged in
export const addLike = asyncHandler(async (req, res, next) => {
  const { tweetId } = req.params;

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return next(new ErrorResponse("Tweet not found", 404));
  }

  await Like.create({ tweetId, authorId: req.user.id });

  res.status(201).json({
    success: true,
    data: null,
    message: "Like added ♥",
  });
});

// @desc    Remove like
// @route   DELETE /api/tweets/:tweetId/likes
// access   Private - anyone logged in
export const removeLike = asyncHandler(async (req, res, next) => {
  const { tweetId } = req.params;

  const like = await Like.findOne({
    tweetId,
    authorId: req.user.id,
  });

  if (!like) {
    return next(
      new ErrorResponse(`There is no like for this user in this tweet`, 404)
    );
  }

  await like.deleteOne();

  res.status(200).json({
    success: true,
    data: null,
    message: "Like removed",
  });
});
