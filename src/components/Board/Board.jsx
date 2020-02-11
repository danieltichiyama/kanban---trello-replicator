import React, { Component } from "react";
import { connect } from "react-redux";
import {
  actionsCreateList,
  actionsUpdateBoard,
  actionsUpdateCard
} from "../../actions";
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
    let { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let index = destination.index;

    let generatePosition = (index, array) => {
      let position;

      if (index === 0) {
        position = parseFloat(array[index].position) / 2;
      } else if (index === array.length - 1) {
        position = parseInt(parseFloat(array[index].position) + 1);
      } else {
        position = parseFloat(
          parseFloat(array[index].position) +
            parseFloat(array[index - 1].position) / 2
        );
      }

      return position;
    };

    let formData = {
      id: draggableId,
      list_id: parseInt(this.props.lists[destination.droppableId].id),
      position: generatePosition(
        index,
        this.props.lists[destination.droppableId].cards
      )
    };

    return this.props.dispatchUpdateCard(formData);
    //saves the data in the backend server, however it doesn't rerender the list in the correct order.  Perhaps because it can't see the difference in the reducer, so it doesn't trigger a rerender.

    //also, dragging it to another list doesn't work.
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
              ? this.props.lists.map((list, index) => {
                  return (
                    <List
                      list={list}
                      key={list.id}
                      cards={list.cards}
                      listIndex={index}
                    />
                  );
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
    },
    dispatchUpdateCard: formData => {
      return dispatch(actionsUpdateCard(formData));
    }
  };
};

export default Board = connect(mapStateToProps, mapDispatchToProps)(Board);
