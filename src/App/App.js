import React from "react";
import "./App.scss";
import LoginPage from "../pages/LoginPage";
import AppPage from "../pages/AppPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

let App = () => {
  let session = sessionStorage.getItem("user");
  let username;

  if (session) {
    username = JSON.parse(session).username;
  }

  return (
    <div>
      <Router>
        <Route path="/login" exact={true} component={LoginPage} />
        <Route
          path={"/" + username + "/boards"}
          exact={true}
          component={AppPage}
        />
      </Router>
    </div>
  );
};

export default App;
