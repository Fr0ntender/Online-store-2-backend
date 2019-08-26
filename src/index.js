const formData = require('express-form-data')
const bodyParser = require('body-parser')
const express = require('express')
const multer  = require('multer')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const os = require('os')

const db = require('./utils/DataBaseUtils')

const {
    serverPort,
    apiPrefix
} = require('../etc/config.json')

const upload = multer({ dest: 'src/assets/' })

// Initialization of express application
const app = express()


// Set up connection of database
db.setUpConnection()

// Allow requests from any origin
app.use(cors({ origin: '*' }))

// Using bodyParser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// RESTful api handlers
app.get('/product', (req, res) => {
    db.listProduct()
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/product/add', (req, res) => {
    db.createProduct(req.body)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/product/change/:id', (req, res) => {
    db.changeProduct(req.params.id, req.body)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/product/sort', (req, res) => {
    db.sortProduct(req.body.state, req.body.name)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.delete('/product/:id', (req, res) => {
    db.deleteProduct(req.params.id).then(data => res.send(data))
})

app.listen(serverPort, function () {
    console.log(`Server is up and running on port ${apiPrefix}`)
})