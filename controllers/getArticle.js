const article = require('../models/article')


async function getArticle(req,res,next) {
    try {
        tmpArticle = await article.findById(req.params.articleId)
        if (!tmpArticle) {
            return res.status(404).json({message:`cannot find article by id ${req.params.articleId}`})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.article = tmpArticle
    next()
}

module.exports = getArticle