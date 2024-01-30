const dailyRoutine = require("../models/dailyroutine.model");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, NotFound, UnauthenticatedError } = require("../errors");

var date_ob = new Date();
var day = ("0" + date_ob.getDate()).slice(-2);
var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
   
var date = year + "-" + month + "-" + day;

// creating DailyRoutine 
const createRoutine = async (req,res) => {
    const {title,description,sports,start_time,end_time,day} = req.body;

    const routine = new dailyRoutine({
        title,
        description,
        sports,
        start_time,
        end_time,
        day
    });

    const data = await routine.save();

    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "Routine created successfully",
        data
    });
};

//  fetch all routine
const getAllRoutine = async (req,res) => {

    const data = await dailyRoutine.find({});

    res.status(200).json({
        msg : "Fetched All Routine",
        data
    });
};

// particular routine 
const getRoutine = async (req,res) => {
    const {day} = req.body;
    const data = await dailyRoutine.find({day : day});

    if (!data.length){
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Routine Not Found",
        });  
    }
    else{
        res.status(200).json({
            success : true,
            msg : "Fetched Today Routine",
            data : data
        });  
    }

};

const updateRoutine = async (req, res) => {
    const { day , title ,description,start_time,end_time  } = req.body

    // if (!email.trim()) throw new BadRequestError('Something is missing,Bad input')

    const data = await dailyRoutine.find({day : day})

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'Routine not updated',
            data: data
        });
    }
    else 
        dailyRoutine.updateOne({day}, 
            {
                title : title,
            }
        ).then(doc => {
            res.status(StatusCodes.CREATED).json({
                success: true,
                msg: 'Routine updated successfully',
                data: doc
            });
        });        
    }

const deleteroutine = async (req,res) =>{
    const {_id} = req.body

    const data = await dailyRoutine.find({_id : _id})

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'Routine not found',
            data: data
        });
    }
    else 
        dailyRoutine.deleteOne({_id : _id}).then(doc => {
            res.status(StatusCodes.CREATED).json({
                success: true,
                msg: 'Routine updated successfully',
                data: doc
            });
        });        
    }

module.exports = {
    createRoutine,
    getAllRoutine,
    getRoutine,
    updateRoutine,
    deleteroutine
};