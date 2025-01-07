// const AppError = require("../utils/appArror");

const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  // if (err.name === "CastError") {
  //   const message = `Invalid ${err.path}: ${err.value}`;
  //   err = new AppError(message, 404);
  // }
  // if (err.code === 11000) {
  //   const field = err.keyValue.username;
  //   err = new AppError(`Duplicate field value: ${field}`, 404);
  // }
  // if (err.name === "JsonWebTokenError") {
  //   err = new AppError("Please log in again", 401);
  // }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};

module.exports = globalErrorHandler;
