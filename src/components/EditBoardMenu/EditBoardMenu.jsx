import React, { Component } from "react";
import styles from "./EditBoardMenu.module.scss";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { actionsUpdateBoard } from "../../actions";

class EditBoardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      details: "",
      description: "",
      url: "",
      id: 0
    };
  }

  componentDidMount = () => {
    return this.setState({
      name: this.props.name,
      details: this.props.details,
      description: this.props.description,
      url: this.props.boardImage.url,
      id: this.props.id
    });
  };

  updateBoard = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let formData = { ...this.state };
    delete formData.showMenu;

    if (formData.name.length === 0) {
      formData.name = this.props.name;
    }
    if (formData.url.length === 0) {
      delete formData.url;
    }

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
        data-menu="editBoardMenu"
      >
        <label>
          Board Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
            placeholder={this.props.name}
          />
        </label>

        <label>
          Description
          <TextareaAutosize
            name="description"
            minRows={1}
            onChange={this.handleInput}
            value={this.state.description}
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
          <button type="submit">Save</button>
          <button
            type="button"
            data-menu="editBoardMenu"
            onClick={this.props.toggleMenu}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.buttons_archiveBoard}
            onClick={this.archive}
            style={
              this.state.is_archived ? { backgroundColor: "#eb5946" } : null
            }
          >
            {this.state.is_archived ? "Unarchive" : "Archive"}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    colors: state.initLabels,
    name: state.name,
    description: state.description,
    boardImage: state.boardImage,
    id: state.id
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
