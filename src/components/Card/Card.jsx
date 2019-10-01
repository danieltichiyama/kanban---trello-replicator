import React from "react";

import styles from "./Card.module.scss";

const Card = function(props) {
  console.log("card props", props);

  const {
    title,
    description,
    created_by,
    assigned_to,
    updated_at
  } = props.card;

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p className={styles.faded}>created by: {created_by}</p>
      <p className={styles.faded}>assigned to: {assigned_to}</p>
      <p className={styles.faded}>updated at: {updated_at}</p>
    </div>
  );
};

export default Card;
