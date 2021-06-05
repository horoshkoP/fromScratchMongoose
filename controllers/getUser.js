const user = require('../models/user')


async function getUser(req,res,next) {
    try {
        tmpUser = await user.findById(req.params.id)
        if (!tmpUser) {
            return res.status(404).json({message:`cannot find user by id ${req.params.id}`})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
    res.user = tmpUser
    next()
}

module.exports = getUser