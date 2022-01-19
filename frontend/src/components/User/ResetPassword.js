import React, { Fragment, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import PasswordIcon from "@mui/icons-material/Password";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "../../features/userSlice";

const ResetPassword = () => {
  const { loading, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const submitHandler = (e) => {
    console.log("in submit");
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    const userData = {"token": token, "myForm": myForm}
    dispatch(resetPasswordUser( userData ));
  };

  useEffect(() => {
    if (message) {
      console.log(message);
      navigate("/signin");
    }
  }, [message, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="update__container">
          <form onSubmit={submitHandler}>
            <div>
              <PasswordIcon />
              <input
                type="password"
                required
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <LockIcon />
              <input
                type="password"
                required
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Change Password" className="btn" />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPassword;
