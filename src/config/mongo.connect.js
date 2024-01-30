const mongoose = require('mongoose')

// url  = "mongodb+srv://athelecity:vir7pnrNKeiQ82u5@athelecity.px2a8p1.mongodb.net/Athelecity?retryWrites=true&w=majority";

const connectDB = (url) => {
    console.log(`Connecting to ${url}`)
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB