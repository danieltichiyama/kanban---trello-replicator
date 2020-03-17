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
      showRegister: false
    };
  }

  toggleMenu = e => {
    if (e.target.id.includes("login")) {
      return this.setState({ showRegister: false });
    } else if (e.target.id.includes("register")) {
      return this.setState({ showRegister: true });
    }
  };

  render() {
    return (
      <div className={styles.container} onClick={this.props.toggleAuthBox}>
        <div className={styles.authBox}>
          <div className={styles.toggler}>
            <div
              className={
                this.state.showRegister === false
                  ? styles.toggle_selected
                  : styles.toggle_deselected
              }
              onClick={this.toggleMenu}
              id="login"
            >
              <img
                src="https://i.postimg.cc/050ygKWP/man-user.png"
                alt="login icon"
                className={
                  this.state.showRegister === false
                    ? styles.icon
                    : styles.icon_deselected
                }
              />
              Login
            </div>
            <div
              className={
                this.state.showRegister === true
                  ? styles.toggle_selected
                  : styles.toggle_deselected
              }
              onClick={this.toggleMenu}
              id="register"
            >
              <img
                src="https://i.postimg.cc/q7q3qXFs/new-user-1.png"
                alt="register icon"
                className={
                  this.state.showRegister === true
                    ? styles.icon
                    : styles.icon_deselected
                }
              />
              Register
            </div>
          </div>
          <div className={styles.formContainer}>
            {this.state.showRegister === true ? (
              <RegisterComponent toggleMenu={this.toggleMenu} />
            ) : (
              <LoginComponent toggleMenu={this.toggleMenu} />
            )}
          </div>
          <div className={styles.options}>
            {this.state.showRegister ? (
              <div className={styles.AlreadyAMember}>
                <p>
                  Already a member?{" "}
                  <span
                    className={styles.options_span}
                    onClick={this.toggleMenu}
                    id="switchTo-login"
                  >
                    Login
                  </span>
                </p>
              </div>
            ) : (
              <div className={styles.notAMember}>
                <p>
                  Not a member?{" "}
                  <span
                    className={styles.options_span}
                    onClick={this.toggleMenu}
                    id="switchTo-register"
                  >
                    Sign up
                  </span>
                </p>
              </div>
            )}

            <div>
              <button
                className={styles.close_button}
                onClick={this.props.toggleAuthBox}
              >
                Close
              </button>
            </div>
          </div>
        </div>
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
