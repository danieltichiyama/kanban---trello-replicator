import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Modals.module.scss";

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className={styles.Modals}></div>;
  }
}

const mapStateToProps = state => {
  return {
    profile: state.modals.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default Modals = connect(mapStateToProps, mapDispatchToProps)(Modals);
