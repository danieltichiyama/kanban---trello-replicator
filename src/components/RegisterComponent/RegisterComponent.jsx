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
      password: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
      email: ""
    };
  }

  clearInput = () => {
    let defaultState = this.state;
    for (let key in defaultState) {
      defaultState[key] = "";
    }
    return this.setState(defaultState);
  };

  handleStepOneSubmit = e => {
    e.preventDefault();

    let errors = {};
    if (this.state.password !== this.state.confirmPassword) {
      errors.password = "passwords must match";
    }

    if (this.state.username === "" || this.state.username.includes(" ")) {
      errors.username = "username is required";
    } else if (this.state.username.includes(" ")) {
      errors.username = "username cannot contain any spaces.";
    }

    if (Object.keys(errors).length !== 0) {
      return this.setState({ errors: { ...errors } });
    } else {
      return this.setState({ step: 2, errors: {} });
    }
  };

  handleRegisterSubmit = e => {
    e.preventDefault();

    let errors = {};

    if (this.state.firstname === "") {
      errors.firstname = "your first name is required.";
    }

    if (this.state.lastname === "") {
      errors.lastname = "your last name is required.";
    }

    if (Object.keys(errors).length !== 0) {
      return this.setState({ errors: { ...errors } });
    } else {
      let formData = { ...this.state };
      delete formData.step;
      delete formData.confirmPassword;
      delete formData.errors;

      this.props.dispatchRegisterUser(formData);
      this.clearInput();
      return this.props.history.push("/login");
    }
  };

  handleInput = event => {
    const { value, name } = event.target;
    const state = { ...this.state };
    state[name] = value;
    this.setState(state);
  };

  render() {
    if (!this.state.step) {
      return (
        <div className={styles.RegisterComponent}>
          <h3>Register with Kanban</h3>
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
                  autoComplete="username"
                />
                {this.state.errors && this.state.errors.username ? (
                  <p className={styles.form_li_error}>
                    *{this.state.errors.username}
                  </p>
                ) : null}
              </li>
              <li className={styles.form_li}>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className={styles.form_input}
                />
              </li>
              <li className={styles.form_li}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleInput}
                  placeholder="Confirm Password"
                  className={styles.form_input}
                  autoComplete="new-password"
                />
                {this.state.errors && this.state.errors.password ? (
                  <p className={styles.form_li_error}>
                    *{this.state.errors.password}
                  </p>
                ) : null}
              </li>
              <li className={styles.form_li}>
                <button
                  onClick={this.handleStepOneSubmit}
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
    } else if (this.state.step === 2) {
      return (
        <div className={styles.RegisterComponent}>
          <h3>Register with Kanban</h3>
          <h5>Step 2 of 2</h5>

          <form>
            <ul className={styles.form_ul}>
              <li className={styles.form_li}>
                <input
                  type="text"
                  name="firstname"
                  autoComplete="firstname"
                  value={this.state.firstname}
                  onChange={this.handleInput}
                  placeholder="First Name"
                  className={styles.form_input}
                />
                {this.state.errors && this.state.errors.firstname ? (
                  <p className={styles.form_li_error}>
                    *{this.state.errors.firstname}
                  </p>
                ) : null}
              </li>
              <li className={styles.form_li}>
                <input
                  type="text"
                  name="lastname"
                  autoComplete="lastname"
                  value={this.state.lastname}
                  onChange={this.handleInput}
                  placeholder="Last Name"
                  className={styles.form_input}
                />
                {this.state.errors && this.state.errors.lastname ? (
                  <p className={styles.form_li_error}>
                    *{this.state.errors.lastname}
                  </p>
                ) : null}
              </li>
              <li className={styles.form_li}>
                <input
                  type="text"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handleInput}
                  placeholder="Email Address (optional)"
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
