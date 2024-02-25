const { Model, DataTypes } = require("sequalize");
const bcrypt = require("bcrypt");
const sequalize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        module: "user",
        key: "id",
      },
    },
  },
  {
    sequalize,
    timestamps: true,
    freezTableName: true,
    underscore: true,
    modelName: 'post',
  }
);

module.exports = Post;