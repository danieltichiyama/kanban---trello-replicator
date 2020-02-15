import React, { Component } from "react";
import styles from "./List.module.scss";
import { connect } from "react-redux";
import Card from "../Card";
import { actionsCreateCard, actionsUpdateList } from "../../actions";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      showMenu: false
    };
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
      position = parseInt(parseFloat(cards[cards.length - 1].position) + 1);
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
    return this.setState({ list: { name: placeholder } });
  };

  showMenu = () => {
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

  render() {
    return (
      <div className={styles.List} key={this.props.list.id}>
        {/* List Name */}
        <form onSubmit={this.updateList}>
          <input
            type="text"
            placeholder={this.props.list.name}
            onChange={this.handleListInput}
            onClick={this.handleInputClick}
            value={this.state.list.name}
            name="name"
          />
          {this.props.list.is_archived ? null : (
            <input type="submit" value="Change" />
          )}
        </form>

        {!this.props.list.is_archived ? (
          <button onClick={this.showMenu}>Menu</button>
        ) : (
          <button onClick={this.unarchive}>Unarchive</button>
        )}

        {/* List Menu */}
        {!this.state.showMenu ? null : (
          <form onSubmit={this.updateList}>
            <button onClick={this.archiveList}>
              {this.state.list.is_archived ? "Unarchive" : "Archive"}
            </button>
            <input type="submit" value="Save" />
          </form>
        )}

        {/* Cards */}
        {this.props.list.is_archived ? null : (
          <ul>
            {this.props.cards
              ? this.props.cards.map(card => {
                  if (
                    card.is_archived === false &&
                    card.list_id === this.props.list.id
                  ) {
                    return <Card card={card} key={card.id} />;
                  } else {
                    return null;
                  }
                })
              : null}

            {/* Add Card */}

            <li className={styles.AddCard}>
              <form onSubmit={this.createCard}>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="+ Add Card"
                  onChange={this.handleCardInput}
                />
                <input type="submit" value="Add" />
              </form>
            </li>
          </ul>
        )}
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
