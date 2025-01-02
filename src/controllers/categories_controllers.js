const client = require('../config/mysql')


module.exports = {    
    async create(req, res) {
        try {
            const query_very = `SELECT name_category FROM categories WHERE name_category = ?;`

            const result_very = await client.execute(query_very, [req.body.name_category])

            if(result_very.length > 0){

                return res.status(401).json({error: 'Category exist!'})
            }      
            
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
                        url: process.env.URL_EMPLOY + result.insertId
                    }
                }
            }

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({error: "Category not created!"})
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
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error})
        }
    },
    
    async detailsOne(req, res) {
        try {
            const query = `SELECT * FROM categories WHERE id_category = ?;`

            const result = await client.execute(query, [req.params.id_category])

            const response = {
                message: `Details of category id: ${req.params.id_category}!`,
                costumer: {
                    id_category: result[0].id_category,
                    name_category: result[0].name_category,
                    request: {
                        type: 'GET',
                        description: 'Return details of costumer!',
                        url: process.env.URL_CAT + result[0].id_category
                    }
                }
            }
    
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "Category not found!"})
        }
    },    
    
    async delete(req, res) {
        try {
            const query_very = `SELECT * FROM categories WHERE id_category = ?`
            
            const result_very = await client.execute(query_very, [req.body.id_category]) 

            if(result_very.length < 1) {
                return res.status(404).json({message: 'Category not deleted or does not exist!'})
            }

            const query = `DELETE FROM categories WHERE id_category = ?;`

            await client.execute(query, [req.body.id_category])

            const response = {
                message: 'Category deleted successfully!',
                deleted_category: {
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