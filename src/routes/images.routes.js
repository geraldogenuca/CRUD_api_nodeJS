const router = require('express').Router()

const login = require('../middleware/login')
const upload = require('../middleware/img_update')

const imagesControllers = require('../controllers/images_controllers')


router.post('/upload', upload.single('path_image'), imagesControllers.upload)
router.get('/', imagesControllers.index)
router.get('/product/:id_product', imagesControllers.imagesForProducts)
router.get('/:id_image', imagesControllers.detailsOne)
router.delete('/delete', imagesControllers.delete)

module.exports = router