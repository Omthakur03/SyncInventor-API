const mongoose = require("mongoose");

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;

const NotificationSchema = new mongoose.Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
    User_email : {
        type : String
    },
    Sender_email : {
        type : String
    },
    send_data : {
        type : String,
        default : date
    }
});

module.exports = mongoose.model("Notification",NotificationSchema);