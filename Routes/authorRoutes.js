const express = require('express')
const {  getAuthorById, updateAuthorById, deleteAuthorById, addAuthor, getAllAuthors } = require('../controllers/authorController')
const router = express.Router()

router.get('/', getAllAuthors)

router.get('/:authorId', getAuthorById)

router.post('/', addAuthor)

router.patch('/:authorId', updateAuthorById)

router.delete('/:authorId', deleteAuthorById)

module.exports = router