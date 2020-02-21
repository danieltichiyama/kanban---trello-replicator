import React, { Component } from "react";
import styles from "./AddNewBoard.module.scss";

import { connect } from "react-redux";
import { actionsCreateBoard } from "../../actions";

class AddNewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createBoard = e => {
    e.preventDefault();
    this.props.dispatchCreateBoard(this.state);
    return this.setState({ name: "" });
  };

  handleInput = event => {
    const { value, name } = event.target;
    return this.setState({ [name]: value });
  };

  stopPropagation = e => {
    return e.stopPropagation();
  };

  render() {
    return (
      <div
        className={styles.AddNewBoard}
        onClick={this.props.toggleAddNewBoard}
      >
        <form
          onSubmit={this.createBoard}
          className={styles.addNewBoardForm}
          onClick={this.stopPropagation}
        >
          <h3>Add Board</h3>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Board Name"
            onChange={this.handleInput}
          />
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            placeholder="What is this board for?"
            onChange={this.handleInput}
          />
          <div className={styles.buttonsContainer}>
            <button type="submit">Create</button>
            <button onClick={this.props.toggleAddNewBoard}>Cancel</button>
          </div>
        </form>
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
