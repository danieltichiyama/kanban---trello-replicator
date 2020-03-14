import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ArchivedItems.module.scss";
import { actionsUpdateCard, actionsUpdateList } from "../../actions";

class ArchivedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLists: false
    };
  }

  toggleItems = () => {
    return this.setState({ showLists: !this.state.showLists });
  };

  unarchiveCard = e => {
    let { id } = e.target;
    let formData = { id, is_archived: false };

    return this.props.dispatchUpdateCard(formData);
  };

  unarchiveList = e => {
    let { id } = e.target;
    let formData = { id, is_archived: false };

    return this.props.dispatchUpdateList(formData);
  };

  render() {
    return (
      <div className={styles.ArchivedItems}>
        {/* Lists/Cards Toggle */}
        <div className={styles.menuContainer}>
          <h4>{this.state.showLists ? "Archived Lists" : "Archived Cards"}</h4>
          <button
            onClick={this.toggleItems}
            className={styles.cardsListsToggleButton}
          >
            Show {this.state.showLists ? "Cards" : "Lists"}
          </button>
        </div>

        {/* List of Items */}
        <ul className={styles.itemsList}>
          {this.state.showLists
            ? this.props.lists.map(list => {
                return (
                  <div className={styles.archivedContainer} key={list.id}>
                    {list.name}
                    <button
                      onClick={this.unarchiveList}
                      id={list.id}
                      className={styles.unarchiveButton}
                    >
                      Unarchive
                    </button>
                  </div>
                );
              })
            : this.props.cards.map(card => {
                return (
                  <div className={styles.archivedContainer} key={card.id}>
                    <p>{card.name}</p>
                    <button
                      onClick={this.unarchiveCard}
                      id={card.id}
                      className={styles.unarchiveButton}
                    >
                      Unarchive
                    </button>
                  </div>
                );
              })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cards: state.cards.filter(card => {
      return card.is_archived;
    }),
    lists: state.lists.filter(list => {
      return list.is_archived;
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateCard: formData => {
      return dispatch(actionsUpdateCard(formData));
    },
    dispatchUpdateList: formData => {
      return dispatch(actionsUpdateList(formData));
    }
  };
};

export default ArchivedItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivedItems);
