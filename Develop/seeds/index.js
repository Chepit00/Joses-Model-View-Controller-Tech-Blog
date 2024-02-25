const sequelize = require('../config/connection');
const { User, Comment, Post } = require("../models");
const seedComment = require('./commentData.json');
const seedPost = require('./postData.json');
const seedUser = require('./userData.json');



const seedAll = async () => {
    await sequelize.sync({ force: true });

    await Comment.bulkCreate(seedComment, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(seedPost, {
        individualHooks: true,
        returning: true,
    });

    await User.bulkCreate(seedUser, {
        individualHooks: true,
        returning: true,
    });
    process.exit(0);
};

seedAll();