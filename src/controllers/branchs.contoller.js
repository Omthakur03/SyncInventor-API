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

const getAllBranch = async(req, res) => {
    const data = await Branch.find({})
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Successfully",
        data
    })
}

const getBranch = async(req,res) => {
    const id = req.params.id
    const {name} = req.body

    const data = await Branch.findById(id)

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

module.exports = {
    createBranch,
    getBranch,
    getAllBranch,
}