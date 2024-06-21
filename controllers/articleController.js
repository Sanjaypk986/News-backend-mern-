const Article = require("../models/articleModel")

const getAllArticles = async(req, res) => {
    const articles = await Article.find({})
    res.json(articles)
}
const getArticleById = async(req, res) => {
    const article = await Article.findById(req.params.articleId);
    res.json(article)
}
const addArtcle = async(req, res) => {
    const article = new Article(req.body)
    await article.save();
    res.json(article)
}
const updateArticleById = async(req, res) => {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.articleId, req.body, { new: true })
    res.json(updatedArticle)
}
const deleteArticleById = async(req, res) => {
    const deletedArticle = await Article.findByIdAndDelete(req.params.articleId);
    res.send('Article Deleted')
}
module.exports = {getAllArticles,getArticleById,addArtcle,updateArticleById,deleteArticleById}