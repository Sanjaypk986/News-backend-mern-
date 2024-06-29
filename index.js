const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// CORS setup
app.use(cors({
  credentials: true,
  origin: true  // You can also specify the exact origin if needed
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

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Database connection
main().then(() => console.log("Connected to MongoDB")).catch((err) => console.error(err));

async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
}
