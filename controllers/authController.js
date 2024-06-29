const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).send("Invalid Email ID");
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });
      res.send("Login success");
    } else {
      res.status(401).send("Unauthorized Access! Wrong Password");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.send("Logged Out");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, verifyLogin, logout };
