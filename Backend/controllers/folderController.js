const express = require("express");
const Folder = require("../models/folderModel");

// Define endpoints for folders
// GET all folders
const getFolders = async (req, res) => {
  const user_id = req.user.id; // Assuming you have the user ID available in req.user
  console.log(user_id);
  try {
    const folders = await Folder.findAll({
      where: {
        user_id, // Filter files by user ID
      },
      order: [["createdAt", "DESC"]], // Sort by createdAt in descending order
    });
    console.log("Hello from getFolders");
    res.status(200).json({ folders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Server error from getFolders, ${user_id}` });
  }
  // console.log("\nHello from Get Folders\n");
};

// CREATE a new folder
const createFolder = async (req, res) => {
  const { foldername } = req.body;

  console.log("The foldername is", foldername);
  if (!foldername) {
    return res.status(400).json({ error: "Please add folder name" });
  }

  // add folder to db
  try {
    const user_id = req.user.id; // Assuming you have the user ID available in req.user
    console.log("The user id is", user_id);
    const folder = await Folder.create({
      foldername,
      user_id,
    });

    console.log("Hello from getFolders1");
    res.status(200).json(folder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFolders,
  createFolder,
};
