const router = require('express').Router();
const { Comment, Post } = require('../../models')
const withAuth = require('../../utils/auth');

//route to fetch all post and render to homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
        });
        const post = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to fetch a specific post and its associated comments
router.get("/post/:id", async (req, res) => {
    try {
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
        if (!postData) {
            res.status(404).json({ message: "No post found with this id." });
            return;
        }
        const post = postData.get({ plain: true });
        res.render("post-details", {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to render the dashboard page, only to logged in users
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ["username"] }],
            
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to render login page 
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("/login")
});

//route to render sign up page 
router.get("/signUp", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("signUp");
});

//route to render new post 
router.get("/newPost", (req, res) => {
    if (req.session.logged_in) {
        res.render("newPost");
        return;
    }
    res.redirect("/login")
})

// router.get('/:post_id', async (req, res) => {
//     console.log(req.params);
//     // console.log({req, res});
//     try {
//         const post = await Post.findOne({
//             where: { 
//                 id: req.params.post_id,
//             }
//         })
//         console.log(post);
//         if (!post) {
//             res.status(400).json({ message: "Cannot get post with id that doesn't exist" });
//             return;
//         }
//         // const comments = await Comment.findAll({
          
//         // })
        
//         // console.log(comments);
//     }
//     catch (err) {
//         res.status(500).json({err})
//     }
// });

// router.get('/comment/:id', async (req, res) => {
//     const comment = comments[req.params.id]
// });

module.exports = router;