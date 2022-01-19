import React, { Fragment, useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPasswordUser } from "../../features/userSlice";
import Loader from "../Loader/Loader";

const ForgotPassword = () => {
  const { loading, message, error } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  // const alert = useAlert();
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPasswordUser(myForm));
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    // }
    // if (message) {
    //   alert.success(message);
    // }
  }, [ message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="update__container">
          <form encType="multipart/form-data" onSubmit={submitHandler}>
            <div>
              <EmailIcon />
              <input
                type="email"
                required
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Send Link" className="btn" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
