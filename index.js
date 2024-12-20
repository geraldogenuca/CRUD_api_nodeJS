require('dotenv').config()

const express = require('express')
, port = process.env.SERVER_PORT
, app = express()
, morgan = require('morgan')

//
, categoryRoutes = require('./src/routes/category.routes')


app.use('/public', express.static('public'))
app.use(express.json())
app.use(morgan('dev'))


//
app.use('/categories', categoryRoutes)
app.use('/test', (req, res) => {res.send({message: 'Deu certo!!!'})})

app.listen(port, () => {
    console.log(`Server is running in PORT:${port}!`)
})