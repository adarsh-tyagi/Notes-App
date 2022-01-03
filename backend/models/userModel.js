const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const validator = require("validator")
const Note = require("./noteModel")

// defined user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name should be longer than 3 alphabets"],
        maxlength: [30, "Name should be shorter than 30 alphabets"]
    },
    email: {
        type: String, 
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Password length should be greater than 8"],
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// generating authentication jsonwebtoken
userSchema.methods.getJWTToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// generate password resetting token
userSchema.methods.getResetPasswordToken = async function () {
    const user = this
    const resetToken = crypto.randomBytes(20).toString("hex")
    // setting reset token and expiration time i.e. 15 minutes
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    await user.save()
    return resetToken
}

// encrypt user password before saving
userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// delete user and all user's notes before removing user
userSchema.pre("remove", async function (next) {
    const user = this
    await Note.deleteMany({ owner: user._id })
    next()
})


// creating model
module.exports = mongoose.model("User", userSchema)