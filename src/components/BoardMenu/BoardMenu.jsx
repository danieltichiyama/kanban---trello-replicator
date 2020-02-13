import React, { Component } from "react";
import styles from "./BoardMenu.module.scss";
import LabelsMenu from "../LabelsMenu";

class BoardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLabelsMenu: false
    };
  }

  toggleLabels = () => {
    this.setState({ openLabelsMenu: !this.state.openLabelsMenu });
  };

  render() {
    return (
      <div className={styles.BoardMenu}>
        <ul>
          <li className={styles.MenuList}>General Information</li>
          <li className={styles.MenuList}>Background Image</li>
          <li className={styles.MenuList} onClick={this.toggleLabels}>
            Labels
          </li>
          {this.state.openLabelsMenu ? <LabelsMenu /> : null}
        </ul>
      </div>
    );
  }
}

export default BoardMenu;
