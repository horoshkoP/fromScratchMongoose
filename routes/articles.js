const express = require('express')
const article = require('../models/article')
const user = require('../models/user')
const getArticle = require('../controllers/getArticle')
const getUser = require('../controllers/getUser')
// const { route } = require('./user')
const router = express.Router()


//find all

router.get('/', async (req, res) => {
    try {
        const display = await article.find({})
        res.json({
            articles:display
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


// add article

router.post('/', async (req, res) => {
    try {
        
        const tmpUser = await user.findById(req.body.owner)
        
        if (tmpUser) {
            const updatedAmount = tmpUser.numberOfArticles+1
            const tmpOwner = await user.findByIdAndUpdate(req.body.owner, { numberOfArticles: updatedAmount }, async (err, docs) => {
                if (err) {
                    res.status(500).json({
                        message: err.message
                    })
                } 
                
            })
            await tmpOwner.save()
            const Article = new article({
                title: req.body.title,
                subtitle: req.body.subtitle,
                description: req.body.description,
                owner: req.body.owner,
                createdAt: req.body.createdAt,
                updatedAt: req.body.updatedAt
            })
            
            
            const newArticle = await Article.save()
            const display = await article.findOne({ owner: req.body.owner, owner:req.body.owner}).populate('owner')
            res.json({
                updated: true,
                newArticle: display,
                ownerOfArticle: tmpOwner
            })
        } else {
            res.status(500).json({
                message:`could not find owner`
            })
        }
        
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//edit article

router.put('/:articleId', getArticle, async (req, res) => {
    try {
        if (req.body.title) {
            res.article.title = req.body.title
            res.article.updatedAt = Date.now()
        }
        if (req.body.description) {
            res.article.description = req.body.description
            res.article.updatedAt = Date.now()
        }
        if (req.body.owner) {
            res.article.owner = req.body.owner
            res.article.updatedAt = Date.now()
        }
        if (req.body.subtitle) {
            res.article.subtitle = req.body.subtitle
            res.article.updatedAt = Date.now()
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

//search by querry

router.get('/:title?/:subtitle?/:description?/:owner?/:category?/:createdAt?/:updatedAt?', async (req, res) => {
    try {
        const keys = Object.keys(req.params)
        const values = Object.values(req.params)
        let finres = []
        try {
            for (key in keys) {
                // if(keys[key]!=undefined) console.log(keys[key]);
            // console.log(keys[key]);
                for (value in values) {
                // if (keys[key]!=undefined && values[value]!=undefined) console.log(values[value]);
                if (keys[key]!=undefined && values[value]!=undefined) {
                    const tmpVal = await article.find({ [keys[key]]: values[value] }, (err, data) => {
                        if (err) {
                            return null
                        }
                        return data
                    })
                    if (tmpVal.length) {
                        finres.push(tmpVal)
                        continue
            
                    }
                    
                    
                    // console.log(tmpVal);
                    // console.log(tmpVal);
                }
            }
        }
            // console.log(finres);
        res.json({
            foundArticles: finres.length,
            articles: finres
        })
        } catch (error) {
            // console.log(error);
        }
        
    } catch (error) {
        // console.log(error);
    }
})

//delete one by id

router.delete('/:articleId', getArticle, async (req, res) => {
    try {
        const tmpUser = await user.findById(res.article.owner)
        
        if (tmpUser) {
            const updatedAmount = tmpUser.numberOfArticles - 1
            const tmpOwner = await user.findByIdAndUpdate(req.body.owner, { numberOfArticles: updatedAmount })
            await res.article.remove()
        res.json({
            message: `article id${res.article._id} was deleted`,
            deletedArticle: res.article,
            ownerArticleAmount: updatedAmount
        })
        }
        
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})


//delete all

router.purge('/', async (req, res) => {
    try {
        await article.deleteMany({})
        const newVal = await user.updateMany({ numberOfArticles: 0 })
        res.json({
            message: `articles were cleared`,
            usersUpdated: newVal.numberOfArticles ? null : `no users were updated`,
            currentArticles: await article.find({})
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

module.exports = router