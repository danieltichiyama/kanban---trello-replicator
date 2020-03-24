import React, { Component } from "react";
import styles from "./ProfileModal.module.scss";
import { connect } from "react-redux";

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className={styles.ProfileModal}></div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default ProfileModal = connect(null, mapDispatchToProps)(ProfileModal);
