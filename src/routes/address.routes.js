const router = require('express').Router()

, login = require('../middleware/login')


, addressControllers = require('../controllers/address_controllers')
, locationControllers = require('../controllers/address_controllers')


router.post('/location/create', login.required, locationControllers.createLocal)
router.get('/location/', locationControllers.indexLocal)
router.delete('/location/delete', login.required, locationControllers.deleteLocal)


router.post('/address/create', login.required, addressControllers.createAddress)
router.get('/address/', addressControllers.indexAddress)
router.delete('/address/delete', login.required, addressControllers.deleteAddress)





module.exports = router