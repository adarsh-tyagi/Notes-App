const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "Please enter the note title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter the note content"],
    },
    color: {
        type: String,
        enum: ["#AB4E68", "#42273B", "4A5240", "08415C", "709176", "04A777", "00A5CF"],
        default: "AB4E68"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please select the owner of note"],
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: Date
})


module.exports = mongoose.model("Note", noteSchema)