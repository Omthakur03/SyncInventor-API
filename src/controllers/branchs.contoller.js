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
    const {name,id} = req.body

    const data = await Branch.findOne({name : name})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {

        var products = data['products']

        for (let i = 0; i <products.length;i++){
            if (products[i]['_id'] == id){
                res.status(StatusCodes.OK).json({
                    success  : true,                    
                    msg : "Product Found successfully",
                    data : products[i] 
                });
                break
            }
        }

        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Product Not Found"
        })
        
    }
}

const updateProduct = async (req,res) => {

    const {name,id,Prodname,price,quantity,description,status} = req.body

    const data = await Branch.findOne({name : name})

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Branch Not Found"
        })
    }
    else {

        const productIndex = data.products.findIndex(product => product._id == id)
            
        if (productIndex === -1) {
            return res.status(404).json({ success: false, msg: 'Product not found' });
        }


        updatedProduct = {
            "Prodname" : Prodname,
    "price" : price,
    "quantity" : quantity,
    "description" : description,
    "status" : status
        }

        data.products[productIndex] = { ...data.products[productIndex], ...updatedProduct }

        await data.save();

        return res.status(200).json({ success: true, msg: 'Product updated successfully', data: data });
        
    }
}
module.exports = {
    createBranch,
    getBranch,
    getAllBranch,
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct
}