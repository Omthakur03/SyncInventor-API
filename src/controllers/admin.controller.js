const AdminDetails = require("../models/admin.model")
const jwt = require('jsonwebtoken')
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFound, UnauthenticatedError } = require("../errors");

// creating DailyRoutine 
const createAdmin = async (req,res) => {
    const {name , email,password} = req.body;

    const admin = new AdminDetails({
        name,
        email,
        password
    });

    const data = await admin.save();

    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "Admin created successfully",
        data
    });
};

const AdminLogin = async (req,res) => {

    const { email, password } = req.body

    if (!email || !password) throw new BadRequestError('Something is missing,Bad input');

    const data = await AdminDetails.findOne({email:email})

    if (!data) {
         res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'Login Unsuccessful',
            data: data,
        })
    }

    if (password==data.password){
        const id = data._id

        const token = jwt.sign({ id, email }, process.env.JWT_TOKEN, {
            expiresIn: '30d',
        })
    
        res.status(StatusCodes.OK).json({
            success: true,
            msg: 'Login Successful',
            data: { token , data},
        })
    }
    else{
         res.status(StatusCodes.NOT_ACCEPTABLE).json({
            success: false,
            msg: 'Password not mactched',
            data: " ",
        })
    }
};

module.exports = {
    createAdmin,
    AdminLogin,
};