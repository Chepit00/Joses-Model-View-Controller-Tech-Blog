const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

//render to the homepage
router.get("/", async (req, res) => {
  try {
    //checks if use is logged in
    const loggedIn = req.session.logged_in;
    //fetches existing blog posts from db
    const postData = await Post.findAll({
      include: [
        {
          //"shows"/brings forth only username
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // Serialize the post data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));
    //Render homepage temp. & pass posts data
    res.render("homepage", {
      posts,
      logged_in: loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get

module.exports = router;
