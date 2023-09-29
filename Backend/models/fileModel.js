const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Replace with your Sequelize instance

const File = sequelize.define(
  "File",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentFolder: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "MyFiles",
    },
    trash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    data: {
      type: DataTypes.BLOB, // For binary data storage (equivalent to Buffer in MongoDB)
      allowNull: false,
    },
  },
  {
    timestamps: true,
    modelName: "File",
  }
);

module.exports = File;
