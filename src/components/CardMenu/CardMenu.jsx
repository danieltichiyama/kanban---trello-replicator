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
      openCardLabels: true
    };
  }

  onInput = () => {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  };

  toggleLabelsMenu = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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

  toggleArchive = e => {
    e.preventDefault();
    e.stopPropagation();
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
            <div className={styles.cardMenuHeader}>
              <div className={styles.cardMenuHeaderInputs}>
                <textarea
                  name="name"
                  rows="1"
                  value={this.state.name}
                  defaultValue={this.props.card.name}
                  onChange={this.handleCardInput}
                  placeholder={this.props.card.name}
                  className={styles.updateCardName}
                />{" "}
                <button className={styles.exitButton} />
              </div>
              {/* Edit List */}

              <div className={styles.listsContainer}>
                in list
                <select name="list_id" onChange={this.handleCardInput}>
                  {this.props.lists.map(list => {
                    if (this.props.card.list_id !== list.id) {
                      return (
                        <option value={list.id} key={list.id}>
                          {list.name}
                        </option>
                      );
                    } else {
                      return (
                        <option value={list.id} key={list.id} selected>
                          {list.name}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            </div>

            <h4>Labels</h4>
            {/* Toggle Labels Menu */}
            {this.props.card.labels ? (
              <div className={styles.labelsContainer}>
                {this.props.card.labels.map(label => {
                  let color = { backgroundColor: label.color };
                  let labelName = this.props.labels[label.color].name;
                  return (
                    <div
                      className={styles.Label}
                      key={label.color}
                      style={color}
                    >
                      {labelName}
                    </div>
                  );
                })}
                <div>
                  <button
                    onClick={this.toggleLabelsMenu}
                    className={styles.labelsButton}
                  ></button>
                  {/* Labels Menu */}
                  {this.state.openCardLabels ? (
                    <CardLabels
                      card={this.props.card}
                      labels={this.props.labels}
                      addLabels={this.addLabels}
                      toggleLabelsMenu={this.toggleLabelsMenu}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Edit Details */}
            <h4>Description</h4>
            <textarea
              name="details"
              cols="30"
              rows="5"
              onChange={this.handleCardInput}
              defaultValue={this.props.card.details}
              value={this.state.details}
              className={styles.editDetails}
            ></textarea>

            {/* Edit Due Date */}
            {/* <input
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
            /> */}
            {/* Display Created By */}
            {/* <div className={styles.createdBy}>
              {this.props.card.createdBy.first_name +
                " " +
                this.props.card.createdBy.last_name}
            </div> */}
            <div className={styles.buttonsContainer}>
              <button
                onClick={this.toggleArchive}
                style={
                  this.state.is_archived
                    ? { backgroundColor: "#eb5946", color: "white" }
                    : null
                }
              >
                {this.state.is_archived ? "Unarchive" : "Archive"}
              </button>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
            </div>
          </form>

          {/* Archive Card Button */}
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
