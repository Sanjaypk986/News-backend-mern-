const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  // get data
  const data = req.body;
  // compare email with database using find one
  const user = await User.findOne({ email: data.email }).exec();
  // user not available
  if (!user) {
    return res.status(401).send("invalid Email id");
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
    res.cookie("token", token, { httpOnly: true });
    res.send("login");
  } else {
    res.status(401).send("Unauthoraized Access! Wrong Password");
  }
};

// verify login
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

//   logout

const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true });
  res.send("Logged Out");
};

module.exports = { login, verifyLogin, logout };
