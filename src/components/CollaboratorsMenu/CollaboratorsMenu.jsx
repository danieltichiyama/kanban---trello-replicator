import React, { Component } from "react";
import styles from "./CollaboratorsMenu.module.scss";
import { connect } from "react-redux";
import { actionsGetUsers, actionsInviteCollaborators } from "../../actions";
import SearchResult from "../SearchResult";

class CollaboratorsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", collaborators: [], users: [], invited: [] };
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
      this.props.dispatchGetUsers(this.state.searchTerm);
    });
  };

  toggleSelect = e => {
    if (e) {
      e.stopPropagation();
    }

    let toggleSelect = [...this.state.invited];
    let id = parseInt(e.target.name);

    if (this.state.invited.includes(id)) {
      toggleSelect.splice(toggleSelect.indexOf(id), 1);
    } else {
      toggleSelect.push(id);
    }

    return this.setState({ invited: toggleSelect });
  };

  handleInvite = () => {
    let formData = { invitations: this.state.invited, id: this.props.id };
    return this.props.dispatchInviteCollaborators(formData);
  };

  handleCancel = () => {
    return this.setState({ invited: [] });
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
          <ul className={styles.search_ul}>
            {this.state.users.map(user => {
              if (user.id !== this.props.created_by) {
                return (
                  <SearchResult
                    result={user}
                    toggleSelect={this.toggleSelect}
                    key={user.id}
                  />
                );
              } else {
                return null;
              }
            })}
            <li className={styles.search_buttons_li}>
              <button
                className={styles.search_button}
                onClick={this.handleInvite}
              >
                Invite
              </button>
              <button
                className={styles.search_button}
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    collaborators: state.collaborators,
    id: state.id,
    created_by: state.created_by
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetUsers: searchTerm => {
      return dispatch(actionsGetUsers(searchTerm));
    },
    dispatchInviteCollaborators: formData => {
      return dispatch(actionsInviteCollaborators(formData));
    }
  };
};

export default CollaboratorsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollaboratorsMenu);
