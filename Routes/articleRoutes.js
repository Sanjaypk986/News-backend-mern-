const express = require('express')
const { getAllArticles, getArticleById, updateArticleById, deleteArticleById, addArticle } = require('../controllers/articleController')
const router = express.Router()

router.get('/', getAllArticles)

router.get('/:articleId', getArticleById)

router.post('/', addArticle)

router.patch('/:articleId', updateArticleById)

router.delete('/:articleId', deleteArticleById)

module.exports = router