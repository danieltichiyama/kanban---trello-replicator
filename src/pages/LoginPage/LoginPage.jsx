import React from "react";
import styles from "./LoginPage.module.scss";
import AuthorizationModal from "../../components/AuthorizationModal";

const LoginPage = props => {
  let pathname = window.location.pathname;

  return (
    <div className={styles.LoginPage}>
      <AuthorizationModal pathname={pathname} />
    </div>
  );
};

export default LoginPage;
