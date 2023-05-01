import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Signup user
// @route   POST /api/v1/auth/signup
// access   Public
export const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// access   Public
export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: username }, { username }],
  }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
