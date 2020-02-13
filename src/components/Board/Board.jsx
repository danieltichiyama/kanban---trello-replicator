import React, { Component } from "react";
import { connect } from "react-redux";
import { actionsCreateList, actionsUpdateBoard } from "../../actions";
import List from "../List";
import BoardMenu from "../BoardMenu";
import styles from "./Board.module.scss";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { board: {}, list: {}, showMenu: false };
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  updateBoard = e => {
    e.preventDefault();
    let formData = {
      ...this.state.board,
      id: this.props.board_id
    };
    return this.props.dispatchUpdateBoard(formData);
  };

  createList = e => {
    e.preventDefault();
    let lists = this.props.lists;
    let position;
    if (lists.length === 0) {
      position = 1;
    } else {
      position = parseInt(parseFloat(lists[lists.length - 1].position) + 1);
    }
    let formData = {
      ...this.state.list,
      board_id: this.props.board_id,
      position
    };

    this.props.dispatchCreateList(formData);
    return this.setState({ list: { name: "" } });
  };

  handleBoardInput = e => {
    const { value, name } = e.target;
    return this.setState({ board: { [name]: value } });
  };

  handleListInput = e => {
    const { value, name } = e.target;
    return this.setState({ list: { [name]: value } });
  };

  handleInputClick = e => {
    const { placeholder } = e.target;
    return this.setState({ board: { name: placeholder } });
  };

  render() {
    return (
      <div className={styles.Board}>
        <button onClick={this.toggleMenu}>Menu</button>
        {this.state.showMenu ? <BoardMenu /> : null}

        {/* Board Name */}
        <form onSubmit={this.updateBoard}>
          <input
            type="text"
            name="name"
            value={this.state.board.name}
            placeholder={this.props.name}
            onChange={this.handleBoardInput}
            onClick={this.handleInputClick}
          />
          <input type="submit" value="Change" />
        </form>

        {/* Lists */}
        <ul className={styles.Lists}>
          {this.props.lists
            ? this.props.lists.map(list => {
                return (
                  <List list={list} key={list.id} cards={this.props.cards} />
                );
              })
            : null}

          {/* Add List */}
          <form onSubmit={this.createList}>
            <input
              className={styles.AddList}
              name="name"
              value={this.state.list.name}
              placeholder="+ Add List"
              onChange={this.handleListInput}
            />
            <input type="submit" value="Add" />
          </form>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    lists: state.lists,
    labels: state.labels,
    board_id: state.id,
    cards: state.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateList: formData => {
      return dispatch(actionsCreateList(formData));
    },
    dispatchUpdateBoard: formData => {
      return dispatch(actionsUpdateBoard(formData));
    }
  };
};

export default Board = connect(mapStateToProps, mapDispatchToProps)(Board);
