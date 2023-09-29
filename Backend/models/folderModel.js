const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Replace with your Sequelize instance

const Folder = sequelize.define(
  "Folder",
  {
    foldername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    modelName: "Folder",
  }
);

module.exports = Folder;
