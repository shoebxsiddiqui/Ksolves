const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Chapter Name"],
    trim: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  numOfComments: {
    type: Number,
    default: 0,
  },
  chapter: {
    type: mongoose.Schema.ObjectId,
    ref: "Chapter",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
