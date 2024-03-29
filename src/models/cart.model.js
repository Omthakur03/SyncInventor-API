const mongoose = require("mongoose");

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;

const cartSchema = new mongoose.Schema({
    DateTime : {
        type : String,
        default : date
    },
    wishlist_name : {
        type : String
    },
    custPhone : {
        type : Number,
    },
    UserId : {
        type : String,
    },
    BranchId : {
        type : String,
    },
    products : [
        {
            ProdId : {
                type : String,
                unique : true,
            }
        }
    ],
    status : {
        type : String,
        enum: {
            values: ["Opened", "Ordered", "Closed"],
            message: "{VALUE} is not supported",
          },
        default : "Opened"
    }

});

module.exports = mongoose.model("Cart",cartSchema);
