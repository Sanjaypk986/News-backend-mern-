require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const articleRoutes = require("./Routes/articleRoutes");
const authorRoutes = require("./Routes/authorRoutes");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser')

// cors 
app.use(cors());

// Req.body
app.use(express.json());

// cookie parser to read cookies
app.use(cookieParser());

app.use("/articles", articleRoutes);
app.use("/authors", authorRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
}
