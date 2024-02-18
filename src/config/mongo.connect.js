const mongoose = require('mongoose')

const connectDB = (url) => {
    console.log(`Connecting to ${url}`)
    return mongoose.connect(url, {
    })
}

module.exports = connectDB


// MONOGDB_URL = "mongodb+srv://OmThakur:0NXUekPu2Fipi8xa@syncinventor.hpsewul.mongodb.net/SyncInventor?retryWrites=true&w=majority"
// PORT = 3000