const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utlis/auth');

router.get('/', async (req, res) => {
    try {
      // Get all post and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
//Renders template "homepage" wiht data, includes flag indicating if user is logged in or not
      res.render("homepage", {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
        res.status(500).json(err);
}
});  

// Route to fetch a specific post and its associated comments
router.get('/post/:id', async (req, res) => {
    try {
        //Get post by id and include associated user & comments
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["username"],
                        },
                    ],
                },
            ],
        });
        //If no data is found 404 status with below msg and then itll return and wont go any furthur 
        if (!postData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }

        //Converts data to plain JavaScript objects/arrays
        const post = postData.get({ plain: true });

        // Render post details template with data, includes flag indicating if user is logged in or not
        res.render("post-details", {
            post,
            logged_in: res.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to render the dashboard page, accessible only to logged-in users
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Retrieve all posts created by the logged-in user
      const postData = await Post.findAll({
        // Filter posts by user_id
        where: { user_id: req.session.user_id },
        // Include the associated user model to fetch the username of the post creator
        include: [{ model: user, attributes: ["username"] }],
      });
      // Serialize the retrieved post data for template rendering
      const posts = postData.map((post) => post.get({ plain: true }));
      // Render the dashboard template with the retrieved post data and user login status
      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
      });
        //Handle any errors 
    } catch (err) {
        res.status(500).json(err);
    }
});
