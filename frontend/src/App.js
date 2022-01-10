import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/User/Login";
import Home from "./components/Home";
import { loadUser } from "./features/userSlice";
import Loader from "./components/Loader/Loader";

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
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
