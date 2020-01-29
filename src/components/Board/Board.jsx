import React, { Component } from "react";
import { connect } from "react-redux";
import { actionsCreateList } from "../../actions";
import List from "../List";
import BoardMenu from "../BoardMenu";
import styles from "./Board.module.scss";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createList = e => {
    e.preventDefault();
    let lists = this.props.lists;

    let position = parseInt(parseFloat(lists[lists.length - 1].position) + 1);
    let formData = {
      ...this.state,
      board_id: this.props.board_id,
      position
    };
    this.props.dispatchCreateList(formData);
    return this.setState({ name: "" });
  };

  handleInput = event => {
    const { value, name } = event.target;
    return this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={styles.Board}>
        <BoardMenu />
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
              value={this.state.list}
              placeholder="+ Add List"
              onChange={this.handleInput}
            />
            <input type="submit" value="Submit" />
          </form>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boardData: state.boardData,
    lists: state.lists,
    labels: state.labels,
    board_id: state.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateList: formData => {
      dispatch(actionsCreateList(formData));
    }
  };
};

export default Board = connect(mapStateToProps, mapDispatchToProps)(Board);
