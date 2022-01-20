const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const JSONPostSchema = new Schema(
  {
    title: { type: String, required: true },
    choices: { type: Array, required: true },
    correct: { type: String, required: true },
    solution: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const JSONPost = mongoose.model("jsonpost", JSONPostSchema);

module.exports = JSONPost;
