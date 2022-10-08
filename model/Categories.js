const Mongoose = require("mongoose");
const ProductSchema = require("./Product");

const CategorySchema = new Mongoose.Schema({
  title: { type: String, unique: true, required: true },
  items: [ProductSchema],
});

const Categories = Mongoose.model("categories", CategorySchema, "categories");
module.exports = Categories;
