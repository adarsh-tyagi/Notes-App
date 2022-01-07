import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/User/Login";
import axios from "axios"

const App = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  useEffect(() => {

  })

  return (
    <div className="container">
      <Router>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
