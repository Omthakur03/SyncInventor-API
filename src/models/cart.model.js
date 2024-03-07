const mongoose = require("mongoose");

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;

const userSchema = new mongoose.Schema({
    DateTime : {
        type : String,
        default : date
    },
    custemail : {
        type : String,
        unique : true,
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
                type : String
            }
        }
    ]

});

module.exports = mongoose.model("User",userSchema);
