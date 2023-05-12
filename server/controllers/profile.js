import User from "../models/User.js";
import Tweet from "../models/Tweet.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import mongoose from "mongoose";

// @desc    Update profile images
// @route   PUT /api/auth/profile/images
// access   Private - account owner
export const updateProfileImages = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body.images, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
    message: "Profile updated",
  });
});

// @desc    Update profile info
// @route   PUT /api/auth/profile
// access   Private - account owner
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, bio, location, website } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, bio, location, website },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: user,
    message: "Profile info updated",
  });
});

// @desc    Add pinned tweet
// @route   POST /api/auth/profile/pinnedtweet
// access   Private - account owner
export const addPinnedTweet = asyncHandler(async (req, res, next) => {
  const { tweetId } = req.body;
  const authorId = req.user.id;

  if (!tweetId) {
    return next(new ErrorResponse("Please provide a tweet id", 400));
  }

  const tweet = await Tweet.findOne({
    _id: tweetId,
    authorId,
  });

  if (!tweet) {
    return next(new ErrorResponse("Cannot pin this tweet", 400));
  }

  await User.findByIdAndUpdate(authorId, { pinnedTweet: tweetId });

  res.status(200).json({
    success: true,
    data: null,
    message: "Tweet has been pinned successfully",
  });
});

// @desc    Remove pinned tweet
// @route   DELETE /api/auth/profile/pinnedtweet
// access   Private - account owner
export const removePinnedTweet = asyncHandler(async (req, res, next) => {
  const authorId = req.user.id;

  await User.findByIdAndUpdate(authorId, { pinnedTweet: null });

  res.status(200).json({
    success: true,
    data: null,
    message: "Tweet has been successfully unpinned",
  });
});
