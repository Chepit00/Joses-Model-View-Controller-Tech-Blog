const { Comment } = require('../models');

const commentData =
    [
        {
            "id": "1",
            "comment_txt": "First Comment!",
            "user_id": 2,
            "post_id": 1
        },
        {
            "id": "2",
            "comment_txt": "I agree tech world rocks!",
            "user_id": 2,
            "post_id": 3
        },
        {
            "id": "3",
            "comment_txt": "This is my first time commenting! Welcome!",
            "user_id": 1,
            "post_id": 1
        }
    ];

const seedComments = () => Comment.bulkCreate(commentData);
    
module.exports = seedComments;
