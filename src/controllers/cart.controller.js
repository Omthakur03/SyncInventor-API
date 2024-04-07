const Cart = require("../models/cart.model");
const Branch = require("../models/branchs.model");
const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFound, UnauthenticatedError } = "../errors";

const CreateCart = async (req, res) => {
  const { wishlist_name, custPhone, UserId, BranchId, products } = req.body;

  const cart = new Cart({
    wishlist_name,
    custPhone,
    UserId,
    BranchId,
    products,
  });

  const data = await cart.save();

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Cart created successfully",
    data,
  });
};

const getAllCart = async (req, res) => {
  const data = await Cart.find({});

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Nothing to show",
    });
  } else {
    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "here is your cart",
      data,
    });
  }
};

const getBranchCart = async (req, res) => {
  const { id } = req.body;

  const branch = await Branch.findById(id);

  if (!branch) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Branch Id not found",
    });
  } else {
    const data = await Cart.find({ BranchId: id });

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Data Found",
      data,
    });
  }
};

const addProduct = async (req, res) => {
  const { id, ProdId } = req.body;

  const data = await Cart.findById(id);

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Cart Not Found",
      data,
    });
  } else {
    await Cart.updateOne(
      { _id: id },
      { $push: { products: { ProdId: ProdId } } }
    );

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Product added",
    });
  }
};

const getCartProduct = async (req, res) => {
  const { id } = req.body;

  const data = await Cart.findById(id);
  const newdata = { ...data._doc };

  var products = [];

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Cart Not Found",
    });
  } else {
    // const product = await Produ.findById(data.BranchId)

    // console.log(data.products[0].ProdId);

    for (let i = 0; i < data.products.length; i++) {
      const product = await Product.findById(data.products[i]["ProdId"]);

      if (product) {
        products.push(product);
      }
    }
    // console.log(products);

    newdata.products = products;
    // console.log(newdata.products);
    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Cart Product Found",
      newdata,
    });
  }
};

const updateCart = async (req, res) => {
  const { id, newstatus } = req.body;

  const data = await Cart.findById(id);

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Cart Not Found",
    });
  } else {
    data.status = newstatus;

    await data.save();
    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "Cart Updated Succesfully",
      data: data,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id, ProdId } = req.body;

  const cart = await Cart.findById(id);

  if (!cart) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Cart Not Found",
    });
  } else {
    cart.products = cart.products.filter(
      (product) => product.ProdId !== ProdId
    );

    await cart.save();

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "Product Removed",
      data: cart,
    });
  }
};

const custCart = async (req,res) => {
  const {phone} = req.body;

  const data = await Cart.find({custPhone : phone});

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "Nothing to show",
    });
  } else {
    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "here is your cart",
      data,
    });
  }
}
module.exports = {
  CreateCart,
  getAllCart,
  getBranchCart,
  addProduct,
  getCartProduct,
  updateCart,
  deleteProduct,
  custCart
};
