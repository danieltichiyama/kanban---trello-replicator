import React from "react";
import styles from "./AppPage.module.scss";
import BoardsList from "../../components/BoardsList";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Board from "../../components/Board";
import Modals from "../../components/Modals";

let AppPage = props => {
  if (!sessionStorage.getItem("user")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.AppPage}>
      {props.showModal ? <Modals /> : null}

      {window.location.pathname.startsWith("/dashboard/") ? (
        <BoardsList />
      ) : (
        <Board />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    showModal: state.showModal
  };
};

export default AppPage = connect(mapStateToProps, null)(AppPage);
