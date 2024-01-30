const mongoose = require("mongoose");

const annualeventSchema = new mongoose.Schema({
    Name : {
        type : String
    },
    Registration_start : {
        type : String
    },
    Registration_end : {
        type : String
    },
    Event_start : {
        type : String,
    },
    Event_end : {
        type : String
    },
    description : {
        type : String
    },
    img : {
        type : String
    },
    SubEvents : [{
        sport : {
            type : String
        },
        type : {
            type  : String,
            enum : {
                values : ["Indoor","Outdoor"],
                message : `{VALUE} is not supported`,
            },
        },
        category : {
            type : String,
            enum : {
                values : ["Individual","Duo","Team"],
                message : `{VALUE} is not supported`,
            },
        },
        players : {
            type : Number,
        },
        description : { 
            type : String
        },
        fees : {
            type : Number
        }
    }]
});

module.exports = mongoose.model("AnnualEvent",annualeventSchema);