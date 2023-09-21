// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const validator = require("validator");

// const Schema = mongoose.mongoose.Schema;

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   resetToken: {
//     type: String,
//   },
//   resetTokenExpiration: {
//     type: Date,
//   },
// });

// // static signup method
// userSchema.statics.signup = async function (email, password) {
//   //validation
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }

//   if (!validator.isEmail(email)) {
//     throw Error("Email is not valid");
//   }
//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password is not strong enough");
//   }

//   const exists = await this.findOne({ email });

//   if (exists) {
//     throw Error("Email already in use");
//   }

//   // Password Encryption
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({ email, password: hash });

//   return user;
// };

// //static login method
// userSchema.statics.login = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }

//   const user = await this.findOne({ email });

//   if (!user) {
//     throw Error("Incorrect Email");
//   }

//   const match = await bcrypt.compare(password, user.password);

//   if (!match) {
//     throw Error("Incorrect password");
//   }

//   return user;
// };

// // static resetpassword method
// userSchema.statics.resetpassword = async function (token, newPassword) {
//   //validation
//   if (!validator.isStrongPassword(newPassword)) {
//     throw Error("Password is not strong enough");
//   }

//   const user = await this.findOne({
//     resetToken: token,
//     resetTokenExpiration: { $gt: Date.now() },
//   });

//   if (!user) {
//     throw Error("Invalid or Expired token");
//   }

//   // Password Encryption
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(newPassword, salt);

//   //Update the user's password and clear the reset token
//   user.password = hash;
//   user.resetToken = null;
//   user.resetTokenExpiration = null;

//   await user.save();

//   return user;
// };

// module.exports = mongoose.model("User", userSchema);

const { DataTypes } = require("sequelize");
// const sequelize = require("../db"); // Replace with your Sequelize instance
const bcrypt = require("bcrypt");
const validator = require("validator");

const User = sequelize.define(
  "User",
  {
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

// Signup method
User.signup = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const exists = await this.findOne({ where: { email } });

  if (exists) {
    throw new Error("Email already in use");
  }

  // Password Encryption
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// Login method
User.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ where: { email } });

  if (!user) {
    throw new Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

// Reset password method
User.resetpassword = async function (token, newPassword) {
  // Validation
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Password is not strong enough");
  }

  const user = await this.findOne({
    where: {
      resetToken: token,
      resetTokenExpiration: { [sequelize.Op.gt]: new Date() },
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
