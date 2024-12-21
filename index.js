require('dotenv').config()

const express = require('express')
, port = process.env.SERVER_PORT || 5001
, app = express()
, morgan = require('morgan')

//
, categoriesRoutes = require('./src/routes/categories.routes')
, productsRoutes = require('./src/routes/products.routes')
, ordersRoutes = require('./src/routes/orders.routes')
, imagesRoutes = require('./src/routes/images.routes')
, usersRoutes = require('./src/routes/users.routes')


app.use('/public', express.static('public'))
app.use(express.json())
app.use(morgan('dev'))


//
app.use('/categories', categoriesRoutes)
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)
app.use('/images', imagesRoutes)
app.use('/users', usersRoutes)


app.listen(port, () => {
    console.log(`Server is running in PORT:${port}!`)
})