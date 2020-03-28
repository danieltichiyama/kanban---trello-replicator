import React from "react";
import styles from "./ProfileButton.module.scss";

let ProfileButton = props => {
  let session = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className={styles.ProfileButton} onClick={props.toggleProfileMenu}>
      {session.firstname && session.lastname
        ? session.firstname[0].toUpperCase() + session.lastname[0].toUpperCase()
        : session.username.substring(0, 2).toUpperCase()}
    </div>
  );
};

export default ProfileButton;
