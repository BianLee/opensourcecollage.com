// http://localhost:5000/api/

const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// GET http://localhost:5000/api/getMessage
router.route("/getPost").get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST http://localhost:5000/api/postMessage
router.route("/postPost").post((req, res) => {
  const title = req.body.title;
  const link = req.body.link;
  const category = req.body.category;
  const colorcode = req.body.colorcode;
  const newPost = new Post({
    title,
    link,
    category,
    colorcode,
  });
  newPost
    .save()
    .then(() => res.json("Post posted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
