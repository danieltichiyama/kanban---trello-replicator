import React, { Component } from "react";
import "./App.scss";

import AuthPage from "../pages/AuthPage";
import ErrorPage from "../pages/ErrorPage";
import AppPage from "../pages/AppPage";

import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { actionsGetUser } from "../actions";

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
            if (sessionStorage.getItem("user")) {
              return <Component {...props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
      );
    };

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path={["/login", "/register"]}
              exact={true}
              component={AuthPage}
            />
            <PrivateRoute
              path={["/u/", "/b/"]}
              exact={false}
              component={AppPage}
            />
            <Redirect
              from="/"
              to={
                sessionStorage.getItem("user")
                  ? `/u/${
                      JSON.parse(sessionStorage.getItem("user")).username
                    }/boards`
                  : "/login"
              }
            />
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

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetUser: id => {
      return dispatch(actionsGetUser(id));
    }
  };
};

export default App = connect(mapStateToProps, mapDispatchToProps)(App);
