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
        {this.state.showLists ? "Archived Lists" : "Archived Cards"}
        <button onClick={this.toggleItems}>
          Show {this.state.showLists ? "Cards" : "Lists"}
        </button>

        {/* List of Items */}
        <ul className={styles.itemsList}>
          {this.state.showLists
            ? this.props.lists.map(list => {
                return (
                  <div className={styles.archivedListContainer} key={list.id}>
                    <h4>{list.name}</h4>
                    <button onClick={this.unarchiveList} id={list.id}>
                      Unarchive
                    </button>
                  </div>
                );
              })
            : this.props.cards.map(card => {
                return (
                  <div className={styles.archivedCardContainer} key={card.id}>
                    {card.name}
                    <button onClick={this.unarchiveCard} id={card.id}>
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
