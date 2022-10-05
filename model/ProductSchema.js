const Mongoose = require("mongoose");

const ProductSchema = new Mongoose.Schema({
  name: { type: String, unique: true, required: true },
  imageUrl: { type: String, unique: true, required: true },
  price: { type: Number, default: false, required: true },
});

const Product = Mongoose.model("product", ProductSchema);
module.exports = Product;
