import React from "react";
import styles from "./ErrorPage.module.scss";
import img from "../../img/404.jpg";

const ErrorPage = props => {
  return (
    <div className={styles.ErrorPage}>
      <h1 className={styles.title_error}>404 Error</h1>
      <p className={styles.message_error}>
        Sorry, that didn't work. <img src={img} alt="Oops" />
      </p>
    </div>
  );
};

export default ErrorPage;
