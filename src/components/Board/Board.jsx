import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Board.module.scss";
import Card from "../Card";
import { actionsCreateList } from "../../actions";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addCard = e => {
    console.log(e.target);
    e.preventDefault();
  };

  addList = e => {
    e.preventDefault();
    let lists = this.props.boardData.lists;

    let position = parseInt(parseFloat(lists[lists.length - 1].position) + 1);
    let formData = {
      ...this.state,
      board_id: this.props.boardData.id,
      position
    };
    return this.props.dispatchCreateList(formData);
  };

  handleInput = event => {
    const { value, name } = event.target;
    return this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={styles.Board}>
        <ul className={styles.Lists}>
          {this.props.boardData && this.props.boardData.lists
            ? this.props.boardData.lists.map(list => {
                return (
                  <li className={styles.List} key={list.id}>
                    {list.name}
                    <ul>
                      {list.cards
                        ? list.cards.map(card => {
                            return <Card card={card} key={card.id} />;
                          })
                        : null}
                      <li className={styles.AddCard}>
                        <form onSubmit={this.addCard}>
                          <input
                            type="text"
                            name="card"
                            value={this.state.card}
                            placeholder="+ Add Card"
                            onChange={this.handleInput}
                          />
                          <input type="submit" value="Add" />
                        </form>
                      </li>
                    </ul>
                  </li>
                );
              })
            : null}
          <form onSubmit={this.addList}>
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
    boardData: state.boardData
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
