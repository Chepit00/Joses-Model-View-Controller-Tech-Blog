const router = require('express').Router();
const { Comment, Post, User } = require('../../models')
const withAuth = require('../../utils/auth');


router.get('/comment',)
// router.get('/comment/:id', async (req, res) => {
//     const comment = comments[req.params.id]
// });

module.exports = router;