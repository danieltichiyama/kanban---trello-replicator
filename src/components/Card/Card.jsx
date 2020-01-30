import React, { Component } from "react";
import styles from "./Card.module.scss";
import { connect } from "react-redux";
import { actionsUpdateCard } from "../../actions";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      card: {},
      label: {}
    };
  }

  updateCard = e => {
    e.preventDefault();
    let formData = { ...this.state.card, id: this.props.card.id };
    return this.props.dispatchUpdateCard(formData);
  };

  toggleMenu = e => {
    if (e) {
      e.stopPropagation();
    }
    return this.setState({ showMenu: !this.state.showMenu });
  };

  handleCardInput = e => {
    const { value, name } = e.target;
    return this.setState({ card: { [name]: value } });
  };

  handleLabelInput = e => {
    const { value, name } = e.target;
    return this.setState({ label: { [name]: value } });
  };

  render() {
    return (
      <div className={styles.Card}>
        <form onSubmit={this.updateCard}>
          <input
            type="text"
            name="name"
            defaultValue={this.props.card.name}
            placeholder={this.props.card.name}
            value={this.state.card.name}
            onChange={this.handleCardInput}
          />
          <button onClick={this.toggleMenu}>Edit</button>
        </form>

        {this.props.card.labels
          ? this.props.card.labels.map(label => {
              return (
                <div className={styles.Label} key={label.id}>
                  {label.name}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateCard: formData => {
      return dispatch(actionsUpdateCard(formData));
    }
  };
};

export default Card = connect(null, mapDispatchToProps)(Card);
