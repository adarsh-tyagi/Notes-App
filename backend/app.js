const express = require("express")
require("dotenv").config({ path: "./backend/config/config.env" })
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser")

// import routers
const userRouter = require("./routes/userRoutes")

// initializing app
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

// app routes
app.use("/api/v1/user", userRouter)


app.use(errorMiddleware)

module.exports = app