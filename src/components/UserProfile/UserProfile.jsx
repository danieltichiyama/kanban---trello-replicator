import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./UserProfile.module.scss";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className={styles.UserProfile}>User Profile</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
