const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Prodname: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: {
      values: ["Out of Stock", "In Stock"],
      message: "{VALUE} is not supported",
    },
    default : "In Stock"
  },
});

module.exports = mongoose.model("Product", ProductSchema);
