const client = require('../config/mysql')


module.exports = {    
    async create(req, res) {
        try {
            
            const query = `
                    INSERT INTO 
                        costumers
                            (name_costumer, cpf_costumer, email_costumer, ) 
                        VALUES
                            (?, ?, ?, ?);
            `

            const result = await client.execute(query, [
                req.body.name_costumer, req.body.email_costumer,
                 req.body.cpf_costumer, req.body.phone_costumer
            ])

            const response = {
                message: 'Costumer inserted successfully!',
                created_costumer: {
                    id_costumer: result.insertId,
                    name_costumer: req.body.name_costumer,
                    email_costumer: req.body.email_costumer,
                    cpf_costumer: req.body.cpf_costumer,
                    phone_costumer: req.body.phone_costumer,
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
                            email_costumer: cost.email_costumer,
                            cpf_user: cost.cpf_costumer,
                            phone_user: cost.phone_costumer,
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
                    email_costumer: result[0].email_costumer,
                    cpf_costumer: result[0].cpf_costumer,
                    phone_costumer: result[0].phone_costumer,
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
            const query = `
                     UPDATE costumers 
                        SET name_costumer = ?, email_costumer = ?, 
                            cpf_costumer = ?, phone_costumer = ? 
                      WHERE id_costumer = ?
            `

            await client.execute(query, [
                req.body.name_costumer, req.body.email_costumer, req.body.cpf_costumer, 
                req.body.phone_costumer, req.body.id_costumer
            ])

            const response = {
                message: `Costumer id: ${req.body.id_costumer} updated successfully!`,
                updated_costumer: {
                    id_costumer: req.body.id_costumer,
                    name_costumer: req.body.name_costumer,
                    email_costumer: req.body.email_costumer,
                    cpf_costumer: req.body.cpf_costumer,
                    phone_costumer: req.body.phone_costumer,
                    request: {
                        type: 'PATCH',
                        description: 'Update costumer!',
                        url: process.env.URL_COST + req.body.id_costumer
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "Costumer not created or incorrect data!"})
        }
    },
    
    async delete(req, res) {
        try {
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