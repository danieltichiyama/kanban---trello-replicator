import React from "react";

import styles from "./Card.module.scss";

const Card = function(props) {
  const { title, body, updated_at, createdBy, assignedTo } = props.card;

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{body}</p>
      <p className={styles.faded}>
        created by: {createdBy.first_name.concat(" ", createdBy.last_name)}
      </p>
      <p className={styles.faded}>
        assigned to: {assignedTo.first_name.concat(" ", assignedTo.last_name)}
      </p>
      <p className={styles.faded}>updated at: {updated_at}</p>
      <button onClick={props.onEdit(props.card)}>Edit</button>
    </div>
  );
};

export default Card;

//edit button broken...
