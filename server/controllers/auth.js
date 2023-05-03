import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc    Signup user
// @route   POST /api/v1/auth/signup
// access   Public
export const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendTokenAndCookie(user, 201, res);
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

  sendTokenAndCookie(user, 200, res);
});

function sendTokenAndCookie(user, statusCode, res) {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") options.secure = true;

  res.cookie("token", token, options);
  res.status(statusCode).json({
    success: true,
    token,
  });
}

// @desc    Signup user
// @route   POST /api/v1/auth/signup
// access   Public
export const logOut = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", { expires: new Date(Date.now()) });

  res.status(200).json({
    success: true,
    data: null,
    message: "Logged out successfully",
  });
});
