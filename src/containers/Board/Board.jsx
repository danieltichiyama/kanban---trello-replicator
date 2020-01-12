import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../../components/Card";
import { loadCards } from "../../actions";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadCards();
  };

  render() {
    return (
      <div className="board">
        <ul>
          {this.props.cards.map(element => {
            return <Card card={element} key={element.id} />;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadCards: () => {
      return dispatch(loadCards());
    }
  };
};

export default Board = connect(mapStateToProps, mapDispatchToProps)(Board);
