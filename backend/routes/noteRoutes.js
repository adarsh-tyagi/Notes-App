const express = require("express")
const { getAllNotes, createNote, getNoteDetails, updateNote, deleteNote } = require("../controllers/noteController")
const isAuthenticatedUser = require("../middleware/auth")
const router = express.Router()

router.route("/").get(isAuthenticatedUser, getAllNotes).post(isAuthenticatedUser, createNote)
router.route("/:id").get(isAuthenticatedUser, getNoteDetails).put(isAuthenticatedUser, updateNote).delete(isAuthenticatedUser, deleteNote)

module.exports = router