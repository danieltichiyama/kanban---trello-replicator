import React, { Component } from "react";
import styles from "./EditBoardMenu.module.scss";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { actionsUpdateBoard } from "../../actions";

class EditBoardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateBoard = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let formData = { ...this.state };
    delete formData.showMenu;
    formData.id = this.props.board_id;

    this.props.dispatchUpdateBoard(formData);
    return this.props.toggleMenu(e);
  };

  handleInput = e => {
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  toggleColor = e => {
    let { id } = e.target;
    return this.setState({ url: id });
  };

  archive = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (this.state.is_archived) {
      return this.setState({ is_archived: !this.state.is_archived });
    } else {
      return this.setState({ is_archived: true });
    }
  };

  unarchive = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    return this.setState({ is_archived: false }, this.updateBoard);
  };

  stopPropagation = e => {
    return e.stopPropagation();
  };

  render() {
    return (
      <form
        onSubmit={this.updateBoard}
        className={styles.EditBoardMenu}
        onClick={this.stopPropagation}
      >
        <label>
          Board Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            defaultValue={this.props.boardName}
            onChange={this.handleInput}
            placeholder={this.props.boardName}
          />
        </label>

        <label>
          Description
          <TextareaAutosize
            name="description"
            minRows={1}
            onChange={this.handleInput}
            defaultValue={this.props.description}
          ></TextareaAutosize>
        </label>

        <label>
          Background
          <div className={styles.colorPickerContainer}>
            <div className={styles.colorPickerOptionsContainer}>
              {!this.props.colors
                ? null
                : Object.keys(this.props.colors).map(color => {
                    let style = { backgroundColor: color };
                    let checked = false;
                    if (
                      this.props.boardImage &&
                      this.props.boardImage.url === color
                    ) {
                      checked = true;
                    }
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
                          defaultChecked={checked}
                        />
                        <span className={styles.colorPickerCustom}></span>
                      </label>
                    );
                  })}
            </div>
          </div>
        </label>
        <div className={styles.form_buttons_container}>
          <button
            className={styles.buttons_archiveBoard}
            onClick={this.archive}
            style={
              this.state.is_archived ? { backgroundColor: "#eb5946" } : null
            }
          >
            {this.state.is_archived ? "Unarchive" : "Archive"}
          </button>
          <button type="submit" data-menu="editBoardMenu">
            Save
          </button>
          <button
            type="button"
            data-menu="editBoardMenu"
            onClick={this.props.toggleMenu}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.initLabels,
    boardName: state.name,
    description: state.description,
    boardImage: state.boardImage,
    board_id: state.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateBoard: formData => {
      return dispatch(actionsUpdateBoard(formData));
    }
  };
};

export default EditBoardMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBoardMenu);
