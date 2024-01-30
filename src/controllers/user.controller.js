const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, NotFound, UnauthenticatedError } = require("../errors");

//Sign - Up
const createUser = async (req,res) => {

    const { name, gender, location, department, year, student_id, email, phone, password} = req.body

    // if (!name || !phone || !email || !password || !orgType || !address || !city || !postalCode || !state || !country || !uniqueId) {
    //     throw new BadRequestError('Something is missing, Bad input')
    // }

    // const hashPassword = bcrypt.hashSync(password, 8);

    const user = new User({
        name,
        gender,
        location,
        department,
        year,
        student_id,
        email,
        phone, 
        password,
    });
    const data = await user.save();
    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "User created successfully",
        data
    });
    
};

// Sign - In
const userLogin = async(req,res) =>{
    const { email, password } = req.body

    if (!email || !password) throw new BadRequestError('Something is missing,Bad input')

    const data = await User.findOne({email:email})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'Login UnSuccessful',
        })   
    }
    else {
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
            console.log("password not matched");
            res.status(StatusCodes.NOT_FOUND).json({
                success: true,
                msg: 'Login Denied',
            });
        }
    }
   
};

// update user
const forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body

    // if (!email.trim()) throw new BadRequestError('Something is missing,Bad input')

    const data = await User.find({email : email})

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'User Not found',
            data: {data},
        }) 
    }
    else {

        User.updateOne({email}, 
            {password: newPassword}
        ).then(doc => {
            res.status(StatusCodes.CREATED).json({
                success: true,
                msg: 'Message has been sent to your email address',
                data: doc
            });
        });        
    }
}

const getAllUsers = async (req,res) => {

    const data = await User.find({});

    res.status(200).json({
        msg : "I am getAllUsersTesting",
        data
    });
};


const userProfile  = async(req,res) =>{
    const {email} = req.body

    if (!email) throw new BadRequestError('Something is missing,Bad input')

    const data = await User.find({email:email})

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'User Not found',
            data: {data},
        }) 
    }
    else{
        res.status(StatusCodes.OK).json({
            success: true,
            msg: 'User Found',
            data,
        })    
    }

};


// add profile pic  user
const ProiflePic = async (req, res) => {
    const { email, profile } = req.body

    // if (!email.trim()) throw new BadRequestError('Something is missing,Bad input')

    const data = await User.find({email : email})

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'User Not found',
            data: {data},
        }) 
    }
    else {

        User.updateOne({email}, 
            {profileimg: profile}
        ).then(doc => {
            res.status(StatusCodes.CREATED).json({
                success: true,
                msg: 'Profile Pic upated',
                data: doc
            });
        });        
    }
}

module.exports = {
    userLogin,
    createUser,
    forgotPassword,
    getAllUsers,
    userProfile,
    ProiflePic
};