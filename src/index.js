const bodyParser = require('body-parser'),
    express = require('express'),
    cors = require('cors')

const { database, devUrl, devPort } = require('./etc/config.json'),
    db = require('./utils')

// Initialization of express application
const app = express()
const host = process.env.NODE_ENV === 'development' ? devUrl
: `http://${database.host}`

// Set up connection of database
db.setUpConnection()

// Allow requests from any origin
app.use(cors({ origin: '*' }))

// Using bodyParser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// RESTful api handlers
app.get('/api/product', async (req, res) => {
    await db.listProduct()
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/add', async (req, res) => {
    await db.createProduct(req.body)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/change/:id', async (req, res) => {
    await db.changeProduct(req.params.id, req.body)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/sort', async (req, res) => {
    await db.sortProduct(req.body.state, req.body.name)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/find', async (req, res) => {
    await db.findProduct(req.body.name)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.delete('/api/product/:id', async (req, res) => {
    await db.deleteProduct(req.params.id).then(data => res.send(data))
})

app.listen(devPort, () => {
    console.log(`Server running on ${host}:${devPort}`)
})