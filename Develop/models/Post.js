const { Model, DataTypes } = require("sequalize");
const bcrypt = require("bcrypt");
const sequalize = require("../config/connection");

class Post extends Model { }

Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    },
    
});