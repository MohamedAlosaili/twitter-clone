import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import { sendResetPasswordCode } from "../utils/sendEmail.js";

// @desc    Signup user
// @route   POST /api/auth/signup
// access   Public
export const signup = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendTokenAndCookie(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// access   Public
export const login = asyncHandler(async (req, res, next) => {
  let user;

  if (req.user) {
    // User from passoprt Google strategy
    user = req.user;
  } else {
    // Regular user login
    const { username, password } = req.body;
    user = await User.findOne({
      $or: [{ email: username }, { username }],
    }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
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

  if (res?.requestFrom === "Google") {
    res.redirect("/");
  } else {
    res.status(statusCode).json({
      success: true,
      token,
    });
  }
}

// @desc    Signup user
// @route   POST /api/auth/forgotpassword
// access   Public
export const logOut = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", { expires: new Date(Date.now()) });

  res.status(200).json({
    success: true,
    data: null,
    message: "Logged out successfully",
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// access   Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  const code = await sendResetPasswordCode(user);

  user.resetPasswordCode = code;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    code,
    message: "Email has been sent",
  });
});

// @desc    Reset password
// @route   POST /api/auth/resetpassword
// access   Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { code, password } = req.body;

  if (!password.trim()) {
    return next(new ErrorResponse("Please provide a password", 400));
  }

  const user = await User.findOne({
    resetPasswordCode: code,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Reset code invalid", 401));
  }

  user.password = password;
  user.resetPasswordCode = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed",
  });
});
