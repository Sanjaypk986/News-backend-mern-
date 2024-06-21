const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: String,
    description: String,
    image : String,
    isMain: Boolean,
    sub : Boolean,
  });

  const Article = mongoose.model('Article', articleSchema);

  module.exports =  Article