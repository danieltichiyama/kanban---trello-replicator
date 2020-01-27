import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Board.module.scss";
import Card from "../Card";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          <form>
            <input className={styles.AddList} placeholder="+ Add List" />
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
