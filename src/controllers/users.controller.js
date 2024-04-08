const User = require("../models/users.model")
const Branch = require("../models/branchs.model")
const jwt = require("jsonwebtoken")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFound, UnauthenticatedError} = ("../errors")

const CreateUser = async (req,res) => {
    const {name, email, phone, password, role, branch} = req.body

    const brancId = await Branch.find({name : branch})
    const user = new User({
        name,
        email,
        phone,
        password,
        role,
        branch,
        brancId
    })

    const data = await user.save()

    res.json({
        success : true,
        msg : "User created successfully",
        data
    }).status(StatusCodes.CREATED);
}

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

const getAllUser = async (req,res) => {
    const data = await User.find({});

  if (!data.length) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Users Not Found",
    });
  } else {
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Users Found successfully",
      data: data,
    });
  }
}

const UserProfile = async (req,res) =>{
    const {email} = req.body

    const data = await User.find({email : email})

    res.status(StatusCodes.OK).json({
        msg : "Profile Fetched",
        data : data
    })
}

module.exports = {
    CreateUser,
    userLogin,
    forgotPassword,
    getAllUser,
    UserProfile
}