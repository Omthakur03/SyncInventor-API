const Request = require("../models/request.model");
const User = require("../models/users.model");
const Branch = require("../models/branchs.model");
const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFound, UnauthenticatedError } = "../errors";

const createRequest = async (req, res) => {
  const { UserId, BranchId, ProdId, description,type } = req.body;

  const request = new Request({
    UserId,
    BranchId,
    ProdId,
    description,
    type
  });

  const data = await request.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Request created successfully",
    data,
  });
};

const getAllRequest = async (req, res) => {
  const data = await Request.find({}).populate("UserId")
  .populate("BranchId")
  .populate("ProdId");;

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Nothing to show",
    });
  } else {
    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "Here is all the request for product",
      data,
    });
  }
};

const getBranchRequest = async (req, res) => {
  const { id } = req.body;

  const branch = await Branch.findById(id);

  if (!branch) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Branch Id not found",
    });
  } else {
    const data = await Request.find({ BranchId: id });

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Data Found",
      data,
    });
  }
};

const getRequest = async (req, res) => {
  const { id } = req.body;

  const data = await Request.findById(id)
    .populate("UserId")
    .populate("BranchId")
    .populate("ProdId");

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Request Not Found",
      data,
    });
  } else {
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Request Found",
      data,
    });
  }
};

const updateRequest = async (req,res) => {
    const {id,status} = req.body


      const data = await Request.findByIdAndUpdate(id,{status : status})

      res.status(StatusCodes.OK).json({
          success : true,
          msg : "Request Updated",
      })
}
module.exports = {
  createRequest,
  getAllRequest,
  getBranchRequest,
  getRequest,
  updateRequest
};
