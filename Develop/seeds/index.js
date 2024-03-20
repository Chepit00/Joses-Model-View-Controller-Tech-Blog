const sequelize = require("../config/connection");

const seedUsers = require("./userData.js");
const seedComments = require("./commentData.js");
const seedPost = require("./postData.js");

const seedAll = async () => {
  try {
    console.log("Starting database seeding...");

    // Sync models with database
    await sequelize.sync({ force: true });
    console.log("Database synced successfully.");

    // Seed users
    console.log("Seeding users...");
    await seedUsers();
    console.log("Users seeded successfully.");

    // Seed posts
    console.log("Seeding posts...");
    await seedPost();
    console.log("Posts seeded successfully.");

    // Seed comments
    console.log("Seeding comments...");
    await seedComments();
    console.log("Comments seeded successfully.");

    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

seedAll();
