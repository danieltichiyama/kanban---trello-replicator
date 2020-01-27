import React from "react";
import styles from "./Card.module.scss";
import { connect } from "react-redux";

let Card = function(props) {
  let { card } = props;

  let { labels } = card;

  return (
    <div className={styles.Card}>
      {card.title}
      {labels.map(label => {
        return (
          <div className={styles.Label} key={label.id}>
            {label.name}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default Card = connect(mapStateToProps, mapDispatchToProps)(Card);
