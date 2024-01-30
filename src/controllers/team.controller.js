const Team = require("../models/teams.model")
const User = require("../models/user.model");

const { StatusCodes } = require("http-status-codes");

const {
  BadRequestError,
  NotFound,
  UnauthenticatedError,
} = require("../errors");

const createTeam = async (req,res) =>{
    const {name, leader,event,subevent,members} = req.body

    const team = new Team ({name, leader,event,subevent,members});

    const data = await team.save();

    team_id = data["_id"]
    
    for (let i=0;i<members.length;i++){
        email = members[i]["email"]
        console.log(email);
        await User.updateOne({email : email},{$push : {team : team_id}})

    }

    res.status(StatusCodes.CREATED).json({
        success: true,
    msg: "Team Created successfully",
    data,
    })
}

const getTeam = async (req,res) => {
    const {_id} = req.body
    const data = await Team.find({"_id": _id});

    if (!data.length){
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Team Not Found",
        });  
    }
    else{
        res.status(200).json({
            success : true,
            msg : "Team Found",
            data : data
        });  
    }

}

const getAllTeam = async (req,res) => {
    const data = await Team.find({});

    if (!data.length){
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Team Not Found",
        });  
    }
    else{
        res.status(200).json({
            success : true,
            msg : "Team Found",
            data : data
        });  
    }

}

module.exports = {
    createTeam,
    getTeam,
    getAllTeam
}