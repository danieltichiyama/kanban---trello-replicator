import React from "react";
import styles from "./AppPage.module.scss";
import BoardsList from "../../components/BoardsList";
import { Route, Redirect } from "react-router-dom";
import Board from "../../components/Board";
import Profile from "../../components/Profile";

let AppPage = props => {
  if (!sessionStorage.getItem("user")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.AppPage}>
      <Profile username={JSON.parse(sessionStorage.getItem("user")).username} />
      {window.location.pathname.startsWith("/b/") ? (
        <Route path="/b/" exact={false} component={Board} />
      ) : (
        <BoardsList />
      )}
    </div>
  );
};

export default AppPage;
