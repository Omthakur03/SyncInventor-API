const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name : {
        type : String,
        default : "Admin"
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
    }
});

module.exports = mongoose.model("Admin",AdminSchema)