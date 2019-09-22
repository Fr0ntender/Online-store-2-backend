const mongoose = require('mongoose')

const Product = require('../models/Product')

exports.setUpConnection = () => {
    mongoose.connect(process.env.DB_HOST, { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
        .then(() => console.log(`DB successfully connected`))
        .catch(err => console.log(`Connection error: ${err}`))
}

exports.listProduct = () => Product.find()

exports.findProduct = productName => Product.find({ productName: { $regex: productName, $options: "i" } })

exports.deleteProduct = async id => await Product.deleteOne({ _id: id}, err => { if (err) return err })

exports.createProduct = async data => {
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
    return await product.save()
}

exports.changeProduct = async (id, data) => {
    await Product.updateOne({
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
    }, err => { if (err) return err })
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