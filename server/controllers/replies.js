import Tweet from "../models/Tweet.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Get all replies for a tweet
// @route   GET /api/tweets/:tweetId/replies
// access   Public
export const getTweetReplies = (req, res, next) => {
  const { tweetId } = req.params;

  req.model = Tweet;
  req.queryMethod = "find";
  req.controllerFilters = { type: "reply", tweetId };
  req.populate = { path: "authorId", select: "name username avatar" };

  res.status(200);

  next();
};

// @desc    Add a reply
// @route   POST /api/tweets/:tweetId/replies
// access   Private - anyone logged in
export const addReply = asyncHandler(async (req, res, next) => {
  const { tweetId } = req.params;

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return next(new ErrorResponse("Tweet not found", 404));
  }

  req.body.tweetId = tweetId;
  req.body.authorId = req.user.id;
  const reply = await Tweet.create(req.body);

  res.status(201).json({
    success: true,
    data: reply,
    message: "Your tweet was sent.",
  });
});
