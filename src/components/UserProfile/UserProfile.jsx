import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./UserProfile.module.scss";
import { actionsLogoutUser } from "../../actions";
import { withRouter } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogoutClick = () => {
    let id = JSON.parse(sessionStorage.getItem("user")).id;
    return this.props.dispatchLogoutUser(id);
  };

  render() {
    return (
      <ul className={styles.UserProfile}>
        <li className={styles.menu_li}>My Profile</li>
        <li onClick={this.handleLogoutClick} className={styles.menu_li}>
          Logout
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogoutUser: id => {
      return dispatch(actionsLogoutUser(id));
    }
  };
};

export default withRouter(
  (UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile))
);
