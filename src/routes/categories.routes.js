const router = require('express').Router()

, categoriesControllers = require('../controllers/categories_controllers')


router.post('/create', categoriesControllers.create)
router.get('/', categoriesControllers.index)
router.delete('/delete', categoriesControllers.delete)



module.exports = router