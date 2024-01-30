const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.ObjectId;

const RequestSchema = new mongoose.Schema({
    User_id : {
        type : ObjectID,
        ref : 'User',
    },
    description : {
        type : String,
    },
    status : {
        type : String,
        enum : {
            values : ["Pending","Approved","Rejected"],
            message : `{VALUE} is not supported`,
        },
        default : "Pending"
    },
    Date : {
        type : Date,
        default : Date.now()
    },
    approved : {
        type : String,
        default : "Admin"
    }
});

module.exports = mongoose.model("Request",RequestSchema);