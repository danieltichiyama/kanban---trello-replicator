import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./EditCard.module.scss";

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className={styles.EditCard}></div>;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default EditCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard);
