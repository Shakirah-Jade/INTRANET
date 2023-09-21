// models/Folder.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  // Other folder properties as needed
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
