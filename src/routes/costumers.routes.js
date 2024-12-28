const router = require('express').Router()

const login = require('../middleware/login')

, costumersControllers = require('../controllers/costumers_controllers')


router.post('/create', login.required, costumersControllers.create)
router.get('/', costumersControllers.index)
router.get('/:id_costumer', costumersControllers.detailsOne)
router.patch('/:id_costumer', login.required, costumersControllers.update)
router.delete('/delete', login.required, costumersControllers.delete)



module.exports = router