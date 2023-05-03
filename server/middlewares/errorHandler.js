import colors from "colors";
import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.stack.red);

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map(err => err.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  }

  if (err.code === 11000) {
    const message = Object.keys(err.keyValue)
      .map(key => key + " has already been taken")
      .join(", ");

    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    data: null,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
