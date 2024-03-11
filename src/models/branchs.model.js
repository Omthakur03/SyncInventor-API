const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : Number
    },
    address : {
        type : String
    },
});

module.exports = mongoose.model("Branch",branchSchema);
