const catchAsyncError = require("./catchAsyncError")
const ErrorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        next(new ErrorHandler("Please login to access this resource", 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token
    })

    if (!user) {
        next(new ErrorHandler("Please login to access this resource", 401))
    }
    req.user = user
    next()
})

module.exports = isAuthenticatedUser