const express = require("express");
const {
  uploadFile,
  getFile,
  getFiles,
  getFiles1,
  getTrash,
  downloadFile,
  trashFile,
  changeParent,
} = require("../controllers/fileController");

const requireAuth = require("../middleware/requireAuth");

const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage(); // Store files in memory as Buffers
const upload = multer({ storage });

router.use(requireAuth);
// Define an endpoint for file upload
// POST a new file
router.post("/upload", upload.single("file"), uploadFile);

// DOWNLOAD a file
router.get("/download/:id", downloadFile);

// GET a file
router.get("/myfiles/:id", getFile);

// GET all files
router.get("/", getFiles);

// GET all files that belong to one user
router.get("/myfiles/", getFiles1);

//GET all files that belong to user's trash
router.get("/trash", getTrash);

//PATCH/DELETE  a file
router.patch("/trashing/:id", trashFile);

//UPDATING parent folder
router.patch("/parent/:id", changeParent);

module.exports = router;
