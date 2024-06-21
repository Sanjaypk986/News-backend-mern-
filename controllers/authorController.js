const Author = require("../models/authorModel")


const getAllAuthor = async (req, res) => {
    const authors = await Author.find({})
    res.json(authors)
}
const getAuthorById = async (req, res) => {
    const author = await Author.findById(req.params.authorId);
    res.json(author)
}
const addAuthor = async (req, res) => {
    const author = new Author(req.body)
    await author.save();
    res.json(author)
}
const updateAuthorById = async (req, res) => {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.authorId, req.body, { new: true })
    res.json(updatedAuthor)
}

const deleteAuthorById = async (req, res) => {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.authorId);
    res.send('Author Deleted')
}
module.exports = {getAllAuthor,getAuthorById,addAuthor,updateAuthorById,deleteAuthorById}