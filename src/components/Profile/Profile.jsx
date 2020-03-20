import React from "react";
import styles from "./Profile.module.scss";

let Profile = props => {
  let session = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className={styles.Profile}>
      {session.firstname && session.lastname
        ? session.firstname[0].toUpperCase() + session.lastname[0].toUpperCase()
        : session.username.slice(0, 2).join("")}
    </div>
  );
};

export default Profile;
