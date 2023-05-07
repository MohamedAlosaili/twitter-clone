import asyncHandler from "../middlewares/asyncHandler.js";
import Tweet from "../models/Tweet.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Get all tweets
// @route   GET /api/tweets
// access   Public
export const getTweets = asyncHandler(async (req, res, next) => {
  const tweets = await Tweet.find().populate(
    "authorId",
    "name username avatar"
  );

  // TODO: Add a limit & pages properties
  res.status(200).json({
    success: true,
    data: tweets,
    count: tweets.length,
  });
});

// @desc    Get single tweet
// @route   GET /api/tweets/:id
// access   Public
export const getTweet = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const populateAuthorInfo = {
    path: "authorId",
    select: "name username avatar",
  };
  // populate("tweetId") if the tweet is a reply type
  const tweet = await Tweet.findById(id).populate([
    populateAuthorInfo,
    {
      path: "tweetId",
      populate: populateAuthorInfo,
    },
  ]);

  if (!tweet) {
    return next(new ErrorResponse("Tweet not found", 404));
  }

  res.status(200).json({
    success: true,
    data: tweet,
  });
});

// @desc    Add tweet
// @route   POST /api/tweets
// access   Private - anyone logged in
export const addTweet = asyncHandler(async (req, res, next) => {
  req.body.authorId = req.user.id;
  const tweet = await Tweet.create(req.body);

  res.status(201).json({
    success: true,
    data: tweet,
    message: "Your Tweet was sent",
  });
});

// @desc    Update tweet
// @route   PUT /api/tweets/:id
// access   Private - only tweet owner
export const updateTweet = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let tweet = await Tweet.findById(id);

  if (!tweet) {
    return next(new ErrorResponse("Tweet not found", 404));
  }

  if (req.user.id !== tweet.authorId.toString()) {
    return next(new ErrorResponse("Not authorized to update this tweet", 401));
  }

  if (tweet.updatesLeft === 0) {
    return next(
      new ErrorResponse("Cannot update tweet. Maximum updates reached", 403)
    );
  }

  const { content } = req.body;
  const updatesLeft = tweet.updatesLeft - 1;

  tweet = await Tweet.findByIdAndUpdate(
    id,
    {
      content,
      updatesLeft,
    },
    { new: true, runValidators: true }
  );

  const message = `Tweet updated successfully. ${updatesLeft} update${
    updatesLeft > 1 ? "s" : ""
  } left`;

  res.status(200).json({
    success: true,
    data: tweet,
    message,
  });
});

// @desc    Delete tweet
// @route   DELETE /api/tweets/:id
// access   Private - only tweet owner
export const deleteTweet = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const tweet = await Tweet.findById(id);

  if (!tweet) {
    return next(new ErrorResponse("Tweet not found", 404));
  }

  if (req.user.id !== tweet.authorId.toString()) {
    return next(new ErrorResponse("Not authorized to delete this tweet", 401));
  }

  await tweet.deleteOne();

  res.status(200).json({
    success: true,
    data: null,
    message: "Tweet deleted successfully",
  });
});
