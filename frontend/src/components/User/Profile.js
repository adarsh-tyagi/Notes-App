import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, logoutUser } from "../../features/userSlice";
import Loader from "../Loader/Loader";
import "./Profile.css";
import MetaData from "../MetaData"

const Profile = () => {
  const { loading, isAuthenticated, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert()

  const logoutHandler = () => {
      dispatch(logoutUser());
      navigate("/signin")
  };

  const deleteHandler = () => {
      dispatch(deleteUser());
      navigate("/signin");
  };

  useEffect(() => {
    if (error) {
      alert.error(error)
    }
    if (isAuthenticated === false) {
      navigate("/signin");
    } 
  }, [isAuthenticated, navigate, error, alert]);

  return (
    <Fragment>
      <MetaData title="Profile" />
      {loading ? (
        <Loader />
      ) : (
        <div className="profile__container">
          <div className="container__one">
            <h1>Profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <a href="/update/profile">Edit Profile</a>
          </div>
          <div className="container__two">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{"Joined on " + user.createdAt.substring(0, 10)}</p>
            <button onClick={logoutHandler}>Logout</button>
            <button className="delete" onClick={deleteHandler}>Delete Account</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
