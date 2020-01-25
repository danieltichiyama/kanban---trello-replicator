import React, { Component } from "react";
import { connect } from "react-redux";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return <div className="Board">This is your Board</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default Board = connect(mapStateToProps, mapDispatchToProps)(Board);
