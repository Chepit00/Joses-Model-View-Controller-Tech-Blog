const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      title: req.body.title,
      user_id: req.session.user_id,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
