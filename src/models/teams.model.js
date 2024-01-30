const mongoose = require("mongoose")

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;


const TeamSchema = new mongoose.Schema({
    name : {
        type : String
    },
    leader : {
        type : String
    },
    register_date : {
        type : String,
        default : date
    },
    event : {
        type : String
    },
    subevent : {
        type : String
    },
    members : {
        type : Array
    }

});

module.exports = mongoose.model("Team",TeamSchema)