require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const documentRoutes = require("./routes/documents");
const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/files");
const folderRoutes = require("./routes/folders");

// express app
const app = express();

// register global middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// route handler
app.use("/api/documents", documentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("connected to db & listening on port", process.env.PORT);
  });
});
