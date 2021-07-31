const router = require('express').Router()
const usersRouter = require('./users')
const coursesRouter = require('./courses')

router.get('/', (req,res) => {
    res.send('<h1>Welcome to the FJTD API</h1>')
})

router.use('/users', usersRouter)
router.use('/courses', coursesRouter)


module.exports = router