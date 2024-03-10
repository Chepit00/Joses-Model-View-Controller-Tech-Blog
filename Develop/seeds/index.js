const sequelize = require("../config/connection");
const { User, Comment, Post } = require("../models");

const seedUser = require("./userData.json");
const seedComment = require("./commentData.json");
const seedPost = require("./postData.json");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });

   const users = await User.bulkCreate(seedUser, {
      individualHooks: true,
      returning: true,
    });

   const posts = await Post.bulkCreate(seedPost, {
      individualHooks: true,
      returning: true,
    });

    await Comment.bulkCreate(seedComment, {
      individualHooks: true,
      returning: true,
    });

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedAll();
