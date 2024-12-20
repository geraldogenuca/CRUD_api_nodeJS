const router = require('express').Router()

, categoryControllers = require('../controllers/category_controllers')


router.post('/create', categoryControllers.create)
router.get('/', categoryControllers.index)
router.delete('/delete', categoryControllers.delete)



module.exports = router