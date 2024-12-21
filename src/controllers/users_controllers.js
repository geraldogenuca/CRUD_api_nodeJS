const client = require('../config/mysql')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {    
    async create(req, res) {
        try {
            
            const query = `
                    INSERT INTO 
                        users
                            (name_user, email_user, password_user, cpf_user) 
                        VALUES
                            (?, ?, ?, ?);
            `

            const hash = bcrypt.hashSync(req.body.password_user, 10)


            const result = await client.execute(query, [
                req.body.name_user, req.body.email_user,
                hash, req.body.cpf_user
            ])

            const response = {
                message: 'User inserted successfully!',
                created_user: {
                    id_user: result.insertId,
                    name_user: req.body.name_user,
                    email_user: req.body.email_user,
                    password_user: hash,
                    cpf_user: req.body.cpf_user,
                    request: {
                        type: 'POST',
                        description: 'Insert user!',
                        url: process.env.URL_USER + result.insertId
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },

    async login(req, res) {
        try {
            const query = `SELECT * FROM users WHERE email_user = ?;`
            
            const results = await client.execute(query, [req.body.email_user])

            if(results < 1) {
                return res.status(401).send({ message: 'Authentication failed1!' })
            }

            if (await bcrypt.compareSync(req.body.password_user, results[0].password_user)) {
                const token = jwt.sign({
                    id_user: results[0].id_user,
                    email_user: results[0].email_user,
                    cpf_user: results[0].cpf_user,
                },
                process.env.KEY_JWT,
                {
                    expiresIn: "1h"
                });
                return res.status(200).send({
                    message: 'Authentication successfully!',
                    token: token
                });
            }
    
        } catch (error) {
            return res.status(500).send({ message: 'Authentication failed!' });
        }
    },
    
    async index(req, res) {
        try {
            const result = await client.execute(`SELECT * FROM users;`)

            const response = {
                message: 'List of all users!',
                list_users: {
                    user_quantity: result.length,
                    users: result.map(user => {
                        return {
                            id_user: user.id_user,
                            name_user: user.name_user,
                            email_user: user.email_user,
                            cpf_user: user.cpf_user,
                            request: {
                                type: 'GET',
                                description: 'List of all users!',
                                url: process.env.URL_USER + user.id_user
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
            const query = `SELECT * FROM users WHERE id_user = ?;`

            const result = await client.execute(query, [req.params.id_user])

            const response = {
                message: 'Details of user!',
                user: {
                    id_user: result[0].id_user,
                    name_user: result[0].name_user,
                    email_user: result[0].email_user,
                    cpf_user: result[0].cpf_user,
                    request: {
                        type: 'GET',
                        description: 'Return details of user!',
                        url: process.env.URL_PROD + result[0].id_user
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
            const query = `DELETE FROM users WHERE id_user = ?;`

            await client.execute(query, [req.body.id_user])

            const response = {
                message: `User id: ${req.body.id_user},deleted successfully!`,
                created_user: {
                    id_user: req.body.id_user,
                    request: {
                        type: 'DELETE',
                        description: 'Delete user!',
                        deleted_url: process.env.URL_USER + req.body.id_user
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}