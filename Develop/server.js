// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const routes = require("./controllers");
const sequelize = require("./config/connection");
// Import the custom helper methods
const helpers = require('./utils/helpers');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Incorporate the custom helper methods
const hbs = exphbs.create({ helpers });

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);//might have to adj
app.set('view engine', 'handlebars');//might have to adj

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Sets up the routes
app.use(routes);

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
