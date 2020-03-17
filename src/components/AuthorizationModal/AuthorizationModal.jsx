import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./AuthorizationModal.module.scss";
import RegisterComponent from "../RegisterComponent";
import LoginComponent from "../LoginComponent";
import { actionsLoginUser, actionsRegisterUser } from "../../actions";

class AuthorizationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegister: true
    };
  }

  toggleMenu = e => {
    return this.setState({ showRegister: !this.state.showRegister });
  };

  handleRegisterClick = () => {};

  handleLoginClick = () => {};

  render() {
    return (
      <div className={styles.authBox}>
        <div className={styles.toggler}>
          <div
            className={
              this.state.showRegister === false
                ? styles.toggle_deselected
                : styles.toggle_selected
            }
            onClick={this.toggleMenu}
            id="login"
          >
            <img
              src="https://i.postimg.cc/050ygKWP/man-user.png"
              alt="login icon"
              className={styles.icon}
            />
            Login
          </div>
          <div
            className={
              this.state.showRegister === true
                ? styles.toggle_deselected
                : styles.toggle_selected
            }
            onClick={this.toggleMenu}
            id="register"
          >
            <img
              src="https://i.postimg.cc/q7q3qXFs/new-user-1.png"
              alt="register icon"
              className={
                this.state.showRegister === true
                  ? styles.icon_deselected
                  : styles.icon
              }
            />
            Register
          </div>
        </div>
        {this.state.showRegister === true ? (
          <RegisterComponent />
        ) : (
          <LoginComponent />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchRegisterUser: () => {
      return dispatch(actionsRegisterUser());
    },
    dispatchLoginUser: () => {
      return dispatch(actionsLoginUser());
    }
  };
};

export default AuthorizationModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorizationModal);
