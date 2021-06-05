const express = require('express')
const user = require('../models/user')
const router = express.Router()
const getUser = require('../controllers/getUser')


// add user

router.post('/', async (req, res) => {
    try {
        const tmpuser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            createdAt:req.body.createdAt,
            numberOfArticles:req.body.numberOfArticles,
            nickname:req.body.nickname
        })
        const newUser = await tmpuser.save()
        console.log(newUser)
        res.status(201).json({
            createdNewUser: true,
            newUser: newUser
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// update user

router.put('/:id', getUser, async (req, res) => {
    try {

        if (req.body.firstName != null) {
            res.user.firstName = req.body.firstName
            res.user.updatedAt = Date.now()
        }
        if (req.body.lastName != null) {
            res.user.lastName = req.body.lastName
            res.user.updatedAt = Date.now()
        }
        if (req.body.role != null) {
            res.user.role = req.body.role
            res.user.updatedAt = Date.now()
        }
        if (req.body.numberOfArticles != null) {
            res.user.numberOfArticles = req.body.numberOfArticles
            res.user.updatedAt = Date.now()
        }
        if (req.body.nickname != null) {
            res.user.nickname = req.body.nickname
            res.user.updatedAt = Date.now()
        }
        const updatedUser = await res.user.save()
        res.json({
            message: `user was updated`,
            updatedUser: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

// get single user

router.get('/:id', getUser, (req, res) => {
    try {
        res.json(res.user)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

//delete one

router.delete('/:id', getUser, async (req,res) => {
    try {
        const userToBeDeleted = res.user
        await res.user.remove()
        res.json({
            message: `user id${req.params.id} was deleted`,
            removedUser: userToBeDeleted
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

//find all

router.get('/', async (req, res) => {
    try {
        const allUsers = await user.find({})
        res.json({
            allUsers: allUsers
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})

module.exports = router