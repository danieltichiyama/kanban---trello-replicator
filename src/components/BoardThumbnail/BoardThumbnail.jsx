import React, { Component } from "react";
import styles from "./BoardThumbnail.module.scss";
import { connect } from "react-redux";
import { actionsUpdateBoard } from "../../actions";
import { Link } from "react-router-dom";

class BoardThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  updateBoard = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let formData = { ...this.state };
    delete formData.showMenu;
    formData.id = this.props.board.id;

    this.props.dispatchUpdateBoard(formData);
    return this.toggleMenu();
  };

  handleInput = e => {
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  toggleMenu = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    return this.setState({
      showMenu: !this.state.showMenu,
      is_archived: false
    });
  };

  archive = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (this.state.is_archived) {
      return this.setState({ is_archived: !this.state.is_archived });
    } else {
      return this.setState({ is_archived: true });
    }
  };

  unarchive = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    return this.setState({ is_archived: false }, this.updateBoard);
  };

  stopPropagation = e => {
    return e.stopPropagation();
  };

  render() {
    let { board, getBoardData, labelColors } = this.props;
    let BoardThumbnailBG;

    if (board.boardImage && board.boardImage.url) {
      BoardThumbnailBG = {
        background: `url(${board.boardImage.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      };
    } else {
      if (this.props.labelColors) {
        let array = Object.keys(labelColors);

        let number = Math.floor(Math.random() * Math.floor(array.length));

        BoardThumbnailBG = {
          backgroundColor: array[number]
        };
      }
    }

    return (
      <div className={styles.thumbnailContainer} style={BoardThumbnailBG}>
        <Link style={{ textDecoration: "none" }} to="/board">
          <div
            id={board.id}
            className={styles.BoardThumbnail}
            onClick={getBoardData}
          >
            {board.name}
            {!this.props.board.is_archived ? (
              <button
                onClick={this.toggleMenu}
                className={styles.menuButton}
              ></button>
            ) : (
              <button
                onClick={this.unarchive}
                className={styles.unarchiveButton}
              >
                Unarchive
              </button>
            )}
          </div>
        </Link>

        {this.state.showMenu ? (
          <div
            className={styles.updateBoardContainer}
            onClick={this.toggleMenu}
          >
            <form
              onSubmit={this.updateBoard}
              className={styles.updateBoard}
              onClick={this.stopPropagation}
            >
              <h3>Edit Board</h3>
              <input
                type="text"
                name="name"
                value={this.state.name}
                defaultValue={this.props.board.name}
                onChange={this.handleInput}
                placeholder={this.props.board.name}
              />

              <textarea
                name="description"
                cols="10"
                rows="5"
                onChange={this.handleInput}
                defaultValue={this.props.board.description}
              ></textarea>
              <div className={styles.buttonsContainer}>
                <button
                  onClick={this.archive}
                  style={
                    this.state.is_archived
                      ? { backgroundColor: "#eb5946" }
                      : null
                  }
                >
                  {this.state.is_archived ? "Unarchive" : "Archive"}
                </button>
                <button type="submit">Save</button>
                <button onClick={this.toggleMenu}>Cancel</button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    labelColors: state.initLabels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateBoard: formData => {
      return dispatch(actionsUpdateBoard(formData));
    }
  };
};

export default BoardThumbnail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardThumbnail);
