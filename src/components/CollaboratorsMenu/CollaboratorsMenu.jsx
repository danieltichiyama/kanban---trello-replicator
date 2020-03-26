import React, { Component } from "react";
import styles from "./CollaboratorsMenu.module.scss";
import { connect } from "react-redux";
import { actionsGetAllUsers } from "../../actions";

class CollaboratorsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", collaborators: [], users: [] };
  }

  componentDidMount = () => {
    return this.setState({ collaborators: this.props.collaborators });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.users !== this.props.users) {
      return this.setState({ users: this.props.users });
    }

    if (prevProps.collaborators !== this.props.collaborators) {
      return this.setState({ collaborators: this.props.collaborators });
    }
  };

  handleInput = e => {
    if (e) {
      e.stopPropagation();
    }

    return this.setState({ searchTerm: e.target.value }, () => {
      // debugger;
      this.props.dispatchGetAllUsers(this.state.searchTerm);
    });
  };

  render() {
    return (
      <ul className={styles.CollaboratorsMenu}>
        <li className={styles.collabMenu_li}>
          {this.state.collaborators.map(user => {
            return (
              <span className={styles.collaborator} key={user.id}>
                {user.username}
              </span>
            );
          })}
        </li>
        <li className={styles.collabMenu_li}>
          <input
            type="search"
            name="searchTerm"
            id="searchTerm"
            placeholder="Find a user"
            value={this.state.searchTerm}
            onChange={this.handleInput}
          />
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    collaborators: state.collaborators
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetAllUsers: searchTerm => {
      return dispatch(actionsGetAllUsers(searchTerm));
    }
  };
};

export default CollaboratorsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollaboratorsMenu);
