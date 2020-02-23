import React, { Component } from "react";
import styles from "./CardMenu.module.scss";
import { connect } from "react-redux";
import { actionsUpdateCard } from "../../actions";
import CardLabels from "../CardLabels";

class CardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_archived: false,
      openCardLabels: false
    };
  }

  toggleLabelsMenu = e => {
    e.preventDefault();
    e.stopPropagation();
    return this.setState({ openCardLabels: !this.state.openCardLabels });
  };

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
    delete formData.openCardLabels;

    this.props.dispatchUpdateCard(formData);
    return this.props.toggleMenu();
  };

  toggleArchive = () => {
    return this.setState({ is_archived: !this.state.is_archived });
  };

  addLabels = () => {
    return;
  };

  stopPropagation = e => {
    if (e) {
      return e.stopPropagation();
    }
  };

  render() {
    return (
      <div className={styles.CardMenu} onClick={this.props.toggleMenu}>
        <div
          onClick={this.stopPropogation}
          className={styles.updateCardContainer}
        >
          {/* Edit Name */}
          <form
            onSubmit={this.updateCard}
            className={styles.updateCardForm}
            onClick={this.stopPropagation}
          >
            <input
              type="text"
              name="name"
              value={this.state.name}
              defaultValue={this.props.card.name}
              onChange={this.handleCardInput}
              placeholder={this.props.card.name}
              className={styles.updateCardName}
            />

            {/* Edit List */}
            <div className={styles.listsContainer}>
              in list
              <select name="list_id" onChange={this.handleCardInput}>
                {this.props.lists.map(list => {
                  return (
                    <option value={list.id} key={list.id}>
                      {list.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Edit Details */}
            <textarea
              name="details"
              cols="30"
              rows="10"
              onChange={this.handleCardInput}
              defaultValue={this.props.card.details}
              value={this.state.details}
              className={styles.editDetails}
            ></textarea>

            {/* Edit Due Date */}
            <input
              type="date"
              name="due_date"
              className={styles.dueDate}
              onChange={this.handleCardInput}
              defaultValue={
                this.props.card.due_date
                  ? new Date(this.props.card.due_date)
                      .toISOString()
                      .substr(0, 10)
                  : null
              }
              value={this.state.due_date}
            />

            {/* Display Created By */}
            <div className={styles.createdBy}>
              {this.props.card.createdBy.first_name +
                " " +
                this.props.card.createdBy.last_name}
            </div>

            {/* Toggle Labels Menu */}
            <button onClick={this.toggleLabelsMenu}>Labels</button>
            <button type="submit">Save</button>
          </form>

          {/* Labels Menu */}
          {this.state.openCardLabels ? (
            <CardLabels
              card={this.props.card}
              labels={this.props.labels}
              addLabels={this.addLabels}
              toggleLabelsMenu={this.toggleLabelsMenu}
            />
          ) : null}

          {/* Archive Card Button */}
          <input
            type="button"
            value={this.state.is_archived ? "Unarchive" : "Archive"}
            onClick={this.toggleArchive}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists,
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

export default CardMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardMenu);
