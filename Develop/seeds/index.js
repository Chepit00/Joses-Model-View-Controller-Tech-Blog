const sequelize = require("../config/connection");
const { User, Comment, Post } = require("../models");

const userData = require("./userData.json");
const commentData = require("./commentData.json");
const postData = require("./postData.json");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    returning: true,
  });

  for (const post of posts) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const postComments = commentData.filter(
      (comment) => comment.post_id === post.id
    );
    for (const comment of postComments) {
      await Comment.create({
        ...comment,
        user_id: randomUser.id,
        post_id: post.id,
      });
    }
  }

  console.log("Seeding completed!");
};

seedAll();
