const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true },
    colorcode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
