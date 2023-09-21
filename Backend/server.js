require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mssql = require("mssql");
const sequelize = require("./db");
// const mongoose = require("mongoose");
const documentRoutes = require("./routes/documents");
const userRoutes = require("./routes/user");
const fileRoutes = require("./routes/files");

// express app
const app = express();

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DB,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};
// Connect to SQL Server
mssql
  .connect(config)
  .then(() => {
    console.log("Connected to SQL Server");
  })
  .catch((err) => {
    console.error("Error connecting to SQL Server", err);
  });

// register global middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

// route handler
app.use("/api/documents", documentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/files", fileRoutes);

// Sync the database and start the server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("connected to db & listening on port", process.env.PORT);
  });
});
