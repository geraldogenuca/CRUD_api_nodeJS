const client = require('../config/mysql')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {    
    async create(req, res) { 
        try {
            const query_very = `SELECT * FROM employees WHERE cpf_employee = ?`

            const result_very = await client.execute(query_very, [req.body.cpf_employee]) 

            if(result_very.length == 1) {
                return res.status(500).json({message: 'Invalid or already registered CPF!'})
            }

            const query = `
                    INSERT INTO 
                        employees (
                                name_employee, email_employee, cpf_employee, 
                                password_employee, phone_employee, function_employee
                            ) 
                        VALUES
                            (?, ?, ?, ?, ?, ?);
            `
            
            const hash = bcrypt.hashSync(req.body.password_employee, 10)

            const result = await client.execute(query, [
                req.body.name_employee, req.body.email_employee, req.body.cpf_employee, 
                hash, req.body.phone_employee, req.body.function_employee
            ])

            const response = {
                message: 'Employee inserted successfully!',
                created_employee: {
                    id_employee: result.insertId,
                    name_employee: req.body.name_employee,
                    email_employee: req.body.email_employee,
                    cpf_employee: req.body.cpf_employee,
                    password_employee: hash,
                    phone_employee: req.body.phone_employee,
                    function_employee: req.body.function_employee,
                    request: {
                        type: 'POST',
                        description: 'Insert employee!',
                        url: process.env.URL_EMPLOY + result.insertId
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },

    async login(req, res) {
        try {
            const query_very = `SELECT * FROM employees WHERE email_employee = ?;`

            const result_very = await client.execute(query_very, [req.body.email_employee])
    
            if (result_very.length < 1) {
                return res.status(401).send({message: 'Authenthication failed1!'})
            }
    
            if (await bcrypt.compareSync(req.body.password_employee, result_very[0].password_employee)) {
                const token = jwt.sign({
                    id_employee: result_very[0].id_employee,
                    email_employee: result_very[0].email_employee
                },
                process.env.KEY_JWT,
                {
                    expiresIn: "1h"
                })
                return res.status(200).send({
                    message: 'Authenthication successfully!',
                    token: token
                })
            }
            return res.status(401).send({message: 'Authenthication failed2!'})
    
        } catch (error) {
            return res.status(500).send({message: error})
        }
    },
    
    async index(req, res) {
        try {
            const result = await client.execute(`SELECT * FROM employees;`)

            const response = {
                message: 'List of all employees!',
                list_employees: {
                    employee_quantity: result.length,
                    employee: result.map(employ => {
                        return {
                            id_employee: employ.id_employee,
                            name_employee: employ.name_employee,
                            email_user: employ.email_employee,
                            cpf_employee: employ.cpf_employee,
                            phone_employee: employ.phone_employee,
                            function_employee: employ.function_employee,
                            request: {
                                type: 'GET',
                                description: 'List of all employees!',
                                url: process.env.URL_EMPLOY + employ.id_employee
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
            const query = 'SELECT * FROM employees WHERE id_employee = ?;'

            const result = await client.execute(query, [req.params.id_employee])
    
            if (result.length == 0) {
                return res.status(404).send({message: 'Employee id not registered!'})
            }
            const response = {
                message: `Details of employee id: ${result[0].id_employee}!`,
                user: {
                    id_employee: result[0].id_employee,
                    name_employee: result[0].name_employee,
                    email_employee: result[0].email_employee,
                    cpf_employee: result[0].cpf_employee,
                    phone_employee: result[0].cpf_employee,
                    function_employee: result[0].cpf_employee,
                    request: {
                        type: 'GET',
                        description: 'Return details of employee!',
                        url: process.env.URL_EMPLOY + result[0].id_employee
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
            const query_very = `SELECT * FROM employees WHERE id_employee = ?`

            const result_very = await client.execute(query_very, [req.body.id_employee]) 

            if(result_very.length < 1) {
                return res.status(500).json({message: 'Employee id not registered!'})
            }

            const query = `
                     UPDATE employees 
                        SET name_employee = ?, email_employee = ?, cpf_employee = ?, 
                            phone_employee = ?, function_employee = ?
                      WHERE id_employee = ?
            `

            await client.execute(query, [
                req.body.name_employee, req.body.email_employee, req.body.cpf_employee, 
                req.body.phone_employee, req.body.function_employee, req.body.id_employee
            ])

            const response = {
                message: `Employee id: ${req.body.id_employee} updated successfully!`,
                updated_employee: {
                    id_employee: req.body.id_employee,
                    name_employee: req.body.name_employee,
                    email_employee: req.body.email_employee,
                    cpf_employee: req.body.cpf_employee,
                    phone_employee: req.body.phone_employee,
                    function_employee: req.body.function_employee,
                    request: {
                        type: 'PATCH',
                        description: 'Update employee!',
                        url: process.env.URL_EMPLOY + req.body.id_employee
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
            const query_very = `SELECT * FROM employees WHERE id_employee = ?`

            const result_very = await client.execute(query_very, [req.body.id_employee]) 

            if(result_very.length < 1) {
                return res.status(500).json({message: 'Employee id not registered!'})
            }

            const query = `DELETE FROM employees WHERE id_employee = ?;`

            await client.execute(query, [req.body.id_employee])

            const response = {
                message: `Employee id: ${req.body.id_employee},deleted successfully!`,
                deleted_employee: {
                    id_employee: req.body.id_employee,
                    request: {
                        type: 'DELETE',
                        description: 'Delete employee!',
                        deleted_url: process.env.URL_EMPLOY + req.body.id_employee
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}