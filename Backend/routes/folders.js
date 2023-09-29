const express = require("express");
const { getFolders, createFolder } = require("../controllers/folderController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all document routes
router.use(requireAuth);

// GET all folders
router.get("/", getFolders);

// POST a new folder
router.post("/", createFolder);

// // DELETE a document
// router.delete("/:id", deleteFolder);

// // PATCH/UPDATE a document
// router.patch("/:id", updateFolder);

module.exports = router;
