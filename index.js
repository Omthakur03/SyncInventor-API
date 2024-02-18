require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./src/config/mongo.connect")
const bodyParser = require("body-parser");
const authMiddleware = require("./src/middlewares/auth.middleware")
const PORT = process.env.PORT || 3000;

// const users_routes = require("./src/routes/user.route");
// const routine_routes = require("./src/routes/dailyroutine.route");
// const amdin_routes = require("./src/routes/admin.route");
// const dept_routes = require("./src/routes/department.route");
// const achievement_routes = require("./src/routes/achievements.route");
// const notifications_routes = require("./src/routes/notifications.route");
// const request_routes = require("./src/routes/request.route");
// const annualevent_routes = require("./src/routes/annualevent.route");
// const team_routes = require("./src/routes/team.route");

// app.get("/",(req,res) => {
//     res.send("Hi, I am live");
// });


// app.use(bodyParser.json());
// app.use("/athelecity/users",users_routes);
// app.use("/athelecity/routine",authMiddleware,routine_routes);
// app.use("/athelecity/admin",amdin_routes);
// app.use("/athelecity/department",authMiddleware,dept_routes);
// app.use("/athelecity/achievements",authMiddleware,achievement_routes);
// app.use("/athelecity/notifications",authMiddleware,notifications_routes);
// app.use("/athelecity/requests",authMiddleware,request_routes);
// app.use("/athelecity/annualevent",authMiddleware,annualevent_routes);
// app.use("/athelecity/team",authMiddleware,team_routes);
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