const client = require('../config/mysql')


module.exports = {    
    async upload(req, res) {
        try {
            const query = `INSERT INTO images (id_product, image_path) VALUE (?, ?);`

            const result = await client.execute(query, [req.body.id_product, req.file.path])

            const response = {
                
                message: 'Image inserted successfully!',
                created_image: {
                    id_image: result.insertId,
                    id_product: req.body.id_product,
                    image_path: req.file.path,
                    request: {
                        type: 'POST',
                        description: 'Insert image!',
                        url_path: process.env.URL_SERVER + `${req.file.path}`.replace('\\', '/').replace('\\', '/')
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },

    async detailsForProducts(req, res) {
        try {
            const query = `SELECT * FROM images WHERE id_product = ?;`

            const result = await client.execute(query, [req.params.id_product])

            const response = {
                message: `List of images, product id: ${req.params.id_product}!`,
                list_imgsProduct: {
                    imgsProduct_quantity: result.length,
                    image: result.map(img => {
                        return {
                            id_image: img.id_image,
                            id_product: img.id_product,
                            image_path: img.image_path,
                            request: {
                                type: 'GET',
                                description: 'List of images per product!',
                                url: process.env.URL_SERVER + `${img.image_path}`.replace('\\', '/').replace('\\', '/')
                            }
                        }
                    })
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },
    
    async delete(req, res) {
        try {
            const query = `DELETE FROM images WHERE id_image = ?;`

            const result = await client.execute(query, [req.body.id_image])

            const response = {
                message: 'Image deleted successfully!',
                created_image: {
                    id_image: req.body.id_image,
                    request: {
                        type: 'DELETE',
                        description: 'Delete image!',
                        deleted_url: process.env.URL_CAT + req.body.id_image
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}