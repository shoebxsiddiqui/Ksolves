const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const Chapter = require("../Models/chapterModel");
const Book = require("../Models/bookModel");

// Create Chapter
exports.createChapter = catchAsyncErrors(async (req, res, next) => {
  const { name, description, bookId } = req.body;
  const chapter = await Chapter.create({
    name,
    description,
    book: bookId,
  });

  await Book.findByIdAndUpdate(
    bookId,
    {
      $push: { chapters: { chapter: chapter._id, name: chapter.name } },
      $inc: { numOfChapters: 1 },
    },
    { new: true }
  );

  res.status(201).json({
    success: true,
    chapter,
  });
});

// Get All Chapters
exports.getChapters = catchAsyncErrors(async (req, res, next) => {
  let chapters = await Chapter.find();

  res.status(200).json({
    success: true,
    chapters,
  });
});

// Get Chapter By Id
exports.getChapter = catchAsyncErrors(async (req, res, next) => {
  let chapter = await Chapter.findById(req.params.id);

  if (!chapter) {
    return next(new ErrorHandler("Class Not Found", 404));
  }

  res.status(200).json({
    success: true,
    chapter,
  });
});
