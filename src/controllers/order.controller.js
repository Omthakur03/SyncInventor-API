const Order = require("../models/order.model")
const User = require("../models/users.model")
const Branch = require ("../models/branchs.model")
const jwt = require("jsonwebtoken")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFound, UnauthenticatedError} = ("../errors")

const CreateOrder = async (req,res) => {
    const {custName,custPhone,compName,custEmail,UserId,BranchId,products} = req.body

    const order = new Order({
        custName,
        custPhone,
        compName,
        custEmail,
        UserId,
        BranchId,
        products
    })

    const data = await order.save()

    res.status(StatusCodes.CREATED).json({
        success : true,
        msg : "Order created successfully",
        data
    })
}

const getAllOrder = async (req,res) => {

    const data = await Order.find({})

    if (!data){
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Nothing to show"
        })
    }
    else{
        res.status(StatusCodes.CREATED).json({
            success : true,
            msg : "here is your order",
            data
        })
    }
}

const getBranchOrder = async(req,res) => {
    const {id} = req.body

    const branch = await Branch.findById(id)

    if (!branch){
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Id not found"
        })
    }
    else {
        const data = await Order.find({BranchId : id})

        res.status(StatusCodes.OK).json({
            success : true,
            msg : "Data Found",
            data
        })
    }
}

const updateOrder = async(req,res)=> {
    const {id,status} = req.body

    const data = await Order.findByIdAndUpdate(id,{status : status})

    res.status(StatusCodes.OK).json({
        success : true,
        msg : "Order Updated",
    })
}

const getOrder = async (req,res) => {
    const {id} = req.body

    const data = await Order.findById(id)
    
    if (!data){
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Order Not Found",
            data
        })
    }
    else {
        const user = await User.findById(data.UserId)
        const branch = await Branch.findById(data.BranchId)
        res.status(StatusCodes.OK).json({
            success : true,
            msg : "Order Found",
            data
        })
    }
}
module.exports = {
    CreateOrder,
    getAllOrder,
    getBranchOrder,
    updateOrder,
    getOrder
}