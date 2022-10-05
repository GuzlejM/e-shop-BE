const Mongoose = require("mongoose");

const CategorySchema = new Mongoose.Schema({
  title: { type: String, unique: true, required: true },
  items: { type: [ProductSchema] },
});

const Category = Mongoose.model("category", CategorySchema);
module.exports = Category;
