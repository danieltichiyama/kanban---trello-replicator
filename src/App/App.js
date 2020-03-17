import React from "react";
import "./App.scss";
import Board from "../components/Board";
import BoardsList from "../components/BoardsList";
import Profile from "../components/Profile";
import { BrowserRouter as Router, Route } from "react-router-dom";

let App = () => {
  return (
    <div>
      <Router>
        <Profile></Profile>
        <Route path="/" exact={true} component={BoardsList} />
        <Route path="/board" exact={true} component={Board} />
      </Router>
    </div>
  );
};

export default App;
