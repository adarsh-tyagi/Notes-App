const app = require("./app")
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")
require("dotenv").config({ path: "./backend/config/config.env" })

// connecting cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const port = process.env.PORT || 5000

// running server and connecting to database
app.listen(port, () => {
    connectDatabase(process.env.MONGO_URI)
    console.log(`Server is running on port ${port}`)
})