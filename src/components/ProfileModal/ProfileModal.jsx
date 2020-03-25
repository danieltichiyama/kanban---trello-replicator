import React, { Component } from "react";
import styles from "./ProfileModal.module.scss";
import { connect } from "react-redux";
import { actionsUpdateUser, actionsDeleteUser } from "../../actions";

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", firstname: "", lastname: "", email: "" };
  }

  componentDidMount = () => {
    let { username, firstname, lastname, email } = this.props;
    return this.setState({ username, firstname, lastname, email });
  };

  handleInput = e => {
    let { name, value } = e.target;

    return this.setState({ [name]: value });
  };

  handleDelete = e => {
    if (e) e.preventDefault();
    let confirmation = window.confirm(
      "Are you sure? \nYour account data, including all of your boards will be deleted and unrecoverable."
    );

    if (confirmation) {
      return this.props.dispatchDeleteUser();
    }
  };

  submitForm = e => {
    if (e) {
      e.preventDefault();
    }
    this.props.dispatchUpdateUser(this.state);
  };

  stopPropagation = e => {
    if (e) {
      return e.stopPropagation();
    }
  };
  render() {
    return (
      <div className={styles.ProfileModal} onClick={this.stopPropagation}>
        <div className={styles.ProfileModal_header}>
          <h3>Profile</h3>
        </div>
        <form onSubmit={this.submitForm} className={styles.ProfileModal_form}>
          <label className={styles.form_label}>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              className={styles.form_input}
            />
          </label>
          <label className={styles.form_label}>
            First Name:
            <input
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleInput}
              className={styles.form_input}
            />
          </label>
          <label className={styles.form_label}>
            Last Name:
            <input
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleInput}
              className={styles.form_input}
            />
          </label>
          <label className={styles.form_label}>
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
              className={styles.form_input}
            />
          </label>
          <div className={styles.form_buttons_container}>
            <button type="submit">Save</button>
            <button onClick={this.props.toggleModal}>Cancel</button>
            <button
              onClick={this.handleDelete}
              className={styles.delete_account_button}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    email: state.email,
    firstname: state.firstname,
    lastname: state.lastname
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateUser: formData => {
      return dispatch(actionsUpdateUser(formData));
    },
    dispatchDeleteUser: () => {
      let userID = JSON.parse(sessionStorage.getItem("user")).id;

      return dispatch(actionsDeleteUser(userID));
    }
  };
};

export default ProfileModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileModal);
