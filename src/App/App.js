import React, { Component } from "react";
import "./App.scss";

import AuthPage from "../pages/AuthPage";
import ErrorPage from "../pages/ErrorPage";
import AppPage from "../pages/AppPage";
import BoardsList from "../components/BoardsList";
import Board from "../components/Board";

import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute path="/" exact={true} component={BoardsList} />
            <Route path="/login" exact={true} component={AuthPage} />
            <Route path="/register" exact={true} component={AuthPage} />
            {/* <PrivateRoute path="/boards" exact={true} component={BoardsList} /> */}
            <PrivateRoute path="/board" exact={true} component={Board} />
            <PrivateRoute path={"/u/"} exact={false} component={AppPage} />
            <PrivateRoute path={"/b/"} exact={false} component={AppPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user")).username
      : undefined
  };
};

export default App = connect(mapStateToProps, null)(App);
