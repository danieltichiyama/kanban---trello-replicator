import React, { Component } from "react";

import styles from "./AddCard.module.scss";

class AddCard extends Component {
  render() {
    return (
      <div className={styles.addCard}>
        <div className={styles.header}>
          <h3>Add a task</h3>
          <button>X</button>
        </div>
        <form action="/cards/new" method="post">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" />
          <br />
          <label for="body">Body</label>
          <input type="text" name="body" id="body" />
          <br />
          <label for="priority">Priority</label>
          <select name="priority" id="priority">
            {/* needs a route to pull priorities from db */}
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Blocker</option>
          </select>
          <br />
          <label for="created_by">Created by</label>
          <input type="number" name="created_by" id="created_by" />
          <br />
          <label for="assigned_to">Assigned to</label>
          <input type="number" name="assigned_to" id="assigned_to" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddCard;
