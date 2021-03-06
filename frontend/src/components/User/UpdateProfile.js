import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, loadUser, clearUserErrors, clearUserMessage } from "../../features/userSlice";
import Loader from "../Loader/Loader";
import PersonIcon from "@mui/icons-material/Person";
import "./UpdateProfile.css"
import { useAlert } from "react-alert";
import MetaData from "../MetaData";

const UpdateProfile = () => {
  const { loading, isAuthenticated, user, isUpdated, message, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert()

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState("");

  const updateDataChange = (e) => { 
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      if (e.target.name === "name") {
        setName(e.target.value);
      }
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("avatar", avatar);

    dispatch(updateUser(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearUserErrors())
    }
    if (message) {
      alert.info(message)
      dispatch(clearUserMessage())
    }
    if (isAuthenticated === false) {
      navigate("/signin");
    }
    if (isUpdated) {
      dispatch(loadUser());
      navigate("/profile");
    }
  }, [isAuthenticated, navigate, isUpdated, dispatch, alert, error, message]);

  return (
    <Fragment>
      <MetaData title="Update Profile" />
      {loading ? (
        <Loader />
      ) : (
        <div className="update__container">
          <p>{user?.email}</p>
          <form encType="multipart/form-data" onSubmit={updateHandler}>
            <div>
              <PersonIcon />
              <input
                type="text"
                required
                placeholder="Name"
                name="name"
                value={name}
                onChange={updateDataChange}
              />
            </div>
            <div>
              <img src={user.avatar.url} alt={user.name} />
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={updateDataChange}
              />
            </div>
            <input type="submit" value="Update" className="btn" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
