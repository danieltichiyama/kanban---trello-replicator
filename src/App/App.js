import React from "react";
import "./App.scss";
import Board from "../components/Board";
import BoardsList from "../components/BoardsList";
import Playground from "../components/Playground";
import { BrowserRouter as Router, Route } from "react-router-dom";

let App = () => {
  return (
    <div>
      <header
        style={{
          backgroundColor: "black",
          height: "50px",
          width: "100%",
          lineHeight: "50px",
          paddingLeft: "20px",
          color: "white",
          opacity: ".2"
        }}
      >
        This is the header
      </header>
      <Router>
        <Route path="/" exact={true} component={BoardsList} />
        <Route path="/board" exact={true} component={Board} />
        <Route path="/playground" exact={true} component={Playground} />
      </Router>
    </div>
  );
};

export default App;
