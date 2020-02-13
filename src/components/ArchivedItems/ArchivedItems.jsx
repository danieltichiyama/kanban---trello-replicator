import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ArchivedItems.module.scss";
import Card from "../Card";

class ArchivedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.ArchivedItems}>
        Archived Items
        <ul className={styles.itemsList}>
          {this.props.cards.map(card => {
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

const mapDispatchToProps = dispatch => {
  return;
};

export default ArchivedItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivedItems);
