import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/User/Login";
import Home from "./components/Note/Home";
import { loadUser } from "./features/userSlice";
import Loader from "./components/Loader/Loader";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import CreateNote from "./components/Note/CreateNote";

const App = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Header isAuthenticated={isAuthenticated} user={user} />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/update/profile" element={<UpdateProfile />} />
            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
              />
              <Route exact path="/create" element={<CreateNote />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
