import React, { Component } from "react";
import "./App.scss";

import AuthPage from "../pages/AuthPage";
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

  componentDidMount = () => {
    //necessary for refreshing the page, without it the url doesn't exist and the page goes to 404 error
    if (sessionStorage.getItem("user")) {
      let id = JSON.parse(sessionStorage.getItem("user")).id;
      return this.props.dispatchGetUser(id);
    }
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.boards !== this.props.boards ||
      prevProps.collaborations !== this.props.collaborations
    ) {
      return this.setState({
        boards: [...this.props.boards],
        collaborations: [...this.props.collaborations]
      });
    }
  };

  render() {
    let fallBack = "/";
    let user;

    if (sessionStorage.getItem("user"))
      user = JSON.parse(sessionStorage.getItem("user"));

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path={["/login", "/register"]} exact component={AuthPage} />
            <Route
              path={user ? `/dashboard/${user.username}/boards` : fallBack}
              exact
              component={AppPage}
            />
            {/* creates a private route for each of the user's boards */}
            {this.state.boards
              ? this.state.boards.map(board => {
                  return (
                    <Route
                      key={board.id}
                      path={`/b/${board.id}/`}
                      exact={false}
                      strict
                      component={AppPage}
                    />
                  );
                })
              : null}
            {/* creates a private route for each of the user's collaborations */}
            {this.state.collaborations
              ? this.state.collaborations.map(board => {
                  return (
                    <Route
                      key={board.id}
                      path={`/b/${board.id}/${board.name}`}
                      exact
                      component={AppPage}
                    />
                  );
                })
              : null}
            <Redirect
              from="/"
              to={
                sessionStorage.getItem("user")
                  ? `/dashboard/${
                      JSON.parse(sessionStorage.getItem("user")).username
                    }/boards`
                  : "/login"
              }
              exact={true}
            />
            <Route component={AppPage} />
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
      : undefined,
    boards: state.boards,
    collaborations: state.collaborations
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
