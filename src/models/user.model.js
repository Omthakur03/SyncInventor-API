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
    gender : {
        type : String,
        enum: {
            values: ["Male", "Female", "Others"],
            message: "{VALUE} is not supported",
          },
    },
    dob : {
        type : String,
        default : date
    },
    location : {
        type : String,
    },
    rating : {
        type : Number,
        default : 10.0,
    },
    department : {
        type : String,
    },
    year : {
        type : String,
        enum : {
            values : ["FY","SY","TY"],
            message : `{VALUE} is not supported`,
        },
    },
    student_id : {
        type : Number,
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
    joined : {
        type : String,
        default : date
    },
    team : [{
        type : String,
    }],
    profileimg : {
        type : String
    }

});

module.exports = mongoose.model("User",userSchema);
