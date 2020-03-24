import React, { Component } from "react";
import styles from "./ProfileModal.module.scss";
import { connect } from "react-redux";
import { actionsUpdateUser } from "../../actions";

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    let session = JSON.parse(sessionStorage.getItem("user"));
    return this.setState({ ...session });
  };

  handleInput = e => {
    let { name, value } = e.target;

    return this.setState({ [name]: value });
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
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateUser: formData => {
      return dispatch(actionsUpdateUser(formData));
    }
  };
};

export default ProfileModal = connect(null, mapDispatchToProps)(ProfileModal);
