const router = require('express').Router()

const login = require('../middleware/login')

, usersControllers = require('../controllers/users_controllers')


router.post('/create', login.required,usersControllers.create)
router.get('/', usersControllers.index)
router.get('/:id_user', usersControllers.detailsOne)
router.post('/login', usersControllers.login)
router.delete('/delete', login.required, usersControllers.delete)



module.exports = router