import React, { Component } from "react";
import styles from "./AddNewBoard.module.scss";

import { connect } from "react-redux";
import { actionsCreateBoard } from "../../actions";

class AddNewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  submitForm = e => {
    e.preventDefault();
    return this.props.dispatchCreateBoard(this.state);
  };

  handleInput = event => {
    const { value, name } = event.target;
    return this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={styles.AddNewBoard}>
        This is the AddNewBoard Modal
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Board Name"
            onChange={this.handleInput}
          />
          <input
            type="text"
            name="description"
            value={this.state.description}
            placeholder="What is this board for?"
            onChange={this.handleInput}
          />
          <input type="submit" value="Create" />
          <button onClick={this.props.toggleAddNewBoard}>Cancel</button>
        </form>
        <ul>
          This component still needs:
          <li>Input fields for adding a new board.</li>
          <li>A submit button</li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateBoard: formData => {
      console.log("dispatchCreateBoard");

      formData.created_by = 1;

      dispatch(actionsCreateBoard(formData));
    }
  };
};

export default AddNewBoard = connect(null, mapDispatchToProps)(AddNewBoard);
