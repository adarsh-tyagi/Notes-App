import React, { Fragment, useState} from "react";
import { useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { createNote, loadNotes } from "../../features/noteSlice";
import MetaData from "../MetaData";
import "./CreateNote.css";

const CreateNote = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const submitHandler = (e) => {
    e.preventDefault()
    const myForm = new FormData()
    myForm.set("title", title)
    myForm.set("description", description) 
    myForm.set("color", color)
    dispatch(createNote(myForm))
    dispatch(loadNotes())
    navigate("/")
    
  }

  return (
    <Fragment>
      <MetaData title="Create Note" />
      <div className="create__container">
        <form onSubmit={submitHandler} className="create__form">
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
            rows="15"
          ></textarea>
          <div className="color__container">
            <div
              style={{ backgroundColor: "#AB4E68" }}
              onClick={() => setColor("#AB4E68")}
              className={color === "#AB4E68" ? "active" : ""}
            ></div>
            <div
              style={{ backgroundColor: "#42273B" }}
              onClick={() => setColor("#42273B")}
              className={color === "#42273B" ? "active" : ""}
            ></div>
            <div
              style={{ backgroundColor: "#4A5240" }}
              onClick={() => setColor("#4A5240")}
              className={color === "#4A5240" ? "active" : ""}
            ></div>
            <div
              style={{ backgroundColor: "#08415C" }}
              onClick={() => setColor("#08415C")}
              className={color === "#08415C" ? "active" : ""}
            ></div>
            <div
              style={{ backgroundColor: "#709176" }}
              onClick={() => setColor("#709176")}
              className={color === "#709176" ? "active" : ""}
            ></div>
            <div
              style={{ backgroundColor: "#04A777" }}
              onClick={() => setColor("#04A777")}
              className={color === "#04A777" ? "active" : ""}
            ></div>
            <div
              style={{ backgroundColor: "#00A5CF" }}
              onClick={() => setColor("#00A5CF")}
              className={color === "#00A5CF" ? "active" : ""}
            ></div>
          </div>
          <input type="submit" value="Create" className="create__btn" />
        </form>
      </div>
    </Fragment>
  );
};

export default CreateNote;
