import React, { Component } from "react";
import styles from "./List.module.scss";
import { connect } from "react-redux";
import Card from "../Card";
import { actionsCreateCard, actionsUpdateList } from "../../actions";

import { Droppable } from "react-beautiful-dnd";

class List extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      list: {},
      showMenu: false,
      showCancelButton: false
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      return this.setState({ showMenu: !this.state.showMenu });
    }
  }

  updateList = e => {
    if (e) {
      e.preventDefault();
    }
    let formData = { ...this.state.list, id: this.props.list.id };

    return this.props.dispatchUpdateList(formData);
  };

  createCard = e => {
    e.preventDefault();
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
      created_by: 1,
      board_id: this.props.list.board_id
    };

    delete formData.list;
    delete formData.showMenu;
    delete formData.showCancelButton;

    this.props.dispatchCreateCard(formData);
    return this.setState({ name: "" });
  };

  handleCardInput = e => {
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  handleListInput = e => {
    const { value, name } = e.target;
    return this.setState({ list: { [name]: value } });
  };

  handleInputClick = e => {
    const { placeholder } = e.target;
    return this.setState({
      list: { name: placeholder }
    });
  };

  toggleMenu = () => {
    return this.setState({ showMenu: !this.state.showMenu });
  };

  archiveList = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (this.state.list.is_archived) {
      return this.setState({
        list: { is_archived: !this.state.list.is_archived }
      });
    } else {
      return this.setState({ list: { is_archived: true } });
    }
  };

  unarchive = () => {
    return this.setState({ list: { is_archived: false } }, this.updateList);
  };

  showCancelButton = () => {
    return this.setState({ showCancelButton: true });
  };

  hideCancelButton = e => {
    e.preventDefault();
    return this.setState({ showCancelButton: false });
  };

  render() {
    return (
      <div className={styles.List} key={this.props.list.id}>
        {/* List Name */}
        <div className={styles.listHeader}>
          <form onSubmit={this.updateList}>
            <input
              type="text"
              placeholder={this.props.list.name}
              onChange={this.handleListInput}
              onClick={this.handleInputClick}
              value={this.state.list.name}
              name="name"
              onKeyPress={this.props.handleKeyPress}
              className={styles.listName}
            />
          </form>
          {/* Menu/Unarchive Button */}
          {!this.props.list.is_archived ? (
            <button
              onClick={this.toggleMenu}
              className={styles.menuButton}
            ></button>
          ) : (
            <button onClick={this.unarchive}>Unarchive</button>
          )}
        </div>
        {/* List Menu */}
        {!this.state.showMenu ? null : (
          <ul className={styles.listMenu} ref={this.setWrapperRef}>
            <li className={styles.listHeader}>
              <h4>List Actions</h4>
              <button className={styles.exitButton} onClick={this.toggleMenu} />
            </li>
            <hr />
            <li className={styles.li_listMenuOption}>Add Card...</li>
            <li className={styles.li_listMenuOption}>Sort By...</li>
            <li className={styles.li_listMenuOption}>Copy All Cards To...</li>
            <li className={styles.li_listMenuOption}>Archive All Cards...</li>
            <li className={styles.li_listMenuOption} onClick={this.archiveList}>
              {this.state.list.is_archived ? "Unarchive List" : "Archive List"}
            </li>
            <button className={styles.saveButton} onClick={this.updateList}>
              Save
            </button>
          </ul>
        )}
        {/* Cards */}
        {this.props.list.is_archived ? null : (
          <Droppable droppableId={this.props.list.id.toString()}>
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
              onClick={this.showCancelButton}
            />
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
