import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./BoardsList.module.scss";
import { actionsGetBoards } from "../../actions";

class BoardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    return this.props.dispatchGetBoards(1);
  };

  render() {
    return <div className={styles.BoardsList}>This is the list of boards</div>;
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetBoards: userID => {
      return dispatch(actionsGetBoards(userID));
    }
  };
};

export default BoardsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList);
