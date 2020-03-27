import React, { Component } from "react";
import styles from "./CardMenu.module.scss";
import { connect } from "react-redux";
import { actionsUpdateCard } from "../../actions";
import CardLabels from "../CardLabels";
import TextareaAutosize from "react-textarea-autosize";

class CardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_archived: false,
      openCardLabels: false,
      collaborators: []
    };
  }

  componentDidMount = () => {
    return this.setState({
      name: this.props.card.name,
      id: this.props.card.id,
      collaborators: this.props.collaborators,
      assigned_to: this.props.card.assigned_to
    });
  };

  toggleLabelsMenu = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    return this.setState({ openCardLabels: !this.state.openCardLabels });
  };

  handleCardInput = e => {
    let { value, name } = e.target;

    if (name === "list_id" || name === "assigned_to") {
      value = parseInt(value);
    }
    return this.setState({ [name]: value });
  };

  updateCard = e => {
    if (e) {
      e.preventDefault();
    }
    let formData = { ...this.state };

    if (formData.name.length === 0) {
      formData.name = this.props.card.name;
    }
    delete formData.openCardLabels;
    delete formData.collaborators;

    this.props.dispatchUpdateCard(formData);
    return this.props.toggleMenu();
  };

  toggleArchive = e => {
    e.preventDefault();
    e.stopPropagation();
    return this.setState({ is_archived: !this.state.is_archived });
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
                <TextareaAutosize
                  name="name"
                  rows="1"
                  value={this.state.name}
                  onChange={this.handleCardInput}
                  className={styles.updateCardName}
                />
                <button className={styles.exitButton} />
              </div>
              {/* Edit List */}

              <div className={styles.listsContainer}>
                in list
                <select
                  name="list_id"
                  onChange={this.handleCardInput}
                  defaultValue={this.props.card.list_id}
                >
                  {this.props.lists.map(list => {
                    return (
                      <option value={list.id} key={list.id}>
                        {list.name}
                      </option>
                    );
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
                  />

                  {/* Labels Menu */}
                  {this.state.openCardLabels ? (
                    <CardLabels
                      card={this.props.card}
                      labels={this.props.labels}
                      toggleLabelsMenu={this.toggleLabelsMenu}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Edit Details */}
            <h4>Description</h4>
            <TextareaAutosize
              name="details"
              cols="30"
              minRows={20}
              maxRows={40}
              onChange={this.handleCardInput}
              defaultValue={this.props.card.details}
              value={this.state.details}
              className={styles.editDetails}
            />
            {/* Assign To and Created By*/}

            <div className={styles.assigned_created_container}>
              <p className={styles.assignedTo}>
                assigned to{" "}
                <select
                  name="assigned_to"
                  value={this.state.assigned_to ? this.state.assigned_to : ""}
                  onChange={this.handleCardInput}
                >
                  <option value="">unassigned</option>
                  <option value={this.props.createdBy.id}>
                    {this.props.createdBy.firstname +
                      " " +
                      this.props.createdBy.lastname}
                  </option>
                  {this.state.collaborators
                    ? this.state.collaborators.map(user => {
                        return (
                          <option value={user.id} key={user.id}>
                            {user.firstname + " " + user.lastname}
                          </option>
                        );
                      })
                    : null}
                </select>
              </p>
              <p className={styles.createdBy}>
                {this.props.card.createdBy.firstname +
                  " " +
                  this.props.card.createdBy.lastname}
              </p>
            </div>

            <div className={styles.buttonsContainer}>
              {/* Archive Card Button */}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists,
    labels: state.labels,
    collaborators: state.collaborators,
    user_id: state.user_id,
    createdBy: state.createdBy
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
