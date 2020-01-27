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
    return (
      <div className={styles.BoardsList}>
        <ul>
          {this.props.boards
            ? this.props.boards.map(board => {
                return (
                  <li key={board.id} className={styles.li_board}>
                    {board.name}
                  </li>
                );
              })
            : null}
          <li className={styles.li_board}>New Board</li>
        </ul>
      </div>
    );
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
