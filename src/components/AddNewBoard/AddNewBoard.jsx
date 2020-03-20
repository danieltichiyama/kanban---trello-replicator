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

    let formData = { ...this.state };

    formData["created_by"] = JSON.parse(sessionStorage.getItem("user")).id;

    this.props.dispatchCreateBoard(formData);
    return this.setState({ name: "", url: "" }, this.props.toggleAddNewBoard());
  };

  handleInput = event => {
    const { value, name } = event.target;
    return this.setState({ [name]: value });
  };

  stopPropagation = e => {
    return e.stopPropagation();
  };

  toggleColor = e => {
    let { id } = e.target;
    return this.setState({ url: id });
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
            className={styles.nameInput}
          />
          <div className={styles.descriptionContainer}>
            <h4 className={styles.subHeader}>Description</h4>
            <textarea
              type="text"
              name="description"
              value={this.state.description}
              placeholder="What is this board for?"
              onChange={this.handleInput}
            />
          </div>

          <div className={styles.colorPickerContainer}>
            <h4 className={styles.subHeader}>Background Color</h4>
            <div className={styles.colorPickerOptionsContainer}>
              {!this.props.colors
                ? null
                : Object.keys(this.props.colors).map(color => {
                    let style = { backgroundColor: color };
                    return (
                      <label
                        key={color}
                        className={styles.colorPickerLabel}
                        style={style}
                        onClick={this.toggleColor}
                        name={color}
                      >
                        <input
                          type="radio"
                          className={styles.colorPickerInput}
                          name="color"
                          id={color}
                        />
                        <span className={styles.colorPickerCustom}></span>
                      </label>
                    );
                  })}
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <button type="submit">Create</button>
            <button onClick={this.props.toggleAddNewBoard}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.initLabels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateBoard: formData => {
      dispatch(actionsCreateBoard(formData));
    }
  };
};

export default AddNewBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewBoard);
