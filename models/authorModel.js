const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: String,
    age : Number,
    image : String,
    about : String,
  });

  const Author = mongoose.model('Author', authorSchema);
  
  module.exports = Author