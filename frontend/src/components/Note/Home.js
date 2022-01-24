import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadNotes } from "../../features/noteSlice";
import Loader from "../Loader/Loader";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteCard from "./NoteCard";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import {useAlert} from "react-alert"

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading, notes, error, message } = useSelector((state) => state.note);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert()

  const clickHandler = () => {
    navigate("/create");
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error)
      dispatch(clearErrors());
    }
    if (message) {
      alert.info(message)
    }
    dispatch(loadNotes());
  }, [dispatch, error, alert]);

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
