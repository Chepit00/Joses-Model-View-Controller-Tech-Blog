const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

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


// CREATE new user-good
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GOOD
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
