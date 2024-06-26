const mongoose = require("mongoose");
Schema=mongoose.Schema;

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;

const orderSchema = new mongoose.Schema({
    DateTime : {
        type : String,
        default : date
    },
    custName : {
        type : String,
    },
    custPhone : {
        type : Number,
    },
    custEmail : {
        type : String,
    },
    compAddress : {
        type : String,
    },
    UserId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    BranchId : {
        type: Schema.Types.ObjectId,
        ref: 'Branch'
    },
    paymentMode : {
        type : String,
        enum: {
            values: ["Cash", "Upi", "Card Payment"],
            message: "{VALUE} is not supported",
          },
    },
    DeliveryMode : {
        type : String,
        enum: {
            values: ["Takeaway", "StoreDelivery"],
            message: "{VALUE} is not supported",
          },
    },
    products : [
        {
            Prodname : {
                type : String
            },
            price : {
                type : Number
            },
            quantity : {
                type : Number
            },
        }
    ],
    status : {
        type : String,
        enum: {
            values: ["Pending", "Closed", "Completed"],
            message: "{VALUE} is not supported",
          },
        default : "Pending"
    }

});

module.exports = mongoose.model("order",orderSchema);
