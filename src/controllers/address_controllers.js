const client = require('../config/mysql')


module.exports = {    
    async createLocal(req, res) {
        try {
            const query_very = `SELECT * FROM location WHERE name_city = ?;`
            
            const result_very = await client.execute(query_very, [req.body.name_city])

            if(result_very.length == 1){

                return res.status(404).json({error: 'Location name already registered!'})
            }      
                        
            const query = `
                INSERT INTO location (name_city, state_initials, country) 
                VALUES (?, ?, ?);
            `  

            const result = await client.execute(query, [
                req.body.name_city, req.body.state_initials,req.body.country
            ])

            const response = {
                message: `Location id: ${result.insertId}, inserted successfully!`,
                created_costumer: {
                    id_location: result.insertId,
                    name_city: req.body.name_city,
                    state_initials: req.body.state_initials,
                    country: req.body.country,
                    request: {
                        type: 'POST',
                        description: 'Insert location!',
                        url: process.env.URL_LOCAL + result.insertId
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },

        
    async indexLocal(req, res) {
        try {
            const result = await client.execute(`SELECT * FROM location;`)

            const response = {
                message: 'List of all location!',
                list_location: {
                    location_quantity: result.length,
                    location: result.map(local => {
                        return {
                            id_location: local.id_location,
                            name_city: local.name_city,
                            state_initials: local.state_initials,
                            country: local.country,
                            request: {
                                type: 'GET',
                                description: 'List of all country!',
                                url: process.env.URL_LOCAL + local.id_location
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

    async deleteLocal(req, res) {
        try {
            const query_very = `SELECT * FROM location WHERE id_location = ?`
                        
            const result_very = await client.execute(query_very, [req.body.id_location]) 

            if(result_very.length < 1) {
                return res.status(404).json({message: 'Location id not registered!'})
            }

            const query = `DELETE FROM location WHERE id_location = ?;`

            await client.execute(query, [req.body.id_location])

            const response = {
                message: `Location id: ${rq.body.id_location}, deleted successfully!`,
                deleted_product: {
                    id_product: req.body.id_location,
                    request: {
                        type: 'DELETE',
                        description: 'Delete location!',
                        deleted_url: process.env.URL_LOCAL + req.body.id_location
                    }
                }
            }
    
            return res.status(202).json(response) 
        } catch (error) {
            return res.status(500).json({error: error})
        }                
    },

    async createAddress(req, res) {
        try {
            const query_very = `SELECT * FROM address WHERE name_street = ?;`
            
            const result_very = await client.execute(query_very, [req.body.name_street])

            if(result_very.length == 1){

                return res.status(404).json({error: 'Street name already registered!'})
            }      
                        
            const query = `
                INSERT INTO address (id_location, name_street, postal_code) 
                VALUES (?, ?, ?);
            `  

            const result = await client.execute(query, [
                req.body.id_location, req.body.name_street,req.body.postal_code
            ])

            const response = {
                message: `Address id: ${result.insertId}, inserted successfully!`,
                created_costumer: {
                    id_address: result.insertId,
                    id_location: req.body.id_location,
                    name_street: req.body.name_street,
                    postal_code: req.body.postal_code,
                    request: {
                        type: 'POST',
                        description: 'Insert address!',
                        url: process.env.URL_ADDRESS + result.insertId
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },

        
    async indexAddress(req, res) {
        try {
            const result = await client.execute(`SELECT * FROM address;`)

            const response = {
                message: 'List of all address!',
                list_address: {
                    address_quantity: result.length,
                    address: result.map(add => {
                        return {
                            id_address: add.id_address,
                            id_location: add.id_location,
                            name_street: add.name_street,
                            postal_code: add.postal_code,
                            request: {
                                type: 'GET',
                                description: 'List of all address!',
                                url: process.env.URL_ADDRESS + add.id_address
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

    async deleteAddress(req, res) {
        try {
            const query_very = `SELECT * FROM address WHERE id_address = ?`
                        
            const result_very = await client.execute(query_very, [req.body.id_address]) 

            if(result_very.length < 1) {
                return res.status(404).json({message: 'Address id not registered!'})
            }

            const query = `DELETE FROM address WHERE id_address = ?;`

            await client.execute(query, [req.body.id_address])

            const response = {
                message: `Address id: ${req.body.id_address}, deleted successfully!`,
                deleted_address: {
                    id_address: req.body.id_address,
                    request: {
                        type: 'DELETE',
                        description: 'Delete address!',
                        deleted_url: process.env.URL_ADDRESS + req.body.id_address
                    }
                }
            }
    
            return res.status(202).json(response) 
        } catch (error) {
            return res.status(500).json({error: error})
        }                
    },

}