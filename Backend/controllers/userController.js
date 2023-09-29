const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { error } = require("console");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user (done)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Authenticate user using Sequelize
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        error: "Authentication failed. User not found.",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ error: "Authentication failed. Invalid password." });
    }

    // Create a token for the authenticated user
    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error from Login" });
  }
};

// signup user (done)
const signupUser = async (req, res) => {
  console.log("Hello from signupUser");
  const { firstname, lastname, email, password } = req.body;

  //Validate
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password is not strong enough" });
  }

  const exists = await User.findOne({
    attributes: ["email"], // Replace 'id' with the actual primary key column name in your SQL Server table
    where: {
      email: email, // Replace 'id' with the actual primary key column name in your SQL Server table
    },
  });

  if (exists) {
    return res.status(400).json({ error: "Email already in use" });
  }

  //Password Encryption
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    // Create a new user using Sequelize
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
    });

    // Create a token for the newly signed-up user
    const token = createToken(newUser.id);

    res.status(201).json({ email, token });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal server error from Signup" });
  }
};

// forgot password (done)
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Generate a password reset token
    const token = crypto.randomBytes(32).toString("hex");

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;

    await user.save();

    //Send a password reset email with a link containing the token
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
        <p>You requested a password reset.</p>
        <p>Click this <a href="http://localhost:3000/resetpassword/${token}">Resel Password Link</a> to reset your password.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// reset password (done)
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.resetpassword(token, newPassword);

    return res.status(200).json({ message: "Password reset successfully!!" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, forgotPassword, resetPassword };
