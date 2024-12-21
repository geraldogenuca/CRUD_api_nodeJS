const router = require('express').Router()

const upload = require('../middleware/img_update')

const imagesControllers = require('../controllers/images_controllers')


router.post('/upload', upload.single('image_path'), imagesControllers.upload)
router.get('/:id_product', imagesControllers.detailsForProducts)
router.delete('/delete', imagesControllers.delete)

module.exports = router