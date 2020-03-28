import React, { Component } from "react";
import styles from "./EditProfileMenu.module.scss";
import { connect } from "react-redux";
import { actionsUpdateUser, actionsDeleteUser } from "../../actions";

class EditProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", firstname: "", lastname: "", email: "" };
  }

  componentDidMount = () => {
    let { username, firstname, lastname, email, id } = this.props;
    return this.setState({
      username,
      firstname,
      lastname,
      email,
      id
    });
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
    return this.props.toggleThis();
  };

  stopPropagation = e => {
    if (e) {
      return e.stopPropagation();
    }
  };
  render() {
    return (
      <form
        onSubmit={this.submitForm}
        className={styles.EditProfileMenu_form}
        onClick={this.stopPropagation}
      >
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
          <button onClick={this.props.toggleThis}>Cancel</button>
          <button
            onClick={this.handleDelete}
            className={styles.delete_account_button}
          >
            Delete
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.username,
    email: state.email,
    firstname: state.firstname,
    lastname: state.lastname,
    id: state.id
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

export default EditProfileMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileMenu);
