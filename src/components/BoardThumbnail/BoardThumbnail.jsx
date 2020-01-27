import React, { Component } from "react";
import styles from "./BoardThumbnail.module.scss";

class BoardThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  toggleMenu = () => {
    return this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    let { board, getBoardData } = this.props;
    return (
      <li id={board.id} className={styles.li_board} onClick={getBoardData}>
        {board.name}

        <button onClick={this.toggleMenu}>Edit</button>
        {this.state.showMenu ? (
          <ul className={styles.boardMenu}>
            <li className={styles.menu_li_option}>Rename</li>
            <li className={styles.menu_li_option}>Background</li>
            <li className={styles.menu_li_option}>Archive</li>
          </ul>
        ) : null}
      </li>
    );
  }
}

export default BoardThumbnail;
