const Mongoose = require("mongoose");
var ProductSchema = require("./Product");

const CategorySchema = new Mongoose.Schema({
  title: { type: String, unique: true, required: true },
  items: { type: [] },
});

const Category = Mongoose.model("category", CategorySchema);
module.exports = Category;
