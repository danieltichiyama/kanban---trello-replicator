import React, { Component } from "react";
import styles from "./AddNewBoard.module.scss";

class AddNewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.AddNewBoard}>
        This is the AddNewBoard Modal
        <button onClick={this.props.toggleAddNewBoard}>Cancel</button>
        <ul>
          This component still needs:
          <li>Input fields for adding a new board.</li>
          <li>A submit button</li>
        </ul>
      </div>
    );
  }
}

export default AddNewBoard;
