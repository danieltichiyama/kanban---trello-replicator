import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <div className="App">Hello World!</div>;
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
