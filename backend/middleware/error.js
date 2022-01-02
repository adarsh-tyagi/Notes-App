const ErrorHandler = require("../utils/errorHandler")

module.exports = async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"

    // wrong mongo id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    
    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400)
    }

    // invalid JWT error
    if (err.name === "JsonWebErrorToken") {
        const message = `Json Web Token is invalid. Try again.`
        err = new ErrorHandler(message, 400)
    }

    // JWT expire error
    if (err.name === "TokenExpired") {
        const message = `Json Web Token expired`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({success: false, message: err.message})
}