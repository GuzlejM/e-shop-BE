const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB Connected");
};

module.exports = connectDb;
