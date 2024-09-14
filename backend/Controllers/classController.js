const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const Class = require("../Models/classModel");
const { sendToken, getId } = require("../utils/jwtToken");

// Create Class
exports.createClass = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const _class = await Class.create({
    name,
  });
  res.status(201).json({
    success: true,
    _class,
  });
});

// Get All Classes
exports.getClasses = catchAsyncErrors(async (req, res, next) => {
  let classes = await Class.find();

  res.status(200).json({
    success: true,
    classes,
  });
});

// Get class By Id
exports.getClass = catchAsyncErrors(async (req, res, next) => {
  let _class = await Class.findById(req.params.id);

  if (!_class) {
    return next(new ErrorHandler("Class Not Found", 404));
  }

  res.status(200).json({
    success: true,
    _class,
  });
});

// Get Books By class Id
exports.getBooksByClassId = catchAsyncErrors(async (req, res, next) => {
  const { classId } = req.body;
  // console.log(req.body);
  let _class = await Class.findById(classId);
  // console.log(_class.books);
  if (!_class) {
    return next(new ErrorHandler("Class Not Found", 404));
  }

  res.status(200).json({
    success: true,
    books: _class.books,
  });
});
