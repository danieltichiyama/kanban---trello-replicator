import React, { Component } from "react";
import styles from "./BoardMenu.module.scss";
import LabelsMenu from "../LabelsMenu";
import ArchivedItems from "../ArchivedItems";
import CollaboratorsMenu from "../CollaboratorsMenu";

class BoardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsMenu: false,
      collaboratorsMenu: false
    };
  }

  toggle = e => {
    if (e) {
      let { id } = e.target;
      if (id) {
        return this.setState({ [id]: !this.state[id] });
      } else if (e.target.dataset.menu) {
        return this.setState({
          [e.target.dataset.menu]: !this.state[e.target.dataset.menu]
        });
      }
    }
  };

  stopPropagation = e => {
    return e.stopPropagation();
  };

  render() {
    return (
      <div
        className={styles.BoardMenuContainer}
        onClick={this.props.toggleMenu}
      >
        <ul className={styles.BoardMenu} onClick={this.stopPropagation}>
          <div className={styles.menuHeader}>
            <h3>Menu </h3>
            <button
              className={styles.exitButton}
              onClick={this.props.toggleMenu}
            ></button>
          </div>
          <hr></hr>
          {/* Collaborators */}
          <li
            className={styles.MenuOption}
            id="collaboratorsMenu"
            onClick={this.toggle}
          >
            Collaborators
          </li>
          {this.state.collaboratorsMenu ? (
            <CollaboratorsMenu toggleMenu={this.toggle} />
          ) : null}

          {/* Labels */}
          <li
            className={styles.MenuOption}
            id="labelsMenu"
            onClick={this.toggle}
          >
            Labels
          </li>
          {this.state.labelsMenu ? <LabelsMenu /> : null}

          {/* Archived Items */}
          <li
            className={styles.MenuOption}
            id="archivedItems"
            onClick={this.toggle}
          >
            Archived Items
          </li>

          {this.state.archivedItems ? <ArchivedItems /> : null}
        </ul>
      </div>
    );
  }
}

export default BoardMenu;
