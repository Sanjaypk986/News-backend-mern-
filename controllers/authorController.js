const Author = require("../models/authorModel");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAuthorById = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.authorId, req.body, { new: true });
    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAuthorById = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.authorId);
    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.send("Author Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllAuthors, getAuthorById, addAuthor, updateAuthorById, deleteAuthorById };
