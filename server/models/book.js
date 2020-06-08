const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchma = new Schema({
  name: String,
  gener : String,
  authorId: String  
})

module.exports = mongoose.model("Book",bookSchma);