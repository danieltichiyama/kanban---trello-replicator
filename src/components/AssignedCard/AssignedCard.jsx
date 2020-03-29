import React, { Component } from "react";
import styles from "./AssignedCard.module.scss";
import { connect } from "react-redux";
import { actionsUpdateCardFromToDoList } from "../../actions";
import { Link } from "react-router-dom";

import TextareaAutosize from "react-textarea-autosize";

class AssignedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: {}
    };
  }

  componentDidMount = () => {
    return this.setState({ name: this.props.card.name });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.card !== this.props.card) {
      return this.setState({ name: this.props.card.name });
    }
  };

  updateCard = e => {
    if (e) {
      e.preventDefault();
    }
    let formData = { ...this.state, id: this.props.card.id };
    delete formData.label;
    delete formData.showMenu;

    if (formData.name.length === 0) {
      formData.name = this.props.card.name;
    }

    return this.props.dispatchUpdateCardFromToDoList(formData);
  };

  handleNameInput = e => {
    if (e) {
      e.stopPropagation();
    }
    const { value, name } = e.target;
    return this.setState({ [name]: value });
  };

  handleListInput = e => {
    if (e) {
      e.stopPropagation();
    }
    const { value, name } = e.target;
    return this.setState({ [name]: value }, this.updateCard);
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.updateCard();
      return e.target.blur();
    }
  };

  render() {
    return (
      <div
        className={styles.AssignedCard}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {/* Card's Labels */}
        {this.props.card.labels ? (
          <div className={styles.labelsContainer}>
            {this.props.card.labels.map(label => {
              let color = { backgroundColor: label.color };
              let labelName = label.name;
              return (
                <div className={styles.Label} key={label.color} style={color}>
                  {labelName}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Card Name */}
        <div className={styles.cardBody}>
          <div className={styles.content}>
            <TextareaAutosize
              className={styles.cardName}
              type="text"
              name="name"
              minRows={1}
              value={this.state.name}
              onChange={this.handleNameInput}
              onKeyPress={this.handleKeyPress}
            />
            <div className={styles.inWhere}>
              from{" "}
              <Link
                style={{ textDecoration: "underline", color: "black" }}
                to={`/b/${this.props.card.board.id}/${this.props.card.board.name}`}
              >
                {this.props.card.board.name}
              </Link>
              , in list
              <select
                name="list_id"
                onChange={this.handleListInput}
                defaultValue={this.props.card.list_id}
              >
                {this.props.card.board.lists.map(list => {
                  if (!list.isArchived) {
                    return (
                      <option value={list.id} key={list.id}>
                        {list.name}
                      </option>
                    );
                  } else {
                    return null;
                  }
                })}
              </select>{" "}
            </div>
          </div>

          {/* Show Card Editor Menu or Unarchive Card Button*/}
        </div>
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
    dispatchUpdateCardFromToDoList: formData => {
      return dispatch(actionsUpdateCardFromToDoList(formData));
    }
  };
};
export default AssignedCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignedCard);
