const client = require('../config/mysql')


module.exports = {    
    async create(req, res) {
        try {
            const query_very = `SELECT * FROM costumers WHERE email_costumer = ?`
            
            const result_very = await client.execute(query_very, [req.body.email_costumer]) 

            if(result_very.length == 1) {
                return res.status(500).json({message: 'Invalid or already registered EMAIL!'})
            }

            const query = `
                    INSERT INTO costumers (name_costumer, cpf_costumer, email_costumer, password_costumer, phone_1, phone_2, id_address, number_residence, complement) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `

            const result = await client.execute(query, [
                req.body.name_costumer, req.body.cpf_costumer, req.body.email_costumer, 
                req.body.password_costumer, req.body.phone_1, req.body.phone_2,
                req.body.id_address, req.body.number_residence, req.body.complement
            ])

            const response = {
                message: `Costumer id: ${req.body.id_costumer}, inserted successfully!`,
                created_costumer: {
                    id_costumer: result.insertId,
                    name_costumer: req.body.name_costumer,
                    cpf_costumer: req.body.cpf_costumer,
                    email_costumer: req.body.email_costumer,
                    password_costumer: req.body.password_costumer,
                    phone_1: req.body.phone_1,
                    phone_2: req.body.phone_2,
                    address: {
                        id_address: req.body.id_address,
                        number_residence: req.body.number_residence,
                        complement: req.body.complement,
                    },
                    request: {
                        type: 'POST',
                        description: 'Insert costumer!',
                        url: process.env.URL_COST + result.insertId
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: "Costumer not created!"})
        }
    },

        
    async index(req, res) {
        try {
            const result = await client.execute(`SELECT * FROM costumers;`)

            const response = {
                message: 'List of all costumers!',
                list_users: {
                    costumers_quantity: result.length,
                    costumers: result.map(cost => {
                        return {
                            id_costumer: cost.id_costumer,
                            name_costumer: cost.name_costumer,
                            cpf_user: cost.cpf_costumer,
                            email_costumer: cost.email_costumer,
                            phone_1: cost.phone_1,
                            phone_2: cost.phone_2,
                            address: {
                                id_address: cost.id_address,
                                number_residence: cost.id_address,
                                complement: cost.complement,
                            },
                            request: {
                                type: 'GET',
                                description: 'List of all costumers!',
                                url: process.env.URL_COST + cost.id_costumer
                            }
                        }                        
                    })
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: 'Costumers not found!'})
        }
    },

    async detailsOne(req, res) {
        try {
            const query = `SELECT * FROM costumers WHERE id_costumer = ?;`

            const result = await client.execute(query, [req.params.id_costumer])

            const response = {
                message: 'Details of COSTUMER!',
                costumer: {
                    id_costumer: result[0].id_costumer,
                    name_costumer: result[0].name_costumer,
                    cpf_costumer: result[0].cpf_costumer,
                    email_costumer: result[0].email_costumer,
                    phone_1: result[0].phone_1,
                    phone_2: result[0].phone_2,
                    address: {
                        id_address: result[0].id_address,
                        number_residence: result[0].id_address,
                        complement: result[0].complement,
                    },
                    request: {
                        type: 'GET',
                        description: 'Return details of costumer!',
                        url: process.env.URL_COST + result[0].id_costumer
                    }
                }
        }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: 'Costumer not found!'})
        }
    },    

    async update(req, res) {
        try {
            const query_very = `SELECT * FROM costumers WHERE id_costumer = ?`
            
            const result_very = await client.execute(query_very, [req.body.id_costumer]) 

            if(result_very.length < 1) {
                return res.status(500).json({message: 'Costumer id not registered!'})
            }

            const query = `
                     UPDATE costumers 
                        SET name_costumer = ?, cpf_costumer = ?, email_costumer = ?, 
                            password_costumer = ?, phone_1 = ?, phone_2 = ?,
                            id_address = ?, number_residence = ?, complement = ? 
                      WHERE id_costumer = ?
            `

            await client.execute(query, [
                req.body.name_costumer, req.body.cpf_costumer, req.body.email_costumer, 
                req.body.password_costumer, req.body.phone_1, req.body.phone_2,
                req.body.id_address, req.body.number_residence, req.body.complement,
                req.body.id_costumer
            ])

            const response = {
                message: `Costumer id: ${req.body.id_costumer} updated successfully!`,
                updated_costumer: {
                    id_costumer: req.body.id_costumer,
                    name_costumer: req.body.name_costumer,
                    cpf_costumer: req.body.cpf_costumer,
                    email_costumer: req.body.email_costumer,
                    password_costumer: req.body.password_costumer,
                    phone_1: req.body.phone_1,
                    phone_2: req.body.phone_2,
                    address: {
                        id_address: req.body.id_address,
                        number_residence: req.body.number_residence,
                        complement: req.body.complement,
                    },
                    request: {
                        type: 'POST',
                        description: 'Insert costumer!',
                        url: process.env.URL_COST + req.body.id_costumer
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
            const query_very = `SELECT * FROM costumers WHERE id_costumer = ?`
            
            const result_very = await client.execute(query_very, [req.body.id_costumer]) 

            if(result_very.length < 1) {
                return res.status(500).json({message: 'Costumer id not registered!'})
            }

            const query = `DELETE FROM costumers WHERE id_costumer = ?;`

            await client.execute(query, [req.body.id_costumer])

            const response = {
                message: `Costumer id: ${req.body.id_costumer},deleted successfully!`,
                deleted_costumer: {
                    id_costumer: req.body.id_costumer,
                    request: {
                        type: 'DELETE',
                        description: 'Delete costumer!',
                        deleted_url: process.env.URL_COST + req.body.id_costumer
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "Costumer not found!"})
        }
    }
}