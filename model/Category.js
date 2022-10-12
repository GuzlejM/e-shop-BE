const Mongoose = require("mongoose");
const ProductSchema = require("./Product");

const CategorySchema = new Mongoose.Schema({
  title: { type: String, required: true },
  items: [ProductSchema],
});

const Category = Mongoose.model("categories", CategorySchema, "categories");
module.exports = Category;
