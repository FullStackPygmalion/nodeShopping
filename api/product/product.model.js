/* Product model */

const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductSchema = new Schema({
  name: { type: String, uppercase: true, required: true },
  avaliableQuantity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }
}, { timestamps: true })

ProductSchema
  .path('avaliableQuantity')
  .validate((avaliableQuantity)=> {
    if (avaliableQuantity > 0) return true
    return false
  }, 'The avaliable quantity must be greater than 0')


  module.exports = mongoose.model('Product', ProductSchema)
