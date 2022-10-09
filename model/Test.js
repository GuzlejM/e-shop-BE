const Mongoose = require("mongoose");

const TestSchema = new Mongoose.Schema({
  title: { type: String },
});

const Test = Mongoose.model("yo", TestSchema, "yo");
module.exports = Test;
