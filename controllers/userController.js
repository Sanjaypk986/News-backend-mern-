const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
};
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user)
};
const addUser = async (req, res) => {
  // get data
  const data = req.body;
  // store password
  const password = req.body.password;
  // hash/encrypt password
  const hash = bcrypt.hashSync(password, saltRounds);
//   // create document using req.body, pass as object and change password from data
  //using spred operator to get all data and we want to write changable value and set that hash.
  const user = new User({
    ...data,
    password: hash,
  });
  // save document
  await user.save();
  // response
  res.json(user);
};
const updateUserById = async (req, res) => {
 const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
 res.json(updateUser)
};
const deleteUserById = async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.send('User Deleted')
};
module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
};
