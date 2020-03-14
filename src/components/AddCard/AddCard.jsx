import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./AddCard.module.scss";

class AddCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div className={styles.AddCard}></div>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default AddCard = connect(mapStateToProps, mapDispatchToProps)(AddCard);
