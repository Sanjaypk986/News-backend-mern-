const express = require('express')
const { getAllAuthor, getAuthorById, updateAuthorById, deleteAuthorById, addAuthor } = require('../controllers/authorController')
const router = express.Router()

router.get('/', getAllAuthor)

router.get('/:authorId', getAuthorById)

router.post('/', addAuthor)

router.patch('/:authorId', updateAuthorById)

router.delete('/:authorId', deleteAuthorById)

module.exports = router