import React from "react";
import "./App.scss";
import LoginPage from "../pages/LoginPage";
import BoardsList from "../components/BoardsList";
import Board from "../components/Board";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

let App = () => {
  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          return sessionStorage.getItem("user") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    );
  };

  return (
    <div>
      <Router>
        <Route path="/login" exact={true} component={LoginPage} />
        <Route path="/register" exact={true} component={LoginPage} />
        <PrivateRoute path="/" exact={true} component={BoardsList} />
        <PrivateRoute path="/board" exact={true} component={Board} />
      </Router>
    </div>
  );
};

export default App;
