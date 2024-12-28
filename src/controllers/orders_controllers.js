const client = require('../config/mysql')


module.exports = {    
    async create(req, res) {
        try {
            const query = `
                    INSERT INTO 
                        orders 
                            (id_costumer, id_user, id_product, quantity_product) 
                        VALUES
                            (?, ?, ?, ?);
            `

            const result = await client.execute(query, [
                req.body.id_costumer, req.body.id_user,
                req.body.id_product, req.body.quantity_product,
              ])

            const response = {
                message: `Order id: ${result.insertId}, inserted successfully!`,
                created_order: {
                    id_order: result.insertId,
                    id_user: req.body.id_user,
                    id_costumer: req.body.id_costumer,
                    id_product: req.body.id_product,
                    quantity_product: req.body.quantity_product,
                    request: {
                        type: 'POST',
                        description: 'Insert product!',
                        url: process.env.URL_ORD + result.insertId
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: "Order not created!"})
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
                            id_user: ord.id_user,
                            id_costumer: ord.id_costumer,
                            quantity_order: ord.quantity_order,
                            request: {
                                type: 'GET',
                                description: 'Insert order!',
                                url: process.env.URL_ORD + ord.id_order
                            }
                        }                        
                    })
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "Orders not found!"})
        }
    },
    
    async detailsOne(req, res) {
        try {
            const query = `SELECT * FROM orders WHERE id_order = ?;`

            const result = await client.execute(query, [req.params.id_order])

            const response = {
                message: `Details order id: ${result[0].id_order}, of product!`,
                order: {
                    id_order: result[0].id_order,
                    id_user: result[0].id_user,
                    id_costumer: result[0].id_costumer,
                    id_product: result[0].id_product,
                    quantity_product: result[0].quantity_product,
                    request: {
                        type: 'GET',
                        description: 'Return details of order!',
                        url: process.env.URL_ORD + result[0].id_order
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
            const query = `
                    UPDATE orders 
                       SET
                        id_product = ?, id_user = ?, 
                        id_costumer = ?, quantity_product = ?
                     WHERE id_order = ?; 
            `

            await client.execute(query, [
                req.body.id_product, req.body.id_user, req.body.id_costumer,
                req.body.quantity_product, req.body.id_order
            ])

            const response = {
                message: 'Order updated successfully!',
                updated_order: {
                    id_order: req.body.id_order,
                    id_user: req.body.id_user,
                    id_costumer: req.body.id_costumer,
                    id_product: req.body.id_product,
                    quantity_product: req.body.quantity_product,
                    request: {
                        type: 'PATCH',
                        description: 'Update order!',
                        url: process.env.URL_ORD + req.body.id_order
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "Order not created or incorrect data!"})
        }
    },
    
    async delete(req, res) {
        try {
            const query = `DELETE FROM orders WHERE id_order = ?;`

            await client.execute(query, [req.body.id_costumer])

            const response = {
                message: `Order id: ${req.body.id_order},deleted successfully!`,
                deleted_order: {
                    id_order: req.body.id_order,
                    request: {
                        type: 'DELETE',
                        description: 'Delete order!',
                        deleted_url: process.env.URL_ORD + req.body.id_order
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "Order not found!"})
        }
    }
}