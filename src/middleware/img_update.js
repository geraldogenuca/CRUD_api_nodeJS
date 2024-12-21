const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})


const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif'
    ]

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            'Invalid file type!', 
            console.log('Invalid file type!')
        )
    }
}


const upload = multer({
    storage: storage,
    fileFilter:fileFilter
})


module.exports = upload