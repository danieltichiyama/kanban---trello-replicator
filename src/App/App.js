import React, { Component } from "react";
import "./App.scss";
import { connect } from "react-redux";
import { loadCards } from "../actions";

import Board from "../containers/Board";
import AddCard from "../containers/AddCard";
import EditCard from "../containers/EditCard/EditCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onLoadCards();
  }

  render() {
    return (
      <div>
        <EditCard />
        <AddCard />
        <Board cards={this.props.cards} />
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

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
