const Article = require("../models/articleModel");

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
};

const addArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

const updateArticleById = async (req, res, next) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.articleId, req.body, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

const deleteArticleById = async (req, res, next) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.articleId);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.send('Article Deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllArticles, getArticleById, addArticle, updateArticleById, deleteArticleById };
