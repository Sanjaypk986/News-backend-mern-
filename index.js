require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const articleRoutes = require("./Routes/articleRoutes");
const authorRoutes = require("./Routes/authorRoutes");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");

const app = express();
const port = process.env.PORT || 3000; // Use the port from .env

// CORS setup
app.use(cors({
  credentials: true,
  origin: true
}));

// Middleware setup
app.use(cookieParser());
app.use(express.json());

// Routes setup
app.use("/articles", articleRoutes);
app.use("/authors", authorRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Database connection
const main = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
};

main();
