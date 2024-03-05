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
    requests : [
        {
            reqId : String
        }
    ],
    products : [
        {
            Prodname : {
                type : String
            },
            price : {
                type : Number
            },
            quantity : {
                type : Number
            },
            description : {
                type : String
            },
            status : {
                type : String,
        enum: {
            values: ["Out of Stock", "In Stock"],
            message: "{VALUE} is not supported",
          },
            }
        }
    ]
});

module.exports = mongoose.model("Branch",branchSchema);
