import React, { Component } from "react";
import styles from "./CollaboratorsMenu.module.scss";
import { connect } from "react-redux";
import { actionsGetAllUsers } from "../../actions";

class CollaboratorsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.CollaboratorsMenu}>
        <div>
          Search for collaborators
          <li>Current Collaborators</li>
          <li>Search bar with multi select</li>
          <li>Add button</li>
          <li>Cancel button</li>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetAllUsers: () => {
      return dispatch(actionsGetAllUsers());
    }
  };
};

export default CollaboratorsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollaboratorsMenu);
