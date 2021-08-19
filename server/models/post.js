const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: Date, required: true },
    selectedCat: { type: String, required: true },
    colorCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
