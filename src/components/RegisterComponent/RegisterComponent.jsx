import React, { Component } from "react";
import { connect } from "react-redux";
import { actionsRegisterUser } from "../../actions";
import styles from "./RegisterComponent.module.scss";
import { Link, withRouter } from "react-router-dom";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  clearInput = () => {
    let defaultState = this.state;
    for (let key in defaultState) {
      defaultState[key] = "";
    }
    return this.setState(defaultState);
  };

  handleRegisterSubmit = e => {
    e.preventDefault();

    let formData = { ...this.state };

    this.props.dispatchRegisterUser(formData);
    this.clearInput();
    this.props.history.push("/login");
  };

  handleInput = event => {
    const { value, name } = event.target;
    const state = { ...this.state };
    state[name] = value;
    this.setState(state);
  };

  render() {
    return (
      <div className={styles.RegisterComponent}>
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
                onClick={this.handleRegisterSubmit}
                className={styles.register_button}
              >
                Sign up
              </button>
            </li>
          </ul>
        </form>
        <div className={styles.optionsContainer}>
          <p>
            Already have an account?{" "}
            <span className={styles.options_span}>
              <Link to="/login">Log in</Link>
            </span>
          </p>{" "}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchRegisterUser: formData => {
      return dispatch(actionsRegisterUser(formData));
    }
  };
};

export default withRouter(
  (RegisterComponent = connect(null, mapDispatchToProps)(RegisterComponent))
);
