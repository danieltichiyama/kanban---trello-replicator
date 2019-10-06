import React, { Component } from "react";

import Card from "../../components/Card";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

export default Board;
