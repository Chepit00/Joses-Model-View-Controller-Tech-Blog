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

router.post("/signup", async (req, res) => {
  try {
    const newUser = User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    const userData = await newUser.save();

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
})

// router.get

module.exports = router;
