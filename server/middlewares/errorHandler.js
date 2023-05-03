import colors from "colors";
import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(`${err.stack}`.red);

  // Invalid values
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map(err => err.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  // Dublicate unique properties
  if (err.code === 11000) {
    const message = Object.keys(err.keyValue)
      .map(key => key + " has already been taken")
      .join(", ");

    error = new ErrorResponse(message, 400);
  }

  // Request wrong id
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found`, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    data: null,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
