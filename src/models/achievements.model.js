const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.ObjectId;

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;

const AchievementSchema = new mongoose.Schema({
    User_id : {
        type : ObjectID,
        ref : 'User',
    },
    email : {
        type : String,
    },
    name : {
        type : String
    },
    title : {
        type : String,
    },
    description : {
        type : String,
    },
    date : {
        type : String,
        default : date
    },
    sport : {
        type : String
    },
    status : {
        type : String,
        enum : {
            values : ["Pending","Approved","Rejected"],
            message : `{VALUE} is not supported`,
        },
        default : "Pending"
    },
    img : {
        type : String,
        default : "post"
    },
    approved : {
        type : String,
        default : "Admin"
    },
    like : {
        type : Number
    }
});

module.exports = mongoose.model("Achievement",AchievementSchema)