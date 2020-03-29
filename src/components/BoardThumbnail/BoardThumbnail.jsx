import React, { Component } from "react";
import styles from "./BoardThumbnail.module.scss";
import { connect } from "react-redux";
import { actionsUpdateBoard } from "../../actions";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

class BoardThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      name: "",
      description: "",
      url: ""
    };
  }

  componentDidMount = () => {
    let { name, description } = this.props.board;
    let { url } = this.props.board.boardImage;
    return this.setState({ name, description, url });
  };

  updateBoard = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let formData = { ...this.state };
    delete formData.showMenu;

    if (formData.name.length === 0) {
      formData.name = this.props.board.name;
    }

    console.log(formData);

    formData.id = this.props.board.id;

    this.props.dispatchUpdateBoard(formData);
    return this.toggleMenu();
  };

  handleInput = e => {
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  toggleColor = e => {
    let { id } = e.target;
    return this.setState({ url: id });
  };

  toggleMenu = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    return this.setState({
      showMenu: !this.state.showMenu,
      is_archived: false
    });
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
    let { board } = this.props;
    let BoardThumbnailBG;

    if (board.boardImage && board.boardImage.url.startsWith("#")) {
      BoardThumbnailBG = {
        backgroundColor: board.boardImage.url
      };
    } else if (board.boardImage && board.boardImage.url) {
      BoardThumbnailBG = {
        background: `url(${board.boardImage.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      };
    }

    return (
      <div className={styles.thumbnailContainer} style={BoardThumbnailBG}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/b/${this.props.board.id}/${this.props.board.name}`}
        >
          <div id={board.id} className={styles.BoardThumbnail}>
            {board.name}
            {!this.props.board.is_archived ? (
              this.props.isNotOwner ? null : (
                <button
                  onClick={this.toggleMenu}
                  className={styles.menuButton}
                ></button>
              )
            ) : (
              <button
                onClick={this.unarchive}
                className={styles.unarchiveButton}
              >
                Unarchive
              </button>
            )}
          </div>
        </Link>

        {this.state.showMenu ? (
          <div
            className={styles.updateBoardContainer}
            onClick={this.toggleMenu}
          >
            <form
              onSubmit={this.updateBoard}
              className={styles.updateBoard}
              onClick={this.stopPropagation}
            >
              <h3>Edit Board</h3>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInput}
                placeholder={this.props.board.name}
              />
              <div className={styles.descriptionContainer}>
                <h4 className={styles.subHeader}>Description</h4>

                <TextareaAutosize
                  name="description"
                  minRows={5}
                  onChange={this.handleInput}
                  value={this.state.description}
                ></TextareaAutosize>
              </div>

              <div className={styles.colorPickerContainer}>
                <h4 className={styles.subHeader}>Background Color</h4>
                <div className={styles.colorPickerOptionsContainer}>
                  {!this.props.colors
                    ? null
                    : Object.keys(this.props.colors).map(color => {
                        let style = { backgroundColor: color };
                        let checked = false;
                        if (this.props.board.boardImage.url === color) {
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
              <div className={styles.buttonsContainer}>
                <button type="submit">Save</button>
                <button type="button" onClick={this.toggleMenu}>
                  Cancel
                </button>
                <button
                  onClick={this.archive}
                  type="button"
                  style={
                    this.state.is_archived
                      ? { backgroundColor: "#eb5946" }
                      : null
                  }
                >
                  {this.state.is_archived ? "Unarchive" : "Archive"}
                </button>
              </div>
            </form>
          </div>
        ) : null}
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
    dispatchUpdateBoard: formData => {
      return dispatch(actionsUpdateBoard(formData));
    }
  };
};

export default BoardThumbnail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardThumbnail);
