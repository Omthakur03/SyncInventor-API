const mongoose = require("mongoose");

// var date_ob = new Date();
// var day = ("0" + date_ob.getDate()).slice(-2);
// var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// var year = date_ob.getFullYear();
   
// var date = year + "-" + month + "-" + day;
    
// var hours = date_ob.getHours();
// var minutes = date_ob.getMinutes();
// var seconds = date_ob.getSeconds();

// var dateTime = hours + ":" + minutes + ":" + seconds;

const dailyroutineSchemna = new mongoose.Schema({
    title : {
        type : String,
    },
    description : {
        type : String,
    },
    start_time : {
        type : String,      
    },
    sports : {
        type : Array,
        default : ["Workout"]
    },
    end_time : {
        type : String,
    },
    day : {
        type : String,
    }
});

module.exports = mongoose.model("DailyRoutine",dailyroutineSchemna);