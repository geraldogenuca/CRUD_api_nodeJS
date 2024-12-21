const router = require('express').Router()

const login = require('../middleware/login')

, ordersControllers = require('../controllers/orders_controllers')


router.post('/create', login.required, ordersControllers.create)
router.get('/', ordersControllers.index)
router.get('/:id_order', ordersControllers.detailsOne)
router.patch('/update', login.required, ordersControllers.update)
router.delete('/delete', login.required, ordersControllers.delete)


module.exports = router