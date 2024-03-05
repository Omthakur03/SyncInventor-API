const Branch = require("../models/branchs.model")
const jwt = require("jsonwebtoken")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFound, UnauthenticatedError} = ("../errors")

const createBranch = async(req,res) => {
    const {name,email,phone,address} = req.body

    const branch = new Branch({
        name,
        email,
        phone,
        address,
    })

    const data = await branch.save()

    res.status(StatusCodes.CREATED).json({
        success : true,
        msg : "Branch created successfully",
        data
    });
}

const getBranch = async(req,res) => {
    const {name} = req.body

    const data = await Branch.findOne({name : name})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {
        res.status(StatusCodes.OK).json({
            success  : true,
            msg : "Branch created successfully",
            data
        })
    }

}

const addProduct = async (req,res) => {
    const {name,Prodname,price,quantity,description,status} = req.body

    const data = await Branch.findOne({name : name})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {         
        await Branch.updateOne({name : name}, {$push : {products  : {Prodname : Prodname , price : price , quantity : quantity, description : description, status : status}}})

        res.status(StatusCodes.CREATED).json({
            success  : true,
            msg : "Product added succesfully successfully",
        })
    }
}

const getAllProduct = async (req,res) => {
    const {name} = req.body

    const data = await Branch.findOne({name : name})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {
        res.status(StatusCodes.OK).json({
            success  : true,
            msg : "Branch created successfully",
            data : data['products']
        })
    }
}

const getProduct = async (req,res) => {
    const {name} = req.body

    const data = await Branch.findOne({name : name})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {
        res.status(StatusCodes.OK).json({
            success  : true,
            msg : "Branch created successfully",
            data : data['products']
        })
    }
}

const updateProduct = async (req,res) => {
    const {name} = req.body

    const data = await Branch.findOne({name : name})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {
        res.status(StatusCodes.OK).json({
            success  : true,
            msg : "Branch created successfully",
            data : data['products']
        })
    }
}
module.exports = {
    createBranch,
    getBranch,
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct
}