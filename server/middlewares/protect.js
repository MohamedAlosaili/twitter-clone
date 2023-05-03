import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";

export default asyncHandler(async (req, res, next) => {
  let token;

  if (req.authorization && req.authorization.startsWith("Bearer")) {
    token = req.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    // If the account was deleted (by another device) the user will return null
    // So user now is not authorized
    return next(new ErrorResponse("Not authorized", 401));
  }

  req.user = user;

  next();
});
