import React, { Component } from "react";
import styles from "./BoardMenu.module.scss";
import LabelsMenu from "../LabelsMenu";

class BoardMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLabelsOpen: false
    };
  }

  toggleLabels = () => {
    this.setState({ isLabelsOpen: !this.state.isLabelsOpen });
  };

  render() {
    return (
      <div className={styles.BoardMenu}>
        {this.state.isLabelsOpen ? <LabelsMenu /> : null}
        <ul>
          This Board
          <li className={styles.MenuList}>General Information</li>
          <li className={styles.MenuList}>Background Image</li>
          <li className={styles.MenuList} onClick={this.toggleLabels}>
            Labels
          </li>
        </ul>
      </div>
    );
  }
}

export default BoardMenu;
