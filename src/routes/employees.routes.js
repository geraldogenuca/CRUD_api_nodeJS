const router = require('express').Router()

const login = require('../middleware/login')

, employeesControllers = require('../controllers/employees_controllers')


router.post('/create', employeesControllers.create)
router.get('/', employeesControllers.index)
router.get('/:id_employee', employeesControllers.detailsOne)
router.post('/login', employeesControllers.login)
router.patch('/update', login.required, employeesControllers.update)
router.delete('/delete', login.required, employeesControllers.delete)



module.exports = router