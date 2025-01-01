const client = require('../config/mysql')


module.exports = {    
    async create(req, res) {
        try {
            const query_very = `SELECT * FROM categories WHERE id_category = ?;`

            const result_very = await client.execute(query_very, [req.body.id_category])

            if(result_very.length < 1){

                return res.status(500).json({error: 'Category not exist!'})
            }      

            const query_very2 = `SELECT * FROM products WHERE name_product = ?;`

            const result_very2 = await client.execute(query_very2, [req.body.name_product])

            if(result_very2.length > 0){

                return res.status(500).json({error: 'Product name already registered!'})
            }      
            
            const query = `
                    INSERT INTO 
                        products 
                            (id_category, name_product, price_product, description_product) 
                        VALUES
                            (?, ?, ?, ?);
            `

            const result = await client.execute(query, [
                req.body.id_category, req.body.name_product,
                req.body.price_product, req.body.description_product
            ])

            const response = {
                message: 'Product inserted successfully!',
                created_product: {
                    id_product: result.insertId,
                    id_category: req.body.id_category,
                    name_product: req.body.name_product,
                    price_product: req.body.price_product,
                    description_product: req.body.description_product,
                    request: {
                        type: 'POST',
                        description: 'Insert product!',
                        url: process.env.URL_PROD + result.insertId
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: "Product not created!"})
        }
    },
    
    async index(req, res) {
        try {
            const result = await client.execute(`SELECT * FROM products;`)

            const response = {
                message: 'List of all products!',
                list_products: {
                    products_quantity: result.length,
                    products: result.map(prod => {
                        return {
                            id_product: prod.id_product,
                            id_category: prod.id_category,
                            name_product: prod.name_product,
                            price_pruduct: prod.price_name,
                            description_product: prod.description,
                            request: {
                                type: 'GET',
                                description: 'Insert product!',
                                url: process.env.URL_PROD + prod.id_product
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
            const query = `SELECT * FROM products WHERE id_product = ?;`

            const result = await client.execute(query, [req.params.id_product])

            const response = {
                message: 'Details of product!',
                product: {
                    id_product: result[0].id_product,
                    id_category: result[0].id_category,
                    name_product: result[0].name_product,
                    price_product: result[0].price_product,
                    description_product: result[0].description_category,
                    request: {
                        type: 'GET',
                        description: 'Return details of product!',
                        url: process.env.URL_PROD + result[0].id_product
                    }
                }
        }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "Product not exist!"})
        }
    },

    async update(req, res) {
        try {
            /*const query_very = `SELECT * FROM products WHERE id_product = ?`
            
            const result_very = await client.execute(query_very, [req.body.id_product]) 

            if(result_very.length < 1) {
                return res.status(500).json({message: 'Product id not registered!'})
            }*/
            
            const query = `
                UPDATE  products 
                   SET  id_category = ?, name_product = ?, price_product = ?, description_product = ?
                 WHERE  id_product = ?
            `

            await client.execute(query, [
                req.body.id_category, req.body.name_product, req.body.price_product, 
                req.body.description_product, req.body.id_product
            ])

            const response = {
                message: 'Product updated successfully!',
                updated_product: {
                    id_product: req.body.id_product,
                    id_category: req.body.id_category,
                    name_category: req.body.name_product,
                    price_category: req.body.price_product,
                    description_category: req.body.description_product,
                    request: {
                        type: 'PATCH',
                        description: 'Update product!',
                        url: process.env.URL_PROD + req.body.id_product
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "Product not created or incorrect data!"})
        }
    },
    
    async delete(req, res) {
        try {
            const query_very = `SELECT * FROM products WHERE id_product = ?`
            
            const result_very = await client.execute(query_very, [req.body.id_product]) 

            if(result_very.length < 1) {
                return res.status(500).json({message: 'Product id not registered!'})
            }

            const query = `DELETE FROM products WHERE id_product = ?;`

            await client.execute(query, [req.body.id_product])

            const response = {
                message: 'Product deleted successfully!',
                deleted_product: {
                    id_product: req.body.id_product,
                    request: {
                        type: 'DELETE',
                        description: 'Delete product!',
                        deleted_url: process.env.URL_PROD + req.body.id_product
                    }
                }
            }
    
            return res.status(200).json(response) 
        } catch (error) {
            return res.status(500).json({error: "Product not created or does not exist!"})
        }
    }
}