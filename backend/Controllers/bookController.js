const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const Book = require("../Models/bookModel");
const Class = require("../Models/classModel");

// Create Book
exports.createBook = catchAsyncErrors(async (req, res, next) => {
  const { name, description, author, classId } = req.body;

  const book = await Book.create({
    name,
    description,
    author,
    class: classId,
  });

  await Class.findByIdAndUpdate(
    classId,
    {
      $push: { books: { book: book._id, name: book.name } },
      $inc: { numOfBooks: 1 },
    },
    { new: true }
  );

  res.status(201).json({
    success: true,
    book,
  });
});

// Get All Books
exports.getBooks = catchAsyncErrors(async (req, res, next) => {
  let books = await Book.find();

  res.status(200).json({
    success: true,
    books,
  });
});

// Get Book By Id
exports.getBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler("Book Not Found", 404));
  }

  res.status(200).json({
    success: true,
    book,
  });
});

// Get Chapter By Book Id
exports.getChapterByBookId = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.body;
  console.log(req.body);
  let book = await Book.findById(bookId);
  console.log(book.books);
  if (!book) {
    return next(new ErrorHandler("Book Not Found", 404));
  }

  res.status(200).json({
    success: true,
    chapters: book.chapters,
  });
});
