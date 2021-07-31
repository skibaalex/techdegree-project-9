const router = require('express').Router()
const User = require('../models').User
const { asyncHandler, userValidation } = require('../helpers')
const { requierAuthentication } = require('../middleware/authentication')


/** ====================
 * GET Display User
========================*/
router.get('/', requierAuthentication, asyncHandler(async (req, res) => {
    //I am removing the password in the original authentication method why would i do that as well??
    const user = await User.findByPk(req.user.id, {attributes: { exclude: ["password", "createdAt", "updatedAt"] }})
    res.json(user)
}))

/** ====================
 * POST Register User
========================*/
router.post('/', asyncHandler(async (req,res) => {
    try{
        await User.create(req.body)
        res.status(201).end()
    } catch(err){
        if(err.name = 'SequelizeUniqueConstraintError'){
            res.status(400).json({message: 'Email has to be unique'})
        }
    }
}))

module.exports = router