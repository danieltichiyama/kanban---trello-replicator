import React from "react";
import styles from "./LoginPage.module.scss";
import LoginComponent from "../../components/LoginComponent";

const LoginPage = props => {
  return (
    <div className={styles.LoginPage}>
      <LoginComponent />
    </div>
  );
};

export default LoginPage;
