import React, { Component } from "react";
import { addCard } from "../../actions";
import { connect } from "react-redux";
import styles from "./AddCard.module.scss";

class AddCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      priority_id: 1,
      status_id: 1,
      created_by: null,
      assigned_to: undefined
    };
  }

  handleTitleInput = e => {
    const { value } = e.target;
    this.setState({ title: value });
  };

  handleBodyInput = e => {
    const { value } = e.target;
    this.setState({ body: value });
  };

  handlePriorityIdInput = e => {
    const { value } = e.target;
    this.setState({ priority_id: value });
  };

  handleCreatedByInput = e => {
    const { value } = e.target;
    this.setState({ created_by: value });
  };

  handleAssignedToInput = e => {
    const { value } = e.target;
    this.setState({ assigned_to: value });
  };

  handleSubmitCard = () => {
    // const { titleInput, authorInput } = this.state;
    //this.props.addBook({title: titleInput, author: authorInput});

    //one version
    this.props.onAdd(this.state);
    //another version, does the same thing as the comments above
  };

  render() {
    return (
      <div className={styles.addCard}>
        <div className={styles.header}>
          <h3>Add a task</h3>
          <button>X</button>
        </div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={this.state.title}
          onChange={this.handleTitleInput}
        />

        <br />
        <label htmlFor="body">Body</label>
        <input
          type="text"
          name="body"
          id="body"
          value={this.state.body}
          onChange={this.handleBodyInput}
        />
        <br />
        <label htmlFor="priority_id">Priority</label>
        <select
          name="priority_id"
          id="priority_id"
          value={this.state.priority_id}
          onChange={this.handlePriorityIdInput}
        >
          {/* needs a route to pull priorities from db */}
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
          <option value="4">Blocker</option>
        </select>
        <br />
        <label htmlFor="created_by">Created by</label>
        <input
          type="number"
          name="created_by"
          id="created_by"
          value={this.state.created_by}
          onChange={this.handleCreatedByInput}
        />
        <br />
        <label htmlFor="assigned_to">Assigned to</label>
        <input
          type="number"
          name="assigned_to"
          id="assigned_to"
          value={this.state.assignedToInput}
          onChange={this.handleAssignedToInput}
        />
        <br />
        <button type="submit" onClick={this.handleSubmitCard}>
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: card => {
      dispatch(addCard(card));
    }
  };
};

AddCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);

export default AddCard;
