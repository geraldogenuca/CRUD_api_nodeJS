const client = require('../config/mysql')


module.exports = {    
    async create(req, res) {
        try {
            const query = `
                    INSERT INTO 
                        orders 
                            (id_product, quantity_order) 
                        VALUES
                            (?, ?);
            `

            const result = await client.execute(query, [
                req.body.id_product, req.body.quantity_order,
              ])

            const response = {
                message: 'Order inserted successfully!',
                created_order: {
                    id_order: result.insertId,
                     id_product: req.body.id_product,
                    quantity_order: req.body.quantity_order,
                    request: {
                        type: 'POST',
                        description: 'Insert order!',
                        url: process.env.URL_ORD + result.insertId
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
            const result = await client.execute(`SELECT * FROM orders;`)

            const response = {
                message: 'List of all orders!',
                list_orders: {
                    orders_quantity: result.length,
                    orders: result.map(ord => {
                        return {
                            id_order: ord.id_order,
                            id_product: ord.id_product,
                            quantity_order: ord.quantity_order,
                            request: {
                                type: 'GET',
                                description: 'Insert order!',
                                url: process.env.URL_PROD + ord.id_order
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
            const query = `SELECT * FROM orders WHERE id_order = ?;`

            const result = await client.execute(query, [req.params.id_order])

            const response = {
                message: 'Details of order!',
                product: {
                    id_order: result[0].id_order,
                    id_product: result[0].id_product,
                    quantity_order: result[0].quantity_order,
                    request: {
                        type: 'GET',
                        description: 'Return details of quantity!',
                        url: process.env.URL_ORD + result[0].id_order
                    }
                }
        }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },

    async update(req, res) {
        try {
            const query = `
                    UPDATE orders 
                       SET
                        id_product = ?, quantity_order = ?
                     WHERE id_order = ?; 
            `

            await client.execute(query, [
                req.body.id_product,
                req.body.quantity_order, req.body.id_order
            ])

            const response = {
                message: 'Order updated successfully!',
                updated_order: {
                    id_order: req.body.id_order,
                    id_product: req.body.id_product,
                    quantity_order: req.body.quantity_order,
                    request: {
                        type: 'PATCH',
                        description: 'Update product!',
                        url: process.env.URL_PROD + req.body.id_order
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },
    
    async delete(req, res) {
        try {
            const query = `DELETE FROM orders WHERE id_order = ?;`

            await client.execute(query, [req.body.id_order])

            const response = {
                message: 'Product deleted successfully!',
                created_product: {
                    id_order: req.body.id_order,
                    request: {
                        type: 'DELETE',
                        description: 'Delete product!',
                        deleted_url: process.env.URL_PROD + req.body.id_order
                    }
                }

            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}