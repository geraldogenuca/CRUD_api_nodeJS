const router = require('express').Router()

, ordersControllers = require('../controllers/orders_controllers')


router.post('/create', ordersControllers.create)
router.get('/', ordersControllers.index)
router.get('/:id_order', ordersControllers.detailsOne)
router.patch('/update', ordersControllers.update)
router.delete('/delete', ordersControllers.delete)


module.exports = router