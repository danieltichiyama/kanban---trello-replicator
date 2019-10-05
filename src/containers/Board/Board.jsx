import React, { Component } from "react";

import Card from "../../components/Card";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  editCard = obj => {
    console.log(obj);
  };

  render() {
    return (
      <div className="board">
        <ul>
          {this.props.cards.map(element => {
            return (
              <Card
                onEdit={obj => {
                  return this.editCard.bind(obj);
                }}
                card={element}
                key={element.id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
//editCard broken

export default Board;
