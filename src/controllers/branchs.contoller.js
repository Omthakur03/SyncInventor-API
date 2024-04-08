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
    // const id = req.params.id
    const {name} = req.body

    // const data = await Branch.findById(id)

    const branch = await Branch.findOne({name : name})

    console.log(branch);

    if (!branch) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {
        res.status(StatusCodes.OK).json({
            success  : true,
            msg : "Branch fetched successfully",
            branch
        })
    }

}

const getBranchDetails = async(req,res) => {
    const {name} = req.body

    const branch = await Branch.findOne({name : name})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {
        res.status(StatusCodes.OK).json({
            success  : true,
            msg : "Branch fetched successfully",
            branch
        })
    }

}

module.exports = {
    createBranch,
    getBranch,
    getAllBranch,
    getBranchDetails
}