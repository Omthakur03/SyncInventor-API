const Achievement = require("../models/achievements.model");

const { StatusCodes } = require("http-status-codes");

const {
  BadRequestError,
  NotFound,
  UnauthenticatedError,
} = require("../errors");

//creating achievement
const createAchievement = async (req, res) => {
  const {
    User_id,
    email,
    name,
    title,
    description,
    date,
    sport,
    status,
    img,
    approved,
    like,
  } = req.body;

  const achievement = new Achievement({
    User_id,
    email,
    name,
    title,
    description,
    date,
    sport,
    status,
    img,
    approved,
    like,
  });

  const data = await achievement.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Achievement added successfully",
    data,
  });
};

// for admin
const getAllAchievementAdmin = async (req, res) => {
  // const {} = req.body;
  const data = await Achievement.find({ status: "Pending" });

  if (!data.length){
    res.status(StatusCodes.NOT_FOUND).json({
        success : false,
        msg : "No Achievement to update",
    });  
}
else{
    res.status(200).json({
        success : true,
        msg : "Achievement Found",
        data : data
    });  
}

};

// admin will update status
const updateAchievement = async (req, res) => {
  const { _id, status, approved } = req.body;

  const data = await Achievement.find({ _id: _id });

  if (!data.length) {
    res.status(StatusCodes.NOT_FOUND).json({
      success : "false",
      msg : "Achievement not found",
      data
    })
  } else {
    Achievement.updateOne({ _id }, {approved : approved, status : status}).then((doc) => {
        res.status(200).json({
          msg: "Updated Achievement Successfully",
          doc,
        });
      });
  }
};


// for all user publically
const getAllAchievements = async (req, res) => {
  const data = await Achievement.find({ status: "Approved" });

  if (!data.length) {
     res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'All Achievement Not found',
            data: data,
        })
  } else {
    res.status(200).json({
      msg: "I am getAllAchievements",
      data,
    });
  }
};

// for user profile
const getUserAchievements = async (req, res) => {
  const { email } = req.body;

  const data = await Achievement.find({ email : email });

  if (!data.length) {
     res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'User Achievement not found',
            data: data,
        })
  } else {
    res.status(200).json({
      msg: "I am getUserAchievements",
      data,
    });
  }
};

module.exports = {
  createAchievement,
  getAllAchievementAdmin,
  updateAchievement,
  getAllAchievements,
  getUserAchievements,
};
