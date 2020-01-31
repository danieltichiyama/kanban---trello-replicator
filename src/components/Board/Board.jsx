import React, { Component } from "react";
import { connect } from "react-redux";
import { actionsCreateList, actionsUpdateBoard } from "../../actions";
import List from "../List";
import BoardMenu from "../BoardMenu";
import styles from "./Board.module.scss";
import { DragDropContext } from "react-beautiful-dnd";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { board: {}, list: {} };
  }

  onDragEnd = result => {
    console.log(result);
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
    return this.setState({ name: "" });
  };

  handleBoardInput = e => {
    const { value, name } = e.target;
    return this.setState({ board: { [name]: value } });
  };

  handleListInput = e => {
    const { value, name } = e.target;
    return this.setState({ list: { [name]: value } });
  };

  render() {
    return (
      <div className={styles.Board}>
        <BoardMenu />
        <form onSubmit={this.updateBoard}>
          <input
            type="text"
            name="name"
            value={this.state.board.name}
            defaultValue={this.props.name}
            placeholder={this.props.name}
            onChange={this.handleBoardInput}
          />
          <input type="submit" value="Change" />
        </form>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <ul className={styles.Lists}>
            {this.props.lists
              ? this.props.lists.map(list => {
                  return <List list={list} key={list.id} cards={list.cards} />;
                })
              : null}
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
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    lists: state.lists,
    labels: state.labels,
    board_id: state.id
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
