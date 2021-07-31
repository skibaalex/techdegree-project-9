const auth = require('basic-auth')
const { asyncHandler } = require('../helpers')
const User = require('../models').User


/**
 * Authenticate the user
 * @param {Request} req request object
 * @param {Response} res response object
 * @param {Next} next the function that make express move to the next middleware
 */
const requierAuthentication = asyncHandler(async (req,res,next) => {
    try{
        const cred = auth(req)
        if(cred){
            const user = await User.findOne({where: {emailAddress: cred.name}, attributes: { exclude: ["password"] }})
            if(user) {
                req.user = user
                next()
            } else {
                res.status(401).json({message: 'Access Denied'})
            }
        } else {
            res.status(401).json({message: 'Access Denied'})
        }
    } catch(err){
        throw new Error(err)
    }
  
})


module.exports = {
    requierAuthentication
}