const Notification = require("../models/notifications.model");

const { StatusCodes } = require("http-status-codes");

const {
  BadRequestError,
  NotFound,
  UnauthenticatedError,
} = require("../errors");

// creating notification
const createNotification = async (req, res) => {
  const { title, description, User_email, Sender_email} = req.body;

  const notification = new Notification({
    title,
    description,
    User_email,
    Sender_email,
  });

  const data = await notification.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Notification created successfully",
    data,
  });
};

// fetching user notification
const getNotification = async (req, res) => {
  const { User_email } = req.body;

  const data = await Notification.find({User_email : User_email});

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "User Notification Not Found",
      data,
    });
  } else {
    res.status(200).json({
      success: true,
      msg: "User Notification Fetched",
      data,
    });
  }
};

const createAllNotification = async (req,res) => {
  const { title, description, User_email, Sender_email} = req.body;

  const notification = new Notification({
    title,
    description,
    User_email,
    Sender_email,
  });

  const data = await notification.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Notification for all created successfully",
    data,
  });

}

const getAllNotification = async (req,res) => {
  const data = await Notification.find({User_email : "all"});

  if (!data.length) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "All Notification Not Found",
      data,
    });
  } else {
    res.status(200).json({
      success: true,
      msg: "All Notification Fetched",
      data,
    });
  }
}

module.exports = {
    createNotification,
    getNotification,
    createAllNotification,
    getAllNotification
}
