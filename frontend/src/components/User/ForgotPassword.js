import React, { Fragment, useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { forgotPasswordUser } from "../../features/userSlice";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";

const ForgotPassword = () => {
  const { loading, message, error } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPasswordUser(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (message) {
      alert.success(message);
    }
  }, [ message, error, alert]);

  return (
    <Fragment>
      <MetaData title="Forgot Password" />
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
