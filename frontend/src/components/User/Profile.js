import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, logoutUser } from "../../features/userSlice";
import Loader from "../Loader/Loader";
import "./Profile.css";

const Profile = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
      dispatch(logoutUser());
      navigate("/signin")
  };

  const deleteHandler = () => {
      dispatch(deleteUser());
      navigate("/signin");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile__container">
          <div>
            <h1>Profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <a href="/update/profile">Edit Profile</a>
          </div>
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.createdAt.substring(0, 10)}</p>
            <button onClick={logoutHandler}>Logout</button>
            <button onClick={deleteHandler}>Delete Account</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
