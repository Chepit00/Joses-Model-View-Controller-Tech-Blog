const { Post } = require('../models');

const postData =
    [
        {
            "title": "First Post!",
            "content": "I cant believe it was me that posted first!",
            "user_id": 1
        },
        {
            "title": "Second Post!",
            "content": "This is my first time posting here!",
            "user_id": 2
        },
        {
            "title": "Tech World Rocks!",
            "content": "Very awsome, lets Network!",
            "user_id": 4
        }
    ];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;