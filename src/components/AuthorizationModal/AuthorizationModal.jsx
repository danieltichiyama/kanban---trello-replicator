import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./AuthorizationModal.module.scss";
import LoginComponent from "../LoginComponent";
import RegisterComponent from "../RegisterComponent";
import { actionsLoginUser, actionsRegisterUser } from "../../actions";

class AuthorizationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: ""
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.authBox}>
          {this.props.pathname.includes("login") ? (
            <LoginComponent />
          ) : (
            <RegisterComponent />
          )}
        </div>
      </div>
    );
  }
}

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
  null,
  mapDispatchToProps
)(AuthorizationModal);
