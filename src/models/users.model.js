const mongoose = require("mongoose");

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    phone : {
        type : Number,
    },
    password : {
        type : String,
    },
    role : {
        type : String,
        enum: {
            values: ["Admin", "Staff", "Manager"],
            message: "{VALUE} is not supported",
          },
    },
    created_on : {
        type : String,
        default : date
    },
    branch : {
        type : String,
    },

});

module.exports = mongoose.model("User",userSchema);
