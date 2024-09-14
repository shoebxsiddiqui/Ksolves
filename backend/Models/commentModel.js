const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  numOfReplies: {
    type: Number,
    default: 0,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    {
      email: String,
      required: true,
    },
    {
      content: String,
      required: true,
    },
  ],
  lecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
