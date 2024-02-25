const router = require('express').Router();

router.get('/', async (req, res) => {
    return res.render('all');
});

router.get('/comment/:id', async (req, res) => {
    const comment = comments[req.params.id]
    return res.render('comment');
});

module.exports = router;