const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const login = async(req, res) => {
    // get data
    const data = req.body
    // compare email with database using find one
    const user = await User.findOne({ email: data.email }).exec();
    // user not available
    if (!user) {
        return res.status(401).send("invalid Email id")
    }
    // check password with database with bcrypt compare
    const passwordMatch = bcrypt.compareSync(data.password, user.password);
    if (passwordMatch) {
        res.send("login")
    }else{
        res.status(401).send("Unauthoraized Access! Wrong Password")
      }
}

module.exports = {login}