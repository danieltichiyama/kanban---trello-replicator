import React from "react";
import styles from "./AppPage.module.scss";
import BoardsList from "../../components/BoardsList";
import { Redirect } from "react-router-dom";
import Board from "../../components/Board";
import Profile from "../../components/Profile";
import Modals from "../../components/Modals";

let AppPage = props => {
  if (!sessionStorage.getItem("user")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.AppPage}>
      <Modals />
      <Profile username={JSON.parse(sessionStorage.getItem("user")).username} />
      {window.location.pathname.startsWith("/b/") ? <Board /> : <BoardsList />}
    </div>
  );
};

export default AppPage;
