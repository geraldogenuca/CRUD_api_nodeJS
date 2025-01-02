const client = require('../config/mysql')


module.exports = {    
    async upload(req, res) {
        try {
            const query_very = `SELECT * FROM products WHERE id_product = ?`
                        
            const result_very = await client.execute(query_very, [req.body.id_product]) 

            if(result_very.length < 1) {
                return res.status(404).json({message: 'Product id not registered!'})
            }            

            const query = 'INSERT INTO images_products (id_product, path_image) VALUES (?, ?)';

            const result = await client.execute(query, [req.body.id_product, req.file.path]);

            const response = {
                message: 'Image inserted successfully!',
                created_image: {
                    id_image: result.insertId,
                    id_product: req.body.id_product,
                    path_image: `${req.file.path}`.replace('\\', '/').replace('\\', '/'),
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
            const result = await client.execute(`SELECT * FROM images_products;`)

            const response = {
                message: 'List of all images!',
                list_images: {
                    images_quantity: result.length,
                    images: result.map(img => {
                        return {
                            id_image: img.id_image,
                            id_product: img.id_product,
                            path_image: img.path_image,
                            request: {
                                type: 'GET',
                                description: 'Return lis all images products!',
                                url: process.env.URL_SERVER + `${img.path_image}`.replace('\\', '/').replace('\\', '/')
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
            const query = `SELECT * FROM images_products WHERE id_image = ?;`            

            const result = await client.execute(query, [req.params.id_image])

            if(result < 1) {
                return res.status(404).json({message: 'Image id not registered!'})
            }

            const response = {
                message: `Details of image id: ${req.params.id_image}!`,
                image: {
                    id_image: result[0].id_image,
                    id_product: result[0].id_product,
                    path_image: `${result[0].path_image}`.replace('\\', '/').replace('\\', '/'),
                    request: {
                        type: 'GET',
                        description: 'Return details of image!',
                        url: process.env.URL_SERVER + `${result[0].path_image}`.replace('\\', '/').replace('\\', '/')
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },

    async imagesForProducts(req, res) {
        try {
            const query = `SELECT * FROM images_products WHERE id_product = ?;`

            const result = await client.execute(query, [req.params.id_product])

            if(result < 1) {
                return res.status(401).json({message: 'Product id not registered!'})
            }

            const response = {
                message: `List of images, product id: ${req.params.id_product}!`,
                list_imagesProduct: {
                    imagesProduct_quantity: result.length,
                    image: result.map(img => {
                        return {
                            id_image: img.id_image,
                            id_product: img.id_product,
                            path_images: `${img.path_image}`.replace('\\', '/').replace('\\', '/'),
                            request: {
                                type: 'GET',
                                description: 'List of images per product!',
                                url: process.env.URL_SERVER + `${img.path_image}`.replace('\\', '/').replace('\\', '/')
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
            const query_very = `SELECT * FROM images_products WHERE id_image = ?`
                        
            const result_very = await client.execute(query_very, [req.body.id_image]) 

            if(result_very.length < 1) {
                return res.status(401).json({message: 'Image id not registered!'})
            }

            const query = `DELETE FROM images_products WHERE id_image = ?;`

            await client.execute(query, [req.body.id_image])

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
    
            return res.status(202).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}