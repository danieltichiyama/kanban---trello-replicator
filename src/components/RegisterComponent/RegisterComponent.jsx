import React, { Component } from "react";
import { connect } from "react-redux";
import { actionsRegisterUser } from "../../actions";
import styles from "./RegisterComponent.module.scss";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      error: ""
    };
  }

  clearInput = () => {
    let defaultState = this.state;
    for (let key in defaultState) {
      defaultState[key] = "";
    }
    return this.setState(defaultState, this.props.toggleMenu);
  };

  handleRegisterSubmit = e => {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      return this.setState({ error: "passwords must match" });
    } else {
      let formData = { ...this.state };

      delete formData.confirmPassword;
      delete formData.error;

      this.props.dispatchRegisterUser(formData);
      return this.clearInput();
    }
    //eventually will need to load LoginComponent
  };

  handleInput = event => {
    const { value, name } = event.target;
    const state = { ...this.state };
    state[name] = value;
    this.setState(state);
  };

  render() {
    return (
      <div className={styles.registerComponent}>
        <form>
          <ul>
            <li className={styles.form_li}>
              <div className={styles.imgContainer}>
                <img
                  src="https://i.postimg.cc/sXHHC5KD/man-user.png"
                  alt="username"
                  className={styles.reg_icon_img}
                />
              </div>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInput}
                placeholder="Your username"
                className={styles.form_input}
              />
            </li>
            <li className={styles.form_li}>
              <div className={styles.imgContainer}>
                <img
                  src="https://image.flaticon.com/icons/svg/25/25239.svg"
                  alt="password"
                  className={styles.reg_icon_img}
                />
              </div>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInput}
                placeholder="Your password"
                className={styles.form_input}
              />
            </li>
            <li className={styles.form_li}>
              <div className={styles.imgContainer}></div>
              <input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInput}
                placeholder="Retype password"
                className={styles.form_input}
              />
            </li>
            <li className={styles.form_li}>
              {this.state.error ? (
                <p className={styles.error}>{this.state.error}</p>
              ) : null}
            </li>
          </ul>
          <button
            onClick={this.handleRegisterSubmit}
            className={styles.reg_button}
          >
            Register
          </button>
        </form>
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

export default RegisterComponent = connect(
  null,
  mapDispatchToProps
)(RegisterComponent);
