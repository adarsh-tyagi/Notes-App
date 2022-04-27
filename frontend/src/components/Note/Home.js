import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadNotes, clearNoteErrors, clearNoteMessage } from "../../features/noteSlice";
import {clearUserErrors, clearUserMessage} from "../../features/userSlice"
import Loader from "../Loader/Loader";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteCard from "./NoteCard";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import {useAlert} from "react-alert"

const Home = () => {
  const { isAuthenticated, error: userError, message: userMessage } = useSelector((state) => state.user);
  const { loading, notes, error, message } = useSelector((state) => state.note);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert()

  const clickHandler = () => {
    navigate("/create");
  };

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error(error)
      dispatch(clearNoteErrors());
    }
    if (userError) {
      alert.error(userError)
      dispatch(clearUserErrors())
    }
    if (message) {
      alert.info(message)
      dispatch(clearNoteMessage())
    }
    if (userMessage) {
      alert.info(userMessage)
      dispatch(clearUserMessage())
    }
    dispatch(loadNotes());
  }, [dispatch, error, alert, userError, userMessage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="home__container">
          {isAuthenticated ? (
            <Fragment>
              <NoteAddIcon onClick={clickHandler} />
              <div>
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            </Fragment>
          ) : (
            <h1>Please sign in and create your notes now</h1>
            )}
          
        </div>
      )}
    </Fragment>
  );
};

export default Home;
