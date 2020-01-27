import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./BoardsList.module.scss";
import { actionsGetBoards, actionsGetBoardData } from "../../actions";
import AddNewBoard from "../AddNewBoard";
import BoardThumbnail from "../BoardThumbnail";

class BoardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewBoard: false
    };
  }

  componentDidMount = () => {
    return this.props.dispatchGetBoards(1);
  };

  getBoardData = event => {
    let { id } = event.target;
    return this.props.dispatchGetBoardData(id);
  };

  toggleAddNewBoard = () => {
    return this.setState({ addNewBoard: !this.state.addNewBoard });
  };

  render() {
    return (
      <div className={styles.BoardsList}>
        {this.state.addNewBoard ? (
          <AddNewBoard toggleAddNewBoard={this.toggleAddNewBoard} />
        ) : null}
        <ul>
          {this.props.boards
            ? this.props.boards.map(board => {
                return (
                  <BoardThumbnail
                    board={board}
                    key={board.id}
                    getBoardData={this.getBoardData}
                  />
                );
              })
            : null}
          <li className={styles.li_board} onClick={this.toggleAddNewBoard}>
            New Board
          </li>
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
    },
    dispatchGetBoardData: boardID => {
      return dispatch(actionsGetBoardData(boardID));
    }
  };
};

export default BoardsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsList);
