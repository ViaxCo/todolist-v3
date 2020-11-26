const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  task: String,
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema],
});

module.exports = {
  Item: mongoose.model("Item", itemSchema),
  List: mongoose.model("List", listSchema),
};
