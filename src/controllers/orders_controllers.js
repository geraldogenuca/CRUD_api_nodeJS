const client = require('../config/mysql')


module.exports = {    
    async create(req, res) {
        try {
            const query = `
                    INSERT INTO 
                        orders 
                            (id_costumer, id_product, id_employee, quantity_product) 
                        VALUES
                            (?, ?, ?, ?);
            `

            const result = await client.execute(query, [
                req.body.id_costumer, req.body.id_employee,
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
            const query = `
                SELECT 
                        orders.id_order, 
                        orders.id_costumer, costumers.name_costumer, 
                        orders.id_product, products.name_product, 
                        orders.id_employee, employees.name_employee,
                        orders.quantity_product
                  FROM  orders
            INNER JOIN  employees
                    ON  employees.id_employee = orders.id_employee
            INNER JOIN  costumers
                    ON  costumers.id_costumer = orders.id_costumer
            INNER JOIN  products
                    ON  products.id_product = orders.id_product;
            `

            const result = await client.execute(query, req.params.id)

            const response = {
                message: 'List of all orders!',
                list_orders: {
                    orders_quantity: result.length,
                    orders: result.map(ord => {
                        return {
                            
                            Sales_order_number: ord.id_order,
                            seller:{
                                id_employee: ord.id_employee,
                                name_emplyee: ord.name_employee
                            },
                            costumer: {
                                id_costumer: ord.id_costumer,
                                name_costumer: ord.name_costumer
                            },
                            product: {
                                quantity_product: ord.quantity_product,
                                name_product: ord.name_product
                            },
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
            const query = `
                SELECT 
                        orders.id_order, orders.id_employee, employees.name_employee, orders.id_costumer,
                        costumers.name_costumer, products.name_product, orders.quantity_product
                  FROM  orders
            INNER JOIN  employees
                    ON  employees.id_employee = orders.id_employee
            INNER JOIN  costumers
                    ON  costumers.id_costumer = orders.id_costumer
            INNER JOIN  products
                    ON  products.id_product = orders.id_product
                 WHERE  orders.id_order = ?;
            `

            const result = await client.execute(query, [req.params.id_order])

            if(result.length < 1) {
                return res.status(500).json({message: `Order id ${req.params.id_order}, not registered!`})
            }

            const response = {
                message: `Details order id: ${result[0].id_order}, of product!`,
                order: {
                    Sales_order_number: result[0].id_order,
                    seller:{
                        id_employee: result[0].id_employee,
                        name_employee: result[0].name_employee,
                    },
                    costumer: {
                        id_costumer: result[0].id_costumer,
                        name_costumer: result[0].name_costumer,
                    },
                    product: {
                        quantity_product: result[0].quantity_product,
                        name_product: result[0].name_product,
                    },
                    request: {
                        type: 'GET',
                        description: 'Return details of order!',
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
            const query_very = `SELECT * FROM orders WHERE id_order = ?`
                        
            const result_very = await client.execute(query_very, [req.body.id_order]) 

            if(result_very.length < 1) {
                return res.status(500).json({message: 'Order id not registered!'})
            }

            const query = `
                    UPDATE  orders 
                       SET  id_costumer = ?, id_product = ?, id_employee = ?, quantity_product = ?
                     WHERE  id_order = ?; 
            `

            await client.execute(query, [
                req.body.id_costumer, req.body.id_product, req.body.id_employee,
                req.body.quantity_product, req.body.id_order
            ])

            const response = {
                message: `Order id ${req.body.id_order}, updated successfully!`,
                updated_order: {
                    id_order: req.body.id_order,
                    id_costumer: req.body.id_costumer,
                    id_employee: req.body.id_employee,
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
            return res.status(500).json({error: error})
        }
    },
    
    async delete(req, res) {
        try {
            const query_very = `SELECT * FROM orders WHERE id_order = ?`
                        
            const result_very = await client.execute(query_very, [req.body.id_order]) 

            if(result_very.length < 1) {
                return res.status(500).json({message: 'Order id not registered!'})
            }

            const query = `DELETE FROM orders WHERE id_order = ?;`

            await client.execute(query, [req.body.id_order])

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
            return res.status(500).json({error: error})
        }
    }
}