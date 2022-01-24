import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  deleteNote,
  editNote,
  loadNotes,
} from "../../features/noteSlice";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import "./Note.css";

const Note = () => {
  const { loading, notes, error, message } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert()

  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  const editHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("description", description);
    myForm.set("color", color);
    const noteData = { id: id, myForm: myForm };
    dispatch(editNote(noteData));
    dispatch(loadNotes());
    navigate("/");
  };

  const deleteHandler = () => {
    dispatch(deleteNote(id));
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error)
      dispatch(clearErrors());
      navigate("/");
    }
    if (message) {
      console.log(message);
      alert.info(message)
    }
    // dispatch(loadNoteDetails(id));
    const note = notes.find((item) => item._id === id);
    // console.log(note);
    setTitle(note.title);
    setDescription(note.description);
    setColor(note.color);
  }, [error, dispatch, navigate, message, id, alert, notes]);
  

  return (
    <Fragment>
      <MetaData title="Note Details" />
      {loading ? (
        <Loader />
      ) : (
        <div className="note__container">
          <form onSubmit={editHandler}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Your note"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            ></textarea>
            <div className="color__container">
              <div
                style={{ backgroundColor: "#AB4E68" }}
                onClick={() => setColor("#AB4E68")}
              ></div>
              <div
                style={{ backgroundColor: "#42273B" }}
                onClick={() => setColor("#42273B")}
              ></div>
              <div
                style={{ backgroundColor: "#4A5240" }}
                onClick={() => setColor("#4A5240")}
              ></div>
              <div
                style={{ backgroundColor: "#08415C" }}
                onClick={() => setColor("#08415C")}
              ></div>
              <div
                style={{ backgroundColor: "#709176" }}
                onClick={() => setColor("#709176")}
              ></div>
              <div
                style={{ backgroundColor: "#04A777" }}
                onClick={() => setColor("#04A777")}
              ></div>
              <div
                style={{ backgroundColor: "#00A5CF" }}
                onClick={() => setColor("#00A5CF")}
              ></div>
            </div>
            <input type="submit" value="Update" />
          </form>
          <div>
            <button onClick={() => navigate("/")}>Back</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Note;
