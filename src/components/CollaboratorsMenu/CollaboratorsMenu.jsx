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
    if (this.props.collaborators) {
      let currentCollaboratorsIDs = this.props.collaborators.map(user => {
        return user.id;
      });

      return this.setState({
        collaborators: this.props.collaborators,
        invited: currentCollaboratorsIDs
      });
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.users !== this.props.users) {
      return this.setState({ users: this.props.users });
    }

    if (prevProps.collaborators !== this.props.collaborators) {
      let currentCollaboratorsIDs = this.props.collaborators.map(user => {
        return user.id;
      });
      return this.setState({
        collaborators: this.props.collaborators,
        invited: currentCollaboratorsIDs
      });
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
    } else if (!isNaN(id)) {
      toggleSelect.push(id);
    }

    return this.setState({ invited: toggleSelect });
  };

  toggleSelectCollab = e => {
    if (e) {
      e.stopPropagation();
    }

    let toggleSelect = [...this.state.invited];
    let id = parseInt(e.target.dataset.name);

    if (this.state.invited.includes(id)) {
      toggleSelect.splice(toggleSelect.indexOf(id), 1);
    } else if (!isNaN(id)) {
      toggleSelect.push(id);
    }

    return this.setState({ invited: toggleSelect });
  };

  handleInvite = () => {
    let formData = { invitations: this.state.invited, id: this.props.id };

    return this.setState({ searchTerm: "", users: [] }, () => {
      return this.props.dispatchInviteCollaborators(formData);
    });
  };

  handleCancel = e => {
    return this.props.toggleMenu(e);
  };

  render() {
    return (
      <ul className={styles.CollaboratorsMenu}>
        <li className={styles.collabs_container}>
          {this.state.collaborators && this.state.collaborators.length > 0 ? (
            this.state.collaborators.map(user => {
              if (this.state.invited.includes(user.id)) {
                return (
                  <span
                    className={styles.collaborator}
                    key={user.id}
                    onClick={this.toggleSelectCollab}
                    data-name={user.id}
                  >
                    {user.firstname[0].toUpperCase() +
                      user.lastname[0].toUpperCase()}
                  </span>
                );
              } else {
                return (
                  <span
                    className={styles.collaborator_removed}
                    key={user.id}
                    onClick={this.toggleSelectCollab}
                    data-name={user.id}
                  />
                );
              }
            })
          ) : (
            <div className={styles.noCollabs}>
              There are no collaborators yet.
            </div>
          )}
        </li>
        <li className={styles.search_container}>
          <input
            type="search"
            name="searchTerm"
            id="searchTerm"
            placeholder="Find a team member"
            className={styles.search_input}
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
                    checked={
                      this.state.invited.includes(user.id) ? true : false
                    }
                  />
                );
              } else {
                return null;
              }
            })}
          </ul>
          <div className={styles.search_buttons_li}>
            <button
              className={styles.search_button}
              onClick={this.handleInvite}
            >
              Update Team
            </button>
            <button
              className={styles.search_button}
              onClick={this.handleCancel}
              data-menu="collaboratorsMenu"
            >
              Cancel
            </button>
          </div>
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
