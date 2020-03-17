import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LoginComponent.module.scss";
import { actionsLoginUser } from "../../actions";

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
  };

  handleUsernameInput = event => {
    return this.setState({ username: event.target.value });
  };

  handlePasswordInput = event => {
    return this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className={styles.loginComponent}>
        <form>
          <ul>
            <li className={styles.form_li}>
              <div className={styles.imgContainer}>
                <img
                  src="https://i.postimg.cc/sXHHC5KD/man-user.png"
                  alt="username"
                  className={styles.login_icon_img}
                />
              </div>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleUsernameInput}
                placeholder="Your username"
                className={styles.form_input}
              />
            </li>
            <li className={styles.form_li}>
              <div className={styles.imgContainer}>
                <img
                  src="https://image.flaticon.com/icons/svg/25/25239.svg"
                  alt="password"
                  className={styles.login_icon_img}
                />
              </div>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handlePasswordInput}
                placeholder="Your password"
                className={styles.form_input}
              />
            </li>
          </ul>

          <button
            onClick={this.handleLoginSubmit}
            className={styles.login_button}
          >
            Login{" "}
            <img
              src="https://image.flaticon.com/icons/svg/149/149408.svg"
              alt="login icon"
              className={styles.loginImg}
            />
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoginUser: formData => {
      return dispatch(actionsLoginUser(formData));
    }
  };
};

export default LoginComponent = connect(
  null,
  mapDispatchToProps
)(LoginComponent);
