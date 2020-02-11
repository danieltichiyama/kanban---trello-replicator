import React, { Component } from "react";
import styles from "./Card.module.scss";
import { connect } from "react-redux";
import { actionsUpdateCard } from "../../actions";

import CardMenu from "../CardMenu";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      label: {}
    };
  }

  updateCard = e => {
    e.preventDefault();
    let formData = { ...this.state, id: this.props.card.id };
    delete formData.label;
    delete formData.showMenu;
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
    return this.setState({ [name]: value });
  };

  handleLabelInput = e => {
    const { value, name } = e.target;
    return this.setState({ label: { [name]: value } });
  };

  handleInputClick = e => {
    const { placeholder, name } = e.target;
    return this.setState({ [name]: placeholder });
  };

  render() {
    // console.log("rerendering card:", this.props.card);
    return (
      <div className={styles.Card}>
        <form onSubmit={this.updateCard}>
          <input
            type="text"
            name="name"
            placeholder={this.props.card.name}
            value={this.state.name}
            onChange={this.handleCardInput}
            onClick={this.handleInputClick}
          />
          <input type="submit" value="Edit" />
        </form>
        <button onClick={this.toggleMenu}>
          {!this.state.showMenu ? "More" : "Less"}
        </button>

        {this.props.card.labels
          ? this.props.card.labels.map(label => {
              let color = { backgroundColor: label.color };
              return (
                <div className={styles.Label} key={label.color} style={color}>
                  Label: {label.name}
                </div>
              );
            })
          : null}

        {!this.state.showMenu ? null : (
          <CardMenu
            card={this.props.card}
            toggleMenu={this.toggleMenu}
            updateCard={this.updateCard}
          />
        )}
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
