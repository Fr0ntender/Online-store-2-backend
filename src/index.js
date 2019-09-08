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
app.get('/api/product', (req, res) => {
    db.listProduct()
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/add', (req, res) => {
    db.createProduct(req.body)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/change/:id', (req, res) => {
    db.changeProduct(req.params.id, req.body)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/sort', (req, res) => {
    db.sortProduct(req.body.state, req.body.name)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/find', (req, res) => {
    db.findProduct(req.body.name)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.delete('/api/product/:id', (req, res) => {
    db.deleteProduct(req.params.id).then(data => res.send(data))
})

app.listen(devPort, function () {
    console.log(`Server running on ${host}:${devPort}`)
})