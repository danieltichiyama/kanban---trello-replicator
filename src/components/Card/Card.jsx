import React from "react";
import styles from "./Card.module.scss";
import { connect } from "react-redux";
import { getCardData } from "../../actions";

let Card = function(props) {
  return <div className={styles.Card}></div>;
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default Card = connect(mapStateToProps, mapDispatchToProps)(Card);
