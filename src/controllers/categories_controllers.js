const client = require('../config/mysql')


module.exports = {    
    async create(req, res) {
        try {
            const query = `INSERT INTO categories (name_category) VALUE (?);`

            const result = await client.execute(query, [req.body.name_category])

            const response = {
                message: 'Category inserted successfully!',
                created_category: {
                    id_category: result.insertId,
                    name_category: req.body.name_category,
                    request: {
                        type: 'POST',
                        description: 'Insert category!',
                        url: process.env.URL_CAT + result.insertId
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
            const result = await client.execute(`SELECT * FROM categories;`)

            const response = {
                message: 'List of all categories!',
                list_categories: {
                    categories_quantity: result.length,
                    categories: result.map(cat => {
                        return {
                            id_category: cat.id_category,
                            name_category: cat.name_category,
                            request: {
                                type: 'GET',
                                description: 'Insert category!',
                                url: process.env.URL_CAT + cat.id_category
                            }
                        }                        
                    })
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },
    
    async delete(req, res) {
        try {
            const query = `DELETE FROM categories WHERE id_category = ?;`

            const result = await client.execute(query, [req.body.id_category])

            const response = {
                message: 'Category deleted successfully!',
                created_category: {
                    id_category: req.body.id_category,
                    request: {
                        type: 'DELETE',
                        description: 'Delete category!',
                        deleted_url: process.env.URL_CAT + req.body.id_category
                    }
                }
            }
    
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}