require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const documentRoutes = require("./routes/documents");
const userRoutes = require("./routes/user");

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

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
