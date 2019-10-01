import React, { Component } from "react";
import "./App.scss";
import { connect } from "react-redux";

import Board from "../containers/Board";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          title: "Card One",
          description:
            "This is a card description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          assigned_to: "userOne",
          created_by: "userOne",
          created_at: Date.now(),
          updated_at: Date.now()
        }
      ]
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Board cards={this.state.cards} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
