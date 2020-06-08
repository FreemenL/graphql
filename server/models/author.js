const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchma = new Schema({
  name: String,
  age: Number
})

module.exports = mongoose.model("Auth",authSchma);