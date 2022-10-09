const Mongoose = require("mongoose");

const TestSchema = new Mongoose.Schema({
  title: { type: String },
});

const Test = Mongoose.model("test", TestSchema, "test");
module.exports = Test;
