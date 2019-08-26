const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productId: { type: String },
    productImg: { type: Object },
    productIsbn: { type: String },
    productName: { type: String },
    productVote: { type: String },
    productYear: { type: String },
    productPrice: { type: String },
    productRating: { type: String },
    productLastName: { type: String },
    productFirstName: { type: String }
})

module.exports = mongoose.model('Product', ProductSchema)