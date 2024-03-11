const Product = require("../models/product.model")
const jwt = require("jsonwebtoken")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFound, UnauthenticatedError} = ("../errors")


const addProduct = async (req,res) => {
    const {Prodname,price,quantity,description} = req.body

    const product = new Product({
        Prodname,
        price,
        quantity,
        description,
    })

    const data = await product.save()

    res.status(StatusCodes.CREATED).json({
        success : true,
        msg : "Product Added successfully",
        data
    });
}

const getAllProduct = async (req,res) => {

    const data = await Product.find({})

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Product Not Found"
        })
    }
    else {
        res.status(StatusCodes.OK).json({
            success  : true,
            msg : "Product Found successfully",
            data : data
        })
    }
}

const getProduct = async (req,res) => {
    const {id} = req.body

    const data = await Product.findById(id)

    if (!data) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            msg : "Product Not Found"
        })
    }
    else {

        res.status(StatusCodes.OK).json({
            success : true,
            msg : "Product Found",
            data
        })
        
    }
}

const deleteProduct = async (req,res) => {
    const {_id} = req.body

    const data = await Product.find({_id : _id})

    if (!data.length) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: 'Product not found',
            data: data
        });
    }
    else {
        Product.deleteOne({_id : _id}).then(doc => {
            res.status(StatusCodes.CREATED).json({
                success: true,
                msg: 'Product Deleted successfully',
                data: doc
            });
        });       
    }

}
// const updateProduct = async (req,res) => {

//     const {name,id,Prodname,price,quantity,description,status} = req.body

//     const data = await Branch.findOne({name : name})

//     if (!data) {
//         res.status(StatusCodes.NOT_FOUND).json({
//             success : false,
//             msg : "Branch Not Found"
//         })
//     }
//     else {

//         const productIndex = data.products.findIndex(product => product._id == id)
            
//         if (productIndex === -1) {
//             return res.status(404).json({ success: false, msg: 'Product not found' });
//         }


//         updatedProduct = {
//             "Prodname" : Prodname,
//     "price" : price,
//     "quantity" : quantity,
//     "description" : description,
//     "status" : status
//         }

//         data.products[productIndex] = { ...data.products[productIndex], ...updatedProduct }

//         await data.save();

//         return res.status(200).json({ success: true, msg: 'Product updated successfully', data: data });
        
//     }
// }
module.exports = {
    addProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
}