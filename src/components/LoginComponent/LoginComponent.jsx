import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./LoginComponent.module.scss";
import { actionsLoginUser } from "../../actions";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLoginSubmit = e => {
    e.preventDefault();
    this.props.dispatchLoginUser(this.state);
    return this.setState(
      { username: "", password: "" },
      this.props.toggleAuthBox
    );
    //this will somehow need to use the toggleAuthBox function too
  };

  handleInput = event => {
    const { value, name } = event.target;
    const state = { ...this.state };
    state[name] = value;
    this.setState(state);
  };

  render() {
    return (
      <div className={styles.loginComponent}>
        <form>
          <ul className={styles.form_ul}>
            <li className={styles.form_li}>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInput}
                placeholder="Enter username"
                className={styles.form_input}
              />
            </li>
            <li className={styles.form_li}>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInput}
                placeholder="Enter password"
                className={styles.form_input}
              />
            </li>
            <li className={styles.form_li}>
              <button
                onClick={this.handleLoginSubmit}
                className={styles.login_button}
              >
                Log in
              </button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoginUser: formData => {
      return dispatch(actionsLoginUser(formData));
    }
  };
};

export default LoginComponent = connect(
  null,
  mapDispatchToProps
)(LoginComponent);
