import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Board.module.scss";
import Card from "../Card";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitForm = e => {
    e.preventDefault();
    let lists = this.props.boardData.lists;
    console.log(lists);
    console.log(lists[lists.length - 1]);
    let position = parseInt(parseFloat(lists[lists.length - 1].position) + 1);
    let formData = {
      ...this.state,
      board_id: this.props.boardData.id,
      position
    };

    console.log(formData);
    // return this.props.dispatchCreateList(this.state);
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
                      {list.cards.map(card => {
                        return <Card card={card} key={card.id} />;
                      })}
                    </ul>
                  </li>
                );
              })
            : null}
          <form onSubmit={this.submitForm}>
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
  return {};
};

export default Board = connect(mapStateToProps, mapDispatchToProps)(Board);
