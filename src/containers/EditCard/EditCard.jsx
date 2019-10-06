import React, { Component } from "react";
import { connect } from "react-redux";
import { editCard, getCardData } from "../../actions";

import styles from "./EditCard.module.scss";

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  componentDidUpdate(prevProps) {
    if (prevProps.editor !== this.props.editor) {
      this.fetchPostData(this.props.editor.id);
    }
  }

  fetchPostData = () => {
    this.setState(this.props.editor);
  };

  render() {
    return (
      <div className={styles.editCard}>
        <div className={styles.header}>
          <h3>Edit a task</h3>
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
          value={this.state.assigned_to}
          onChange={this.handleAssignedToInput}
        />
        <br />
        <button
          onClick={function() {
            console.log("EditCard, button: submit, onClick");
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { editor: state.editor };
}

function mapDispatchToProps(dispatch) {
  return {
    onEditClick: data => {
      return dispatch(editCard(data));
    },
    getCardData: id => {
      return dispatch(getCardData(id));
    }
  };
}

export default EditCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard);
