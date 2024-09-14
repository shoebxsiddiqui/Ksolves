const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const Chapter = require("../Models/chapterModel");
const Lecture = require("../Models/lectureModel");

// Create Lecture
exports.createLecture = catchAsyncErrors(async (req, res, next) => {
  let public_id = "0";
  let url = "0";
  const { name, chapterId } = req.body;

  const lecture = await Lecture.create({
    name,
    public_id,
    url,
    chapter: chapterId,
  });

  await Chapter.findByIdAndUpdate(
    chapterId,
    {
      $push: { lectures: { lecture: lecture._id, name: lecture.name } },
      $inc: { numOfLectures: 1 },
    },
    { new: true }
  );

  res.status(201).json({
    success: true,
    lecture,
  });
});

// Get All Lectures
exports.getLectures = catchAsyncErrors(async (req, res, next) => {
  let lectures = await Lecture.find();

  res.status(200).json({
    success: true,
    lectures,
  });
});

// Get Lecture By Id
exports.getLecture = catchAsyncErrors(async (req, res, next) => {
  let lecture = await Lecture.findById(req.params.id);

  if (!lecture) {
    return next(new ErrorHandler("Lecture Not Found", 404));
  }

  res.status(200).json({
    success: true,
    lecture,
  });
});
