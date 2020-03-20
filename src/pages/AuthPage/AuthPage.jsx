import React from "react";
import styles from "./AuthPage.module.scss";
import AuthorizationModal from "../../components/AuthorizationModal";

const AuthPage = props => {
  let pathname = window.location.pathname;

  return (
    <div className={styles.AuthPage}>
      <AuthorizationModal pathname={pathname} />
    </div>
  );
};

export default AuthPage;
