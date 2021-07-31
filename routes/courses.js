const router = require('express').Router()
const Course = require('../models').Course
const User = require('../models').User
const { asyncHandler, handleValidationError } = require('../helpers')
const { requierAuthentication } = require('../middleware/authentication')


/** =======================================
 * GET all courses for authenticated user
==========================================*/
router.get('/', asyncHandler(async (req,res) => {
    const courses = await Course.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
              model: User,
              as: "user",
              attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            }
          ],
      })
    if(!courses){
        res.status(404).json({message: 'Could not get courses'})
    }
    res.json(courses)
}))


/** ========================================
 * GET course assosiated with user by ID
===========================================*/
router.get('/:id', asyncHandler(async (req,res) => {
    const { id } = req.params
    const course = await Course.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
              model: User,
              as: "user",
              attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            }
          ],
    })
    if(course)
    return res.json(course)
    return res.status(404).send({message: `the id ${id} was not found`})
}))

/** ========================================
 * POST Create new course
===========================================*/
router.post('/',requierAuthentication , asyncHandler(async (req,res) => {
    try{
        const { body } = req
        const exists = await checkCourseExist(body)

        if(exists.length)
            return res.status(400).send({message: 'A course with that title already exist'})

        await Course.create(body)
        res.append('Location', '/').status(201).end()

    } catch (error) {
        const errors = handleValidationError(error)
        if (errors){
          return res.status(400).json({ errors });
        } else {
          throw error;
        }
    }
}))

/** ========================================
 * PUT update course by id
===========================================*/
router.put('/:id',requierAuthentication, asyncHandler(async (req,res) => {
    const { id } = req.params
    const course = await Course.findByPk(id)
    if(course.id !== req.user.id)
    return res.status(403).json({message: 'Promission Denied'})
    await course.update(req.body)
    res.status(204).end()
}))

/** ========================================
 * DELETE delete course by id
===========================================*/
router.delete('/:id',requierAuthentication, asyncHandler(async (req,res) => {
    const { id } = req.params
    console.log(req.user.id)
    const course = await Course.findOne({where: {id, userId: req.user.id}})
    if(course.id !== req.user.id)
    return res.status(403).json({message: 'Promission Denied'})
    await course.destroy()
    res.status(204).end()
}))


async function checkCourseExist(body){
    const courses = await Course.findAll({where: {title: body.title}})
    return courses;
}

module.exports = router