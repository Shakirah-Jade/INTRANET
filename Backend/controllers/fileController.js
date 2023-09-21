const express = require("express");
const multer = require("multer");
const File = require("../models/fileModel");

const storage = multer.memoryStorage(); // Store files in memory as Buffers
const upload = multer({ storage });

// Define endpoints for file upload and download
// GET all files
const getFiles = async (req, res) => {
  const user_id = req.user._id;
  try {
    const files = await File.find({}, "").sort({
      createdAt: -1,
    });
    console.log("Hello from getFiles");
    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error from getFiles" });
  }
};
const getFiles1 = async (req, res) => {
  const user_id = req.user._id;
  console.log(user_id);

  try {
    const files = await File.find({ user_id }).sort({
      createdAt: -1,
    });
    console.log("Hello from getFiles1");
    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error from getFiless, ${user_id}" });
  }
};
// GET a single file
const getFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the file by its ID in the database
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set the appropriate headers to indicate the file type and trigger download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Send the file data as the response
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error from getFile, ${id}" });
  }
};

// DOWNLOAD a file
const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the file by its ID in the database
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Set response headers for file download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Send the file buffer as the response
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error from downloadFile");
  }
};

// Upload a file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, buffer } = req.file;
    const title = req.body.title;
    const description = req.body.description;
    const parentFolder = req.body.parentFolder;

    //check whether we have all fields are existing
    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (!description) {
      emptyFields.push("description");
    }
    if (!parentFolder) {
      emptyFields.push("parentFolder");
    }
    if (!originalname) {
      emptyFields.push("originalname");
    }

    if (emptyFields.length > 0) {
      console.log(emptyFields);
      return res
        .status(400)
        .json({ error: "Please fill in all fields", emptyFields });
    }

    try {
      const user_id = req.user._id;
      console.log(user_id);
      const file = await File.create({
        title: title,
        description: description,
        filename: originalname,
        size: buffer.length,
        user_id: user_id,
        parentFolder: parentFolder,
        data: buffer,
      });
      res.status(200).json(file);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFile,
  uploadFile,
  getFiles,
  getFiles1,
  downloadFile,
};
