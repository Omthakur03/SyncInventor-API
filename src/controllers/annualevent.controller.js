const AnnualEvent = require("../models/annualevent.model");

const { StatusCodes } = require("http-status-codes");

const {
    BadRequestError,
    NotFound,
    UnauthenticatedError,
} = require("../errors");

const createAnnualEvent = async (req, res) => {
    const { Name, Registration_start, Registration_end, Event_start, Event_end, description, img, SubEvents } = req.body;

    const annualevent = new AnnualEvent({ Name, Registration_start, Registration_end, Event_start, Event_end, description, img, SubEvents });

    const data = await annualevent.save();

    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "AnnualEvent added successfully",
        data,
    })
};

const getAnnualEvent = async (req, res) => {

    const data = await AnnualEvent.find({});

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: "No Annual Event",
        });
    }
    else {
        res.status(200).json({
            success: true,
            msg: "Annual Event Found",
            data: data
        });
    }
}

const getFilterSubevnets = async (req, res) => {

    const { type , sport } = req.query
    const Id=req.params["id"]

    var array1=[]

    const data = await AnnualEvent.find({_id:Id});

    for(let i=0;i< (data[0].SubEvents).length;i++){
        array1.push(data[0].SubEvents[i])
    }

    var filterData =[]

    if (type && !sport){
        for (let j=0;j<array1.length;j++){
            if(array1[j].type==type){
                filterData.push(array1[j])
            }
        }
    }
    if (sport && !type){
        for (let j=0;j<array1.length;j++){
            if(array1[j].sport==sport){
                filterData.push(array1[j])
            }
        }
    }
    if (type && sport){
        var data2=[]
        for (let j=0;j<array1.length;j++){
            if(array1[j].type==type){
                data2.push(array1[j])
            }
        }

        for (let j=0;j<data2.length;j++){
            if(data2[j].sport==sport){
                filterData.push(data2[j])
            }
        }

    }

    if(!filterData.length){
        filterData=array1        
    }


    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: "No Annual Event",
        });
    }
    else {
        res.status(200).json({
            success: true,
            msg: "Annual Event Found",
            data: filterData
        });
    }
}

const getUserAnnualEvent = async (req, res) => {
    
    const {id} =req.body

    const data = await AnnualEvent.find({_id : id});

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: "No Annual Event",
        });
    }
    else {
        res.status(200).json({
            success: true,
            msg: "Annual Event Found",
            data: data
        });
    }
}

const getUserSubEvent = async (req, res) => {
    
    const {id,s_id} =req.body

    const data = await AnnualEvent.find({_id : id});

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: "No Annual Event",
        });
    }
    else {

    const sub_data = data[0]["SubEvents"]

    var array1=[]

    for(let i=0;i< sub_data.length;i++){
        if (sub_data[i]["_id"]==s_id){
            array1.push(sub_data[i])
        }
        
    }

    if (!sub_data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: "No Annual Event",
        });
    }
    else {
        
        res.status(200).json({
            success: true,
            msg: "Annual Event Found",
            data: array1
        });
    }
    }
}

module.exports = {
    getFilterSubevnets,
    createAnnualEvent,
    getAnnualEvent,
    getUserAnnualEvent,
    getUserSubEvent
}