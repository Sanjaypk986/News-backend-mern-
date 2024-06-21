const express = require('express')
const { getAllArticles, getArticleById, addArtcle, updateArticleById, deleteArticleById } = require('../controllers/articleController')
const router = express.Router()

router.get('/', getAllArticles)

router.get('/:articleId', getArticleById)

router.post('/', addArtcle)

router.patch('/:articleId', updateArticleById)

router.delete('/:articleId', deleteArticleById)

module.exports = router