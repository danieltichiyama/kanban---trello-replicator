import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LoginComponent.module.scss";
import { actionsLoginUser } from "../../actions";
import { Link, Redirect, withRouter } from "react-router-dom";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLoginSubmit = e => {
    e.preventDefault();

    let formData = { ...this.state };

    delete formData.isLoggedIn;
    this.props.dispatchLoginUser(formData);
    return this.setState(
      { username: "", password: "" },
      this.props.history.push("/boards")
    );
  };

  handleInput = event => {
    const { value, name } = event.target;
    const state = { ...this.state };
    state[name] = value;
    this.setState(state);
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/boards" />;
    }
    return (
      <div className={styles.loginComponent}>
        <form>
          <ul className={styles.form_ul}>
            <li className={styles.form_li}>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInput}
                placeholder="Enter username"
                className={styles.form_input}
              />
            </li>
            <li className={styles.form_li}>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInput}
                placeholder="Enter password"
                className={styles.form_input}
              />
            </li>
            <li className={styles.form_li}>
              <button
                onClick={this.handleLoginSubmit}
                className={styles.login_button}
              >
                Log in
              </button>
            </li>
          </ul>
        </form>
        <div className={styles.optionsContainer}>
          <p>
            Don't have an account yet?{" "}
            <span
              className={styles.options_span}
              onClick={this.removeRegisteredUser}
            >
              <Link to="/register">Sign up</Link>
            </span>
          </p>{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoginUser: formData => {
      return dispatch(actionsLoginUser(formData));
    }
  };
};

export default withRouter(
  (LoginComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginComponent))
);
