const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // get data
    const data = req.body;

    // compare email with database using find one
    const user = await User.findOne({ email: data.email }).exec();
    // user not available
    if (!user) {
      return res.status(401).send("Invalid Email ID");
    }

    // check password with database with bcrypt compare
    const passwordMatch = bcrypt.compareSync(data.password, user.password);

    if (passwordMatch) {
      // create a token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_TOKEN,
        { expiresIn: "1hr" }
      );

      // Set the token in a secure and HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.send("Login successful");
    } else {
      res.status(401).send("Unauthorized Access! Wrong Password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Verify login
const verifyLogin = async (req, res) => {
  if (req.cookies && req.cookies.token) {
    try {
      const payLoad = jwt.verify(req.cookies.token, process.env.JWT_TOKEN);
      res.json({ verified: true });
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).send("Unauthorized Access!");
    }
  } else {
    res.json({ verified: false });
  }
};

// Logout
const logout = async (req, res) => {
  // Clear the token cookie upon logout
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.send("Logged Out");
};

module.exports = { login, verifyLogin, logout };
