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

  componentDidMount = () => {
    return this.setState({ pathname: this.props.pathname });
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.authBox}>
          {this.state.pathname.includes("login") ? (
            <>
              <h3>Log in to Kanban</h3>
              <LoginComponent />
            </>
          ) : (
            <>
              <h3>Register with Kanban</h3>
              <RegisterComponent />
            </>
          )}
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
