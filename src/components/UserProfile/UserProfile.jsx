import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./UserProfile.module.scss";
import { actionsLogoutUser } from "../../actions";

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
      <div className={styles.UserProfile}>
        User Profile
        <ul>
          <li onClick={this.handleLogoutClick}>Logout</li>
        </ul>
      </div>
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

export default UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
