const jwt = require('jsonwebtoken')
const { StatusCodes } = require("http-status-codes");

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            msg: 'Not Token Provided',
            data: {},
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const { id, email } = decoded
        req.user = { id, email }
        next()
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            msg: 'Not Authorized to access this route!',
            data: {},
        })
    }
}

module.exports = authenticationMiddleware
