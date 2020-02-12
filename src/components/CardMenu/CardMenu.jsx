import React, { Component } from "react";
import styles from "./CardMenu.module.scss";
import { connect } from "react-redux";
import { actionsUpdateCard } from "../../actions";

class CardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_archived: false
    };
  }

  handleCardInput = e => {
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  updateCard = e => {
    if (e) {
      e.preventDefault();
    }
    let formData = { ...this.state, id: this.props.card.id };
    if (formData.list_id) {
      formData.list_id = parseInt(formData.list_id);
    }
    console.log(formData);
    this.props.dispatchUpdateCard(formData);
    return this.props.toggleMenu();
  };

  archiveCard = () => {
    return this.setState({ is_archived: true }, this.updateCard);
  };

  render() {
    return (
      <div className={styles.CardMenu}>
        <form onSubmit={this.updateCard}>
          <input type="button" value="Cancel" onClick={this.props.toggleMenu} />
          <input
            type="text"
            name="name"
            value={this.state.name}
            defaultValue={this.props.card.name}
            onChange={this.handleCardInput}
            placeholder={this.props.card.name}
          />
          <textarea
            name="details"
            id=""
            cols="30"
            rows="10"
            onChange={this.handleCardInput}
            defaultValue={this.props.card.details}
            value={this.state.details}
          ></textarea>
          <input
            type="date"
            name="due_date"
            id=""
            onChange={this.handleCardInput}
            defaultValue={new Date(this.props.card.due_date)
              .toISOString()
              .substr(0, 10)}
            value={this.state.due_date}
          />
          <select name="list_id" onChange={this.handleCardInput}>
            {this.props.lists.map(list => {
              return <option value={list.id}>{list.name}</option>;
            })}
          </select>
          <input
            type="text"
            name="created_by"
            id=""
            readOnly
            value={
              this.props.card.createdBy.first_name +
              " " +
              this.props.card.createdBy.last_name
            }
          />

          <input type="submit" value="Edit" />
        </form>
        <input type="button" value="Archive" onClick={this.archiveCard} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateCard: formData => {
      return dispatch(actionsUpdateCard(formData));
    }
  };
};

export default CardMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardMenu);
