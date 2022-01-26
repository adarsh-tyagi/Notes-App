import React, { useState, useEffect } from "react";
import "./Header.css";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "../../features/noteSlice";
import Backdrop from "@mui/material/Backdrop";

const Header = ({ isAuthenticated, user }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const { notes } = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loadNotes(search));
    setShowBackdrop(true);
  };

  const handleClose = () => {
    setShowBackdrop(false);
  };

  const toggleSearchIcon = () => {
    window.innerWidth <= 800 ? setShow(true) : setShow(false);
  };

  const closeHandler = () => {
    setSearch("");
    if (window.innerWidth <= 800) {
      setShow(true);
    }
  };

  useEffect(() => {
    toggleSearchIcon();
    window.addEventListener("resize", toggleSearchIcon);
    return () => {
      window.removeEventListener("resize", toggleSearchIcon);
    };
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //     dispatch(clearErrors())
  //   }
  // }, [dispatch])

  return (
    <div className="header">
      {window.innerWidth <= 800 && !show ? (
        ""
      ) : (
        <div className="header__left">
          <a href="/">NotesApp</a>
        </div>
      )}

      <div className="header__middle">
        {show ? (
          <SearchIcon onClick={() => setShow(false)} />
        ) : (
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <CloseIcon onClick={closeHandler} />
          </form>
        )}
      </div>

      {isAuthenticated ? (
        <Link to="/profile" className="header__right">
          <img src={user.avatar.url} alt="profile" />
        </Link>
      ) : (
        <Link to="/signin" className="header__right">
          <p>Sign In</p>
        </Link>
      )}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
        onClick={handleClose}
        style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}
      >
        {notes.map((item) => (
          <Link
            key={item._id}
            to={`/${item._id}`}
            style={{ color: "#1DD3B0", display: "block", margin: "0.5rem", fontSize: "1.1rem" }}
          >
            {item.title}
          </Link>
        ))}
      </Backdrop>
    </div>
  );
};

export default Header;
