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
    return (
      <div className={styles.Card}>
        {/* Card Name */}
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

        {/* Show Card Editor Menu */}
        <button onClick={this.toggleMenu}>
          {!this.state.showMenu ? "More" : "Less"}
        </button>

        {/* Card's Labels */}
        {this.props.card.labels
          ? this.props.card.labels.map(label => {
              let color = { backgroundColor: label.color };
              let labelName = this.props.labels[label.color].name;
              return (
                <div className={styles.Label} key={label.color} style={color}>
                  {labelName}
                </div>
              );
            })
          : null}

        {/* Card Menu */}
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

const mapStateToProps = state => {
  return {
    labels: state.labels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateCard: formData => {
      return dispatch(actionsUpdateCard(formData));
    }
  };
};

export default Card = connect(mapStateToProps, mapDispatchToProps)(Card);
