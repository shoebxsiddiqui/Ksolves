const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token = "";
  if (req.cookies.token) {
    token = Object.values(req.cookies.token).join("");
  } else {
    next();
  }
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
  }
  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this role`,
          403
        )
      );
    }

    next();
  };
};
