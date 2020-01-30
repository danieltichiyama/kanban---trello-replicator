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

  updateBoard = () => {
    let formData = { ...this.state };
    delete formData.showMenu;
    formData.id = this.props.board.id;

    return this.props.dispatchUpdateBoard(formData);
  };

  handleInput = e => {
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  toggleMenu = e => {
    e.stopPropagation();
    return this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    let { board, getBoardData } = this.props;
    return (
      <div>
        <li id={board.id} className={styles.li_board} onClick={getBoardData}>
          {board.name}
          <button onClick={this.toggleMenu}>Edit</button>
        </li>
        {this.state.showMenu ? (
          <form onSubmit={this.updateBoard}>
            <input
              type="text"
              name="name"
              value={this.state.name}
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
