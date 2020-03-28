import React, { Component } from "react";
import styles from "./List.module.scss";
import { connect } from "react-redux";
import Card from "../Card";
import { actionsCreateCard, actionsUpdateList } from "../../actions";
import ReturnButton from "../ReturnButton";
import { Droppable, Draggable } from "react-beautiful-dnd";

class List extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      list: { name: "" },
      showMenu: false,
      showCancelButton: false,
      showNameReturn: false,
      showCardReturn: false,
      name: ""
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    return this.setState({ list: { ...this.props.list } });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (this.props.list !== prevProps.list) {
      return this.setState({ list: this.props.list });
    }
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      event.target.id !== "listMenuButton"
    ) {
      return this.setState({ showMenu: !this.state.showMenu });
    }
  }

  updateList = e => {
    if (e) {
      e.preventDefault();
    }
    let formData = { ...this.state.list, id: this.props.list.id };
    if (formData.name.length === 0) {
      formData.name = this.props.list.name;
    }

    if (formData.cards) {
      delete formData.cards;
    }

    this.props.dispatchUpdateList(formData);
    return this.setState({ showMenu: false, showNameReturn: false });
  };

  createCard = e => {
    e.preventDefault();

    if (this.state.name.length === 0) {
      return this.hideCancelButton();
    }
    let cards = this.props.cards;
    let position;
    if (!this.props.cards || cards.length === 0) {
      position = 1;
    } else {
      position = parseFloat(parseFloat(cards[cards.length - 1].position) + 1);
    }
    let formData = {
      ...this.state,
      list_id: this.props.list.id,
      position,
      created_by: JSON.parse(sessionStorage.getItem("user")).id,
      board_id: this.props.list.board_id
    };

    delete formData.list;
    delete formData.showMenu;
    delete formData.showCancelButton;
    delete formData.showCardReturn;
    delete formData.showNameReturn;

    this.props.dispatchCreateCard(formData);
    return this.setState(
      { name: "", showCardReturn: false },
      this.hideCancelButton()
    );
  };

  handleCardInput = e => {
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  handleListInput = e => {
    const { value, name } = e.target;
    return this.setState({ list: { [name]: value } });
  };

  handleListNameClick = e => {
    e.preventDefault();
    return this.setState({ showNameReturn: true });
  };

  handleCardNameClick = e => {
    e.preventDefault();
    return this.setState({ showCardReturn: true }, this.showCancelButton);
  };

  toggleMenu = e => {
    return this.setState({ showMenu: !this.state.showMenu });
  };

  archiveList = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (this.state.list.is_archived) {
      return this.setState({
        list: { ...this.state.list, is_archived: !this.state.list.is_archived }
      });
    } else {
      return this.setState({ list: { ...this.state.list, is_archived: true } });
    }
  };

  showCancelButton = () => {
    return this.setState({ showCancelButton: true });
  };

  hideCancelButton = e => {
    if (e) {
      e.preventDefault();
    }

    return this.setState({
      showCancelButton: false,
      showCardReturn: false,
      name: ""
    });
  };

  handleListNameBlur = e => {
    e.preventDefault();

    return setTimeout(() => {
      return this.setState({
        showNameReturn: false,
        list: { name: this.props.list.name }
      });
    }, 500);
  };

  render() {
    return (
      <Draggable
        draggableId={"draggableList_" + this.props.list.id.toString()}
        index={this.props.index}
      >
        {provided => {
          return (
            <div
              className={styles.List}
              key={this.props.list.id}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div
                className={styles.listDragHandle}
                {...provided.dragHandleProps}
              >
                {" "}
              </div>
              {/* List Name */}
              <div className={styles.listHeader}>
                <form
                  onSubmit={this.updateList}
                  className={styles.listHeader_form}
                  onBlur={this.handleListNameBlur}
                >
                  <input
                    type="text"
                    onChange={this.handleListInput}
                    value={this.state.list.name}
                    name="name"
                    onKeyPress={this.props.handleKeyPress}
                    className={styles.listName}
                    onClick={this.handleListNameClick}
                  />
                  {this.state.showNameReturn ? (
                    <span className={styles.returnButton_span}>
                      <ReturnButton func={this.updateList} />
                    </span>
                  ) : null}
                </form>
                {/* Menu/Unarchive Button */}
                <button
                  id="listMenuButton"
                  onClick={this.toggleMenu}
                  className={styles.menuButton}
                ></button>
              </div>
              {/* List Menu */}
              {!this.state.showMenu ? null : (
                <ul className={styles.listMenu} ref={this.setWrapperRef}>
                  <li className={styles.listHeader}>
                    <h4>List Actions</h4>
                    <button
                      className={styles.exitButton}
                      onClick={this.toggleMenu}
                    />
                  </li>
                  <hr />
                  <li
                    style={
                      this.state.list.is_archived
                        ? { backgroundColor: "#eb5946", color: "white" }
                        : null
                    }
                    className={styles.li_listMenuOption}
                    onClick={this.archiveList}
                  >
                    {this.state.list.is_archived
                      ? "Unarchive List"
                      : "Archive List"}
                  </li>
                  <button
                    className={styles.saveButton}
                    onClick={this.updateList}
                  >
                    Save
                  </button>
                </ul>
              )}
              {/* Cards */}
              {this.props.list.is_archived ? null : (
                <Droppable
                  droppableId={this.props.list.id.toString()}
                  type="cards"
                >
                  {provided => {
                    return (
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.listOfCards}
                      >
                        {this.props.cards
                          ? this.props.cards.map((card, index) => {
                              if (
                                card.is_archived === false &&
                                card.list_id === this.props.list.id
                              ) {
                                return (
                                  <Card
                                    card={card}
                                    key={card.id}
                                    index={index}
                                    handleKeyPress={this.props.handleKeyPress}
                                  />
                                );
                              } else {
                                return null;
                              }
                            })
                          : null}
                        {provided.placeholder}
                      </ul>
                    );
                  }}
                </Droppable>
              )}
              {/* Add Card */}
              <div className={styles.AddCard}>
                <form onSubmit={this.createCard} className={styles.addCardForm}>
                  <input
                    type="text"
                    name="name"
                    className={styles.addCardInput}
                    value={this.state.name}
                    placeholder="+ Add a card"
                    onChange={this.handleCardInput}
                    onKeyPress={this.props.handleKeyPress}
                    onClick={this.handleCardNameClick}
                    autoComplete="off"
                    onBlur={this.createCard}
                  />
                  {this.state.showCardReturn ? (
                    <button type="submit" className={styles.plusButton} />
                  ) : null}
                </form>
                {this.state.showCancelButton ? (
                  <button
                    onClick={this.hideCancelButton}
                    className={styles.exitButton}
                  ></button>
                ) : null}
              </div>
            </div>
          );
        }}
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  return {
    watchLists: state.lists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateCard: formData => {
      dispatch(actionsCreateCard(formData));
    },
    dispatchUpdateList: formData => {
      dispatch(actionsUpdateList(formData));
    }
  };
};

export default List = connect(mapStateToProps, mapDispatchToProps)(List);
