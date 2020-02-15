import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ArchivedItems.module.scss";
import Card from "../Card";
import List from "../List";

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
                return <List key={list.id} list={list} />;
              })
            : this.props.cards.map(card => {
                return <Card card={card} key={card.id} />;
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

export default ArchivedItems = connect(mapStateToProps, null)(ArchivedItems);
