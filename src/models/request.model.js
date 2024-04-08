const mongoose = require("mongoose");

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();

var date = year + "-" + month + "-" + day;

const requestSchema = new mongoose.Schema({
  DateTime: {
    type: String,
    default: date,
  },
  UserId: {
    type: Schema.Types.ObjectId,
        ref: 'User'
  },
  BranchId: {
    type: Schema.Types.ObjectId,
        ref: 'Branch'
  },
  ProdId: {
    type: Schema.Types.ObjectId,
        ref: 'Product'
  },
  description : {
    type : String
  },
  status: {
    type: String,
    enum: {
      values: ["Pending", "Completed"],
      message: "{VALUE} is not supported",
    },
    default: "Pending",
  },
  type : {
    type: String,
    enum: {
      values: ["Update", "Remove"],
      message: "{VALUE} is not supported",
    },
    default: "Update",
  },
});

module.exports = mongoose.model("Request", requestSchema);
