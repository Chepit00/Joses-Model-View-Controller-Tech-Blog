const router = require('express').Router();
const {Comment, Post} = require('../../models')


router.get('/:post_id', async (req, res) => {
    console.log(req.params);
    // console.log({req, res});
    try {
        const post = await Post.findOne({
            where: { 
                id: req.params.post_id,
            }
        })
        console.log(post);
        if (!post) {
            res.status(400).json({ message: "Cannot get post with id that doesn't exist" });
            return;
        }
        // const comments = await Comment.findAll({
          
        // })
        
        // console.log(comments);
    }
    catch (err) {
        res.status(500).json({err})
    }
});

router.get('/comment/:id', async (req, res) => {
    const comment = comments[req.params.id]
});

module.exports = router;