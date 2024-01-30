const Request = require("../models/request.model");

const { StatusCodes } = require("http-status-codes");

const {
  BadRequestError,
  NotFound,
  UnauthenticatedError,
} = require("../errors");

const createRequest = async (req,res) =>{
    const {User_id,description,status}=req.body;

    const request = new Request({
        User_id,
        description,
        status,
    });

    const data = await request.save();

    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "Request created successfully",
        data,
      });
}

// for admin
const getRequestAdmin = async (req, res) => {
    // const {} = req.body;
    const data = await Request.find({ status: "Pending" });
  
    if (!data) {
      throw new NotFound("Achievement Not Found");
    } else {
      res.status(200).json({
        msg: "I am getAllAchievementsAdmin",
        data,
      });
    }
};

// update is not working not updating
const updateRequest = async (req, res) => {
    const { _id, status, approved } = req.body;
  
    const data = await Request.find({ _id: _id });
  
    if (!data) {
      throw new NotFound("Request Not Found");
    } else {
      Request.updateOne({ _id }, { approved, status }).then((doc) => {
          res.status(200).json({
            msg: "Updated Request Successfully",
            doc,
          });
        });
    }
  };

  const allRequest = async (req,res) => {
    const data = await Request.find({});
    
    if (!data) {
      throw new NotFound("Request Not Found");
    } else {
      res.status(200).json({
        msg: "All Request Successfully",
        data,
      });
    }
  }

  module.exports = {
    createRequest,
    getRequestAdmin,
    updateRequest,
    allRequest
  };