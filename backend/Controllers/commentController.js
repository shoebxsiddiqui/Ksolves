const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const Comment = require("../Models/commentModel");
const Lecture = require("../Models/lectureModel");
const User = require("../Models/userModel");

// Create Comment
exports.createComment = catchAsyncErrors(async (req, res, next) => {
  const { userId, content } = req.body;

  const user = await User.findById(userId);

  const comment = await Comment.create({
    user: userId,
    name: user.name,
    email: user.email,
    content,
    lecture: req.params.id,
  });

  await Lecture.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: { comment: comment._id, name: comment.name } },
      $inc: { numOfBooks: 1 },
    },
    { new: true }
  );

  res.status(201).json({
    success: true,
    comment,
  });
});

// Reply to comment
exports.replyComment = catchAsyncErrors(async (req, res, next) => {
  const { userId, content, commentId } = req.body;

  const user = User.findById(userId);

  const comment = await Comment.create({
    user: userId,
    name: user.name,
    email: user.email,
    content,
    lecture: req.params.id,
  });

  await Comment.findByIdAndUpdate(
    commentId,
    {
      $push: {
        comments: {
          comments: comment._id,
          email: comment.email,
          content: comment.content,
        },
      },
      $inc: { numOfBooks: 1 },
    },
    { new: true }
  );

  await Lecture.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: { comment: comment._id, name: comment.name } },
      $inc: { numOfBooks: 1 },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    books,
  });
});

// Get All Books
exports.getComments = catchAsyncErrors(async (req, res, next) => {
  let comments = await Comment.find();

  res.status(200).json({
    success: true,
    comments,
  });
});

// // Get class By Id
// exports.getBook = catchAsyncErrors(async (req, res, next) => {
//   let book = await Book.findById(req.params.id);

//   if (!book) {
//     return next(new ErrorHandler("Book Not Found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     book,
//   });
// });

// // Update Class
// exports.updateClass = catchAsyncErrors(async (req, res, next) => {
//   let _class = await Class.findById(req.params.id);

//   if (!_class) {
//     return next(new ErrorHandler("Class Not Found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     _class,
//   });
// });

// Delete Class
