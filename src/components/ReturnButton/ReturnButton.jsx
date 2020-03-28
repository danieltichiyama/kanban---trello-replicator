import React from "react";
import styles from "./ReturnButton.module.scss";

const ReturnButton = props => {
  return (
    <button type="submit" className={styles.ReturnButton} onSubmit={props.func}>
      Save
    </button>
  );
};

export default ReturnButton;
