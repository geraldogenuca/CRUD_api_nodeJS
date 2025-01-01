const client = require('../config/mysql')


module.exports = {    
    async upload(req, res) {
        try {
            const query = `INSERT INTO img_products (id_img, path_img) VALUE (?, ?);`

            const result = await client.execute(query, [req.body.id_img, req.file.path])

            const response = {
                
                message: 'Image inserted successfully!',
                created_image: {
                    id_img: result.insertId,
                    id_product: req.body.id_product,
                    path_img: `${req.file.path}`.replace('\\', '/').replace('\\', '/'),
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
    
    async index(req, res) {
        try {
            const result = await client.execute(`SELECT * FROM images;`)

            const response = {
                message: 'List of all images!',
                list_images: {
                    images_quantity: result.length,
                    images: result.map(img => {
                        return {
                            id_image: img.id_image,
                            id_product: img.id_product,
                            image_path: img.image_path,
                            request: {
                                type: 'GET',
                                description: 'Return lis all images products!',
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

    async detailsOne(req, res) {
        try {
            const query = `SELECT * FROM images WHERE id_image = ?;`

            const result = await client.execute(query, [req.params.id_image])

            const response = {
                message: `Details of image id: ${req.params.id_image}!`,
                image: {
                    id_image: result[0].id_image,
                    id_product: result[0].id_product,
                    image_path: process.env.URL_SERVER + `${result[0].image_path}`.replace('\\', '/').replace('\\', '/'),
                    request: {
                        type: 'GET',
                        description: 'Return details of image!',
                        url: process.env.URL_SERVER + `${result[0].image_path}`.replace('\\', '/').replace('\\', '/')
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },

    /*async detailsForProducts(req, res) {
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
                            image_path: `${req.file.path}`.replace('\\', '/').replace('\\', '/'),
                            request: {
                                type: 'GET',
                                description: 'List of images per product!',
                                url: process.env.URL_IMG + `${img.image_path}`.replace('\\', '/').replace('\\', '/')
                            }
                        }
                    })
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },*/
    
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
                        deleted_url: process.env.URL_IMG + req.body.id_image
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}