const router = require('express').Router()

const login = require('../middleware/login')

, costumersControllers = require('../controllers/costumers_controllers')


router.post('/create', costumersControllers.create)
router.get('/', costumersControllers.index)
router.get('/:id_costumer', costumersControllers.detailsOne)
router.delete('/delete', costumersControllers.delete)



module.exports = router