const Note = require("../models/noteModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// get all notes
exports.getAllNotes = catchAsyncErrors(async (req, res, next) => {
  let notes = null;
  if (req.query && req.query.search) {
    const exp = new RegExp(req.query.search, "ig");
    notes = await Note.find({ owner: req.user._id, title: exp });
  } else {
    notes = await Note.find({ owner: req.user._id });
  }

  if (!notes) {
    return next(new ErrorHandler("Something went wrong", 500));
  }
  console.log(notes);
  res.status(200).json({ success: true, count: notes.length, notes });
});

// get note details
exports.getNoteDetails = catchAsyncErrors(async (req, res, next) => {
  const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });

  if (!note) {
    return next(new ErrorHandler("No such note found", 404));
  }
  res.status(200).json({ success: true, note });
});

// create a note
exports.createNote = catchAsyncErrors(async (req, res, next) => {
  const { title, description, color } = req.body;
  const note = await Note.create({
    title,
    description,
    color,
    owner: req.user._id,
  });
  res
    .status(201)
    .json({ success: true, message: "Note created successfully", note });
});

// delete a note
exports.deleteNote = catchAsyncErrors(async (req, res, next) => {
  const note = await Note.deleteOne({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!note) {
    return next(new ErrorHandler("No such note found", 404));
  }
  res.status(200).json({ success: true, message: "Note deleted successfully" });
});

// update a note
exports.updateNote = catchAsyncErrors(async (req, res, next) => {
  const newNoteDate = {
    title: req.body.title,
    description: req.body.title,
    color: req.body.color,
    modifiedAt: Date.now(),
  };
  const note = await Note.find({ _id: req.params.id, owner: req.user._id });
  if (!note) {
    return next(new ErrorHandler("No such note found", 404));
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, newNoteDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res
    .status(200)
    .json({ success: true, message: "Note edited successfully", updatedNote });
});
