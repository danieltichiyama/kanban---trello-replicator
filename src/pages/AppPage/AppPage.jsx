import React from "react";
import styles from "./AppPage.module.scss";
import BoardsList from "../../components/BoardsList";

const AppPage = props => {
  return (
    <div className={styles.AppPage}>
      <BoardsList />
    </div>
  );
};

export default AppPage;
