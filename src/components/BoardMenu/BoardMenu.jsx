import React, { Component } from "react";
import styles from "./BoardMenu.module.scss";
import LabelsMenu from "../LabelsMenu";
import ArchivedItems from "../ArchivedItems";

class BoardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsMenu: false
    };
  }

  toggle = e => {
    let { id } = e.target;
    if (this.state[id]) {
      return this.setState({ [id]: !this.state[id] });
    } else {
      return this.setState({ [id]: true });
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
          {/* General Board Information */}
          <li className={styles.MenuOption}>General Information</li>

          {/* Background Image */}
          <li className={styles.MenuOption}>Background Image</li>

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
