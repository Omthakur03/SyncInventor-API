require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/mongo.connect")
const bodyParser = require("body-parser");
const authMiddleware = require("./src/middlewares/auth.middleware")
const PORT = process.env.PORT || 3000;

const users_routes = require("./src/routes/users.route");
const branch_routes = require("./src/routes/branches.route")


app.use(bodyParser.json());
app.use("/testing",(req,res)=>{
    res.send("Yes, I am live")
});

app.use("/users",users_routes);
app.use("/branch",branch_routes)
const start = async () =>{
    try{
        await connectDB(process.env.MONOGDB_URL);
        app.listen(PORT,()=>{
            console.log(`${PORT} yes i am connected`);
        });
    }
    catch (error){
        console.log(error);
    }
};

start();