const router = require('express').Router()

const login = require('../middleware/login')

, productsControllers = require('../controllers/products_controllers')


router.post('/create', login.required, productsControllers.create)
router.get('/', productsControllers.index)
router.get('/:id_product', productsControllers.detailsOne)
router.patch('/update', login.required, productsControllers.update)
router.delete('/delete', login.required, productsControllers.delete)



module.exports = router