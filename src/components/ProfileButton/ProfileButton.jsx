import React, { Component } from "react";
import styles from "./ProfileButton.module.scss";
import ProfileMenu from "../ProfileMenu";

class ProfileButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false
    };
  }

  toggleProfile = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    return this.setState({ showProfile: !this.state.showProfile });
  };

  render() {
    let session = JSON.parse(sessionStorage.getItem("user"));

    return (
      <div className={styles.ProfileButton} onClick={this.toggleProfile}>
        {session.firstname && session.lastname
          ? session.firstname[0].toUpperCase() +
            session.lastname[0].toUpperCase()
          : session.username.substring(0, 2).toUpperCase()}

        {!this.state.showProfile ? null : <ProfileMenu />}
      </div>
    );
  }
}

export default ProfileButton;
