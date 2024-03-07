const mongoose = require('mongoose')

const connectDB = (url) => {
    console.log(`Connecting to ${url}`)
    return mongoose.connect(url, {
    })
}

module.exports = connectDB


//MONOGDB_URL = "mongodb+srv://syncinventory:DRD5fgJuGOGfvXMd@syncinventory.ay8ourj.mongodb.net/SyncInventory?retryWrites=true&w=majority&appName=SyncInventory"
// PORT = 3000