import React, { Component } from "react";
import styles from "./Profile.module.scss";

import AuthorizationModal from "./../AuthorizationModal";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { showLoginMenu: true };
  }

  toggleMenu = () => {
    console.log("showing");
    return this.setState({ showLoginMenu: !this.state.showLoginMenu });
  };

  render() {
    return (
      <div className={styles.Profile}>
        {sessionStorage.getItem("session") ? (
          <div className={styles.ProfileMenuButton}></div>
        ) : (
          <div onClick={this.toggleMenu}>Login</div>
        )}

        {this.state.showLoginMenu ? (
          <AuthorizationModal toggleAuthBox={this.toggleMenu} />
        ) : null}
      </div>
    );
  }
}

export default Profile;
