import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./BoardsList.module.scss";
import { actionsGetBoards, actionsGetBoardData } from "../../actions";
import AddNewBoard from "../AddNewBoard";
import BoardThumbnail from "../BoardThumbnail";
import session from "express-session";

class BoardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewBoard: false,
      showArchived: false
    };
  }

  componentDidMount = () => {
    let session = sessionStorage.getItem("user");
    if (session) {
      let id = JSON.parse(sessionStorage.getItem("user")).id;
      return this.props.dispatchGetBoards(id);
    }
  };

  getBoardData = event => {
    let { id } = event.target;
    return this.props.dispatchGetBoardData(id);
  };

  toggleAddNewBoard = () => {
    return this.setState({ addNewBoard: !this.state.addNewBoard });
  };

  toggleArchivedBoards = () => {
    return this.setState({ showArchived: !this.state.showArchived });
  };

  render() {
    return (
      <div className={styles.BoardsList}>
        <h2>My Boards</h2>
        {/* List of Boards */}
        <div className={styles.BoardsContainer}>
          {this.props.boards
            ? this.props.boards.map(board => {
                if (!board.is_archived) {
                  return (
                    <BoardThumbnail
                      board={board}
                      key={board.id}
                      getBoardData={this.getBoardData}
                    />
                  );
                }
                return null;
              })
            : null}

          {/* Add New Board Button */}
          <div className={styles.container} onClick={this.toggleAddNewBoard}>
            <div className={styles.BoardThumbnail}>Create new board</div>
          </div>
        </div>

        {/* Archived Boards List */}
        {this.state.showArchived ? (
          <>
            <h2>Archived Boards</h2>
            {this.props.boards.every(board => {
              return !board.is_archived;
            }) ? (
              <div className={styles.noArchivedBoardsMessage}>
                "You have no archived boards"
              </div>
            ) : (
              <div className={styles.BoardsContainer}>
                {this.props.boards.map(board => {
                  if (board.is_archived) {
                    return (
                      <BoardThumbnail
                        board={board}
                        key={board.id}
                        getBoardData={this.getBoardData}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </>
        ) : null}

        {/* Show Archived Boards button */}
        <button
          className={styles.showArchivedButton}
          onClick={this.toggleArchivedBoards}
        >
          {!this.state.showArchived ? "Show archived" : "Hide archived"}
        </button>

        {/* Add New Board Modal */}
        {this.state.addNewBoard ? (
          <AddNewBoard toggleAddNewBoard={this.toggleAddNewBoard} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //this doesn't work
    boards: state.boards
      ? state.boards.sort((a, b) => {
          return a.updated_at < b.updated_at ? 1 : -1;
        })
      : null
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
