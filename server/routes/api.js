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
  const url = req.body.url;
  const selectedCat = req.body.selectedCat;
  const newPost = new Post({
    title,
    url,
    selectedCat,
  });
  newPost
    .save()
    .then(() => res.json("Post posted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
