import React, { Fragment, useState, useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { loginUser, registerUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.user);

  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("/image/defaultProfile.svg");

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPhoto(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      if (e.target.name === "name") {
        setName(e.target.value);
      } else if (e.target.name === "email") {
        setEmail(e.target.value);
      } else if (e.target.name === "password") {
        setPassword(e.target.value);
      }
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", photo);

    dispatch(registerUser(myForm));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error)
    }
    if (isAuthenticated) {
      navigate("/")
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <Fragment>
      <div className="login__container">
        <div className="switch__btn">
          <button
            className={login ? "active" : ""}
            onClick={() => setLogin(true)}
          >
            Login
          </button>
          <button
            className={!login ? "active" : ""}
            onClick={() => setLogin(false)}
          >
            Register
          </button>
        </div>

        {login ? (
          <form onSubmit={loginHandler}>
            <div>
              <EmailIcon />
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <LockIcon />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="btn" />
            <Link to="/password/forgot">Forgot Password ?</Link>
          </form>
        ) : (
          <form encType="multipart/form-data" onSubmit={registerHandler}>
            <div>
              <PersonIcon />
              <input
                type="email"
                required
                placeholder="Email"
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div>
              <EmailIcon />
              <input
                type="email"
                required
                placeholder="Email"
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div>
              <LockIcon />
              <input
                type="password"
                required
                placeholder="Password"
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div>
              <img src="/image/defaultProfile.svg" alt="avatar" />
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="btn" />
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default Login;
