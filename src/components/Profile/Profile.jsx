import React, { Component } from "react";
import styles from "./Profile.module.scss";
import UserProfile from "../UserProfile";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: true
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
      <div className={styles.Profile} onClick={this.toggleProfile}>
        {session.firstname && session.lastname
          ? session.firstname[0].toUpperCase() +
            session.lastname[0].toUpperCase()
          : session.username.slice(0, 2).join("")}

        {!this.state.showProfile ? null : <UserProfile />}
      </div>
    );
  }
}

export default Profile;
