import React from "react";
import styles from "./AuthPage.module.scss";
import AuthorizationModal from "../../components/AuthorizationModal";
import { Redirect } from "react-router-dom";

const AuthPage = props => {
  let pathname = window.location.pathname;

  if (sessionStorage.getItem("user")) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.AuthPage}>
      <AuthorizationModal pathname={pathname} />
    </div>
  );
};

export default AuthPage;
