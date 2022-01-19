import React, { useState, useEffect } from "react";
import "./Header.css";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, user }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const submitHandler = () => {};

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
          <form onSubmit={submitHandler}>
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
    </div>
  );
};

export default Header;
