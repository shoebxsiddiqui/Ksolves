const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Book Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter book's Description"],
  },
  author: {
    type: String,
    required: [true, "Please Enter book's author name"],
  },
  class: {
    type: mongoose.Schema.ObjectId,
    ref: "Class",
    required: true,
  },
  numOfChapters: {
    type: Number,
    default: 0,
  },
  chapters: [
    {
      chapter: {
        type: mongoose.Schema.ObjectId,
        ref: "Chapter",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
