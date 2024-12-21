const router = require('express').Router()

const login = require('../middleware/login')

, categoriesControllers = require('../controllers/categories_controllers')


router.post('/create', login.required,categoriesControllers.create)
router.get('/', categoriesControllers.index)
router.delete('/delete', login.required, categoriesControllers.delete)



module.exports = router