import React from "react";
import styles from "./AppPage.module.scss";
import BoardsList from "../../components/BoardsList";
import { Route, Redirect } from "react-router-dom";
import Board from "../../components/Board";

const AppPage = props => {
  if (!sessionStorage.getItem("user")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.AppPage}>
      {window.location.pathname.startsWith("/b/") ? (
        <Route path="/b/" exact={false} component={Board} />
      ) : (
        <BoardsList />
      )}
    </div>
  );
};

export default AppPage;
