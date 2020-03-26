import React from "react";
import styles from "./SearchResult.module.scss";

const SearchResult = props => {
  return (
    <li className={styles.SearchResult}>
      <label
        name={props.result.id}
        className={styles.checkboxLabel}
        onClick={props.toggleSelect}
      >
        {props.result.firstname + " " + props.result.lastname}
        <input
          type="checkbox"
          name={props.result.id}
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxCustom}></span>
      </label>
    </li>
  );
};

export default SearchResult;
