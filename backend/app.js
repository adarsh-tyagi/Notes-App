const express = require("express")
require("dotenv").config({ path: "./backend/config/config.env" })
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser")
const cors = require("cors")

// import routers
const userRouter = require("./routes/userRoutes")
const noteRouter = require("./routes/noteRoutes")

// initializing app
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use(cors())

// app routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/note", noteRouter)

app.use(errorMiddleware)

module.exports = app