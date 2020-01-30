import React, { Component } from "react";
import styles from "./BoardThumbnail.module.scss";
import { connect } from "react-redux";
import { actionsUpdateBoard } from "../../actions";

class BoardThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  updateBoard = e => {
    e.preventDefault();
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
    }
    return this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    let { board, getBoardData } = this.props;
    return (
      <div className={styles.BoardThumbnail}>
        <div id={board.id} className={styles.boardName} onClick={getBoardData}>
          {board.name}
          <button onClick={this.toggleMenu}>Edit</button>
        </div>
        {this.state.showMenu ? (
          <form onSubmit={this.updateBoard}>
            <input type="button" value="Cancel" onClick={this.toggleMenu} />

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
              id=""
              cols="30"
              rows="10"
              onChange={this.handleInput}
              defaultValue={this.props.board.description}
            ></textarea>
            <input type="submit" value="Edit" />
            <input type="button" value="Archive" />
          </form>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateBoard: formData => {
      return dispatch(actionsUpdateBoard(formData));
    }
  };
};

export default BoardThumbnail = connect(
  null,
  mapDispatchToProps
)(BoardThumbnail);
