import React, { Component } from "react";
import styles from "./List.module.scss";
import { connect } from "react-redux";
import Card from "../Card";
import { actionsCreateCard } from "../../actions";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createCard = e => {
    e.preventDefault();
    let cards = this.props.list.cards;
    let position;
    if (!this.props.list.cards || cards.length === 0) {
      position = 1;
    } else {
      position = parseInt(parseFloat(cards[cards.length - 1].position) + 1);
    }
    let formData = {
      ...this.state,
      list_id: this.props.list.id,
      position,
      created_by: 1
    };
    this.props.dispatchCreateCard(formData);
    return this.setState({ name: "" });
  };

  handleInput = event => {
    const { value, name } = event.target;
    return this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={styles.List}>
        <li className={styles.List} key={this.props.list.id}>
          <form onSubmit={this.submitListName}>
            <input type="text" placeholder={this.props.list.name} />
            <input type="submit" value="Change" />
          </form>

          <ul>
            {this.props.cards
              ? this.props.cards.map(card => {
                  return <Card card={card} key={card.id} />;
                })
              : null}
            <li className={styles.AddCard}>
              <form onSubmit={this.createCard}>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="+ Add Card"
                  onChange={this.handleInput}
                />
                <input type="submit" value="Add" />
              </form>
            </li>
          </ul>
        </li>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchCreateCard: formData => {
      dispatch(actionsCreateCard(formData));
    }
  };
};

export default List = connect(null, mapDispatchToProps)(List);
