import Follow from "../models/Follow.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Add follow
// @route   POST /api/follows
// access   Private - anyone logged in
export const addFollow = asyncHandler(async (req, res, next) => {
  req.body.followerId = req.user.id;

  await Follow.create(req.body);

  res.status(201).json({
    success: true,
    data: null,
    message: "User followed",
  });
});

// @desc    Remove follow
// @route   DELETE /api/follows/:followingId
// access   Private - anyone logged in
export const removeFollow = asyncHandler(async (req, res, next) => {
  const { followingId } = req.params;

  const follow = await Follow.findOne({ followingId, followerId: req.user.id });

  if (!follow) {
    return next(new ErrorResponse(`Follow relationship not found`, 404));
  }

  await follow.deleteOne();

  res.status(200).json({
    success: true,
    data: null,
    message: `User unfollowed`,
  });
});
