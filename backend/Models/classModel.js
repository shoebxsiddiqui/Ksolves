const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Class Name"],
    trim: true,
  },
  numOfBooks: {
    type: Number,
    default: 0,
  },
  books: [
    {
      book: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
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

module.exports = mongoose.model("Class", classSchema);
