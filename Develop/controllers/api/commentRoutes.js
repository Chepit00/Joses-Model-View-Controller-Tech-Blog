const router = require('express').Router();
const { }

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll({
          
      })
  }
});

router.get('/comment/:id', async (req, res) => {
    const comment = comments[req.params.id]
    return res.render('comment');
});

module.exports = router;