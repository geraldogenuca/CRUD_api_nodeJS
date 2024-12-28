const router = require('express').Router()

const login = require('../middleware/login')

, productsControllers = require('../controllers/products_controllers')


router.post('/create', productsControllers.create)
router.get('/', productsControllers.index)
router.get('/:id_product', productsControllers.detailsOne)
router.patch('/update', productsControllers.update)
router.delete('/delete', productsControllers.delete)



module.exports = router