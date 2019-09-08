const Product = require('../models/Product')
const mongoose = require('mongoose')
const { database, devHost } = require('../etc/config.json')

const host = process.env.NODE_ENV === 'development' ? devHost
: database.host

exports.setUpConnection = () => {
    mongoose.connect(`mongodb://${host}:${database.port}/${database.name}`)
    mongoose.set('useCreateIndex', true)
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.connection.on(`error`, err => console.log(`Connection error: ${err}`))
    mongoose.connection.once(`open`, () => console.log(`DB connected`))
}

exports.listProduct = () => {
    return Product.find()
}

exports.createProduct = data => {
    const product = new Product({
        productId: data.productId,
        productImg: data.productImg,
        productIsbn: data.productIsbn,
        productName: data.productName,
        productVote: data.productVote,
        productYear: data.productYear,
        productPrice: data.productPrice,
        productRating: data.productRating,
        productLastName: data.productLastName,
        productFirstName: data.productFirstName
    })

    return product.save()
}

exports.changeProduct = (id, data) => {
    return Product.updateOne(
        {
            _id: id
        }, {
            $set: {
                productId: data.productId,
                productImg: data.productImg,
                productIsbn: data.productIsbn,
                productName: data.productName,
                productVote: data.productVote,
                productYear: data.productYear,
                productPrice: data.productPrice,
                productRating: data.productRating,
                productLastName: data.productLastName,
                productFirstName: data.productFirstName
            }
        }, err => { if (err) console.error(err) }
    )
}

exports.sortProduct = (state, name) => {
    if (name === 'Name') {
        if (!state) {
            return Product.find({}).sort({ productName: -1 })
        } else {
            return Product.find({}).sort({ productName: 1 })
        }
    } else {
        if (!state) {
            return Product.find({}).sort({ productYear: -1 })
        } else {
            return Product.find({}).sort({ productYear: 1 })
        }
    }
}

exports.findProduct = productName => {
    return Product.find({ productName: { $regex: productName, $options: "i" }})
}

exports.deleteProduct = id => {
    return Product.findById(id).remove()
}