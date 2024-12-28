const router = require('express').Router()

const login = require('../middleware/login')

, categoriesControllers = require('../controllers/categories_controllers')


router.post('/create', categoriesControllers.create)
router.get('/', categoriesControllers.index)
router.get('/:id_category', categoriesControllers.detailsOne)
router.delete('/delete', categoriesControllers.delete)



module.exports = router