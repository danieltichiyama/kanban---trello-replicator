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
    this.setState({ [id]: !this.state[id] });
  };

  render() {
    return (
      <div className={styles.BoardMenu}>
        <ul>
          <li className={styles.MenuList}>General Information</li>
          <li className={styles.MenuList}>Background Image</li>
          <li className={styles.MenuList} id="labelsMenu" onClick={this.toggle}>
            Labels
          </li>
          {this.state.labelsMenu ? <LabelsMenu /> : null}

          <li
            className={styles.MenuList}
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
