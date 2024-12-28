const router = require('express').Router()

const login = require('../middleware/login')
const upload = require('../middleware/img_update')

const imagesControllers = require('../controllers/images_controllers')


router.post('/upload', login.required, upload.single('image_path'), imagesControllers.upload)
router.get('/', imagesControllers.index)
//router.get('/:id_product', imagesControllers.detailsForProducts)
router.get('/:id_image', imagesControllers.detailsOne)
router.delete('/delete', login.required, imagesControllers.delete)

module.exports = router