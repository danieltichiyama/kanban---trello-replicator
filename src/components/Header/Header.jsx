import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className={styles.Header}>
      <div className={styles.menu}>
        <Link className={styles.Link} to="/">
          <button className={styles.homeButton} />
        </Link>
      </div>
      <h2 className={styles.HeaderTitle}>Kanban</h2>
      <div className={styles.spaceFiller}></div>
    </div>
  );
}

export default Header;
