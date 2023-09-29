const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Replace with your Sequelize instance
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const validator = require("validator");

const User = sequelize.define(
  "User",
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email is not valid",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetToken: {
      type: DataTypes.STRING,
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true, // Disable timestamps (createdAt and updatedAt)
    modelName: "User",
  }
);

// Reset password method
User.resetpassword = async function (token, newPassword) {
  // Validation
  if (!validator.isStrongPassword(newPassword)) {
    // return "Password is not stron enough";
    throw new Error("Password is not strong enough");
  }

  const user = await this.findOne({
    where: {
      resetToken: token,
      resetTokenExpiration: {
        [Op.gt]: new Date(),
      },
    },
  });
  if (!user) {
    throw new Error("Invalid or Expired token");
  }

  // Password Encryption
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  // Update the user's password and clear the reset token
  user.password = hash;
  user.resetToken = null;
  user.resetTokenExpiration = null;

  await user.save();

  return user;
};

module.exports = User;
